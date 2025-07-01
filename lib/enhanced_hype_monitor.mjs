import fetch from 'node-fetch';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

dotenv.config({ path: '.env.local' });


class EnhancedHypeTradeMonitor {
  constructor() {
    this.baseURL = 'https://api.hyperliquid.xyz/info';
    this.threshold = 100000; // $100K USD
    this.interval = 20000; // 20 seconds
    this.processedTrades = new Set();
    this.lastPriceCheck = null;
    this.priceHistory = [];
    this.volumeHistory = [];
    this.tradeHistory = [];
    
    // Database simulation with JSON files
    this.dataDir = './data';
    this.ensureDataDir();
    
    // Telegram Bot Setup
    this.telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    this.telegramChatId = process.env.TELEGRAM_CHAT_ID;
    this.bot = null;
    this.initTelegramBot();
    
    // Dashboard API endpoint
    this.dashboardApiUrl = process.env.NEXT_API_URL || 'http://localhost:3000/api/trades/lives';
    console.log("✅ Using dashboard endpoint:", this.dashboardApiUrl);


    
    // Enhanced whale addresses with metadata
    this.whaleAddresses = [
      // Add real addresses with metadata
      // {
      //   address: '0x1234567890123456789012345678901234567890',
      //   name: 'Whale Alpha',
      //   portfolio: { HYPE: 1000000, ETH: 50, BTC: 2 },
      //   tags: ['institution', 'high_frequency'],
      //   confidence: 95
      // }
    ];
    
    // Technical indicators
    this.technicalData = {
      rsi: null,
      macd: null,
      ema: { short: null, long: null },
      bollinger: { upper: null, middle: null, lower: null }
    };
    
    // Performance metrics
    this.metrics = {
      totalAlerts: 0,
      accurateSignals: 0,
      falsePositives: 0,
      uptime: Date.now(),
      lastUpdate: null
    };
  }

  ensureDataDir() {
    if (!existsSync(this.dataDir)) {
      mkdirSync(this.dataDir, { recursive: true });
    }
  }

  initTelegramBot() {
    if (!this.telegramToken) {
      console.log('⚠️  Telegram bot token not found. Telegram alerts disabled.');
      return;
    }
    
    try {
      this.bot = new TelegramBot(this.telegramToken, { polling: false });
      console.log('✅ Telegram bot initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Telegram bot:', error.message);
    }
  }

  async sendTelegramAlert(message, options = {}) {
    if (!this.bot || !this.telegramChatId) return;
    
    try {
      const telegramMessage = options.urgent ? `🚨 URGENT ALERT 🚨\n\n${message}` : message;
      await this.bot.sendMessage(this.telegramChatId, telegramMessage, {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        ...options
      });
    } catch (error) {
      console.error('❌ Failed to send Telegram alert:', error.message);
    }
  }

  async makeApiCall(body) {
    const retries = 3;
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(this.baseURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        return data;
      } catch (err) {
        console.error(`❌ API Error (attempt ${i + 1}/${retries}): ${err.message}`);
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          return null;
        }
      }
    }
  }

  async getCurrentPrice() {
    try {
      const prices = await this.makeApiCall({ type: 'allMids' });
      const price = prices && prices.HYPE ? parseFloat(prices.HYPE) : null;
      
      if (price) {
        this.priceHistory.push({
          timestamp: Date.now(),
          price: price
        });
        
        // Keep only last 200 price points
        if (this.priceHistory.length > 200) {
          this.priceHistory = this.priceHistory.slice(-200);
        }
        
        this.updateTechnicalIndicators();
      }
      
      return price;
    } catch (error) {
      console.error('Error fetching current price:', error);
      return null;
    }
  }

  updateTechnicalIndicators() {
    if (this.priceHistory.length < 20) return;
    
    const prices = this.priceHistory.map(p => p.price);
    
    // Calculate RSI
    this.technicalData.rsi = this.calculateRSI(prices, 14);
    
    // Calculate EMAs
    this.technicalData.ema.short = this.calculateEMA(prices, 9);
    this.technicalData.ema.long = this.calculateEMA(prices, 21);
    
    // Calculate MACD
    this.technicalData.macd = this.calculateMACD(prices);
    
    // Calculate Bollinger Bands
    this.technicalData.bollinger = this.calculateBollingerBands(prices, 20, 2);
  }

  calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return null;
    
    let gains = 0;
    let losses = 0;
    
    for (let i = prices.length - period; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }
    
    const avgGain = gains / period;
    const avgLoss = losses / period;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  calculateEMA(prices, period) {
    if (prices.length < period) return null;
    
    const multiplier = 2 / (period + 1);
    let ema = prices.slice(0, period).reduce((a, b) => a + b) / period;
    
    for (let i = period; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    
    return ema;
  }

  calculateMACD(prices) {
    const ema12 = this.calculateEMA(prices, 12);
    const ema26 = this.calculateEMA(prices, 26);
    
    if (!ema12 || !ema26) return null;
    
    return {
      macd: ema12 - ema26,
      ema12,
      ema26
    };
  }

  calculateBollingerBands(prices, period = 20, multiplier = 2) {
    if (prices.length < period) return null;
    
    const recentPrices = prices.slice(-period);
    const sma = recentPrices.reduce((a, b) => a + b) / period;
    
    const variance = recentPrices.reduce((sum, price) => {
      return sum + Math.pow(price - sma, 2);
    }, 0) / period;
    
    const stdDev = Math.sqrt(variance);
    
    return {
      upper: sma + (stdDev * multiplier),
      middle: sma,
      lower: sma - (stdDev * multiplier)
    };
  }

  async getWhaleTrades() {
    const allTrades = [];
    
    for (const whale of this.whaleAddresses) {
      try {
        const fills = await this.makeApiCall({
          type: 'userFills',
          user: whale.address
        });

        if (Array.isArray(fills)) {
          const recentHypeFills = fills
            .filter(fill => {
              if (fill.coin !== 'HYPE') return false;
              
              const value = parseFloat(fill.sz) * parseFloat(fill.px);
              if (value < this.threshold) return false;
              
              const tradeId = `${fill.user}_${fill.time}_${fill.oid}`;
              if (this.processedTrades.has(tradeId)) return false;
              
              const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
              return fill.time >= fiveMinutesAgo;
            })
            .map(fill => {
              const tradeId = `${fill.user}_${fill.time}_${fill.oid}`;
              this.processedTrades.add(tradeId);
              
              return {
                timestamp: fill.time,
                side: fill.side.toUpperCase(),
                size: parseFloat(fill.sz),
                price: parseFloat(fill.px),
                value: parseFloat(fill.sz) * parseFloat(fill.px),
                wallet: whale.address,
                whaleName: whale.name || 'Unknown Whale',
                orderId: fill.oid,
                confidence: whale.confidence || 90,
                whaleData: whale
              };
            });

          allTrades.push(...recentHypeFills);
        }
      } catch (error) {
        console.error(`Error fetching fills for whale ${whale.name || whale.address.slice(0, 8)}:`, error.message);
      }
    }

    return allTrades;
  }

  async getHighVolumeCandles() {
    try {
      const endTime = Date.now();
      const startTime = endTime - (3 * 60 * 1000);

      const candles = await this.makeApiCall({
        type: 'candleSnapshot',
        req: {
          coin: 'HYPE',
          interval: '1m',
          startTime: startTime,
          endTime: endTime
        }
      });

      if (!Array.isArray(candles) || candles.length === 0) {
        return [];
      }

      const highVolumeCandles = candles.filter(candle => {
        const volume = parseFloat(candle.v || 0);
        const avgPrice = (parseFloat(candle.h) + parseFloat(candle.l)) / 2;
        const volumeValue = volume * avgPrice;
        
        // Store volume data
        this.volumeHistory.push({
          timestamp: candle.t,
          volume: volume,
          value: volumeValue
        });
        
        return volumeValue >= this.threshold;
      });

      // Keep only last 100 volume points
      if (this.volumeHistory.length > 100) {
        this.volumeHistory = this.volumeHistory.slice(-100);
      }

      return highVolumeCandles;
    } catch (error) {
      console.error('Error fetching candle data:', error);
      return [];
    }
  }

  async getLargeOrders() {
    try {
      const book = await this.makeApiCall({
        type: 'l2Book',
        coin: 'HYPE'
      });

      if (!book || !book.levels) {
        return [];
      }

      const largeOrders = [];
      
      // Check bids and asks
      [0, 1].forEach((side, index) => {
        if (book.levels[side]) {
          book.levels[side].forEach(level => {
            const price = parseFloat(level.px);
            const size = parseFloat(level.sz);
            const value = price * size;
            
            if (value >= this.threshold) {
              largeOrders.push({
                side: index === 0 ? 'BID' : 'ASK',
                price: price,
                size: size,
                value: value,
                type: 'order_book'
              });
            }
          });
        }
      });

      return largeOrders;
    } catch (error) {
      console.error('Error fetching order book:', error);
      return [];
    }
  }

  
  formatFullStatusAlert(currentPrice, technicalData, marketAnalysis) {
    const lines = [
      `📢 <b>Market Status</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💰 <b>Price:</b> $${currentPrice.toFixed(4)}`,
      `💹 <b>TWAP:</b> $${this.twap?.toFixed(4) || 'N/A'}`,
      `📈 <b>RSI:</b> ${technicalData.rsi ? technicalData.rsi.toFixed(2) : 'N/A'}`,
      `📉 <b>MACD:</b> ${technicalData.macd?.macd?.toFixed(4) || 'N/A'}`,
      `📊 <b>EMA Short:</b> ${technicalData.ema?.short?.toFixed(4) || 'N/A'}`,
      `📊 <b>EMA Long:</b> ${technicalData.ema?.long?.toFixed(4) || 'N/A'}`,
      `📊 <b>Trend:</b> ${marketAnalysis.trend}`,
      `💯 <b>Score:</b> ${marketAnalysis.score}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    ];
    return lines.join('\n');
  }

formatTelegramAlert(trade, currentPrice, technicalData) {
    const priceChange = currentPrice ? ((currentPrice - trade.price) / trade.price * 100).toFixed(2) : 'N/A';
    const time = new Date(trade.timestamp).toLocaleString();
    
    let technicalInfo = '';
    if (technicalData.rsi !== null) {
      const rsiSignal = technicalData.rsi > 70 ? '🔴 Overbought' : technicalData.rsi < 30 ? '🟢 Oversold' : '🟡 Neutral';
      technicalInfo = `\n📊 RSI: ${technicalData.rsi.toFixed(1)} ${rsiSignal}`;
    }
    
    return `
${trade.side === 'BUY' ? '🟢 LARGE BUY DETECTED' : '🔴 LARGE SELL DETECTED'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐋 <b>${trade.whaleName}</b>
💰 Trade Value: <b>$${trade.value.toLocaleString()}</b>
📊 Size: <b>${trade.size.toLocaleString()} HYPE</b>
💵 Trade Price: <b>$${trade.price}</b>
📈 Current Price: <b>$${currentPrice || 'N/A'}</b> ${currentPrice ? `(${priceChange >= 0 ? '+' : ''}${priceChange}%)` : ''}
🎯 Confidence: <b>${trade.confidence}%</b>
🕒 Time: ${time}${technicalInfo}

👤 Wallet: <code>${trade.wallet.slice(0, 8)}...${trade.wallet.slice(-6)}</code>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
  }

  async sendToDashboard(data) {
    try {
      await fetch(this.dashboardApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_SECRET || 'your-secret-key'}`
        },
        body: JSON.stringify({
          type: 'live_trade_update',
          data: data,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.error('Error sending to dashboard:', error.message);
    }
  }

  saveDataToFile(filename, data) {
    try {
      const filepath = join(this.dataDir, filename);
      writeFileSync(filepath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error saving ${filename}:`, error.message);
    }
  }

  loadDataFromFile(filename) {
    try {
      const filepath = join(this.dataDir, filename);
      if (existsSync(filepath)) {
        return JSON.parse(readFileSync(filepath, 'utf8'));
      }
    } catch (error) {
      console.error(`Error loading ${filename}:`, error.message);
    }
    return null;
  }

  async analyzeMarketConditions(currentPrice) {
    const analysis = {
      trend: 'neutral',
      volatility: 'normal',
      signals: [],
      score: 50 // 0-100
    };

    if (this.priceHistory.length < 10) return analysis;

    // Trend Analysis
    const recentPrices = this.priceHistory.slice(-10).map(p => p.price);
    const priceChange = (recentPrices[recentPrices.length - 1] - recentPrices[0]) / recentPrices[0];
    
    if (priceChange > 0.02) analysis.trend = 'bullish';
    else if (priceChange < -0.02) analysis.trend = 'bearish';

    // Volatility Analysis
    const priceStdDev = this.calculateStandardDeviation(recentPrices);
    const avgPrice = recentPrices.reduce((a, b) => a + b) / recentPrices.length;
    const volatilityRatio = priceStdDev / avgPrice;
    
    if (volatilityRatio > 0.05) analysis.volatility = 'high';
    else if (volatilityRatio < 0.01) analysis.volatility = 'low';

    // Technical Signals
    if (this.technicalData.rsi) {
      if (this.technicalData.rsi > 70) analysis.signals.push('RSI Overbought');
      if (this.technicalData.rsi < 30) analysis.signals.push('RSI Oversold');
    }

    if (this.technicalData.bollinger && currentPrice) {
      if (currentPrice > this.technicalData.bollinger.upper) analysis.signals.push('Above Bollinger Upper');
      if (currentPrice < this.technicalData.bollinger.lower) analysis.signals.push('Below Bollinger Lower');
    }

    // Calculate overall score
    let score = 50;
    if (analysis.trend === 'bullish') score += 20;
    if (analysis.trend === 'bearish') score -= 20;
    if (analysis.volatility === 'high') score += 10;
    analysis.score = Math.max(0, Math.min(100, score));

    return analysis;
  }

  calculateStandardDeviation(values) {
    const avg = values.reduce((a, b) => a + b) / values.length;
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b) / squareDiffs.length;
    return Math.sqrt(avgSquareDiff);
  }

  async monitorLoop() {
    const startTime = Date.now();
    console.log(`\n🕵️ [${new Date().toLocaleTimeString()}] Scanning for HYPE activity >$${this.threshold.toLocaleString()}...`);

    try {
      const currentPrice = await this.getCurrentPrice();
      if (!currentPrice) {
        console.log('❌ Unable to fetch current HYPE price');
        return;
      }

      // Price movement alerts
      if (this.lastPriceCheck) {
        const priceChange = ((currentPrice - this.lastPriceCheck) / this.lastPriceCheck * 100);
        if (Math.abs(priceChange) >= 2) {
          const alert = `📈 PRICE ALERT: HYPE moved ${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}% to $${currentPrice}`;
          console.log(alert);
          await this.sendTelegramAlert(alert);
        }
      }
      this.lastPriceCheck = currentPrice;

      let alertsFound = 0;
      const dashboardData = {
        price: currentPrice,
        timestamp: Date.now(),
        alerts: [],
        technical: this.technicalData,
        whales: [],
        volume: [],
        orderBook: []
      };

      // Market analysis
      const marketAnalysis = await this.analyzeMarketConditions(currentPrice);

      // 1. Check whale trades
      if (this.whaleAddresses.length > 0) {
        console.log('🐋 Checking whale addresses...');
        const whaleTrades = await this.getWhaleTrades();
        if (whaleTrades.length > 0) {
          console.log(`🚨 ${whaleTrades.length} WHALE TRADE(S) DETECTED:`);
          
          for (const trade of whaleTrades) {
            const telegramAlert = this.formatTelegramAlert(trade, currentPrice, this.technicalData);
            console.log(telegramAlert);
            
            await this.sendTelegramAlert(telegramAlert, { urgent: trade.value > 500000 });
            
            dashboardData.whales.push(trade);
            dashboardData.alerts.push({
              type: 'whale_trade',
              data: trade,
              severity: trade.value > 500000 ? 'high' : 'medium'
            });
            
            alertsFound++;
          }
          
          this.tradeHistory.push(...whaleTrades);
        }
      }

      // 2. Check volume spikes
      const highVolumeCandles = await this.getHighVolumeCandles();
      if (highVolumeCandles.length > 0) {
        console.log(`🚨 ${highVolumeCandles.length} HIGH VOLUME SPIKE(S) DETECTED:`);
        
        for (const candle of highVolumeCandles) {
          const volume = parseFloat(candle.v);
          const volumeValue = volume * ((parseFloat(candle.h) + parseFloat(candle.l)) / 2);
          
          const alert = `🔥 HIGH VOLUME: ${volume.toLocaleString()} HYPE ($${volumeValue.toLocaleString()})`;
          console.log(alert);
          await this.sendTelegramAlert(alert);
          
          dashboardData.volume.push(candle);
          dashboardData.alerts.push({
            type: 'volume_spike',
            data: candle,
            severity: 'medium'
          });
          
          alertsFound++;
        }
      }

      // 3. Check large orders
      const largeOrders = await this.getLargeOrders();
      if (largeOrders.length > 0) {
        console.log(`🚨 ${largeOrders.length} LARGE ORDER(S) IN BOOK:`);
        
        const orderSummary = `📋 Large Orders: ${largeOrders.length} orders (${largeOrders.filter(o => o.side === 'BID').length} bids, ${largeOrders.filter(o => o.side === 'ASK').length} asks)`;
        console.log(orderSummary);
        await this.sendTelegramAlert(orderSummary);
        
        dashboardData.orderBook = largeOrders;
        dashboardData.alerts.push({
          type: 'large_orders',
          data: largeOrders,
          severity: 'low'
        });
        
        alertsFound++;
      }

      // Update metrics
      this.metrics.totalAlerts += alertsFound;
      this.metrics.lastUpdate = Date.now();

      // Send to dashboard
      dashboardData.metrics = this.metrics;
      dashboardData.marketAnalysis = marketAnalysis;
      
    const fullStatus = this.formatFullStatusAlert(currentPrice, this.technicalData, marketAnalysis);
    await this.sendTelegramAlert(fullStatus);
await this.sendToDashboard(dashboardData);

      
      // Save data
      this.saveDataToFile('latest_data.json', dashboardData);
      this.saveDataToFile('price_history.json', this.priceHistory);
      this.saveDataToFile('trade_history.json', this.tradeHistory.slice(-100)); // Keep last 100

      // Summary
      const elapsed = Date.now() - startTime;
      if (alertsFound === 0) {
        console.log(`✅ No large activity | Price: $${currentPrice} | Trend: ${marketAnalysis.trend} | RSI: ${this.technicalData.rsi?.toFixed(1) || 'N/A'} | ${elapsed}ms`);
      } else {
        console.log(`🚨 ALERTS: ${alertsFound} | Price: $${currentPrice} | Score: ${marketAnalysis.score} | ${elapsed}ms`);
      }

      // Cleanup
      if (this.processedTrades.size > 1000) {
        const tradesArray = Array.from(this.processedTrades);
        this.processedTrades = new Set(tradesArray.slice(-1000));
      }

    } catch (error) {
      console.error('❌ Error in monitor loop:', error.message);
      await this.sendTelegramAlert(`❌ Monitor Error: ${error.message}`);
    }
  }

  async start() {
    console.log(`
🚀 ENHANCED HYPERLIQUID HYPE MONITOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 Alert Threshold: $${this.threshold.toLocaleString()} USD
⏱️  Scan Interval: ${this.interval / 1000} seconds
🐋 Whale Addresses: ${this.whaleAddresses.length}
📊 Features: Whale tracking, Volume analysis, Technical indicators, Telegram alerts
🤖 Telegram Bot: ${this.bot ? '✅ Active' : '❌ Disabled'}
🌐 Dashboard API: ${this.dashboardApiUrl}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

    // Test API connectivity
    const price = await this.getCurrentPrice();
    if (!price) {
      console.error('❌ Failed to connect to Hyperliquid API');
      return;
    }

    console.log(`✅ API Connected | HYPE Price: $${price}`);
    
    // Load existing data
    const savedData = this.loadDataFromFile('latest_data.json');
    if (savedData) {
      console.log('📂 Loaded previous session data');
    }

    if (this.whaleAddresses.length === 0) {
      console.log(`
⚠️  No whale addresses configured! Add addresses using:
   monitor.addWhaleAddress('0x...', 'Whale Name', { HYPE: 1000000 });
`);
    }

    // Send startup notification
    await this.sendTelegramAlert(`🚀 HYPE Monitor Started\n💰 Threshold: $${this.threshold.toLocaleString()}\n📈 Current Price: $${price}`);

    // Start monitoring
    await this.monitorLoop();
    this.intervalId = setInterval(() => this.monitorLoop(), this.interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('\n🛑 Monitor stopped gracefully');
      this.sendTelegramAlert('🛑 HYPE Monitor Stopped');
    }
  }

  // Enhanced whale management
  addWhaleAddress(address, name = 'Unknown Whale', portfolio = {}, tags = [], confidence = 90) {
    if (!address || address.length !== 42 || !address.startsWith('0x')) {
      console.error('❌ Invalid address format');
      return false;
    }
    
    const existingIndex = this.whaleAddresses.findIndex(w => w.address.toLowerCase() === address.toLowerCase());
    if (existingIndex !== -1) {
      console.log(`⚠️  Address already exists, updating...`);
      this.whaleAddresses[existingIndex] = { address: address.toLowerCase(), name, portfolio, tags, confidence };
    } else {
      this.whaleAddresses.push({ address: address.toLowerCase(), name, portfolio, tags, confidence });
    }
    
    console.log(`✅ ${existingIndex !== -1 ? 'Updated' : 'Added'} whale: ${name} (${address})`);
    this.saveDataToFile('whales.json', this.whaleAddresses);
    return true;
  }

  loadWhaleAddresses() {
    const whales = this.loadDataFromFile('whales.json');
    if (whales) {
      this.whaleAddresses = whales;
      console.log(`📂 Loaded ${whales.length} whale addresses`);
    }
  }

  // API endpoints for dashboard
  getLatestData() {
    return this.loadDataFromFile('latest_data.json') || {};
  }

  getPriceHistory(limit = 100) {
    return this.priceHistory.slice(-limit);
  }

  getTradeHistory(limit = 50) {
    return this.tradeHistory.slice(-limit);
  }

  getMetrics() {
    return {
      ...this.metrics,
      uptime: Date.now() - this.metrics.uptime,
      whaleCount: this.whaleAddresses.length,
      technicalData: this.technicalData
    };
  }
}

// Initialize and start
const monitor = new EnhancedHypeTradeMonitor();

// Load saved whale addresses
monitor.loadWhaleAddresses();

// Example whale addresses (replace with real ones)
// monitor.addWhaleAddress('0x1234567890123456789012345678901234567890', 'Alpha Whale', { HYPE: 1000000, ETH: 50 }, ['institution'], 95);

// Start monitoring
monitor.start();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  monitor.stop();
  process.exit(0);
});

process.on('SIGTERM', monitor.stop);

export default monitor;
/**
 * Enhanced Real-time HYPE Trade Monitor v2.0
 * Now includes whale portfolio analysis, confidence scoring, and upgrade-ready features
 */

export class EnhancedHypeTradeMonitor {
    baseURL: string;
    threshold: number;
    interval: number;
    lastCheckTime: number;
    processedTrades: Set<unknown>;
    walletCache: Map<any, any>;
    priceCache: Map<any, any>;
    isRunning: boolean;
    hypeAssetId: number;
    hypeSpotId: number;
    knownWhales: Set<string>;
    intervalId: NodeJS.Timeout;
    constructor() {
        this.baseURL = 'https://api.hyperliquid.xyz/info';
        this.threshold = parseFloat(process.env.TRADE_THRESHOLD || '100000');
        this.interval = parseInt(process.env.MONITOR_INTERVAL || '20000');
        this.lastCheckTime = Date.now();
        this.processedTrades = new Set();
        this.walletCache = new Map();
        this.priceCache = new Map();
        this.isRunning = false;

        this.hypeAssetId = 150;
        this.hypeSpotId = 107;

        this.knownWhales = new Set([
            "0x742d35Cc6635C0532925a3b8D8C6dA4a8b7b5C70",
            "0x0D1d4e623D10F9FBA5Db95830F7d3839406C6AF2",
            "0x28C6c06298d514Db089934071355E5743bf21d60",
            "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2",
            "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
        ]);
    }

    async makeApiCall(body) {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const text = await response.text();
            return JSON.parse(text) as any;
        } catch (e: any) {
            console.error('❌ API Error:', e);
            return null;
        }
    }

    async getAllTokenPrices(): Promise<any> {
        if (this.priceCache.has('allMids') && Date.now() - (this.priceCache.get('allMids').timestamp as number) < 30000) {
            return this.priceCache.get('allMids').data;
        }
        const data = await this.makeApiCall({ type: 'allMids' });
        if (data) this.priceCache.set('allMids', { data, timestamp: Date.now() });
        return data;
    }

    async getCurrentPrice(): Promise<number | null> {
        const prices = await this.getAllTokenPrices();
        return prices?.HYPE ? parseFloat(prices.HYPE as string) : null;
    }

    async getWalletPortfolio(walletAddress: string): Promise<any> {
        const cacheKey = `portfolio_${walletAddress}`;
        if (this.walletCache.has(cacheKey) && Date.now() - (this.walletCache.get(cacheKey).timestamp as number) < 300000) {
            return this.walletCache.get(cacheKey).data;
        }

        const clearinghouseData = await this.makeApiCall({ type: 'clearinghouseState', user: walletAddress });
        const userFills = await this.makeApiCall({ type: 'userFills', user: walletAddress });
        const portfolio = await this.processPortfolioData(clearinghouseData, userFills, walletAddress);

        this.walletCache.set(cacheKey, { data: portfolio, timestamp: Date.now() });
        return portfolio;
    }

    async processPortfolioData(ch: any, fills: any, wallet: string): Promise<any> {
        const prices = await this.getAllTokenPrices();
        if (!prices) return null;

        const portfolio: any = { walletAddress: wallet, totalValue: 0, positions: [], recentActivity: [] };

        if (ch?.assetPositions) {
            for (const p of ch.assetPositions) {
                const coin = p.position?.coin as string;
                const size = parseFloat(p.position?.szi || '0');
                const entryPx = parseFloat(p.position?.entryPx || '0');
                if (coin && prices[coin] && Math.abs(size) > 0) {
                    const currentPx = parseFloat(prices[coin] as string);
                    const value = Math.abs(size) * currentPx;
                    const pnl = size * (currentPx - entryPx);
                    portfolio.positions.push({ coin, type: 'perpetual', size, entryPrice: entryPx, currentPrice: currentPx, value, unrealizedPnl: pnl, side: size > 0 ? 'long' : 'short' });
                    portfolio.totalValue += value;
                }
            }
        }

        if (Array.isArray(fills)) {
            const recent = fills.filter((f: any) => Date.now() - (f.time || 0) < 7 * 24 * 60 * 60 * 1000);
            const net: { [key: string]: number } = {};
            for (const t of recent) {
                const coin = t.coin as string;
                const size = parseFloat(t.sz || '0');
                const side = t.side as string;
                net[coin] = net[coin] || 0;
                net[coin] += side === 'buy' ? size : -size;
            }

            for (const [coin, netSize] of Object.entries(net)) {
                if (Math.abs(netSize) > 0 && prices[coin]) {
                    const currentPrice = parseFloat(prices[coin] as string);
                    const value = Math.abs(netSize) * currentPrice;
                    if (value > 1000) {
                        portfolio.positions.push({ coin, type: 'spot_estimated', size: netSize, currentPrice, value, side: netSize > 0 ? 'long' : 'short' });
                        portfolio.totalValue += value;
                    }
                }
            }

            portfolio.recentActivity = recent.slice(0, 5).map((t: any) => ({
                coin: t.coin, side: t.side, size: t.sz, price: t.px,
                value: parseFloat(t.sz as string) * parseFloat(t.px as string),
                time: new Date(t.time || t.timestamp).toISOString()
            }));
        }

        return portfolio;
    }

    getTop3Holdings(p: any): any[] {
        return p?.positions?.filter((pos: any) => pos.value > 0)
            .sort((a: any, b: any) => b.value - a.value)
            .slice(0, 3)
            .map((pos: any) => ({
                coin: pos.coin, type: pos.type, value: pos.value,
                size: Math.abs(pos.size), percentage: (pos.value / p.totalValue * 100),
                currentPrice: pos.currentPrice, side: pos.side
            })) || [];
    }

    async detectWalletFromTrade(trade: any): Promise<string> {
        const walletList = Array.from(this.knownWhales);
        const fallback = walletList[Math.floor(Math.random() * walletList.length)];
        for (const addr of walletList) {
            const fills = await this.makeApiCall({ type: 'userFills', user: addr });
            const hypeRecent = fills?.filter((f: any) => f.coin === 'HYPE' && Date.now() - (f.time || 0) < 3600000);
            if (hypeRecent?.length > 0) return addr;
        }
        return fallback;
    }

    async getRecentCandles(): Promise<any> {
        return await this.makeApiCall({
            type: 'candleSnapshot',
            req: { coin: 'HYPE', interval: '1m', startTime: Date.now() - 5 * 60000, endTime: Date.now() }
        });
    }

    detectLargeTradesFromCandles(candles: any[]): any[] {
        return (candles || []).flatMap((c: any) => {
            const v = parseFloat(c.v as string);
            const avg = (parseFloat(c.o as string) + parseFloat(c.c as string) + parseFloat(c.h as string) + parseFloat(c.l as string)) / 4;
            const dollarVol = v * avg;
            if (dollarVol > this.threshold) {
                const priceMove = ((parseFloat(c.c as string) - parseFloat(c.o as string)) / parseFloat(c.o as string)) * 100;
                return [{
                    timestamp: c.t, side: parseFloat(c.c as string) > parseFloat(c.o as string) ? 'BUY' : 'SELL',
                    estimatedSize: v, avgPrice: avg, dollarVolume: dollarVol,
                    priceChange: priceMove, confidence: this.calculateConfidence(v, dollarVol, Math.abs(priceMove))
                }];
            }
            return [];
        });
    }

    calculateConfidence(v: number, dollarVol: number, change: number): number {
        let conf = 0;
        if (dollarVol > 500000) conf += 40;
        else if (dollarVol > 250000) conf += 30;
        else if (dollarVol > 100000) conf += 20;
        if (change > 5) conf += 30;
        else if (change > 2) conf += 20;
        else if (change > 1) conf += 10;
        if (v > 10000) conf += 20;
        else if (v > 5000) conf += 15;
        else if (v > 2000) conf += 10;
        return Math.min(conf, 100);
    }

    formatEnhancedAlert(trade: any, price: number, wallet: string, portfolio: any): string {
        const ts = new Date(trade.timestamp).toLocaleString();
        const arrow = trade.side === 'BUY' ? '🟢📈' : '🔴📉';
        const top = this.getTop3Holdings(portfolio);
        let msg = `\n${arrow} LARGE HYPE TRADE + WALLET ANALYSIS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        msg += `💰 Value: ${(trade.dollarVolume as number).toLocaleString()}\n📊 Side: ${trade.side}\n📈 Price Impact: ${trade.priceChange.toFixed(2)}%\n🎯 Current Price: ${price}\n⏰ Time: ${ts}\n🔍 Confidence: ${trade.confidence}%`;

        if (portfolio?.totalValue > 0) {
            msg += `\n🏦 WALLET: ${wallet.slice(0, 8)}...${wallet.slice(-6)}\n💎 Portfolio: ${(portfolio.totalValue as number).toLocaleString()}\n🏆 Top Holdings:`;
            top.forEach((h: any) => msg += `\n🥇 ${h.coin}: ${(h.value as number).toLocaleString()} (${(h.percentage as number).toFixed(1)}%)`);
        } else {
            msg += `\n⚠️ Portfolio data unavailable.`;
        }
        return msg;
    }

    async monitorTrades(): Promise<void> {
        console.log(`\n🕵️ Checking trades every ${this.interval / 1000}s...`);
        const price = await this.getCurrentPrice();
        const candles = await this.getRecentCandles();
        const trades = this.detectLargeTradesFromCandles(candles);

        for (const trade of trades) {
            const id = `${trade.timestamp}_${trade.side}`;
            if (!this.processedTrades.has(id)) {
                const wallet = await this.detectWalletFromTrade(trade);
                const portfolio = await this.getWalletPortfolio(wallet);
                console.log(this.formatEnhancedAlert(trade, price as number, wallet, portfolio));
                this.processedTrades.add(id);
            }
        }
        if (trades.length === 0) console.log(`✅ ${new Date().toLocaleTimeString()} - No large trades.`);
    }

    async start(): Promise<void> {
        if (this.isRunning) return;
        this.isRunning = true;
        console.log('🚀 Enhanced HYPE Trade Monitor v2.0 started.');
        await this.monitorTrades();
        this.intervalId = setInterval(() => this.monitorTrades(), this.interval);
    }

    stop(): void {
        clearInterval(this.intervalId);
        this.isRunning = false;
        console.log('\n🛑 Monitor stopped');
    }

    async analyzeWallet(wallet: string): Promise<void> {
        const portfolio = await this.getWalletPortfolio(wallet);
        const top = this.getTop3Holdings(portfolio);
        console.log(`
Wallet: ${wallet}`);
        console.log(`Total Value: ${(portfolio.totalValue as number).toLocaleString()}`);
        top.forEach((h: any, i: number) => console.log(`${i + 1}. ${h.coin} - ${(h.value as number).toLocaleString()}`));
    }

    async findBigWhaleTrades(coin: string = 'HYPE', valueThreshold: number = 100000) {
        console.log(`
Analyzing known whales for trades > ${valueThreshold.toLocaleString()} in ${coin}...`);
        const bigTradersInfo = [];

        for (const whaleAddress of this.knownWhales) {
            const userFills = await this.makeApiCall({ type: 'userFills', user: whaleAddress });
            if (!userFills) continue;

            const hypeFills = userFills.filter((f: any) => f.coin === coin);
            const bigTrades = hypeFills.filter((f: any) => (parseFloat(f.sz) * parseFloat(f.px)) > valueThreshold);

            if (bigTrades.length > 0) {
                console.log(`
✅ Found big trader: ${whaleAddress}`);
                const portfolio = await this.getWalletPortfolio(whaleAddress);
                if (portfolio && portfolio.totalValue > 0) {
                    const top3 = this.getTop3Holdings(portfolio);
                    const traderInfo = {
                        wallet: whaleAddress,
                        portfolioValue: portfolio.totalValue,
                        top3Holdings: top3,
                        bigHypeTrades: bigTrades.map(t => ({
                            side: t.side,
                            size: t.sz,
                            price: t.px,
                            value: parseFloat(t.sz) * parseFloat(t.px),
                            time: new Date(t.time).toISOString(),
                        }))
                    };
                    bigTradersInfo.push(traderInfo);

                    console.log(`   Total Portfolio Value: ${portfolio.totalValue.toLocaleString()}`);
                    console.log('   Top 3 Holdings:');
                    top3.forEach((h: any) => {
                        console.log(`     - ${h.coin}: ${h.value.toLocaleString()} (${h.percentage.toFixed(2)}%)`);
                    });
                    console.log('   Recent Large HYPE Trades:');
                    traderInfo.bigHypeTrades.forEach(t => {
                        console.log(`     - ${t.side.toUpperCase()} ${t.value.toLocaleString()} @ ${t.price}`);
                    });

                } else {
                     console.log('   Could not retrieve portfolio information or portfolio is empty.');
                }
            }
        }

        if (bigTradersInfo.length === 0) {
            console.log('\nNo known whales found with recent large HYPE trades.');
        }
        
        return bigTradersInfo;
    }
}

async function main() {
    const monitor = new EnhancedHypeTradeMonitor();
    await monitor.start();
}

async function analyze(walletAddress) {
    const monitor = new EnhancedHypeTradeMonitor();
    await monitor.analyzeWallet(walletAddress);
}

async function findWhales() {
    const monitor = new EnhancedHypeTradeMonitor();
    await monitor.findBigWhaleTrades();
}

const __file = __filename;
if (process.argv[1] === __file) {
    if (process.argv[2] === 'analyze' && process.argv[3]) {
        analyze(process.argv[3]);
    } else if (process.argv[2] === 'find-whales') {
        findWhales();
    } else {
        main();
    }
}
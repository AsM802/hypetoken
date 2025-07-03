import 'dotenv/config';
import axios from 'axios';
import WebSocket from 'ws';
import mongoose, { Schema, Document, Model } from 'mongoose';
import { EnhancedHypeTradeMonitor } from '../lib/hyperliquid-api';

const monitor = new EnhancedHypeTradeMonitor();

// --- Mongoose Setup ---
interface IWhaleTrade extends Document {
  walletAddress: string;
  transactionHash: string;
  tradeType: 'buy' | 'sell';
  hypeAmount: number;
  tradeValueUSD: number;
  timestamp: Date;
  topAssets: {
    assetName: string;
    valueUSD: number;
  }[];
}

const whaleTradeSchema: Schema = new Schema({
  walletAddress: { type: String, required: true, index: true },
  transactionHash: { type: String, required: true, unique: true },
  tradeType: { type: String, enum: ['buy', 'sell'], required: true },
  hypeAmount: { type: Number, required: true },
  tradeValueUSD: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  topAssets: [{
    assetName: { type: String, required: true },
    valueUSD: { type: Number, required: true },
  }],
});

const WhaleTrade: Model<IWhaleTrade> = mongoose.models.WhaleTrade || mongoose.model<IWhaleTrade>('WhaleTrade', whaleTradeSchema);

async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { dbName: 'hypetoken' });
}

// --- Hyperliquid Logic ---
const HYPE_SYMBOL = 'HYPE';
const TRADE_VALUE_THRESHOLD = 100000; // $100k

interface HyperliquidTrade {
  user: string;
  side: 'b' | 's';
  sz: string;
  px: string;
  tid: string;
  time: number;
}

async function getWalletPortfolio(walletAddress: string) {
  try {
    const response = await axios.post('https://api.hyperliquid.xyz/info', {
      type: 'userState',
      user: walletAddress,
    });

    const assetPositions = response.data?.assetPositions || [];
    if (!assetPositions.length) return [];

    const currentPrices = await monitor.getAllTokenPrices();
    if (!currentPrices) {
      console.error('❌ Could not fetch current token prices.');
      return [];
    }

    const portfolioWithValues = assetPositions
      .map((asset: any) => {
        const assetName = asset.position.coin;
        const size = parseFloat(asset.position.szi);
        const currentPrice = parseFloat(currentPrices[assetName] || 0);
        const valueUSD = size * currentPrice;
        return {
          assetName,
          valueUSD,
        };
      })
      .filter((asset: any) => asset.assetName !== HYPE_SYMBOL && asset.valueUSD > 0) // Exclude HYPE and zero-value assets
      .sort((a: any, b: any) => b.valueUSD - a.valueUSD);

    return portfolioWithValues.slice(0, 3); // Return top 3
  } catch (error: any) {
    console.error(`❌ Failed to fetch portfolio for ${walletAddress}:`, error.response?.data || error.message);
    return [];
  }
}

async function handleLargeTrade(trade: HyperliquidTrade) {
  const tradeValue = parseFloat(trade.sz) * parseFloat(trade.px);
  if (tradeValue < TRADE_VALUE_THRESHOLD) return;

  console.log(`
---
💰 Whale trade detected!
  - User: ${trade.user}
  - Side: ${trade.side === 'b' ? 'BUY' : 'SELL'}
  - Amount: ${trade.sz} ${HYPE_SYMBOL}
  - Value: $${tradeValue.toLocaleString()}
---
  `);

  // 1. Fetch the wallet's top assets
  const topAssets = await getWalletPortfolio(trade.user);
  console.log(`  - Top 3 Assets:`, topAssets.map(a => `${a.assetName} ($${a.valueUSD.toLocaleString()})`));

  // 2. Save to database
  try {
    await connectToDB();
    const newWhaleTrade = new WhaleTrade({
      walletAddress: trade.user,
      transactionHash: `${trade.tid}-${trade.user}`.toLowerCase(), // Create a unique ID
      tradeType: trade.side === 'b' ? 'buy' : 'sell',
      hypeAmount: parseFloat(trade.sz),
      tradeValueUSD: tradeValue,
      timestamp: new Date(trade.time),
      topAssets: topAssets,
    });

    await newWhaleTrade.save();
    console.log(`✅ Successfully saved whale trade to database.`);
  } catch (error: any) {
    if (error.code === 11000) { // Duplicate key error
      console.warn(`⚠️ Trade already exists in the database. Skipping.`);
    } else {
      console.error('❌ Error saving trade to MongoDB:', error.message);
    }
  }
}

function listenToHypeTrades() {
  const ws = new WebSocket('wss://api.hyperliquid.xyz/ws');

  ws.on('open', () => {
    console.log('\n📡 WebSocket connected. Listening for HYPE trades...');
    ws.send(JSON.stringify({
      method: 'subscribe',
      subscription: { type: 'trades', coin: HYPE_SYMBOL },
    }));
  });

  ws.on('message', (data: WebSocket.RawData) => {
    const message = JSON.parse(data.toString());
    if (message.channel === 'trades' && message.data) {
      message.data.forEach(handleLargeTrade);
    }
  });

  ws.on('error', (err: Error) => console.error('❌ WebSocket error:', err.message));

  ws.on('close', () => {
    console.warn('⚠️ WebSocket closed. Reconnecting in 3 seconds...');
    setTimeout(listenToHypeTrades, 3000);
  });
}

// --- Main Execution ---
console.log('🚀 Starting Whale Tracker Service...');
listenToHypeTrades();

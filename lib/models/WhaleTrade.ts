
import mongoose, { Schema, Document, models } from 'mongoose';

export interface IWhaleTrade extends Document {
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

const WhaleTradeSchema: Schema = new Schema({
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

const WhaleTrade = models.WhaleTrade || mongoose.model<IWhaleTrade>('WhaleTrade', WhaleTradeSchema);

export default WhaleTrade;

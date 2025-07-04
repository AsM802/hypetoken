import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlockchainEvent extends Document {
  type: string;
  fromAddress: string;
  toAddress: string;
  amountHYPE: number;
  valueUSD: number;
  transactionHash: string;
  timestamp: number;
}

const BlockchainEventSchema: Schema = new Schema({
  type: { type: String, required: true },
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  amountHYPE: { type: Number, required: true },
  valueUSD: { type: Number, required: true },
  transactionHash: { type: String, required: true, unique: true },
  timestamp: { type: Number, required: true },
});

const BlockchainEvent = models.BlockchainEvent || mongoose.model<IBlockchainEvent>('BlockchainEvent', BlockchainEventSchema);

export default BlockchainEvent;

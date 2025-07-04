import mongoose, { Schema, Document, models } from 'mongoose';

export interface IPriceHistory extends Document {
  timestamp: number;
  price: number;
}

const PriceHistorySchema: Schema = new Schema({
  timestamp: { type: Number, required: true, unique: true },
  price: { type: Number, required: true },
});

const PriceHistory = models.PriceHistory || mongoose.model<IPriceHistory>('PriceHistory', PriceHistorySchema);

export default PriceHistory;

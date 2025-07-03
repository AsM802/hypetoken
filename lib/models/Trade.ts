import mongoose from 'mongoose'

const TradeSchema = new mongoose.Schema(
  {
    price: Number,
    amount: Number,
    type: {
      type: String,
      enum: ['buy', 'sell'],
    },
  },
  { timestamps: true }
)

const Trade = mongoose.models.Trade || mongoose.model('Trade', TradeSchema)

export default Trade

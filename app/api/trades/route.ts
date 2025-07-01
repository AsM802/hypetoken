import { NextResponse } from 'next/server'
import { connectToDB } from '@/lib/mongodb'
import Trade from '../../../lib/models/Trade' // we'll define this model below

export async function GET() {
  try {
    await connectToDB()
    const trades = await (Trade as any).find().sort({ createdAt: -1 }).limit(20)
    return NextResponse.json(trades)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch trades' }, { status: 500 })
  }
}

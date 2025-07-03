
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import WhaleTrade from '@/lib/models/WhaleTrade';

export async function GET() {
  try {
    await connectToDB();
    const trades = await (WhaleTrade as any).find().sort({ timestamp: -1 }).limit(50);
    return NextResponse.json(trades);
  } catch (error) {
    console.error('Error fetching whale trades:', error);
    return NextResponse.json({ error: 'Failed to fetch whale trades' }, { status: 500 });
  }
}

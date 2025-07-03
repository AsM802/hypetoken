// app/api/seed/route.ts

import { connectToDB } from '@/lib/mongodb';
import Trade from '@/lib/models/Trade';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDB();

  const sampleTrades = [
    {
      price: 0.012,
      amount: 120000,
      type: 'buy' as 'buy' | 'sell',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0.011,
      amount: 90000,
      type: 'sell' as 'buy' | 'sell',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      price: 0.014,
      amount: 150000,
      type: 'buy' as 'buy' | 'sell',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await Trade.insertMany(sampleTrades);

  return NextResponse.json({ message: 'Seeded mock trades' });
}

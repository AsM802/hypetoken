import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb';
import BlockchainEvent, { IBlockchainEvent } from '@/lib/models/BlockchainEvent';
import { Model } from 'mongoose';

const BlockchainEventModel = BlockchainEvent as Model<IBlockchainEvent>;

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const eventData = await req.json();

    // Ensure uniqueness based on transactionHash
    const existingEvent = await BlockchainEventModel.findOne({ transactionHash: eventData.transactionHash });
    if (existingEvent) {
      return NextResponse.json({ message: 'Event already recorded' }, { status: 200 });
    }

    const newEvent = new BlockchainEventModel(eventData);
    await newEvent.save();

    return NextResponse.json({ message: 'Blockchain event recorded successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error recording blockchain event:', error);
    return NextResponse.json({ error: 'Failed to record blockchain event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const events = await BlockchainEventModel.find().sort({ timestamp: -1 }).limit(50); // Fetch latest 50 events
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching blockchain events:', error);
    return NextResponse.json({ error: 'Failed to fetch blockchain events' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// POST: receive live trade data
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const filePath = path.join(process.cwd(), 'data', 'latest_data.json');
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));
    return NextResponse.json({ status: 'ok' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

// ✅ ADD THIS: GET route to serve the latest data
export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'latest_data.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(fileData);
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }
}

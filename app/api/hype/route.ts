import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'twap-data.json');

    const exists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (!exists) {
      console.warn('⚠️ twap-data.json does not exist yet.');
      return NextResponse.json({ markPrice: 0, twap: 0 });
    }

    const rawData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(rawData);
    return NextResponse.json(data);
  } catch (err) {
    console.error('❌ Failed to read TWAP data:', err);
    return NextResponse.json({ error: 'Failed to fetch HYPE data' }, { status: 500 });
  }
}

import { connectToDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToDB();

  const existingUser = await (User as any).findOne({ email });
  if (existingUser) {
    return new Response('User already exists', { status: 409 });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const hashedPassword = await bcrypt.hash(password, 10);

  await (User as any).create({ email, password: hashedPassword, verificationCode });

  return new Response(JSON.stringify({ message: 'User registered', verificationCode }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}

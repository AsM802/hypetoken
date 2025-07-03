import { connectToDB } from '../../../../lib/mongodb';
import User from '../../../../lib/models/User'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectToDB();

  const user = await (User as any).findOne({ email });
  if (!user) return new Response('User not found', { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return new Response('Invalid credentials', { status: 401 });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  return new Response(JSON.stringify({ token }), { status: 200 });
}

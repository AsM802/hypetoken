import { connectToDB } from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectToDB();

    const userExists = await (User as any).findOne({ email });
    if (userExists) {
      return new Response('User already exists', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await (User as any).create({ email, password: hashedPassword });

    return new Response('User registered successfully ✅', { status: 201 });
  } catch (err) {
    console.error('❌ Registration Error:', err);
    return new Response('Something went wrong', { status: 500 });
  }
}

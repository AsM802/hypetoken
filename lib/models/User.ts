import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verificationCode: { type: String }, // ← add this line
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);
export default User;

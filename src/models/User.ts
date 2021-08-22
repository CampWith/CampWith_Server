import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  nickname: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
  },
  favorites: {
    type: Array,
  },
});

export default mongoose.model<IUser & mongoose.Document>('User', UserSchema);

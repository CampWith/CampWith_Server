import mongoose from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  salt?: string;
  nickname: string;
  access_token?: string;
  favorites: [mongoose.Types.ObjectId];
}

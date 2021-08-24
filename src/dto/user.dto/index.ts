import mongoose from 'mongoose';

export interface SignUpDto {
  email: string;
  password: string;
  nickname: string;
}

export interface getFavoritesDto {
  uid: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface FavoritesDto {
  uid: string;
  campsiteId: mongoose.Types.ObjectId;
}

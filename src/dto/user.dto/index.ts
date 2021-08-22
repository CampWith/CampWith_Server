import mongoose from 'mongoose';

export interface SignUpDto {
  email: string;
  password: string;
  nickname: string;
}

export interface SignUpResultDto {
  token: string;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignInResultDto {
  token: string;
}

export interface FavoritesDto {
  uid: string;
  campsiteId: mongoose.Types.ObjectId;
}

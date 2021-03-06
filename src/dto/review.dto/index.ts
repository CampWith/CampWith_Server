import mongoose from 'mongoose';

export interface ReviewAddDto {
  uid: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
  campsiteId: mongoose.Types.ObjectId;
}

export interface ReviewModifyDto {
  uid: mongoose.Types.ObjectId;
  review: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
}

export interface ReviewDeleteDto {
  uid: mongoose.Types.ObjectId;
  review: mongoose.Types.ObjectId;
  facltId: mongoose.Types.ObjectId;
}

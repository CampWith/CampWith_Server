import mongoose from 'mongoose';

export interface IReview {
  campsiteId: mongoose.Types.ObjectId;
  comment: string;
  uid: mongoose.Types.ObjectId;
  rating: number;
  time: Date;
  user: string;
}

import mongoose from 'mongoose';
import { IReview } from '../interfaces/IReview';

const ReviewSchema = new mongoose.Schema({
  campsiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campsite',
  },
  comment: {
    type: String,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
  },
  rating: {
    type: Number,
  },
  time: {
    type: Date,
  },
  user: {
    type: String,
  },
});

export default mongoose.model<IReview & mongoose.Document>('Review', ReviewSchema);

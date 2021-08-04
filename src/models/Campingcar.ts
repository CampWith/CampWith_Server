import mongoose from 'mongoose';
import { ICampingcar } from '../interfaces/ICampingcar';

const CampingcarSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  url: {
    type: String,
  },
  price: {
    type: String,
  },
});

export default mongoose.model<ICampingcar & mongoose.Document>('Campingcar', CampingcarSchema);

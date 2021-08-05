import mongoose from 'mongoose';
import { ICampingtool } from '../interfaces/ICampingtool';

const CampingtoolSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  info: {
    type: String,
  },
});

export default mongoose.model<ICampingtool & mongoose.Document>('Campingtool', CampingtoolSchema);

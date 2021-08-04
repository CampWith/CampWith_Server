import mongoose from 'mongoose';
import { ICampsite } from '../interfaces/ICampsite';

const CampsiteSchema = new mongoose.Schema({
  addr1: {
    type: String,
  },
  doNm: {
    type: String,
    required: true,
  },
  facltNm: {
    type: String,
    require: true,
  },
  homepage: {
    type: String,
  },
  lineIntro: {
    type: String,
  },
  mapX: {
    type: Number,
    required: true,
  },
  mapY: {
    type: Number,
    required: true,
  },
  sigunguNm: {
    type: String,
  },
  firstImageUrl: {
    type: String,
  },
  tel: {
    type: String,
  },
  category: {
    type: Number,
  },
  meanRate: {
    type: Number,
  },
});

export default mongoose.model<ICampsite & mongoose.Document>('Campsite', CampsiteSchema);

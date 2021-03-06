import mongoose from 'mongoose';

export interface CampsiteListDto {
  doNm: string;
}

export interface CampsiteTypeDto {
  category: number;
}

export interface CampsiteDetailDto {
  id: mongoose.Types.ObjectId;
  uid: string;
}

export interface RecommendCampsiteDto {
  uid: mongoose.Types.ObjectId;
}

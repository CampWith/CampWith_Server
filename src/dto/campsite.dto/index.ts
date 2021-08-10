import mongoose from 'mongoose';

export interface CampsiteListDto {
  doNm: string;
}

export interface CampsiteTypeDto {
  category: number;
}

export interface CampsiteDetailDto {
  id: mongoose.Types.ObjectId;
}

export interface CampsiteListResultDto {
  addr1: string;
  addr2: string;
  lineIntro: string;
  homepage: string;
  doNm: string;
  facltNm: string;
  mapX: string;
  mapY: string;
  sigunguNm: string;
  tel: string;
  firstImageUrl: string;
  category: number;
  mean_rate: number;
}

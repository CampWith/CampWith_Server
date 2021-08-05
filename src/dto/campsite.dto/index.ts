import mongoose from 'mongoose';

export interface CampsiteListDto {
  doNm: String;
}

export interface CampsiteTypeDto {
  category: Number;
}

export interface CampsiteDetailDto {
  id: mongoose.Types.ObjectId;
}

export interface CampsiteListResultDto {
  addr1: String;
  addr2: String;
  lineIntro: String;
  homepage: String;
  doNm: String;
  facltNm: String;
  mapX: String;
  mapY: String;
  sigunguNm: String;
  tel: String;
  firstImageUrl: String;
  category: Number;
  mean_rate: Number;
}

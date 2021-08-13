import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CampsiteListDto, CampsiteTypeDto, CampsiteDetailDto, RecommendCampsiteDto } from '../dto/campsite.dto';
import { CampsiteService } from '../services/CampsiteService';

export const campingSiteList = async (req: Request, res: Response) => {
  const campsitelist_dto: CampsiteListDto = {
    doNm: req.params.doNm,
  };

  const result = await CampsiteService.campsiteList(campsitelist_dto);

  res.status(200).json({ result: result });
};

export const campingSiteType = async (req: Request, res: Response) => {
  const campsitetype_dto: CampsiteTypeDto = {
    category: req.params.type,
  };

  const result = await CampsiteService.campingSiteType(campsitetype_dto);

  res.status(200).json({
    success: true,
    status: 200,
    result: result,
  });
};

export const campingSiteDetail = async (req: Request, res: Response) => {
  const campsitedetail_dto: CampsiteDetailDto = {
    id: req.params.id,
  };

  const result = await CampsiteService.campingSiteDetail(campsitedetail_dto);

  res.status(200).json({
    success: true,
    status: 200,
    result: result,
  });
};

export const recommendCampsites = async (req: Request, res: Response) => {
  const recommendCampsites_dto: RecommendCampsiteDto = {
    uid: req.body.user.id,
  };

  const result = await CampsiteService.recommendCampsite(recommendCampsites_dto);

  res.status(200).json({
    success: true,
    status: 200,
    result: result,
  });
};

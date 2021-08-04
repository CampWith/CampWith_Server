import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CampsiteListDto } from '../dto/campsite.dto';
import { CampsiteService } from '../services/CampsiteService';

export const campingSiteList = async (req: Request, res: Response) => {
  const campsitelist_dto: CampsiteListDto = {
    doNm: req.params.doNm,
  };

  const result = await CampsiteService.campsiteList(campsitelist_dto);

  res.status(200).json({ result: result });
};

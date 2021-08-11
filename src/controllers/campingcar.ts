import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CampingcarDto } from '../dto/campingcar.dto';
import { CampingcarService } from '../services';

export const campingcarList = async (req: Request, res: Response) => {
  const result = await CampingcarService.campingcarList();

  res.status(200).json({
    success: true,
    status: 200,
    result: result,
  });
};

export const campingcarDetail = async (req: Request, res: Response) => {
  const campingcar_dto: CampingcarDto = {
    _id: req.params.id,
  };

  const result = await CampingcarService.campingcarDetail(campingcar_dto);

  res.status(200).json({
    success: true,
    status: 200,
    result: result,
  });
};

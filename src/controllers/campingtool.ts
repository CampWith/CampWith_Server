import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CampingtoolService } from '../services';

export const campingtoolList = async (req: Request, res: Response) => {
  const result = await CampingtoolService.campingtoolList();

  res.status(200).json({ result: result });
};

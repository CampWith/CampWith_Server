import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CampingcarDto } from '../dto/campingcar.dto';
import { ReviewAddDto } from '../dto/review.dto';
import { CampingcarService, ReviewService } from '../services';

export const addReview = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const reviewAdd_dto: ReviewAddDto = {
    uid: req.body.user.id,
    comment: req.body.comment,
    rating: req.body.rating,
    campsiteId: req.body.campsiteId,
  };

  const result = await ReviewService.addReview(reviewAdd_dto);

  res.status(200).json({ result: result });
};

export const modifyReview = async (req: Request, res: Response) => {
  const campingcar_dto: CampingcarDto = {
    _id: req.params.id,
  };

  const result = await CampingcarService.campingcarDetail(campingcar_dto);

  res.status(200).json({ result: result });
};

export const deleteReview = async (req: Request, res: Response) => {
  const campingcar_dto: CampingcarDto = {
    _id: req.params.id,
  };

  const result = await CampingcarService.campingcarDetail(campingcar_dto);

  res.status(200).json({ result: result });
};

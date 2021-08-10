import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ReviewAddDto, ReviewModifyDto, ReviewDeleteDto } from '../dto/review.dto';
import { ReviewService } from '../services';

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
  const reviewModify_dto: ReviewModifyDto = {
    uid: req.body.user.id,
    review: req.body.review,
    comment: req.body.comment,
    rating: req.body.rating,
  };

  const result = await ReviewService.modifyReview(reviewModify_dto);

  res.status(200).json({ result: result });
};

export const deleteReview = async (req: Request, res: Response) => {
  const reviewDelete_dto: ReviewDeleteDto = {
    uid: req.body.user.id,
    review: req.body.review,
    facltId: req.body.facltId,
  };

  const result = await ReviewService.deleteReview(reviewDelete_dto);

  res.status(200).json({ result: result });
};

import { ReviewAddDto } from '../dto/review.dto';
import Campsite from '../models/Campsite';
import Review from '../models/Review';
import User from '../models/User';

export class ReviewService {
  static async addReview(reviewAdd_dto: ReviewAddDto) {
    try {
      const today = new Date();
      const user = await User.findById(reviewAdd_dto.uid);
      const nickname = user['nickname'];
      const campsite = await Campsite.findById(reviewAdd_dto.campsiteId);
      if (!campsite) {
        return { message: 'campsite not found' };
      }

      const meanRate = campsite['meanRate'];

      const reviews = await Review.find({ campsiteId: reviewAdd_dto.campsiteId });

      const len = reviews.length;
      const son: number = +meanRate * len + +reviewAdd_dto.rating;

      campsite['meanRate'] = son / (len + 1);
      const newReview = new Review({
        uid: reviewAdd_dto.uid,
        comment: reviewAdd_dto.comment,
        rating: reviewAdd_dto.rating,
        campsiteId: reviewAdd_dto.campsiteId,
        time: new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)),
        user: nickname,
      });

      await campsite.save();
      await newReview.save();

      const result = '리뷰가 등록되었습니다.';
      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }
}

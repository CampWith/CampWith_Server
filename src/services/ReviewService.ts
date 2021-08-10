import { ReviewAddDto, ReviewModifyDto, ReviewDeleteDto } from '../dto/review.dto';
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

      const result = await {
        reviewId: newReview._id,
      };
      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async modifyReview(reviewModify_dto: ReviewModifyDto) {
    try {
      const { uid, review, comment, rating } = reviewModify_dto;

      const userReview = await Review.findById(review);
      if (!userReview) {
        return { message: 'Review not found' };
      }

      if (userReview.uid.toString() !== uid.toString()) {
        return { message: 'User not Authorized' };
      }

      const beforeRating = userReview['rating'];
      const today = new Date();

      userReview['comment'] = comment;
      userReview['rating'] = rating;
      userReview['time'] = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
      const campsite = await Campsite.findById(userReview['campsiteId']);
      const reviews = await Review.find({ campsiteId: userReview['campsiteId'] });
      const meanRate = campsite['meanRate'];
      const len = reviews.length;
      const son: number = +meanRate * len + +rating - beforeRating;

      campsite['meanRate'] = son / len;

      await userReview.save();
      await campsite.save();

      const result = '리뷰가 수정되었습니다.';
      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async deleteReview(reviewDelete_dto: ReviewDeleteDto) {
    try {
      const userReview = await Review.findById(reviewDelete_dto.review);
      if (!userReview) {
        return {
          message: 'Review not found',
        };
      }
      if (userReview.uid.toString() !== reviewDelete_dto.uid.toString()) {
        return { message: 'User not Authorized' };
      }

      const rating = userReview['rating'];
      const campsite = await Campsite.findById(userReview['campsiteId']);

      const reviews = await Review.find({ campsiteId: userReview['campsiteId'] });
      const meanRate = campsite['meanRate'];
      const len = reviews.length;
      const son: number = +meanRate * len - +rating;

      campsite['meanRate'] = son / len;

      await userReview.remove();
      await campsite.save();

      const result = '리뷰가 삭제되었습니다.';
      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }
}

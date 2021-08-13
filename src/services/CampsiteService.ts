import { CampsiteListDto, CampsiteTypeDto, CampsiteDetailDto, RecommendCampsiteDto } from '../dto/campsite.dto';
import Campsite from '../models/Campsite';
import Review from '../models/Review';

export class CampsiteService {
  static async campsiteList(campsitelist_dto: CampsiteListDto) {
    try {
      const list = await Campsite.find({ doNm: campsitelist_dto.doNm });

      const result = await {
        campsiteList: list,
      };

      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async campingSiteType(campsitetype_dto: CampsiteTypeDto) {
    try {
      const list = await Campsite.find({ category: campsitetype_dto.category });

      const result = await {
        campsiteList: list,
      };

      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async campingSiteDetail(campsitedetail_dto: CampsiteDetailDto) {
    try {
      const list = await Campsite.findById(campsitedetail_dto.id);

      const reviews = await Review.find({ campsiteId: campsitedetail_dto.id });
      const result = await {
        campsite: list,
        reviews: reviews,
      };

      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async recommendCampsite(recommendCampsites_dto: RecommendCampsiteDto) {
    try {
      const reviews = await Review.find({ uid: recommendCampsites_dto.uid }).populate('campsiteId', {
        category: 1,
        _id: 0,
      });
      console.log(reviews);
      const len = reviews.length;

      let result;
      if (len < 5) {
        result = await Campsite.find().sort({ meanRate: -1 }).limit(5);
      } else {
      }
      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }
}

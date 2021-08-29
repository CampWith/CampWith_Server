import { CampsiteListDto, CampsiteTypeDto, CampsiteDetailDto, RecommendCampsiteDto } from '../dto/campsite.dto';
import { ICampsite } from '../interfaces/ICampsite';
import Campsite from '../models/Campsite';
import Review from '../models/Review';
import User from '../models/User';

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
      const user = await User.findById(campsitedetail_dto.uid);
      let is_favorite = false;

      if (user.favorites.filter((favorite) => favorite.toString() === campsitedetail_dto.id.toString()).length > 0) {
        is_favorite = true;
      }

      const reviews = await Review.find({ campsiteId: campsitedetail_dto.id });
      const result = await {
        is_favorite: is_favorite,
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
      const datas = await Review.find({}, { _id: 0, comment: 0, rating: 0, user: 0, time: 0 }).populate('campsiteId', {
        _id: 1,
        meanRate: 1,
        like: 1,
      });

      const campsite = await {
        data: datas.map((v) => {
          return {
            campsiteId: v.campsiteId['_id'],
            uid: v.uid,
            meanRate: v.campsiteId['meanRate'],
            like: v.campsiteId['like'],
          };
        }),
      };

      const { CF, evaluation } = require('nodeml');

      let train = [],
        test = [];

      for (let i = 0; i < campsite['data'].length; i++) {
        if (Math.random() > 0.8) test.push(campsite['data'][i]);
        else train.push(campsite['data'][i]);
      }

      const cf = new CF();
      cf.train(train, 'uid', 'campsiteId', 'meanRate');

      let gt = cf.gt(test, 'uid', 'campsiteId', 'meanRate');
      let gtr = {};
      let users = [];

      const uid = recommendCampsites_dto.uid.toString();
      users.push(uid);
      let result = cf.recommendToUsers(users, 5);

      let recommend = [];
      for (let i = 0; i < 5; i++) {
        const data = await Campsite.findById(result[uid][i]['itemId']);
        recommend.push(data);
      }

      return recommend;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }
}

import { CampsiteListDto, CampsiteTypeDto, CampsiteDetailDto } from '../dto/campsite.dto';
import Campsite from '../models/Campsite';

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

      const result = await {
        campsite: list,
      };

      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }
}

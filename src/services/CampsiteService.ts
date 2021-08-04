import { CampsiteListDto } from '../dto/campsite.dto';
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
}

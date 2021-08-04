import { CampingcarDto } from '../dto/campingcar.dto';
import Campingcar from '../models/Campingcar';

export class CampingcarService {
  static async campingcarList() {
    try {
      const list = await Campingcar.find();

      const result = await {
        campingCarList: list,
      };

      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async campingcarDetail(campingcar_dto: CampingcarDto) {
    try {
      const result = await Campingcar.findOne({ _id: campingcar_dto._id });

      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }
}

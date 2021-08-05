import Campingtool from '../models/Campingtool';

export class CampingtoolService {
  static async campingtoolList() {
    try {
      const list = await Campingtool.find();

      const result = await {
        campingtoolList: list,
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

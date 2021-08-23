import { FavoritesDto, SignInDto, SignUpDto } from '../dto/user.dto';
import User from '../models/User';
import Campsite from '../models/Campsite';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
export class UserService {
  static async signUp(user_dto: SignUpDto) {
    try {
      let user = await User.findOne({ email: user_dto.email });

      if (user) {
        return {
          message: 'User already exists',
        };
      }

      user = new User(user_dto);

      const salt = await bcrypt.genSalt(10);
      user.salt = salt;
      user.password = await bcrypt.hash(user_dto.password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = await jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
      return token;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async signIn(user_dto: SignInDto) {
    try {
      let user = await User.findOne({ email: user_dto.email });

      if (!user) {
        return {
          message: 'Invalid Credentials',
        };
      }

      const is_match = await bcrypt.compare(user_dto.password, user.password);
      if (!is_match) {
        return {
          message: 'Invalid Credentials',
        };
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = await jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
      const result = await {
        token: token,
        uid: user['_id'],
        message: 'login successed',
      };
      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async addFavorites(favorites_dto: FavoritesDto) {
    try {
      const user = await User.findById(favorites_dto.uid);
      user['favorites'].push(favorites_dto.campsiteId);

      await user.save();

      let favorites = [];
      for (const campsite of user['favorites']) {
        const data = await Campsite.findById(campsite);
        favorites.push(data);
      }
      const result = await {
        nickname: user['nickname'],
        favorites: favorites,
      };

      return result;
    } catch (err) {
      console.error(err.message);
      return {
        message: 'Server Error',
      };
    }
  }

  static async deleteFavorites(favorites_dto: FavoritesDto) {
    try {
      const user = await User.findById(favorites_dto.uid);
      user['favorites'].splice(user['favorites'].indexOf(favorites_dto.campsiteId), 1);
      await user.save();

      let favorites = [];
      for (const campsite of user['favorites']) {
        const data = await Campsite.findById(campsite);
        favorites.push(data);
      }
      const result = await {
        nickname: user['nickname'],
        favorites: favorites,
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

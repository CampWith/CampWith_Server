import { Router } from 'express';
import { check } from 'express-validator';
import { campingSiteList } from '../controllers';
import auth from '../middleware/auth';
const router = Router();

router.get('/list/:doNm', campingSiteList);

module.exports = router;

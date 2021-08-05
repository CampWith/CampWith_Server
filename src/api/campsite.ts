import { Router } from 'express';
import { check } from 'express-validator';
import { campingSiteList, campingSiteType, campingSiteDetail } from '../controllers';
import auth from '../middleware/auth';
const router = Router();

router.get('/list/:doNm', campingSiteList);

router.get('/category/:type', campingSiteType);

router.get('/detail/:id', campingSiteDetail);

module.exports = router;

import { Router } from 'express';
import { campingSiteList, campingSiteType, campingSiteDetail, recommendCampsites } from '../controllers';
import auth from '../middleware/auth';
const router = Router();

router.get('/list/:doNm', campingSiteList);

router.get('/category/:type', campingSiteType);

router.get('/detail/:id', campingSiteDetail);

router.get('/recommend', auth, recommendCampsites);

module.exports = router;

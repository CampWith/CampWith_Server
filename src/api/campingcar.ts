import { Router } from 'express';
import { campingcarDetail, campingcarList } from '../controllers/campingcar';
const router = Router();

router.get('/list/', campingcarList);

router.get('/detail/:id', campingcarDetail);

module.exports = router;

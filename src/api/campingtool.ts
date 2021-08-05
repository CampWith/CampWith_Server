import { Router } from 'express';
import { check } from 'express-validator';
import { campingtoolList } from '../controllers/campingtool';
const router = Router();

router.get('/list/', campingtoolList);

module.exports = router;

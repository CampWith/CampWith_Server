import { Router } from 'express';
import auth from '../middleware/auth';
import { addReview, modifyReview } from '../controllers/review';
const router = Router();

router.post('/add', auth, addReview);

router.put('/modify', auth, modifyReview);

//router.delete('/delete', auth, deleteReview);

module.exports = router;

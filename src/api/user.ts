import express from 'express';
import { check } from 'express-validator';
import { addFavorites, signIn, signUp, deleteFavorites } from '../controllers';
import auth from '../middleware/auth';
const router = express.Router();

const check_signup = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('nickname', 'Name is required').not().isEmpty(),
  check('gender', 'Gender is required').not().isEmpty(),
  check('birth', 'Birth is required').not().isEmpty(),
  check('notice_agreement', 'Notice agreement is required').not().isEmpty(),
];

const check_signin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

router.post('/signUp', check_signup, signUp);

router.post('/signIn', check_signin, signIn);

router.post('/favorites', auth, addFavorites);

router.put('/favorites', auth, deleteFavorites);

module.exports = router;

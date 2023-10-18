import express from 'express';
import { body } from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateAuth = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage('내용을 입력해주세요(세글자 이상)'),
  validate,
];

/* router
  .route('/:id') //
  .get(tweetController.getTweet)
  .put(validateTweet, tweetController.updateTweet)
  .delete(tweetController.deleteTweet); */

router.post('/signup', (req, res, next) => {
  const { id, password, username, name, email, url } = req.body;
});

export default router;

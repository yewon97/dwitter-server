import express from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

// validation
// sanitization
// Contract Testing: Client-Server
// Proto-base 검사

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage('내용을 입력해주세요(세글자 이상)'),
  validate,
];

// 로그인한 사람만 할 수 있다는 isAuth를 추가한다.
router
  .route('/') //
  .get(isAuth, tweetController.getTweets)
  .post(isAuth, validateTweet, tweetController.createTweet);

router
  .route('/:id') //
  .get(isAuth, tweetController.getTweet)
  .put(isAuth, validateTweet, tweetController.updateTweet)
  .delete(isAuth, tweetController.deleteTweet);

export default router;

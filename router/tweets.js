import express from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
import { validate } from '../middleware/validator.js';

// validation
// sanitization
// Contract Testing: Client-Server

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .notEmpty()
    .withMessage('내용을 입력해주세요(세글자 이상)'),
  validate,
];

router
  .route('/') //
  .get(tweetController.getTweets)
  .post(validateTweet, tweetController.createTweet);

router
  .route('/:id') //
  .get(tweetController.getTweet)
  .put(validateTweet, tweetController.updateTweet)
  .delete(tweetController.deleteTweet);

export default router;

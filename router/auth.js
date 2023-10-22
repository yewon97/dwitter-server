import express from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('사용자 이름은 최소 5자 이상 작성해주세요.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('비밀번호는 최소 5자 이상 작성해주세요.'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('이름을 작성해주세요.'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('유요하지 않은 이메일 입니다.'),
  body('url')
    .isURL()
    .withMessage('유효하지 않은 URL입니다.')
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);
router.get('/me', isAuth, authController.me);

export default router;

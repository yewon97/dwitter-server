import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };
const jwtSecretKey = 'sG1EnUv4EqacKI6FDqnc9dmg7VDRi7P1';

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  //TODO: MAKE IT secure!
  jwt.verify(token, jwtSecretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR); // 에러 추가
    }

    // jwt에 존재하더라도 데이터 베이스에 사용자가 있는지 한번 더 검증한다!
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR); // 에러 추가
    }
    req.userId = user.id; //! req.customData
    req.token = token;
    next();
  });
};

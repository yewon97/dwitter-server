import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';

// TODO: MAKE IT secure!
const jwtSecretKey = 'sG1EnUv4EqacKI6FDqnc9dmg7VDRi7P1';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

async function sign(password) {
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  return hashed;
}

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `사용 중인 ${username} 입니다.` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  console.log('hashed: ', hashed);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: `해당 계정을 찾지 못했습니다.` });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: `해당 계정을 찾지 못했습니다.` });
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: `사용자를 찾을 수 없습니다.` });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

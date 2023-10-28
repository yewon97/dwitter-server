import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host);
  // Mongoose 6버전 이상 사용 시 2번 째 인자 전달 안해도됨
}

// TODO(YEWON): Delete blow
let db;
export function getUsers() {
  return db.collection('users');
}
export function getTweets() {
  return db.collection('tweets');
}

export function useVirtualId(schema) {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });

  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
}

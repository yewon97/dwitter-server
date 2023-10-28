import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

// _id -> id
useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {
  return User.findOne({ username });
  // mongoose는 커서단위로 리턴해줄 필요가 없음
}

export async function findById(id) {
  return User.findById(id);
  // _id string변환 안해도되고, 커서 단위 사용 안해도되고
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

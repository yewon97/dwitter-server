import * as userRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    userId: '1',
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId,
      );
      return { ...tweet, username, name, url };
    }),
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) => {
    return tweets.filter((t) => t.username === username);
  });
}

export async function getById(id) {
  const found = tweets.find((t) => t.id === id);
  if (!found) {
    return null;
  }

  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((t) => t.id !== id);
}

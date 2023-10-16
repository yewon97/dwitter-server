let tweets = [
  {
    id: '1',
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'John',
    name: 'John',
    url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4760&q=80',
  },
  {
    id: '2',
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'Key',
    name: 'Key',
    url: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80',
  },
  {
    id: '3',
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'Amy',
    name: 'Amy',
    url: 'https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4740&q=80',
  },
  {
    id: '4',
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'bob',
    name: 'Bob',
    url: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3315&q=80',
  },
  {
    id: '5',
    text: '안뇽!',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
  },
];

export function getAll() {
  return tweets;
}

export function getAllByUsername(username) {
  return tweets.filter((t) => t.username === username);
}

export function getById(id) {
  return tweets.find((t) => t.id === id);
}

export function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    username,
    name,
    createdAt: new Date(),
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export function update(id, text) {
  const tweet = tweets.find((t) => t.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export function remove(id) {
  tweets = tweets.filter((t) => t.id !== id);
}

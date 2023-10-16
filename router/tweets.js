import express from 'express';
import 'express-async-errors';

const router = express.Router();

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

router
  .route('/')
  .get((req, res) => {
    const username = req.query.username;
    const data = username
      ? tweets.filter((t) => t.username === username)
      : tweets;
    console.log('data: ', data);

    res.status(200).json(data);
  })
  .post((req, res) => {
    const { username, name, text } = req.body;
    console.log('req.body: ', req.body);
    const tweet = {
      id: Date.now().toString(),
      text,
      username,
      name,
      createdAt: new Date(),
    };
    tweets = [tweet, ...tweets];
    // console.log('tweets: ', tweets);
    res.status(201).json(tweet);
  });

router
  .route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    const tweet = tweets.find((t) => t.id === id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  })
  .put((req, res) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((t) => t.id === id);
    if (tweet) {
      tweet.text = text;
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  })
  .delete((req, res) => {
    const id = req.params.id;
    tweets = tweets.filter((t) => t.id !== id);
    res.sendStatus(204);
  });

export default router;

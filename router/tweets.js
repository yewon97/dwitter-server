import express from 'express';
import 'express-async-errors';

const router = express.Router();

const tweets = [
  {
    id: 1,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'John',
    name: 'John Doe',
    url: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4760&q=80',
  },
  {
    id: 2,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'Key',
    name: 'Key Park',
    url: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80',
  },
  {
    id: 3,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'Amy',
    name: 'Hello Amy',
    url: 'https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4740&q=80',
  },
  {
    id: 4,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: Date.now().toString(),
    username: 'bob Dan',
    name: 'bob',
    url: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3315&q=80',
  },
];

router
  .route('/')
  .get((req, res) => {
    const username = req.query.username;
    const data = username ? tweets.filter((t) => t.name === username) : tweets;

    res.status(200).json(data);
  })
  .post((req, res) => {
    res.sendStatus(201).send('create');
  });

router
  .route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    const tweet = tweets.find((t) => t.id == id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  })
  .put((req, res) => {
    res.sendStatus(200).send('update!');
  })
  .delete((req, res) => {
    res.sendStatus(204).send('delete!');
  });

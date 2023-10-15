import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE',
  );
  next();
}); */

const dataes = [
  {
    id: 1,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: '2023-10-10',
    username: 'John',
    name: 'John Doe',
    url: '',
  },
  {
    id: 2,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: '2023-10-10',
    username: 'Key',
    name: 'Key Park',
    url: '',
  },
  {
    id: 3,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: '2023-10-10',
    username: 'Amy',
    name: 'Hello Amy',
    url: '',
  },
  {
    id: 4,
    text: '안녕하세요 오늘 트위터 시작했어요',
    createdAt: '2023-10-10',
    username: 'bob Dan',
    name: 'bob',
    url: '',
  },
];

app
  .route('/tweets')
  .get((req, res) => {
    if (!!req.query.username) {
      const found = dataes.find((data) => {
        if (data.name === req.query.username) return data;
      });
      return res.send(JSON.stringify(found));
    }
    return res.send(JSON.stringify(dataes));
  })
  .post((req, res) => {
    res.sendStatus(201).send('create');
  });

app
  .route('/tweets/:id')
  .get((req, res) => {
    if (!!req.params.id) {
      const found = dataes.find((data) => {
        if (data.id == req.params.id) return data;
      });
      return res.send(JSON.stringify(found));
    } else {
      res.sendStatus(404);
    }
  })
  .put((req, res) => {
    res.sendStatus(200).send('update!');
  })
  .delete((req, res) => {
    res.sendStatus(204).send('delete!');
  });

app.listen(8080);

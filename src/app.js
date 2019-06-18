import express from 'express';
import bodyParser from 'body-parser';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import logger from 'morgan';
import cors from 'cors';
import log from 'fancy-log';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import getAbsoluteFSPath from './docs/absolute-path';
import indexRoutes from './routes/index';
import userRoutes from './routes/users';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cors());
app.use(logger('dev'));

app.use('/api/v1/docs', express.static(getAbsoluteFSPath()));

const PORT = process.env.PORT || 8080;

app.use('/api/v1/', [indexRoutes, userRoutes]);

app.get('/api/v1/docs/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './docs/index.html'));
});

app.get('/api/v1/docs/swagger.json', (req, res) => {
  fs.readFile(path.resolve(__dirname, './docs/swagger.json'), (err, json) => {
    const file = JSON.parse(json);
    res.json(file);
  });
});

app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Not Found',
}));

app.listen(PORT, () => log.info(`Listening at ${PORT}`));

export default app;

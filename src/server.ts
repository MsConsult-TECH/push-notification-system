import express from 'express';
import path from 'path';
import { config } from './config';
import { router } from './routes';
import { configureWebPush } from './webpush';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

configureWebPush();

app.use('/api', router);

app.listen(config.port, () => {
  console.log(`FCM notifications demo running on http://localhost:${config.port}`);
});

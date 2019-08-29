

import express from 'express';
import cors from 'cors';
import { debug } from 'console';
import apiDoc from './routes/openApi';
import routes from './routes/routes';
import config from './confing/config';
import { ApiError } from './utils/responses';

const bodyParser = require('body-parser');

const app = express();
const port = config.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(apiDoc);
app.use(routes);
app.get('/', (req, res) => res.send('your here'));
app.all('*', (req, res) => {
  res.status(404).json(new ApiError(404, 'Not found'));
});

const server = app.listen(port, () => {
  debug(`listening on port ${port}`);
});
export default server;

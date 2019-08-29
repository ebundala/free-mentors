

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { debug } from 'console';
import apiDoc from './routes/openApi';
// import routes from './routes/routes';
import config from './confing/config';

const app = express();
const port = config.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(apiDoc);
// app.use(routes);
app.get('/', (req, res) => res.send('your here'));
app.all('*', (req, res) => { res.status = 404; res.json(JSON.stringify({ message: 'not found' })); });
const server = app.listen(port, () => {
  debug(`listening on port ${port}`);
});
export default server;

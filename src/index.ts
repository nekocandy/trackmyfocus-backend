import { config } from 'dotenv';

import * as express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import * as cors from 'cors';

import ApiRoute from './routes/ApiRoute';
import DataRoute from './routes/DataRoute';
import { sign } from './utils/jwt';

config();

const app = express();

app.use(cors());
app.use(express.json());

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention, no-underscore-dangle
const _checkAuth = auth({
  audience: process.env.AUDIENCE!!,
  issuer: process.env.ISSUER_BASE_URL!!,
});

app.use('/api', ApiRoute);
app.use('/data', DataRoute);

app.post('/createToken', async (req, res) => {
  const { email } = req.body;

  const token = sign({ email }, { });

  return res.json(token);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${process.env.PORT}`);
});

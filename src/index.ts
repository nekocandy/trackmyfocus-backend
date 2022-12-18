import { config } from 'dotenv';

import * as express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

import ApiRoute from './routes/ApiRoute';

config();

const app = express();

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention, no-underscore-dangle
const _checkAuth = auth({
  audience: process.env.AUDIENCE!!,
  issuer: process.env.ISSUER_BASE_URL!!,
});

app.use('/api', ApiRoute);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running on port 3000');
});

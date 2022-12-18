import { config } from 'dotenv';

import * as express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

import ApiRoute from './routes/ApiRoute';
import DataRoute from './routes/DataRoute';

config();

const app = express();

// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention, no-underscore-dangle
const _checkAuth = auth({
  audience: process.env.AUDIENCE!!,
  issuer: process.env.ISSUER_BASE_URL!!,
});

app.use('/api', ApiRoute);
app.use('/data', DataRoute);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${process.env.PORT}`);
});

/* eslint-disable import/prefer-default-export */
import * as jsonwebtoken from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!!;

// eslint-disable-next-line max-len
export const sign = (payload: any, options: jsonwebtoken.SignOptions) => jsonwebtoken.sign(payload, secret, options);

// eslint-disable-next-line max-len
export const verify = (token: string, options: jsonwebtoken.VerifyOptions) => jsonwebtoken.verify(token, secret, options);

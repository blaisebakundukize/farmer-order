import { Request } from 'express';
import jwt from 'jsonwebtoken';
import environment from '../config/environment';
import { IDecodeTokenType } from '../interfaces';

const secretKey = environment.secretKey;
export const signJwt = (
  object: object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, secretKey, {
    ...(options && options),
  });
};

export const verifyJWT = (token: string): IDecodeTokenType => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
};

// Extract token from header or body
export const getTokenFromRequest = (req: Request, inBody = false) => {
  let {
    headers: { authorization },
  } = req;

  if (inBody) {
    authorization = req.body.token;
  }

  if (inBody && authorization) {
    return authorization;
  }

  if (authorization && authorization.split(' ')[0].toLowerCase() === 'bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};

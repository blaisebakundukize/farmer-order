import jwt from 'jsonwebtoken';
import config from 'config';

const secretKey = config.get<string>('secretKey');
export const signJwt = (
  object: object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, secretKey, {
    ...(options && options),
  });
};

export const verifyJWT = (token: string) => {
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

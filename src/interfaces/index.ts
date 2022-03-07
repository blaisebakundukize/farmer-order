import { Response } from 'express';

export interface IJSONResponse {
  res: Response;
  status?: number;
  data?: any;
}

export interface IDecodeTokenType {
  valid: boolean;
  expired: boolean;
  decoded: { userId: string; exp: number; iat: number } | any;
}

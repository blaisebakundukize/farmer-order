import { Response } from 'express';

export interface IJSONResponse {
  res: Response;
  status?: number;
  data?: any;
}

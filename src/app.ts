import express, {Request, Response, NextFunction} from 'express';
import config from 'config';
import { v1Router } from './api/router';
import { HttpError, handleHttpError } from './helpers/error.helpers';

const app = express();

app.use(express.json());

const apiPrefix = config.get<string>('apiPrefix')

app.use(`${apiPrefix}`, v1Router);

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) handleHttpError(err, res);
  return next();
});

export { app };

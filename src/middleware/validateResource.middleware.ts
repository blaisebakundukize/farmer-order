import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import logger from '../utils/logger';

const validate =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (e: any) {
      logger.error(e);
      return res.status(400).send(e);
    }
  };

export default validate;

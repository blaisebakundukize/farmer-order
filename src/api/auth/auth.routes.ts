import { Router } from 'express';
import authController from './auth.controller';
import validate from '../../middleware/validateResource.middleware';
import { createUserSchema } from '../../schema/user.schema';

const authRouter = Router();

authRouter.post(
  '/register',
  validate(createUserSchema),
  authController.createUserHandler
);

authRouter.post('/login', authController.login);

export { authRouter };

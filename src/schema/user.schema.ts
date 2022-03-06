import Joi from 'joi';
import { USER_ROLES } from '../constants';

export const createUserSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().min(10).max(15),
  password: Joi.string().alphanum().min(6).required(), // as simple as possible
  roles: Joi.array().valid(USER_ROLES),
});

export type CreateUserInput = {
  body: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    roles?: USER_ROLES[];
  };
};

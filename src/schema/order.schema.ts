import { Types } from 'mongoose';
import Joi from 'joi';
import { IOrder } from '../models/interfaces/order.interfaces';

export const createOrderSchema = Joi.object<IOrder>({
  store: Joi.string().required(),
  landSize: Joi.number().required(),
});

export type CreateOrderInput = {
  body: {
    store: Types.ObjectId;
    landSize: number;
  };
};

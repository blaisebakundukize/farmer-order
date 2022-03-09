import { Types } from 'mongoose';
import Joi from 'joi';
import { IOrder } from '../models/interfaces/order.interfaces';
import { ORDER_STATUS } from '../constants';

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

export const updateOrderSchema = Joi.object<IOrder>({
  status: Joi.string().valid(...Object.values(ORDER_STATUS)),
});

export type UpdateOrderInput = {
  body: {
    status: ORDER_STATUS;
  };
};

import Joi from 'joi';
import { STORE_TYPES } from '../constants';
import { IStore } from '../models/interfaces/store.interfaces';

export const createStoreSchema = Joi.object<IStore>({
  storeName: Joi.string().min(2).required(),
  quantity: Joi.number(),
  type: Joi.string()
    .valid(...Object.values(STORE_TYPES))
    .required(),
});

export type CreateStoreInput = {
  body: {
    storeName: string;
    quantity: number;
    type: STORE_TYPES;
  };
};

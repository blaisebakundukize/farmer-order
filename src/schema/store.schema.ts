import Joi from 'joi';
import { IStore } from '../models/interfaces/store.interfaces';

export const createStoreSchema = Joi.object<IStore>({
  storeName: Joi.string().min(2).required(),
  quantity: Joi.number(),
});

export type CreateStoreInput = {
  body: {
    storeName: string;
    quantity: number;
  };
};

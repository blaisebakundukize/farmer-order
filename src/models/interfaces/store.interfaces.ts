import { Document } from 'mongoose';
import { STORE_TYPES } from '../../constants';

export interface IStore extends Document {
  storeName: string;
  quantity: number;
  type: STORE_TYPES;
}

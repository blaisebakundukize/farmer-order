import { Document, Types } from 'mongoose';
import { ORDER_STATUS } from '../../constants';

export interface IOrder extends Document {
  store: Types.ObjectId;
  landSize: number;
  fertilizerQuantity?: number;
  seedQuantity?: number;
  farmer?: Types.ObjectId;
  status?: ORDER_STATUS;
}

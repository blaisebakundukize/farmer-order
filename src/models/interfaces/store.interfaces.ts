import { Document } from 'mongoose';

export interface IStore extends Document {
  storeName: string;
  quantity: number;
}

import mongoose from 'mongoose';
import { STORE_TYPES } from '../constants';
import { IStore } from './interfaces/store.interfaces';

const storeSchema = new mongoose.Schema<IStore>(
  {
    storeName: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(STORE_TYPES),
    },
  },
  {
    timestamps: true,
  }
);

const StoreModel = mongoose.model('Store', storeSchema);

export default StoreModel;

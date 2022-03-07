import mongoose from 'mongoose';
import { IStore } from './interfaces/store.interfaces';

const storeSchema = new mongoose.Schema<IStore>(
  {
    storeName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const StoreModel = mongoose.model('Store', storeSchema);

export default StoreModel;

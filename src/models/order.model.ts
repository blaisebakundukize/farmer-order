import mongoose, { Schema } from 'mongoose';
import { ORDER_STATUS } from '../constants';
import { IOrder } from './interfaces/order.interfaces';

const orderSchema = new Schema<IOrder>(
  {
    store: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Store',
    },
    landSize: {
      type: Number,
      required: true,
    },
    fertilizerQuantity: Number,
    seedQuantity: Number,
    farmer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      default: ORDER_STATUS.PENDING,
      enum: Object.values(ORDER_STATUS),
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', async function (next) {
  const order = this as IOrder;

  order.seedQuantity = order.landSize;
  order.fertilizerQuantity = order.landSize * 3;
  return next();
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;

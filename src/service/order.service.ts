import { DocumentDefinition, FilterQuery } from 'mongoose';
import OrderModel from '../models/order.model';
import { IOrder } from '../models/interfaces/order.interfaces';

/**
 * Order service class handles queries
 */
export class OrderService {
  /**
   * @param {object} input order body
   * @returns {Promise<Response>}
   */
  createOrder = async (
    input: DocumentDefinition<Omit<IOrder, 'createdAt' | 'updatedAt'>>
  ) => {
    try {
      const order = await OrderModel.create(input);
      return order.toJSON();
    } catch (e: any) {
      throw new Error(e);
    }
  };

  findOrderById = async (query: FilterQuery<IOrder>) => {
    return OrderModel.findById(query).exec();
  };

  findOrders = async ({
    limit,
    offset,
    condition,
  }: {
    limit: number;
    offset: number;
    condition: object;
  }) => {
    return OrderModel.find(condition).limit(limit).skip(offset);
  };
}

const orderService = new OrderService();

export default orderService;

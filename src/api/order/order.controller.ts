import { Request, Response, NextFunction } from 'express';
import { CreateOrderInput } from '../../schema/order.schema';
import { HttpError } from '../../helpers/error.helpers';
import successResponse from '../../helpers/jsonResponse.helpers';
import { STATUS_CODES } from '../../constants';
import { getPagination } from '../../helpers';
import StoreModel from '../../models/store.model';
import orderService from '../../service/order.service';

/**
 * Order controller class handles orders
 */
export class OrderController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  createOrderHandler = async (
    req: Request<any, any, CreateOrderInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.currentUser?._id;
      const { store, landSize } = req.body;
      const order = await orderService.createOrder({
        store,
        landSize,
        farmer: userId,
      });
      return successResponse({
        res,
        status: STATUS_CODES.CREATED,
        data: order,
      });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not create order due to internal server error',
          e
        )
      );
    }
  };
}

const orderController = new OrderController();

export default orderController;

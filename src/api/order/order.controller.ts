import { Request, Response, NextFunction } from 'express';
import { CreateOrderInput } from '../../schema/order.schema';
import { HttpError } from '../../helpers/error.helpers';
import successResponse from '../../helpers/jsonResponse.helpers';
import { STATUS_CODES, STORE_TYPES, USER_ROLES } from '../../constants';
import { getPagination } from '../../helpers';
import orderService from '../../service/order.service';
import OrderModel from '../../models/order.model';
import storeService from '../../service/store.service';
import { Types } from 'mongoose';

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
      const { store: storeId, landSize } = req.body;
      const store = await storeService.findStoreById({ _id: storeId });

      if (!store) {
        return next(new HttpError(STATUS_CODES.NOT_FOUND, 'store not found'));
      }

      const newStore: {
        store: Types.ObjectId;
        landSize: number;
        farmer: Types.ObjectId;
        fertilizerQuantity?: number;
        seedQuantity?: number;
      } = {
        store: storeId,
        landSize,
        farmer: userId,
      };

      if (store.type === STORE_TYPES.FERTILIZER) {
        newStore.fertilizerQuantity = landSize * 3;
      }

      if (store.type === STORE_TYPES.SEED) {
        newStore.seedQuantity = landSize;
      }

      const order = await orderService.createOrder(newStore);
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

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  getOrderByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const orderId = req.params.id;
      const order = await orderService.findOrderById({
        _id: orderId,
      });
      if (!order) {
        return next(
          new HttpError(
            STATUS_CODES.NOT_FOUND,
            "Order not found or could be someone's order"
          )
        );
      }

      return successResponse({ res, status: STATUS_CODES.OK, data: order });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not find order due to internal server error',
          e
        )
      );
    }
  };

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  checkOrderByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const orderId = req.params.id;
      const order = await orderService.findOrderById({
        _id: orderId,
      });
      if (!order) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ message: 'Order not found' });
      }
      return next();
    } catch (e: any) {
      return res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: 'Could not find Order due to an error' });
    }
  };

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  getOrdersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { status } = req.query;
      const user = req.currentUser;

      let condition: any = {};

      if (status) {
        condition = { $and: [{ status }] };
      }

      // if not admin, farmers get their own orders
      if (!user?.roles?.includes(USER_ROLES.ADMIN)) {
        condition = {
          ...condition,
          $and: [...condition.$and, { farmer: user?._id.toString() }],
        };
      }

      const { limit, page, totalDocs, offset } = await getPagination(
        req,
        OrderModel,
        condition
      );
      const orders = await orderService.findOrders({
        limit,
        offset,
        condition,
      });

      return successResponse({
        res,
        status: STATUS_CODES.OK,
        data: { data: orders, totalDocs, currentPage: page, limit },
      });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not get orders due to internal server error',
          e
        )
      );
    }
  };

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  deleteOrderHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const order = await orderService.deleteOrder({ _id: id });

      return successResponse({
        res,
        status: STATUS_CODES.NO_CONTENT,
        data: order,
      });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not delete order due to internal server error',
          e
        )
      );
    }
  };
}

const orderController = new OrderController();

export default orderController;

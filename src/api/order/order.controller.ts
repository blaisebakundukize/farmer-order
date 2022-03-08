import { Request, Response, NextFunction } from 'express';
import { CreateOrderInput } from '../../schema/order.schema';
import { HttpError } from '../../helpers/error.helpers';
import successResponse from '../../helpers/jsonResponse.helpers';
import { STATUS_CODES, USER_ROLES } from '../../constants';
import { getPagination } from '../../helpers';
import orderService from '../../service/order.service';
import OrderModel from '../../models/order.model';

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
      const user = req.currentUser;
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

      // Only admin or owner of the order allowed to get it
      if (
        order.farmer?.toString() !== user?._id.toString() &&
        !user?.roles?.includes(USER_ROLES.ADMIN)
      ) {
        return next(
          new HttpError(
            STATUS_CODES.FORBIDDEN,
            "You are not allowed to get someone's order"
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
}

const orderController = new OrderController();

export default orderController;

import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES, USER_ROLES } from '../constants';
import orderService from '../service/order.service';

// check if order belong to user
export const isOrderBelongToUser =
  (isAdmin = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.currentUser;
      const orderId = req.params.id;

      const order = await orderService.findOrderById({ _id: orderId });

      if (user?.roles?.includes(USER_ROLES.ADMIN) && isAdmin) {
        return next();
      }

      if (order?.farmer?.toString() !== user?._id.toString()) {
        return res.status(STATUS_CODES.FORBIDDEN).json({
          message: 'Order does not belong to you!',
        });
      }
      return next();
    } catch (error) {
      return res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: 'Could not perform the operation due to an error' });
    }
  };

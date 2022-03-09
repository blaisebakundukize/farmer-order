import { Router } from 'express';
import orderController from './order.controller';
import validate from '../../middleware/validateResource.middleware';
import { createOrderSchema } from '../../schema/order.schema';
import { requireRoles } from '../../middleware/auth.middleware';
import { USER_ROLES } from '../../constants';
import { isOrderBelongToUser } from '../../middleware/order.middleware';

const orderRouter = Router();

orderRouter.post(
  '/',
  requireRoles([USER_ROLES.FARMER]),
  validate(createOrderSchema),
  orderController.createOrderHandler
);

orderRouter.get('/', orderController.getOrdersHandler);

orderRouter.get(
  '/:id',
  isOrderBelongToUser(true),
  orderController.getOrderByIdHandler
);

orderRouter.delete(
  '/:id',
  isOrderBelongToUser(false),
  orderController.deleteOrderHandler
);

orderRouter.param('id', orderController.checkOrderByIdHandler);

export { orderRouter };

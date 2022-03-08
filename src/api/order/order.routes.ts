import { Router } from 'express';
import orderController from './order.controller';
import validate from '../../middleware/validateResource.middleware';
import { createOrderSchema } from '../../schema/order.schema';
import { requireRoles } from '../../middleware/auth.middleware';
import { USER_ROLES } from '../../constants';

const orderRouter = Router();

orderRouter.post(
  '/',
  requireRoles([USER_ROLES.FARMER]),
  validate(createOrderSchema),
  orderController.createOrderHandler
);

orderRouter.get('/', orderController.getOrdersHandler);

orderRouter.get('/:id', orderController.getOrderByIdHandler);

export { orderRouter };

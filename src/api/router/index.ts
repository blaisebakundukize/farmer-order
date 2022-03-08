import { Router } from 'express';

import { authRouter } from '../auth/auth.routes';
import { storeRouter } from '../store/store.routes';
import { orderRouter } from '../order/order.routes';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/store', storeRouter);
v1Router.use('/order', orderRouter);

export { v1Router };

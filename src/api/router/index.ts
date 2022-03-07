import { Router } from 'express';

import { authRouter } from '../auth/auth.routes';
import { storeRouter } from '../store/store.routes';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/store', storeRouter);

export { v1Router };

import { Router } from 'express';
import storeController from './store.controller';
import validate from '../../middleware/validateResource.middleware';
import { createStoreSchema } from '../../schema/store.schema';
import { requireRoles } from '../../middleware/auth.middleware';
import { USER_ROLES } from '../../constants';

const storeRouter = Router();

storeRouter.post(
  '/',
  requireRoles([USER_ROLES.ADMIN]),
  validate(createStoreSchema),
  storeController.createStoreHandler
);

export { storeRouter };

import { Router } from 'express';
import storeController from './store.controller';
import validate from '../../middleware/validateResource.middleware';
import {
  createStoreSchema,
  updateStoreSchema,
} from '../../schema/store.schema';
import { requireRoles } from '../../middleware/auth.middleware';
import { USER_ROLES } from '../../constants';

const storeRouter = Router();

storeRouter.post(
  '/',
  requireRoles([USER_ROLES.ADMIN]),
  validate(createStoreSchema),
  storeController.createStoreHandler
);

storeRouter.get('/', storeController.getStoresHandler);

storeRouter.get('/:id', storeController.getStoreByIdHandler);

storeRouter.patch(
  '/:id',
  requireRoles([USER_ROLES.ADMIN]),
  validate(updateStoreSchema),
  storeController.updateStoreHandler
);

storeRouter.delete(
  '/:id',
  requireRoles([USER_ROLES.ADMIN]),
  storeController.deleteStoreHandler
);

storeRouter.param('id', storeController.checkStoreByIdHandler);

export { storeRouter };

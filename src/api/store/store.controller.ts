import { Request, Response, NextFunction } from 'express';
import { CreateStoreInput } from '../../schema/store.schema';
import storeService from '../../service/store.service';
import { HttpError } from '../../helpers/error.helpers';
import successResponse from '../../helpers/jsonResponse.helpers';
import { STATUS_CODES } from '../../constants';

/**
 * Auth controller class handles store
 */
export class StoreController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  createStoreHandler = async (
    req: Request<any, any, CreateStoreInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const store = await storeService.createStore(req.body);
      return successResponse({
        res,
        status: STATUS_CODES.CREATED,
        data: store,
      });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not create store due to internal server error',
          e
        )
      );
    }
  };
}

const storeController = new StoreController();

export default storeController;

import { Request, Response, NextFunction } from 'express';
import { CreateStoreInput } from '../../schema/store.schema';
import storeService from '../../service/store.service';
import { HttpError } from '../../helpers/error.helpers';
import successResponse from '../../helpers/jsonResponse.helpers';
import { STATUS_CODES } from '../../constants';
import { getPagination } from '../../helpers';
import StoreModel from '../../models/store.model';

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

  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  getStoreByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const storeId = req.params.id;
      const store = await storeService.findStoreById({
        _id: storeId,
      });
      if (!store) {
        return next(new HttpError(STATUS_CODES.NOT_FOUND, 'Store not found'));
      }
      return successResponse({ res, status: STATUS_CODES.OK, data: store });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not find store due to internal server error',
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
  getStoresHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const condition = {};

      const { limit, page, totalDocs, offset } = await getPagination(
        req,
        StoreModel,
        condition
      );
      const stores = await storeService.findStores({
        limit,
        offset,
        condition,
      });

      return successResponse({
        res,
        status: STATUS_CODES.OK,
        data: { data: stores, totalDocs, currentPage: page, limit },
      });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not get stores due to internal server error',
          e
        )
      );
    }
  };
}

const storeController = new StoreController();

export default storeController;

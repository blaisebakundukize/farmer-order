import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';
import { CreateUserInput } from '../../schema/user.schema';
import userService from '../../service/user.service';
import { handleHttpError, HttpError } from '../../helpers/error.helpers';
import successResponse from '../../helpers/jsonResponse.helpers';
import { STATUS_CODES } from '../../constants';

/**
 * Auth controller class handles authentication
 */
export class AuthController {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  createUserHandler = async (
    req: Request<any, any, CreateUserInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await userService.createUser(req.body);
      return successResponse({ res, status: STATUS_CODES.CREATED, data: user });
    } catch (e: any) {
      return next(
        new HttpError(
          STATUS_CODES.SERVER_ERROR,
          'Could not complete registration due to internal server error',
          e
        )
      );
    }
  };
}

const authController = new AuthController();

export default authController;

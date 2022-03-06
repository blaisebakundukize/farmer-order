import { Request, Response, NextFunction } from 'express';
import { CreateUserInput } from '../../schema/user.schema';
import userService from '../../service/user.service';
import { HttpError } from '../../helpers/error.helpers';
import successResponse from '../../helpers/jsonResponse.helpers';
import { STATUS_CODES } from '../../constants';
import { signJwt } from '../../helpers/auth.helpers';
import config from 'config';

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

  login = async (req: Request, res: Response, next: NextFunction) => {
    // validate user password
    const user = await userService.validatePassword(req.body);

    if (!user) {
      return next(
        new HttpError(STATUS_CODES.UNAUTHORIZED, 'Invalid email or password')
      );
    }

    // create access token
    const accessToken = signJwt(
      { userId: user._id, roles: user.roles },
      { expiresIn: config.get<string>('accessTokenTimeToLive') }
    );

    return successResponse({
      res,
      status: STATUS_CODES.CREATED,
      data: { user, token: accessToken },
    });
  };
}

const authController = new AuthController();

export default authController;

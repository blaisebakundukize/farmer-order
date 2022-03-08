import { Request, Response, NextFunction } from 'express';
import environment from '../config/environment';
import { getTokenFromRequest, verifyJWT } from '../helpers/auth.helpers';
import { STATUS_CODES, USER_ROLES } from '../constants';
import userService from '../service/user.service';

export const requireToken =
  (isTokenInBody = false) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const apiPrefix = environment.apiPrefix;
    const doNotRequireTokenUrls = new RegExp(`^((${apiPrefix}/auth.*))$`, 'i');

    if (doNotRequireTokenUrls.test(req.url)) {
      // if url is not required to have a token and the token is indeed not provided, just proceed
      // to next handler, unless if a token is provided even when it is not required
      return next();
    }

    try {
      const token = getTokenFromRequest(req, isTokenInBody);
      if (!token) {
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ error: 'Missing token' });
      }

      const data = verifyJWT(token);

      if (!data.valid)
        return res
          .status(STATUS_CODES.UNAUTHORIZED)
          .json({ error: 'Invalid token or expired' });

      const { decoded } = data;

      const user = await userService.findUser({ _id: decoded.userId });

      if (!user)
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ error: 'User not found' });

      req.currentUser = user;

      return next();
    } catch (error) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ error: 'Invalid token or expired' });
    }
  };

// check requires roles before proceed
export const requireRoles =
  (roles: USER_ROLES[], checkAll = true) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: 'You are unauthorized to perform this action' });
    }
    let authorized;
    if (checkAll) {
      for (const i in roles) {
        if (req.currentUser?.roles?.includes(roles[i])) {
          authorized = true;
        }
      }
    } else {
      authorized = roles.some(
        (role) => req.currentUser?.roles?.includes(role) as boolean
      );
    }

    // check if authorized or admin who have access to all endpoints
    if (authorized || req.currentUser?.roles?.includes(USER_ROLES.ADMIN)) {
      return next();
    }

    return res.status(STATUS_CODES.FORBIDDEN).json({
      message: "You don't have the permissions to do this operation",
    });
  };

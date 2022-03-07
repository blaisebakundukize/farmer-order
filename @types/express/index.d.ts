import { IUser } from '../../src/models/interfaces/user.interfaces';

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
  }
}

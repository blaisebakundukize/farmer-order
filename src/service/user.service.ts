import { DocumentDefinition } from 'mongoose';
import UserModal from '../models/user.model';
import { IUser } from '../models/interfaces/user.interfaces';
import { omit } from 'lodash';

/**
 * User service class handles queries
 */
export class UserService {
  /**
   * @param {object} - input
   * @returns {Promise<Response>}
   */
  createUser = async (
    input: DocumentDefinition<
      Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePassword'>
    >
  ) => {
    try {
      const user = await UserModal.create(input);
      return omit(user.toJSON(), 'password');
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

const userService = new UserService();

export default userService;

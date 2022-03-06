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

  /**
   * @param {object} - email and password of user
   * @returns {boolean}
   */
  validatePassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const user = await UserModal.findOne({ email });

    if (!user) {
      return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return false;
    }

    return omit(user.toJSON(), 'password');
  };
}

const userService = new UserService();

export default userService;

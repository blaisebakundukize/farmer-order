import { Document } from 'mongoose';
import { USER_ROLES } from '../../constants';

export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  roles?: USER_ROLES[];
  comparePassword(password: string): Promise<boolean>;
}

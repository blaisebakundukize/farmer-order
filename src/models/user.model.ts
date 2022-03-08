import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './interfaces/user.interfaces';
import { USER_ROLES } from '../constants';
import environment from '../config/environment';
import logger from '../utils/logger';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: USER_ROLES.FARMER,
      enum: Object.values(USER_ROLES),
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving it
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(environment.saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as IUser;

  return bcrypt.compare(password, user.password).catch((e) => {
    logger.info(e.message);
    return false;
  });
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

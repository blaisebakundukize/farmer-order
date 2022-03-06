import { STATUS_CODES } from '../constants';
import { IJSONResponse } from '../interfaces';

const successResponse = ({
  res,
  status = STATUS_CODES.OK,
  data,
}: IJSONResponse) => {
  res.status(status).json({
    ...data,
  });
};

export default successResponse;

/* eslint-disable @typescript-eslint/naming-convention */
export enum STATUS_CODES {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  SERVER_ERROR = 500,
}

export enum USER_ROLES {
  FARMER = 'farmer',
  ADMIN = 'admin',
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

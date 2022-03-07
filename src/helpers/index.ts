import { Request } from 'express';

export const getPagination = async (
  req: Request,
  model: any,
  condition = {}
) => {
  const limit = Number(req.query.limit) || 5;
  const page = Number(req.query.page) || 1;
  const offset = page > 0 ? (page - 1) * limit : 1;
  const totalDocs = await model.countDocuments(condition);
  return { limit, page, offset, totalDocs };
};

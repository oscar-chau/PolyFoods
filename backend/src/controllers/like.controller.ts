import { NextFunction, Request, Response } from "express";
import LikeModel from "../models/like.model";
import Like from "../types/like.type";

const likeModel = new LikeModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const like = await likeModel.create(req.body);
    res.json({
      status: "Success",
      data: like,
      message: "Like created successfully"
    });
  } catch (error) {
    next(error);
  }
};
export const getByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const like = await likeModel.getByUserID(req.params.id);
    res.json({
      status: "Success",
      data: like,
      message: "Like retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const like = await likeModel.deleteById({
      user_id: req.params.user_id,
      item_id: req.params.item_id
    } as unknown as Like);
    res.json({
      status: "Success",
      data: like,
      message: "Like deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

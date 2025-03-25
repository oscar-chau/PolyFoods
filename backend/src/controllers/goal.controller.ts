import { NextFunction, Request, Response } from "express";
import GoalModel from "../models/goal.model";

const goalModel = new GoalModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalModel.create(req.body);
    res.json({
      status: "Success",
      data: goal,
      message: "Goal created successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalModel.getByID(req.params.id);
    res.json({
      status: "Success",
      data: goal,
      message: "Goal retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalModel.update(
      req.body,
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: goal,
      message: "Goal updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await goalModel.deleteByID(req.params.id as unknown as string);
    res.json({
      status: "Success",
      data: id,
      message: "Goal deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getGoalByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const goal = await goalModel.getGoalByUserID(
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: goal,
      message: "Goal retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import MealModel from "../models/meal.model";
const mealModel = new MealModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meal = await mealModel.create(req.body);
    res.json({
      status: "Success",
      data: meal,
      message: "Meal created successfully"
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
    const meal = await mealModel.getByID(req.params.id);
    res.json({
      status: "Success",
      data: meal,
      message: "Meal retrieved successfully"
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
    const meal = await mealModel.update(req.body, req.params.id);
    res.json({
      status: "Success",
      data: meal,
      message: "Meal updated successfully"
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
    const meal = await mealModel.deleteByID(req.params.id);
    res.json({
      status: "Success",
      data: meal,
      message: "Meal deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

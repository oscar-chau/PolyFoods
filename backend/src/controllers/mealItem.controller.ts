import { NextFunction, Request, Response } from "express";
import MealItemModel from "../models/mealItem.model";

const mealItemModel = new MealItemModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const combo = await mealItemModel.create(req.body);
    res.json({
      status: "Success",
      data: combo,
      message: "Match created successfully"
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
    const combo = await mealItemModel.deleteByID(req.body);
    res.json({
      status: "Success",
      data: combo,
      message: "Match deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getItemsByMealID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const combos = await mealItemModel.getItemsByMealID(req.params.id);
    res.json({
      status: "Success",
      data: combos,
      message: "Matches retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const addFoodToDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const combos = await mealItemModel.addFoodToDate(
      req.body.day,
      req.body.item_id,
      req.body.user_id
    );
    res.json({
      status: "Success",
      data: combos,
      message: "Food added successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFoodfromDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const combos = await mealItemModel.deleteFoodfromDate(
      req.body.day,
      req.body.item_id,
      req.body.user_id
    );
    res.json({
      status: "Success",
      data: combos,
      message: "Food deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getFoodsFromDateAndUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const combos = await mealItemModel.getFoodsFromDateAndUser(
      req.params.day,
      req.params.user_id
    );
    res.json({
      status: "Success",
      data: combos,
      message: "Food retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

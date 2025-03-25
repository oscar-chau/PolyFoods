import { NextFunction, Request, Response } from "express";
import ItemModel from "../models/item.model";

const itemModel = new ItemModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await itemModel.create(req.body);
    res.json({
      status: "Success",
      data: item,
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
    const item = await itemModel.getByID(req.params.id);
    res.json({
      status: "Success",
      data: item,
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
    const item = await itemModel.update(
      req.body,
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: item,
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
    const id = await itemModel.deleteByID(req.params.id as unknown as string);
    res.json({
      status: "Success",
      data: id,
      message: "Goal deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getAllByLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await itemModel.getAllByLocation(
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: items,
      message: "Retrieved items from location successfully"
    });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";

const userModel = new UserModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: "Success",
      data: user,
      message: "User created successfully"
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
    const user = await userModel.getByID(req.params.id as unknown as string);
    res.json({
      status: "Success",
      data: user,
      message: "User retrieved successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.update(
      req.body,
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: user,
      message: "User updated successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const deleteByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = await userModel.deleteByID(req.params.id as unknown as string);
    res.json({
      status: "Success",
      data: id,
      message: "User deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.login(req.body);
    res.json({
      status: "Success",
      data: user,
      message: "User login successful"
    });
  } catch (err) {
    next(err);
  }
};

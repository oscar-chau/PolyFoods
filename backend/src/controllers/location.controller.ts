import { NextFunction, Request, Response } from "express";
import LocationModel from "../models/location.model";

const locationModel = new LocationModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loc = await locationModel.create(req.body);
    res.json({
      status: "Success",
      data: loc,
      message: "Location created successfully"
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
    const loc = await locationModel.getByID(req.params.id);
    res.json({
      status: "Success",
      data: loc,
      message: "Location retrieved successfully"
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
    const loc = await locationModel.update(
      req.body,
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: loc,
      message: "Location updated successfully"
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
    const id = await locationModel.deleteByID(
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: id,
      message: "Location deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getAllByVenue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locations = await locationModel.getAllByVenue(
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: locations,
      message: "Locations Retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const getByLocationName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const location = await locationModel.getByLocationName(
      req.params.name as unknown as string
    );
    res.json({
      status: "Success",
      data: location,
      message: "Location Retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import VenueModel from "../models/venue.model";

const venueModel = new VenueModel();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const venue = await venueModel.create(req.body);
    res.json({
      status: "Success",
      data: venue,
      message: "Venue created successfully"
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
    const venue = await venueModel.getByID(req.params.id as unknown as string);
    res.json({
      status: "Success",
      data: venue,
      message: "Venue retrieved successfully"
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
    const venue = await venueModel.update(
      req.body,
      req.params.id as unknown as string
    );
    res.json({
      status: "Success",
      data: venue,
      message: "Venue updated successfully"
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
    const id = await venueModel.deleteByID(req.params.id as unknown as string);
    res.json({
      status: "Success",
      data: id,
      message: "Venue deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const getVenueByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const venue = await venueModel.getVenueByName(req.params.name);
    res.json({
      status: "Success",
      data: venue,
      message: "Venue retrieved successfully"
    });
  } catch (error) {
    next(error);
  }
};

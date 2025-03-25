import { Router } from "express";
import userRoutes from "./apis/user.route";
import goalRoutes from "./apis/goal.route";
import venueRoutes from "./apis/venue.route";
import locationRoutes from "./apis/location.route";
import itemRoutes from "./apis/item.route";
import mealRoutes from "./apis/meal.route";
import mealItemRoutes from "./apis/mealItem.route";
import likeRoutes from "./apis/like.route";

const route = Router();

route.use("/users", userRoutes);
route.use("/goals", goalRoutes);
route.use("/venues", venueRoutes);
route.use("/locations", locationRoutes);
route.use("/items", itemRoutes);
route.use("/meals", mealRoutes);
route.use("/tracker", mealItemRoutes);
route.use("/likes", likeRoutes);

export default route;

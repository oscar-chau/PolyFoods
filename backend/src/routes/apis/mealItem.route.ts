import { Router } from "express";
import * as controllers from "../../controllers/mealItem.controller";

const routes = Router();

routes.route("/").post(controllers.create);
routes.route("/delete").delete(controllers.deleteByID);
routes.route("/:id").get(controllers.getItemsByMealID);
routes.route("/spec/add").post(controllers.addFoodToDate);
routes.route("/spec/deleteFromDate").delete(controllers.deleteFoodfromDate);
routes.route("/spec/DaU/:day/:user_id").get(controllers.getFoodsFromDateAndUser);

export default routes;

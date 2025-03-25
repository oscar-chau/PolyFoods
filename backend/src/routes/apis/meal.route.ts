import { Router } from "express";
import * as controllers from "../../controllers/meal.controller";

const routes = Router();

routes.route("/").post(controllers.create);
routes.route("/:id").get(controllers.getByID);
routes.route("/:id").patch(controllers.update);
routes.route("/:id").delete(controllers.deleteByID);

export default routes;

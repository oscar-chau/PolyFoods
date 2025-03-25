import { Router } from "express";
import * as controllers from "../../controllers/goal.controller";
const routes = Router();

routes.route("/").post(controllers.create);
routes.route("/:id").get(controllers.getByID);
routes.route("/:id").patch(controllers.update);
routes.route("/:id").delete(controllers.deleteByID);
routes.route("/util/getByUserID/:id").get(controllers.getGoalByUserID);

export default routes;

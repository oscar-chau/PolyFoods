import { Router } from "express";
import * as controllers from "../../controllers/item.controller";

const routes = Router();

routes.route("/").post(controllers.create);
routes.route("/:id").get(controllers.getByID);
routes.route("/:id").patch(controllers.update);
routes.route("/:id").delete(controllers.deleteByID);
routes.route("/util/getAll/:id").get(controllers.getAllByLocation);

export default routes;

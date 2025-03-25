import { Router } from "express";
import * as controllers from "../../controllers/like.controller";

const routes = Router();

routes.route("/").post(controllers.create);
routes.route("/:id").get(controllers.getByUserID);
routes.route("/:user_id/:item_id").delete(controllers.deleteById);

export default routes;
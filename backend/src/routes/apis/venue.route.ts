import { Router } from "express";
import * as controllers from "../../controllers/venue.controller";
const routes = Router();

routes.route("/").post(controllers.create);
routes.route("/:id").get(controllers.getByID);
routes.route("/:id").patch(controllers.update);
routes.route("/:id").delete(controllers.deleteByID);
routes.route("/util/getByName/:name").get(controllers.getVenueByName);

export default routes;

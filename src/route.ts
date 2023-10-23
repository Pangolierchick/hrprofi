import { Router } from "express";
import { body, check } from "express-validator";
import { Controller } from "./controller";

const rootRouter = Router();
const rootController = new Controller();

rootRouter.post(
  "/",
  body("url").isURL({ require_protocol: true }),
  body("userurl").optional().escape(),
  rootController.rootPost.bind(rootController)
);

rootRouter.get(
  "/:shorturl",
  check("shorturl").notEmpty().escape(),
  rootController.rootGet.bind(rootController)
);

export default rootRouter;

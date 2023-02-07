import express from "express";
import { authController } from "./controllers/authController";
import { categoriesController } from "./controllers/categoriesController";
import { listController } from "./controllers/listsController";
import { risksController } from "./controllers/risksController";
import { usersController } from "./controllers/userController";
import { ensureAuth } from "./middlewares/auth";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/areas", ensureAuth, listController.showAreas);
router.get("/entities", listController.showEntities);
router.get("/impacts", ensureAuth, listController.showImpacts);
router.get("/periods", ensureAuth, listController.showPeriods);
router.get("/probabilities", ensureAuth, listController.showProbabilities);
router.get("/typesorigin", ensureAuth, listController.showTypesOrigin);
router.get("/users", ensureAuth, listController.showUsers);

router.get("/risks", ensureAuth, risksController.index);
router.post("/risk", ensureAuth, risksController.register);
router.get("/risk/:id", ensureAuth, risksController.show);

router.get("/users/current", ensureAuth, usersController.show);
router.put("/users/current", ensureAuth, usersController.update);
router.put(
  "/users/current/password",
  ensureAuth,
  usersController.updatePassword
);

export { router };

import express from "express";
import { authController } from "./controllers/authController";
import { categoriesController } from "./controllers/categoriesController";
import { listController } from "./controllers/listsController";
import { risksController } from "./controllers/risksController";
import { treatmentsController } from "./controllers/treatmentsController";
import { usersController } from "./controllers/userController";
import { ensureAuth } from "./middlewares/auth";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories_pagination", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/areas", ensureAuth, listController.showAreas);
router.get("/categories", ensureAuth, listController.showCategories);
router.get("/entities", listController.showEntities);
router.get("/impacts", ensureAuth, listController.showImpacts);
router.get("/periods", ensureAuth, listController.showPeriods);
router.get("/probabilities", ensureAuth, listController.showProbabilities);
router.get("/types_origin", ensureAuth, listController.showTypesOrigin);
router.get("/users", ensureAuth, listController.showUsers);
router.get(
  "/control_evaluations",
  ensureAuth,
  listController.showControlEvaluations
);

router.get("/risks", ensureAuth, risksController.index);
router.get("/risks_all", ensureAuth, risksController.showRisks);
router.get("/risks/featured", ensureAuth, risksController.featured);
router.get("/risks/newest", ensureAuth, risksController.newest);
router.get("/risks/search", ensureAuth, risksController.searchRisks);
router.get("/risks/:id", ensureAuth, risksController.showId);
router.post("/risk", risksController.register);
router.put("/risks/:id", ensureAuth, risksController.update);
router.delete("/risks/:id", ensureAuth, risksController.delete);

router.get("/treatments", ensureAuth, treatmentsController.index);
router.get("/treatments/:id", ensureAuth, treatmentsController.show);
router.post("/treatment", treatmentsController.register);
router.get(
  "/status_treatments",
  ensureAuth,
  treatmentsController.showStatusTreatment
);
router.get(
  "/types_treatments",
  ensureAuth,
  treatmentsController.showTypesTreatment
);
router.get(
  "/status_treatments/:id",
  treatmentsController.showStatusTreatmentId
);
router.get("/types_treatments/:id", treatmentsController.showTypesTreatmentId);
router.put("/treatments/:id", ensureAuth, treatmentsController.update);
router.delete("/treatments/:id", ensureAuth, risksController.deleteTreatment);

router.get("/users/current", ensureAuth, usersController.show);
router.get("/users/current/:id", ensureAuth, usersController.showCurrentId);
router.get("/users/:id", ensureAuth, usersController.showId);
router.put("/users/current", ensureAuth, usersController.update);
router.put(
  "/users/current/password",
  ensureAuth,
  usersController.updatePassword
);

export { router };

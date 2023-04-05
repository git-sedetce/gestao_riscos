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

router.get("/categoriespagination", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/areas", ensureAuth, listController.showAreas);
router.get("/categories", ensureAuth, listController.showCategories);
router.get("/entities", listController.showEntities);
router.get("/impacts", ensureAuth, listController.showImpacts);
router.get("/periods", ensureAuth, listController.showPeriods);
router.get("/probabilities", ensureAuth, listController.showProbabilities);
router.get("/risksorigin", ensureAuth, listController.showRisksOrigin);
router.get("/typesorigin", ensureAuth, listController.showTypesOrigin);
router.get("/users", ensureAuth, listController.showUsers);

router.get("/risks", ensureAuth, risksController.index);
router.get("/risksall", ensureAuth, risksController.showRisks);
router.get("/risks/featured", ensureAuth, risksController.featured);
router.get("/risks/newest", ensureAuth, risksController.newest);
router.get("/risks/search", ensureAuth, risksController.searchRisks);
router.get("/risks/:id", ensureAuth, risksController.showId);
router.post("/risk", risksController.register);

router.get("/treatments", ensureAuth, treatmentsController.index);
router.get("/treatments/:id", ensureAuth, treatmentsController.show);
router.post("/treatment", treatmentsController.register);
router.get(
  "/statustreatments",
  ensureAuth,
  treatmentsController.showStatusTreatment
);
router.get(
  "/typestreatments",
  ensureAuth,
  treatmentsController.showTypesTreatment
);
router.get("/statustreatments/:id", treatmentsController.showStatusTreatmentId);
router.get("/typestreatments/:id", treatmentsController.showTypesTreatmentId);

router.get("/users/current", ensureAuth, usersController.show);
router.get("/users/:id", ensureAuth, usersController.showId);
router.put("/users/current", ensureAuth, usersController.update);
router.put(
  "/users/current/password",
  ensureAuth,
  usersController.updatePassword
);

export { router };

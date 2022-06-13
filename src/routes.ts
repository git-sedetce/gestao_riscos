import { Router } from "express";

import { CreateProfileController } from "./modules/profiles/useCases/createProfile/CreateProfileController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";
import { CreateTiposOrigemController } from "./modules/tiposOrigem/useCases/createTiposOrigem/CreateTiposOrigemController";
import { CreateAreaController } from "./modules/areas/useCases/createArea/CreateAreaController";
import { CreateOrigemRiscosController } from "./modules/origemRiscos/useCases/createOrigemRiscos/CreateOrigemRiscosController";
import { CreatePeriodController } from './modules/periods/useCases/createPeriod/CreatePeriodController';
import { CreateAvaliacaoControleController } from './modules/avaliacaoControles/useCases/createAvaliacaoControle/CreateAvaliacaoControleController';
import { CreateStatusController } from './modules/status/useCases/createStatus/createStatusController';
import { CreateImpactoController } from './modules/impactos/useCases/createImpacto/CreateImpactoController';
import { CreateCategoryController } from "./modules/categories/useCases/createCategory/CreateCategoryController";
import { CreateTiposTratamentoController } from './modules/tiposTratamento/useCases/createTiposTratamento/CreateTiposTratamentoController';

import { AuthenticateUserController } from "./modules/account/authenticateUser/AuthenticateUserController";
import { ensureAuthenticateUser } from "./middlewares/ensureAuthenticateUser";

import { UpdateUserController } from "./modules/users/useCases/updateUser/UpdateUserController";
import { CreateProbabilidadeController } from "./modules/probabilidades/useCases/createProbabilidade/CreateProbabilidadeController";
import { CreateRiscoController } from "./modules/riscos/useCases/createRisco/CreateRiscoController";

const routes = Router();

const createAreaController = new CreateAreaController();
const createTiposOrigemController = new CreateTiposOrigemController();
const createOrigemRiscosController = new CreateOrigemRiscosController();
const createPeriodController = new CreatePeriodController();
const createProbabilidadeController = new CreateProbabilidadeController();
const createImpactoController = new CreateImpactoController();
const createAvaliacaoControleController = new CreateAvaliacaoControleController();
const createCategoryController = new CreateCategoryController();
const createProfileController = new CreateProfileController();
const createTiposTratamentoController = new CreateTiposTratamentoController();
const createStatusController = new CreateStatusController();

const createUserController = new CreateUserController();

const authenticateUserController = new AuthenticateUserController();

const createRiscoController = new CreateRiscoController();

const updateUserController = new UpdateUserController();

routes.post("/areas", createAreaController.handle);
routes.post("/typesorigin", createTiposOrigemController.handle);
routes.post("/risksorigin", createOrigemRiscosController.handle);
routes.post("/periods", createPeriodController.handle);
routes.post("/probabilities", createProbabilidadeController.handle);
routes.post("/impacts", createImpactoController.handle);
routes.post("/ratingcontrols", createAvaliacaoControleController.handle);
routes.post("/categories", createCategoryController.handle);
routes.post("/typestreatment", createTiposTratamentoController.handle);
routes.post("/status", createStatusController.handle);

routes.post("/profiles", createProfileController.handle);

routes.post("/users", createUserController.handle);
routes.post("/users/authenticate", authenticateUserController.handle);

routes.post("/risks", ensureAuthenticateUser, createRiscoController.handle);

routes.put("/users/:id", updateUserController.handle);

export { routes };

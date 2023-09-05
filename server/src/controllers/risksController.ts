import { Request, Response } from "express";
import { Risk, Treatment } from "../models";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { riskService } from "../services/riskService";

export const risksController = {
  // GET /risks
  index: async (req: Request, res: Response) => {
    const [page, perPage] = getPaginationParams(req.query);

    try {
      const paginatedCategories = await riskService.findAllRisksPaginated(
        page,
        perPage
      );

      return res.json(paginatedCategories);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /risksall
  showRisks: async (req: Request, res: Response) => {
    try {
      const risks = await Risk.findAll({
        attributes: [
          "id",
          "areaId",
          "userId",
          "types_originId",
          "risks_originId",
          "name",
          "periodId",
          "event",
          "cause",
          "consequence",
          "category_id",
          "probabilityId",
          "impactId",
          "inherent",
          "identification",
          "control_evaluationId",
          "residual_risk",
        ],
        order: [["name", "ASC"]],
      });

      return res.json(risks);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /risks/featured
  featured: async (req: Request, res: Response) => {
    try {
      const featuredRisks = await riskService.getRandomFeaturedRisks();
      return res.json(featuredRisks);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /risks/newest
  newest: async (req: Request, res: Response) => {
    try {
      const newestRisks = await riskService.getNewestRisks();
      return res.json(newestRisks);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /risks/search?name=
  searchRisks: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      if (typeof name !== "string")
        throw new Error("name param must be of type string");
      const risks = await riskService.findByNameAll(name, page, perPage);
      return res.json(risks);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // POST /risk
  register: async (req: Request, res: Response) => {
    const {
      areaId,
      userId,
      types_originId,
      risks_originId,
      name,
      periodId,
      event,
      cause,
      consequence,
      category_id,
      probabilityId,
      impactId,
      inherent,
      identification,
      control_evaluationId,
      residual_risk,
    } = req.body;

    try {
      const riskAlreadyExists = await riskService.findByName(name);

      if (riskAlreadyExists) {
        throw new Error("O Indicador de risco já está cadastrado.");
      }

      const risk = await riskService.create({
        areaId,
        userId,
        types_originId,
        risks_originId,
        name,
        periodId,
        event,
        cause,
        consequence,
        category_id,
        probabilityId,
        impactId,
        inherent,
        identification,
        control_evaluationId,
        residual_risk,
      });

      return res.status(201).json(risk);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /risks/:id
  showId: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const risk = await riskService.findByIdWithTreatments(id);
      return res.json(risk);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  update: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {
      areaId,
      userId,
      types_originId,
      risks_originId,
      name,
      periodId,
      event,
      cause,
      consequence,
      category_id,
      probabilityId,
      impactId,
      identification,
      control_evaluationId,
    } = req.body;

    try {
      const risk = await riskService.findById(id);
      if (!risk) {
        return res.status(404).json({ message: "Risk not found" });
      }

      const updatedRisk = await riskService.update(id, {
        areaId,
        userId,
        types_originId,
        risks_originId,
        name,
        periodId,
        event,
        cause,
        consequence,
        category_id,
        probabilityId,
        impactId,
        identification,
        control_evaluationId,
      });

      return res.status(200).json(updatedRisk);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  delete: async (req: Request, res: Response) => {
    const riskId = parseInt(req.params.id);

    try {
      const risk = await Risk.findByPk(riskId);
      if (!risk) {
        return res.status(404).json({ message: "Risk not found" });
      }

      await risk.destroy();

      return res.json({ message: "Risk deleted successfully" });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  deleteTreatment: async (req: Request, res: Response) => {
    const treatmentId = parseInt(req.params.id);

    try {
      const treatment = await Treatment.findByPk(treatmentId);
      if (!treatment) {
        return res.status(404).json({ message: "Treatment not found" });
      }

      await treatment.destroy();

      return res.json({ message: "Treatment deleted successfully" });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

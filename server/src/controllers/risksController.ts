import { Request, Response } from "express";
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

  // GET /risks/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const category = await riskService.findByIdWithTreatments(id);
      return res.json(category);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

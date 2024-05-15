import { Request, Response } from "express";
import { contextService } from "../services/contextService";

export const contextsController = {
  // GET /contexts
  index: async (req: Request, res: Response) => {
    try {
      const contexts = await contextService.show();
      return res.status(200).json(contexts);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
      }
    }
  },
  // GET /contexts/:id
  showId: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const context = await contextService.findByIdWithCriticalities(id);
      return res.json(context);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // POST /context
  register: async (req: Request, res: Response) => {
    const {
      name,
      areaId,
      critical_process,
      priority,
      userId,
      critical_identification,
    } = req.body;

    try {
      const contextAlreadyExists = await contextService.findByName(name);

      if (contextAlreadyExists) {
        throw new Error("Já existe um contexto com este nome.");
      }

      const context = await contextService.create({
        name,
        areaId,
        critical_process,
        priority,
        userId,
        critical_identification,
      });

      return res.status(201).json(context);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

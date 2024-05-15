import { Request, Response } from "express";
import { criticalityService } from "../services/criticalityService";

export const criticalitiesController = {
  register: async (req: Request, res: Response) => {
    const {
      contextId,
      name,
      impactId,
      existence,
      deficiency,
      threat,
      opportunity,
    } = req.body;

    try {
      // const treatmentAlreadyExists = await treatmentService.findByName(name);

      // if (treatmentAlreadyExists) {
      //   throw new Error("O Tratamento de risco já está cadastrado.");
      // }

      const criticality = await criticalityService.create({
        contextId,
        name,
        impactId,
        existence,
        deficiency,
        threat,
        opportunity,
      });

      return res.status(201).json(criticality);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

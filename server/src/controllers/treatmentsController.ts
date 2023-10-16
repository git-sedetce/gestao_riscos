import { Treatment } from "./../models";
import { TypesTreatment } from "./../models/TypesTreatment";
import { StatusTreatment } from "./../models/StatusTreatment";
import { Request, Response } from "express";
import { treatmentService } from "../services/treatmentService";

export const treatmentsController = {
  // GET /treatments
  index: async (req: Request, res: Response) => {
    try {
      const treatments = await Treatment.findAll({
        attributes: [
          "id",
          "riskId",
          "types_treatmentId",
          "name",
          "userId",
          "start_date",
          "end_date",
          "status_treatmentId",
          "notes",
        ],
        order: [["name", "ASC"]],
      });

      return res.json(treatments);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  // GET /treatments/:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const treatment = await treatmentService.findById(id);
      return res.json(treatment);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  // POST /treatment
  register: async (req: Request, res: Response) => {
    const {
      riskId,
      types_treatmentId,
      name,
      userId,
      start_date,
      end_date,
      status_treatmentId,
      notes,
    } = req.body;

    try {
      // const treatmentAlreadyExists = await treatmentService.findByName(name);

      // if (treatmentAlreadyExists) {
      //   throw new Error("O Tratamento de risco já está cadastrado.");
      // }

      const treatment = await treatmentService.create({
        riskId,
        types_treatmentId,
        name,
        userId,
        start_date,
        end_date,
        status_treatmentId,
        notes,
      });

      return res.status(201).json(treatment);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showStatusTreatment: async (req: Request, res: Response) => {
    try {
      const status_treatments = await StatusTreatment.findAll({
        attributes: ["id", "name", "position"],
        order: [["name", "ASC"]],
      });

      return res.json(status_treatments);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showTypesTreatment: async (req: Request, res: Response) => {
    try {
      const types_treatments = await TypesTreatment.findAll({
        attributes: ["id", "name", "position"],
        order: [["name", "ASC"]],
      });

      return res.json(types_treatments);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showStatusTreatmentId: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const statusTreatment = await treatmentService.findByStatusTreatmentId(
        id
      );
      return res.json(statusTreatment);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showTypesTreatmentId: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const typesTreatment = await treatmentService.findByTypesTreatmentId(id);
      return res.json(typesTreatment);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {
      riskId,
      types_treatmentId,
      name,
      userId,
      start_date,
      end_date,
      status_treatmentId,
      notes,
    } = req.body;

    try {
      const risk = await treatmentService.findByIdNumber(id);
      if (!risk) {
        return res.status(404).json({ message: "Treatment not found" });
      }

      const updatedRisk = await treatmentService.update(id, {
        riskId,
        types_treatmentId,
        name,
        userId,
        start_date,
        end_date,
        status_treatmentId,
        notes,
      });

      return res.status(200).json(updatedRisk);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

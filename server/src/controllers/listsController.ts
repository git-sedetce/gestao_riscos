import { Request, Response } from "express";
import {
  Area,
  Category,
  ControlEvaluation,
  Entity,
  Period,
  Impact,
  Profile,
  Probability,
  TypesOrigin,
  User,
} from "../models";

export const listController = {
  showAreas: async (req: Request, res: Response) => {
    try {
      const entities = await Area.findAll({
        attributes: ["id", "name", "description", "position"],
        order: [["name", "ASC"]],
      });

      return res.json(entities);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name", "position"],
        order: [["name", "ASC"]],
      });

      return res.json(categories);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showEntities: async (req: Request, res: Response) => {
    try {
      const areas = await Entity.findAll({
        attributes: ["id", "name", "position"],
        order: [["name", "ASC"]],
      });

      return res.json(areas);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showProfiles: async (req: Request, res: Response) => {
    try {
      const profiles = await Profile.findAll({
        attributes: ["id", "name", "isAdmin"],
        order: [["id", "ASC"]],
      });

      return res.json(profiles);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showImpacts: async (req: Request, res: Response) => {
    try {
      const impacts = await Impact.findAll({
        attributes: ["id", "name", "position"],
        order: [["id", "ASC"]],
      });

      return res.json(impacts);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showPeriods: async (req: Request, res: Response) => {
    try {
      const periods = await Period.findAll({
        attributes: ["id", "name", "year", "sequence"],
        order: [["id", "ASC"]],
      });

      return res.json(periods);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showProbabilities: async (req: Request, res: Response) => {
    try {
      const probabilities = await Probability.findAll({
        attributes: ["id", "name", "position"],
        order: [["id", "ASC"]],
      });

      return res.json(probabilities);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showControlEvaluations: async (req: Request, res: Response) => {
    try {
      const control_evaluations = await ControlEvaluation.findAll({
        attributes: ["id", "name", "position"],
        order: [["id", "ASC"]],
      });

      return res.json(control_evaluations);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showTypesOrigin: async (req: Request, res: Response) => {
    try {
      const types_origin = await TypesOrigin.findAll({
        attributes: ["id", "name", "position"],
        order: [["position", "ASC"]],
      });

      return res.json(types_origin);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  showUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "entityId", "profileId"],
        order: [["name", "ASC"]],
      });

      return res.json(users);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};

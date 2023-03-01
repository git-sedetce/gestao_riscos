import { StatusTreatment } from "./../models/StatusTreatment";
import { TypesTreatment } from "./../models/TypesTreatment";
import { Treatment } from "../models";
import { TreatmentCreationAttributes } from "src/models/Treatment";

export const treatmentService = {
  create: async (attributes: TreatmentCreationAttributes) => {
    const treatment = await Treatment.create(attributes);
    return treatment;
  },
  findByName: async (name: string) => {
    const treatment = await Treatment.findOne({
      where: { name },
    });
    return treatment;
  },
  findById: async (id: string) => {
    const treatment = await Treatment.findByPk(id, {
      attributes: [
        "id",
        "riskId",
        "types_treatmentId",
        "name",
        "user",
        "deadline",
        "status_treatmentId",
        "notes",
      ],
    });

    return treatment;
  },
  findByTypesTreatmentId: async (id: string) => {
    const typesTreatment = await TypesTreatment.findByPk(id, {
      attributes: ["id", "name", "position"],
    });

    return typesTreatment;
  },
  findByStatusTreatmentId: async (id: string) => {
    const statusTreatment = await StatusTreatment.findByPk(id, {
      attributes: ["id", "name", "position"],
    });

    return statusTreatment;
  },
};

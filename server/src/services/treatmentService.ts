import { StatusTreatment } from "./../models/StatusTreatment";
import { TypesTreatment } from "./../models/TypesTreatment";
import { Treatment } from "../models";
import { TreatmentCreationAttributes } from "src/models/Treatment";

export const treatmentService = {
  create: async (attributes: TreatmentCreationAttributes) => {
    const treatment = await Treatment.create(attributes);
    return treatment;
  },
  update: async (
    id: number,
    attributes: {
      riskId: number;
      types_treatmentId: number;
      name: string;
      user: string;
      start_date: Date;
      end_date: Date;
      status_treatmentId: number;
      notes: string;
    }
  ) => {
    const [affectedRows, updatedRisks] = await Treatment.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedRisks[0];
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
        "start_date",
        "end_date",
        "status_treatmentId",
        "notes",
      ],
    });

    return treatment;
  },
  findByIdNumber: async (id: number) => {
    const treatment = await Treatment.findByPk(id);
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

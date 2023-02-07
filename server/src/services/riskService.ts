import { Risk } from "../models";
import { RiskCreationAttributes } from "src/models/Risk";

export const riskService = {
  findByName: async (name: string) => {
    const risk = await Risk.findOne({
      where: { name },
    });
    return risk;
  },

  create: async (attributes: RiskCreationAttributes) => {
    const risk = await Risk.create(attributes);
    return risk;
  },

  findByIdWithTreatments: async (id: string) => {
    const riskWithTreatments = await Risk.findByPk(id, {
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
        "probability_id",
        "impact_id",
        "priority",
      ],
      include: {
        association: "treatments",
        attributes: [
          "id",
          "types_treatmentId",
          "name",
          "user",
          "deadline",
          "status_treatmentId",
          "notes",
        ],
        order: [["user", "ASC"]],
        separate: true,
      },
    });

    return riskWithTreatments;
  },

  findAllRisksPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { count, rows } = await Risk.findAndCountAll({
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
        "probability_id",
        "impact_id",
        "priority",
      ],
      order: [["name", "ASC"]],
      limit: perPage,
      offset,
    });

    return {
      risks: rows,
      page,
      perPage,
      total: count,
    };
  },
};

import { RiskCreationAttributes } from "src/models/Risk";
import { ControlEvaluation, Impact, Probability, Risk } from "../models";
import { Op } from "sequelize";

export const riskService = {
  create: async (attributes: RiskCreationAttributes) => {
    const { probabilityId, impactId, control_evaluationId } = attributes;

    const probability = await Probability.findByPk(probabilityId);
    const impact = await Impact.findByPk(impactId);
    const control_evaluation = await ControlEvaluation.findByPk(
      control_evaluationId
    );

    if (!probability || !impact || !control_evaluation) {
      throw new Error("Probability or impact not found");
    }

    const inherentValue = probability.algorithm * impact.algorithm;

    const residualValue =
      probability.algorithm * impact.algorithm * control_evaluation.algorithm;

    const result = await Risk.create({
      ...attributes,
      inherent: inherentValue,
      residual_risk: residualValue,
    });

    return result;
  },

  update: async (
    id: number,
    attributes: {
      areaId: number;
      userId: number;
      types_originId: number;
      risks_originId: number;
      name: string;
      periodId: number;
      event: string;
      cause: string;
      consequence: string;
      category_id: number;
      probabilityId: number;
      impactId: number;
      identification: string;
      control_evaluationId: number;
    }
  ) => {
    const [affectedRows, updatedRisks] = await Risk.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedRisks[0];
  },

  findById: async (id: number) => {
    const risk = await Risk.findByPk(id);
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
        "inherent",
        "identification",
        "control_evaluationId",
        "residual_risk",
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
        "inherent",
        "identification",
        "control_evaluationId",
        "residual_risk",
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

  getRandomFeaturedRisks: async () => {
    const featuredRisks = await Risk.findAll({
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
        "inherent",
        "identification",
        "control_evaluationId",
        "residual_risk",
      ],
    });

    const randomFeaturedRisks = featuredRisks.sort(() => 0.5 - Math.random());

    return randomFeaturedRisks.slice(0, 9);
  },

  getNewestRisks: async () => {
    const risks = await Risk.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
    });

    return risks;
  },

  findByName: async (name: string) => {
    const risk = await Risk.findOne({
      where: { name },
    });
    return risk;
  },

  findByNameAll: async (name: string, page: number, perPage: number) => {
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
        "inherent",
        "identification",
        "control_evaluationId",
        "residual_risk",
      ],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
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

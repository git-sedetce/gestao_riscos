import { RiskCreationAttributes } from "src/models/Risk";
import { ControlEvaluation, Impact, Probability, Risk } from "../models";
import { Op } from "sequelize";

export const riskService = {
  create: async (attributes: RiskCreationAttributes) => {
    const { impactId, probabilityId, control_evaluationId } = attributes;

    const impact = await Impact.findByPk(impactId);
    const probability = await Probability.findByPk(probabilityId);
    const control_evaluation = await ControlEvaluation.findByPk(
      control_evaluationId
    );

    if (!impact || !probability || !control_evaluation) {
      throw new Error("Probability or impact not found");
    }

    const inherentValue = impact.algorithm * probability.algorithm;

    const residualValue = inherentValue * control_evaluation.algorithm;

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
      types_originId: number;
      name: string;
      event: string;
      cause: string;
      consequence: string;
      category_id: number;
      userId: number;
      periodId: number;
      impactId: number;
      probabilityId: number;
      control_identification: string;
      control_evaluationId: number;
    }
  ) => {
    const oldRisk = await Risk.findByPk(id);
    if (!oldRisk) {
      throw new Error("Risk not found");
    }

    const impact = await Impact.findByPk(attributes.impactId);
    const probability = await Probability.findByPk(attributes.probabilityId);
    const control_evaluation = await ControlEvaluation.findByPk(
      attributes.control_evaluationId
    );

    if (!impact || !probability || !control_evaluation) {
      throw new Error("Probability or impact not found");
    }

    const inherentValue = impact.algorithm * probability.algorithm;
    const residualValue = inherentValue * control_evaluation.algorithm;

    const [affectedRows, [updatedRisk]] = await Risk.update(
      {
        ...attributes,
        inherent: inherentValue,
        residual_risk: residualValue,
      },
      {
        where: { id },
        returning: true,
      }
    );
    return updatedRisk;
  },

  findById: async (id: number) => {
    const risk = await Risk.findByPk(id);
    return risk;
  },

  findByIdWithTreatments: async (id: string) => {
    const riskWithTreatments = await Risk.findByPk(id, {
      attributes: [
        "id",
        "types_originId",
        "name",
        "event",
        "cause",
        "consequence",
        "category_id",
        "userId",
        "periodId",
        "impactId",
        "probabilityId",
        "inherent",
        "control_identification",
        "control_evaluationId",
        "residual_risk",
      ],
      include: {
        association: "treatments",
        attributes: [
          "id",
          "types_treatmentId",
          "name",
          "userId",
          "start_date",
          "end_date",
          "status_treatmentId",
          "notes",
        ],
        order: [["userId", "ASC"]],
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
        "types_originId",
        "name",
        "event",
        "cause",
        "consequence",
        "category_id",
        "userId",
        "periodId",
        "impactId",
        "probabilityId",
        "inherent",
        "control_identification",
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
        "types_originId",
        "name",
        "event",
        "cause",
        "consequence",
        "category_id",
        "userId",
        "periodId",
        "impactId",
        "probabilityId",
        "inherent",
        "control_identification",
        "control_evaluationId",
        "residual_risk",
      ],
      // where: {
      //   featured: true,
      // },
    });

    const randomFeaturedRisks = featuredRisks.sort(() => 0.5 - Math.random());

    return randomFeaturedRisks.slice(0, 9);
  },

  getNewestRisks: async () => {
    const risks = await Risk.findAll({
      attributes: [
        "id",
        "types_originId",
        "name",
        "event",
        "cause",
        "consequence",
        "category_id",
        "userId",
        "periodId",
        "impactId",
        "probabilityId",
        "inherent",
        "control_identification",
        "control_evaluationId",
        "residual_risk",
      ],
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
        "types_originId",
        "name",
        "event",
        "cause",
        "consequence",
        "category_id",
        "userId",
        "periodId",
        "impactId",
        "probabilityId",
        "inherent",
        "control_identification",
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

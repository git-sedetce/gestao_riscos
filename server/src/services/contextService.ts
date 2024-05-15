import { Context, ContextCreationAttributes } from "../models/Context";

export const contextService = {
  show: async () => {
    const contexts = await Context.findAll({
      attributes: [
        "id",
        "name",
        "areaId",
        "critical_process",
        "priority",
        "userId",
        "critical_identification",
      ],
      order: [["name", "ASC"]],
    });
    return contexts;
  },

  create: async (attributes: ContextCreationAttributes) => {
    const context = await Context.create(attributes);
    return context;
  },

  findByName: async (name: string) => {
    const context = await Context.findOne({
      where: { name },
    });
    return context;
  },

  findById: async (id: number) => {
    const context = await Context.findByPk(id);
    return context;
  },

  findByIdWithCriticalities: async (id: string) => {
    const contextWithCriticalities = await Context.findByPk(id, {
      attributes: [
        "id",
        "name",
        "areaId",
        "critical_process",
        "priority",
        "userId",
        "critical_identification",
      ],
      include: {
        association: "criticalities",
        attributes: [
          "id",
          "name",
          "impactId",
          "existence",
          "deficiency",
          "threat",
          "opportunity",
        ],
        order: [["name", "ASC"]],
        separate: true,
      },
    });

    return contextWithCriticalities;
  },
};

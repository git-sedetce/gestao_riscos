import { Criticality } from "../models";
import { CriticalityCreationAttributes } from "src/models/Criticality";

export const criticalityService = {
  show: async () => {
    const criticalities = await Criticality.findAll({
      attributes: [
        "id",
        "contextId",
        "name",
        "impactId",
        "existence",
        "deficiency",
        "threat",
        "opportunity",
      ],
      order: [["name", "ASC"]],
    });
    return criticalities;
  },

  create: async (attributes: CriticalityCreationAttributes) => {
    const criticality = await Criticality.create(attributes);
    return criticality;
  },
  findByName: async (name: string) => {
    const criticality = await Criticality.findOne({
      where: { name },
    });
    return criticality;
  },
  findById: async (id: string) => {
    const criticality = await Criticality.findByPk(id, {
      attributes: [
        "id",
        "contextId",
        "name",
        "impactId",
        "existence",
        "deficiency",
        "threat",
        "opportunity",
      ],
    });

    return criticality;
  },
  findByIdNumber: async (id: number) => {
    const criticality = await Criticality.findByPk(id);
    return criticality;
  },
};

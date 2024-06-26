import { User } from "../models";
import { UserCreationAttributes } from "src/models/User";

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  },
  
  findByNameId: async (id: string) => {
    const user = await User.findOne({
      where: { id },
    });
    return user;
  },

  findByNumberId: async (id: number) => {
    const user = await User.findByPk(id);
    return user;
  },

  findByIdWithRisks: async (id: string) => {
    const userWithRisks = await User.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "risks",
        attributes: [
          "id",
          "types_originId",
          "name",
          "event",
          "cause",
          "consequence",
          "category_id",
          "userId",
          "impactId",
          "probabilityId",
          "inherent",
          "control_identification",
          "control_evaluationId",
          "residual_risk",
        ],
      },
    });

    return userWithRisks;
  },

  findByCurrentId: async (id: string, currentUser: User | null | undefined) => {
    if (!currentUser || id !== currentUser.id.toString()) {
      throw new Error("Unauthorized access");
    }

    const userWithRisks = await User.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "risks",
        where: { userId: currentUser.id },
        attributes: [
          "id",
          "types_originId",
          "name",
          "event",
          "cause",
          "consequence",
          "category_id",
          "userId",
          "impactId",
          "probabilityId",
          "inherent",
          "control_identification",
          "control_evaluationId",
          "residual_risk",
        ],
      },
    });

    return userWithRisks;
  },

  create: async (attributes: UserCreationAttributes) => {
    const user = await User.create(attributes);
    return user;
  },

  update: async (
    id: number,
    attributes: {
      name: string;
      email: string;
      entityId: number;
      profileId: number;
      isActive: boolean;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedUsers[0];
  },

  updateCurrentUser: async (
    id: number,
    attributes: {
      name: string;
      email: string;
      entityId: number;
    }
  ) => {
    const [affectedRows, updatedUsers] = await User.update(attributes, {
      where: { id },
      returning: true,
    });

    return updatedUsers[0];
  },

  updatePassword: async (id: number, password: string) => {
    const [affectedRows, updatedUsers] = await User.update(
      {
        password,
      },
      {
        where: { id },
        individualHooks: true,
        returning: true,
      }
    );

    return updatedUsers[0];
  },
};

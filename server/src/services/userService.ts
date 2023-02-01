import { User } from "../models";
import { UserCreationAttributes } from "src/models/User";

export const userService = {
  findByEmail: async (email: string) => {
    const user = await User.findOne({
      where: { email },
    });
    return user;
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

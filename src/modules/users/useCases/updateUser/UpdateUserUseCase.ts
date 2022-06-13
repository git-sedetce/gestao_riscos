import { prisma } from "../../../../database/prismaClient";

interface IUpdateUser {
    id_user: string;
    id_profile: number;
}

export class UpdateUserUseCase {
  async execute({ id_user, id_profile }: IUpdateUser) {
    const result = await prisma.users.update({
      where: {
        id: id_user,
      },
      data: {
        id_profile,
      },
    });

    return result;
  }
}
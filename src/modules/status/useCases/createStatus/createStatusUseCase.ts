import { prisma } from "../../../../database/prismaClient";

interface ICreateStatus {
  status_name: string;
}

export class CreateStatusUseCase {
  async execute({ status_name }: ICreateStatus) {
    const statusExist = await prisma.status.findFirst({
      where: {
        status_name: {
          equals: status_name,
          mode: "insensitive",
        },
      },
    });

    if (statusExist) {
      throw new Error(`Status ${status_name} already exists`);
    }

    const status = await prisma.status.create({
      data: {
        status_name,
      },
    });

    return status;
  }
}

import { prisma } from "../../../../database/prismaClient";

interface ICreatePeriod {
  period_name: string;
}

export class CreatePeriodUseCase {
  async execute({ period_name }: ICreatePeriod) {
    const periodExist = await prisma.periodos.findFirst({
      where: {
        period_name: {
          equals: period_name,
          mode: "insensitive",
        },
      },
    });

    if (periodExist) {
      throw new Error(`period ${period_name} already exists`);
    }

    const period = await prisma.periodos.create({
      data: {
        period_name,
      },
    });

    return period;
  }
}

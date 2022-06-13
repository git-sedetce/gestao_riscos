import { prisma } from "../../../../database/prismaClient";

interface ICreateImpacto {
  impact_int: number
  description: string;
}

export class CreateImpactoUseCase {
  async execute({ impact_int, description }: ICreateImpacto) {
    const impactExist = await prisma.impactos.findFirst({
      where: {
        impact_int: {
          equals: impact_int,
        },
      },
    });

    if (impactExist) {
      throw new Error(`Impact ${impact_int} already exists`);
    }

    const impact = await prisma.impactos.create({
      data: {
        impact_int,
        description
      },
    });

    return impact;
  }
}

import { prisma } from "../../../../database/prismaClient";

interface ICreateProbabilidade {
  probability_int: number;
  description: string;
}

export class CreateProbabilidadeUseCase {
  async execute({ probability_int, description }: ICreateProbabilidade) {
    const probabilityExist = await prisma.probabilidades.findFirst({
      where: {
        probability_int: {
          equals: probability_int,
        },
      },
    });

    if (probabilityExist) {
      throw new Error(`Probability${probability_int} already exists`);
    }

    const probability = await prisma.probabilidades.create({
      data: {
        probability_int,
        description
      },
    });

    return probability;
  }
}

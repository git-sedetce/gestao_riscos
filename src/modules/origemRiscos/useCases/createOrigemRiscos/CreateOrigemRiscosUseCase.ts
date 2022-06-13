import { prisma } from "../../../../database/prismaClient";

interface ICreateOrigemRiscos {
  risk_origin_name: string;
}

export class CreateOrigemRiscosUseCase {
  async execute({ risk_origin_name }: ICreateOrigemRiscos) {
    const riskOriginExist = await prisma.origemRisco.findFirst({
      where: {
        risk_origin_name: {
          equals: risk_origin_name,
          mode: "insensitive",
        },
      },
    });

    if (riskOriginExist) {
      throw new Error(`Type Origin ${risk_origin_name} already exists`);
    }

    const riskOrigin = await prisma.origemRisco.create({
      data: {
        risk_origin_name,
      },
    });

    return riskOrigin;
  }
}
import { prisma } from "../../../../database/prismaClient";

interface ICreateTiposTratamento {
  types_treatment_name: string;
}

export class CreateTiposTratamentoUseCase {
  async execute({ types_treatment_name }: ICreateTiposTratamento) {
    const typesOriginExist = await prisma.tiposTratamento.findFirst({
      where: {
        types_treatment_name: {
          equals: types_treatment_name,
          mode: "insensitive",
        },
      },
    });

    if (typesOriginExist) {
      throw new Error(`Type Treatment ${types_treatment_name} already exists`);
    }

    const typesTreatment = await prisma.tiposTratamento.create({
      data: {
        types_treatment_name,
      },
    });

    return typesTreatment;
  }
}
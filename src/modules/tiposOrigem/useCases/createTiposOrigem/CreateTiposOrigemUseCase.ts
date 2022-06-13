import { prisma } from "../../../../database/prismaClient";

interface ICreateTiposOrigem {
  types_origin_name: string;
}

export class CreateTiposOrigemUseCase {
  async execute({ types_origin_name }: ICreateTiposOrigem) {
    const typesOriginExist = await prisma.tiposOrigem.findFirst({
      where: {
        types_origin_name: {
          equals: types_origin_name,
          mode: "insensitive",
        },
      },
    });

    if (typesOriginExist) {
      throw new Error(`Type Origin ${types_origin_name} already exists`);
    }

    const typesOrigin = await prisma.tiposOrigem.create({
      data: {
        types_origin_name,
      },
    });

    return typesOrigin;
  }
}
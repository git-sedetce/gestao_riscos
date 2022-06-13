import { prisma } from "../../../../database/prismaClient";

interface ICreateArea {
  area_name: string;
}

export class CreateAreaUseCase {
  async execute({ area_name }: ICreateArea) {
    const areaExist = await prisma.areas.findFirst({
      where: {
        area_name: {
          equals: area_name,
          mode: "insensitive",
        },
      },
    });

    if (areaExist) {
      throw new Error(`Area ${area_name} already exists`);
    }

    const area = await prisma.areas.create({
      data: {
        area_name,
      },
    });

    return area;
  }
}

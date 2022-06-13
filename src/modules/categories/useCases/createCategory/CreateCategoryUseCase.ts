import { prisma } from "../../../../database/prismaClient";

interface ICreateCategory {
  category_name: string;
}

export class CreateCategoryUseCase {
  async execute({ category_name }: ICreateCategory) {
    const categoryExist = await prisma.categorias.findFirst({
      where: {
        category_name: {
          equals: category_name,
          mode: "insensitive",
        },
      },
    });

    if (categoryExist) {
      throw new Error(`Category ${category_name} already exists`);
    }

    const category = await prisma.categorias.create({
      data: {
        category_name,
      },
    });

    return category;
  }
}

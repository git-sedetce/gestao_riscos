import { prisma } from "../../../../database/prismaClient";

interface ICreateAvaliacaoControle {
  rating_control_int: number;
  description: string;
}

export class CreateAvaliacaoControleUseCase {
  async execute({ rating_control_int, description }: ICreateAvaliacaoControle) {
    const ratingControlExist = await prisma.avaliacaoControle.findFirst({
      where: {
        rating_control_int: {
          equals: rating_control_int,
        },
      },
    });

    if (ratingControlExist) {
      throw new Error(`Rating control ${rating_control_int} already exists`);
    }

    const ratingControl = await prisma.avaliacaoControle.create({
      data: {
        rating_control_int,
        description
      },
    });

    return ratingControl;
  }
}
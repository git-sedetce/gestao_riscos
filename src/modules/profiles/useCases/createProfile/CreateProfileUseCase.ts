import { prisma } from "../../../../database/prismaClient";

interface ICreateProfile {
  profile_name: string;
  description: string;
}

export class CreateProfileUseCase {
  async execute({ profile_name, description }: ICreateProfile) {
    const profileExist = await prisma.profiles.findFirst({
      where: {
        profile_name: {
          equals: profile_name,
          mode: "insensitive",
        },
      },
    });

    if (profileExist) {
      throw new Error(`Profile ${profile_name} already exists`);
    }

    const profile = await prisma.profiles.create({
      data: {
        profile_name,
        description,
      },
    });

    return profile;
  }
}

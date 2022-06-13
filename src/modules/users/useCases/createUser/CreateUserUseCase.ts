import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateUser {
  user_name: string;
  user_email: string;
  password: string;
  id_profile: string;
}

export class CreateUserUseCase {
    async execute({ password, user_name, user_email, id_profile }: ICreateUser) {
      const userExist = await prisma.users.findFirst({
        where: {
          user_email: {
            equals: user_email,
            mode: "insensitive",
          },
        },
      });
  
      if (userExist) {
        throw new Error("User already exists");
      }
  
      const hashPassword = await hash(password, 10);
  
      const user = await prisma.users.create({
        data: {
          user_name,
          user_email,
          password: hashPassword,
          id_profile
        },
      });
  
      return user;
    }
  }

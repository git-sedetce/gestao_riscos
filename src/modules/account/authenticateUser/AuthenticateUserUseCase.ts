import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

interface IAuthenticateUser {
    user_name: string;
    user_email: string;
    password: string;
}

export class AuthenticateUserUseCase {
    async execute({ user_name, user_email, password }: IAuthenticateUser) {
        const user = await prisma.users.findFirst({
            where: { 
                user_name,
                user_email
            }
        })

        if(!user) {
            throw new Error("Username or email invalid!")
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Password invalid!")
        }

        const token = sign({user_name, user_email }, "4d28a3e21a2a021292623022a417ae00", {
            subject: user.id,
            // expiresIn: "1d"
        })

        return token;
    }
}
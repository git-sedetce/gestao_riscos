import { prisma } from "../../../database/prismaClient"
import { sign } from "jsonwebtoken"

interface IAuthenticateProfile {
    profile_name: string;
}

export class AuthenticateProfileUseCase {
    async execute({ profile_name }: IAuthenticateProfile) {
        const profile = await prisma.profiles.findFirst({
            where: { 
                profile_name: "Administrador",
            }
        })

        if(!profile) {
            throw new Error("Admin invalid!")
        }

        const token = sign({ profile_name }, "4d28a3e21a2a021292623022a417ae00", {
            subject: profile.id,
            // expiresIn: "1d"
        })

        return token;
    }
}
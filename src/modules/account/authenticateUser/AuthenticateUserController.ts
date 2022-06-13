import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { user_name, user_email, password } = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();
        const result = await authenticateUserUseCase.execute({
            user_name,
            user_email,
            password
        });

        return response.json(result);
    }
}
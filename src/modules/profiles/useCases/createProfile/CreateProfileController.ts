
import { Request, Response } from "express";
import { CreateProfileUseCase } from "./CreateProfileUseCase";

export class CreateProfileController {
    async handle(request: Request, response: Response) {
        const { profile_name, description } = request.body;

        const createProfileUseCase = new CreateProfileUseCase();
        const result = await createProfileUseCase.execute({
            profile_name,
            description
        });

        return response.json(result);
    }
}
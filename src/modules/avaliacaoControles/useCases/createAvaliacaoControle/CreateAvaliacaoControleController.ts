import { Request, Response } from "express";
import { CreateAvaliacaoControleUseCase } from "./CreateAvaliacaoControleUseCase";

export class CreateAvaliacaoControleController {
    async handle(request: Request, response: Response) {
        const { rating_control_int, description } = request.body;

        const createAvaliacaoControleUseCase = new CreateAvaliacaoControleUseCase();
        const result = await createAvaliacaoControleUseCase.execute({
            rating_control_int,
            description
        });

        return response.json(result);
    }
}
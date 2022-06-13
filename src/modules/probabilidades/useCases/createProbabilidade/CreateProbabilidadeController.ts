import { Request, Response } from "express";
import { CreateProbabilidadeUseCase } from "./CreateProbabilidadeUseCase";

export class CreateProbabilidadeController {
  async handle(request: Request, response: Response) {
    const { probability_int, description } = request.body;

    const createProbabilidadeUseCase = new CreateProbabilidadeUseCase();
    const result = await createProbabilidadeUseCase.execute({
      probability_int,
      description
    });

    return response.json(result);
  }
}

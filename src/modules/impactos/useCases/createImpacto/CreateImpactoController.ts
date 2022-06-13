import { Request, Response } from "express";
import { CreateImpactoUseCase } from "./CreateImpactoUseCase";

export class CreateImpactoController {
  async handle(request: Request, response: Response) {
    const { impact_int, description } = request.body;

    const createImpactoUseCase = new CreateImpactoUseCase();
    const result = await createImpactoUseCase.execute({
      impact_int, description
    });

    return response.json(result);
  }
}

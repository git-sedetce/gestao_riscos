import { Request, Response } from "express";
import { CreatePeriodUseCase } from "./CreatePeriodUseCase";

export class CreatePeriodController {
  async handle(request: Request, response: Response) {
    const { period_name } = request.body;

    const createPeriodUseCase = new CreatePeriodUseCase();
    const result = await createPeriodUseCase.execute({
      period_name,
    });

    return response.json(result);
  }
}

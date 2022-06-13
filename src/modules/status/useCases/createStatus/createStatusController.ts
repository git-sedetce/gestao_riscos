import { Request, Response } from "express";
import { CreateStatusUseCase } from "./createStatusUseCase";

export class CreateStatusController {
  async handle(request: Request, response: Response) {
    const { status_name } = request.body;

    const createStatusUseCase = new CreateStatusUseCase();
    const result = await createStatusUseCase.execute({
      status_name
    });

    return response.json(result);
  }
}
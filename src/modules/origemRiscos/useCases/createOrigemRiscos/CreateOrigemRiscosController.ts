import { Request, Response } from "express";
import { CreateOrigemRiscosUseCase } from "./CreateOrigemRiscosUseCase";

export class CreateOrigemRiscosController {
  async handle(request: Request, response: Response) {
    const { risk_origin_name } = request.body;

    const createOrigemRiscosUseCase = new CreateOrigemRiscosUseCase();
    const result = await createOrigemRiscosUseCase.execute({
      risk_origin_name,
    });

    return response.json(result);
  }
}
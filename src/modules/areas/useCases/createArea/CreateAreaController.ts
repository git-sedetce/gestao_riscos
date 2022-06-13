import { Request, Response } from "express";
import { CreateAreaUseCase } from "./CreateAreaUseCase";

export class CreateAreaController {
  async handle(request: Request, response: Response) {
    const { area_name } = request.body;

    const createAreaUseCase = new CreateAreaUseCase();
    const result = await createAreaUseCase.execute({
      area_name,
    });

    return response.json(result);
  }
}

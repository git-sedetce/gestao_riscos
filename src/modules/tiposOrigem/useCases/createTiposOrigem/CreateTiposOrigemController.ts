import { Request, Response } from "express";
import { CreateTiposOrigemUseCase } from "./CreateTiposOrigemUseCase";

export class CreateTiposOrigemController {
  async handle(request: Request, response: Response) {
    const { types_origin_name } = request.body;

    const createTiposOrigemUseCase = new CreateTiposOrigemUseCase();
    const result = await createTiposOrigemUseCase.execute({
      types_origin_name,
    });

    return response.json(result);
  }
}

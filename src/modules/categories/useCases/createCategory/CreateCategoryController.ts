import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { category_name } = request.body;

    const createCategoryUseCase = new CreateCategoryUseCase();
    const result = await createCategoryUseCase.execute({
      category_name,
    });

    return response.json(result);
  }
}

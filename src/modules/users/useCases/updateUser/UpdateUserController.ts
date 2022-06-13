import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id_profile } = request.body;
    const { id: id_user} = request.params;

    const updateUserUseCase = new UpdateUserUseCase();

    const result = await updateUserUseCase.execute({
      id_profile,
      id_user,
    });

    return response.json(result);
  }
}
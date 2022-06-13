import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { user_name, user_email, password } = request.body;
    const { id_profile } = request;
    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({
      id_profile,
      user_name,
      user_email,
      password
    });

    return response.json(result);
  }
}
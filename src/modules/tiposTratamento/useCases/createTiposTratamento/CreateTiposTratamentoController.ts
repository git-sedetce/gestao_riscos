
import { Request, Response } from "express";
import { CreateTiposTratamentoUseCase } from "./CreateTiposTratamentoUseCase";

export class CreateTiposTratamentoController {
    async handle(request: Request, response: Response) {
        const { types_treatment_name } = request.body;

        const createTiposTratamentoUseCase = new CreateTiposTratamentoUseCase();
        const result = await createTiposTratamentoUseCase.execute({
            types_treatment_name,
        });

        return response.json(result);
    }
}
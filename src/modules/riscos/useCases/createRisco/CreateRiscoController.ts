import { Request, Response } from "express";
import { CreateRiscoUseCase } from "./CreateRiscoUseCase";

export class CreateRiscoController {
  async handle(request: Request, response: Response) {
    const {
      id_area,
      id_user,
      id_types_origin,
      id_risk_origin,
      indication_origin,
      id_period,
      event_risk,
      cause_risk,
      consequence_risk,
      id_category,
      existing_controls,
      id_probability,
      id_impact,
      inherent_risk,
      id_rating_control,
      residual_risk,
      priority,
      justification,
      id_types_treatment,
      treatment_measures,
      deadline,
      id_status,
      comments,
    } = request.body;

    const createRiscoUseCase = new CreateRiscoUseCase();

    const result = await createRiscoUseCase.execute({
        id_area,
        id_user,
        id_types_origin,
        id_risk_origin,
        indication_origin,
        id_period,
        event_risk,
        cause_risk,
        consequence_risk,
        id_category,
        existing_controls,
        id_probability,
        id_impact,
        inherent_risk,
        id_rating_control,
        residual_risk,
        priority,
        justification,
        id_types_treatment,
        treatment_measures,
        deadline,
        id_status,
        comments,
    });

    return response.json(result);
  }
}

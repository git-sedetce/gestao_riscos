import { prisma } from "../../../../database/prismaClient";

interface ICreateRisco {
  id_area: number;
  id_user: string;
  id_types_origin: number;
  id_risk_origin: number;
  indication_origin: string;
  id_period: number;
  event_risk: string;
  cause_risk: string;
  consequence_risk: string;
  id_category: number;
  existing_controls: string;
  id_probability: number;
  id_impact: number;
  inherent_risk: string;
  id_rating_control: number;
  residual_risk: string;
  priority: boolean;
  justification: string;
  id_types_treatment: number;
  treatment_measures: string;
  deadline: string;
  id_status: number;
  comments: string;
}

export class CreateRiscoUseCase {
  async execute({
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
  }: ICreateRisco) {
    const result = await prisma.riscos.create({
      data: {
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
      },
    });

    return result;
  }
}

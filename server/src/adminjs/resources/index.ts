import { ResourceWithOptions } from "adminjs";
import {
  Area,
  Category,
  Entity,
  Impact,
  Period,
  Probability,
  Risk,
  RisksOrigin,
  StatusTreatment,
  Treatment,
  TypesOrigin,
  TypesTreatment,
  User,
} from "../../models";

import { areaResourceOptions } from "./area";
import { categoryResourceOptions } from "./category";
import { entityResourceOptions } from "./entity";
import { impactResourceOptions } from "./impact";
import { periodResourceOptions } from "./period";
import { probabilityResourceOptions } from "./probability";
import { riskResourceOptions } from "./risk";
import { risksoriginResourceOptions } from "./risk_origin";
import { statustreatmentResourceOptions } from "./status_treatment";
import { treatmentResourceOptions } from "./treatment";
import { typesoriginResourceOptions } from "./type_origin";
import { typestreatmentResourceOptions } from "./type_treatment";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Area,
    options: areaResourceOptions,
  },
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: Entity,
    options: entityResourceOptions,
  },
  {
    resource: Impact,
    options: impactResourceOptions,
  },
  {
    resource: Period,
    options: periodResourceOptions,
  },
  {
    resource: Probability,
    options: probabilityResourceOptions,
  },
  {
    resource: Risk,
    options: riskResourceOptions,
  },
  {
    resource: RisksOrigin,
    options: risksoriginResourceOptions,
  },
  {
    resource: StatusTreatment,
    options: statustreatmentResourceOptions,
  },
  {
    resource: Treatment,
    options: treatmentResourceOptions,
  },
  {
    resource: TypesOrigin,
    options: typesoriginResourceOptions,
  },
  {
    resource: TypesTreatment,
    options: typestreatmentResourceOptions,
  },
  {
    resource: User,
    options: userResourceOptions,
  },
];

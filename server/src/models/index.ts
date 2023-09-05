import { Area } from "./Area";
import { Category } from "./Category";
import { Entity } from "./Entity";
import { Impact } from "./Impact";
import { Period } from "./Period";
import { Probability } from "./Probability";
import { Risk } from "./Risk";
import { RisksOrigin } from "./RisksOrigin";
import { StatusTreatment } from "./StatusTreatment";
import { Treatment } from "./Treatment";
import { TypesOrigin } from "./TypesOrigin";
import { TypesTreatment } from "./TypesTreatment";
import { User } from "./User";
import { ControlEvaluation } from "./ControlEvaluation";

Area.hasMany(Risk);
Category.hasMany(Risk, { as: "risks" });
Period.hasMany(Risk);
RisksOrigin.hasMany(Risk);
TypesOrigin.hasMany(Risk);
User.hasMany(Risk, { as: "risks" });
Probability.hasMany(Risk);
Impact.hasMany(Risk);
ControlEvaluation.hasMany(Risk);

Entity.hasMany(User);

Risk.hasMany(Treatment, { as: "treatments" });
StatusTreatment.hasMany(Treatment);
TypesTreatment.hasMany(Treatment);

Risk.belongsTo(Area);
Risk.belongsTo(Category);
Risk.belongsTo(Period);
Risk.belongsTo(RisksOrigin);
Risk.belongsTo(TypesOrigin);
Risk.belongsTo(User);
Risk.belongsTo(Probability);
Risk.belongsTo(Impact);
Risk.belongsTo(ControlEvaluation);

User.belongsTo(Entity);

Treatment.belongsTo(Risk);

export {
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
  ControlEvaluation,
};

import { Area } from "./Area";
import { Period } from "./Period";
import { Category } from "./Category";
import { Entity } from "./Entity";
import { Impact } from "./Impact";
import { Probability } from "./Probability";
import { Risk } from "./Risk";
import { StatusTreatment } from "./StatusTreatment";
import { Treatment } from "./Treatment";
import { TypesOrigin } from "./TypesOrigin";
import { TypesTreatment } from "./TypesTreatment";
import { User } from "./User";
import { ControlEvaluation } from "./ControlEvaluation";

Category.hasMany(Risk, { as: "risks" });
TypesOrigin.hasMany(Risk);
User.hasMany(Risk, { as: "risks" });
Probability.hasMany(Risk);
Impact.hasMany(Risk);
ControlEvaluation.hasMany(Risk);

Entity.hasMany(User);

Risk.hasMany(Treatment, { as: "treatments" });
StatusTreatment.hasMany(Treatment);
TypesTreatment.hasMany(Treatment);

Risk.belongsTo(Category);
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
  Period,
  Impact,
  Probability,
  Risk,
  StatusTreatment,
  Treatment,
  TypesOrigin,
  TypesTreatment,
  User,
  ControlEvaluation,
};

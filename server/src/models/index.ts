import { Area } from "./Area";
import { Period } from "./Period";
import { Category } from "./Category";
import { Context } from "./Context";
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
import { Criticality } from "./Criticality";

Category.hasMany(Risk, { as: "risks" });
TypesOrigin.hasMany(Risk);
User.hasMany(Risk, { as: "risks" });
Probability.hasMany(Risk);
Impact.hasMany(Risk);
ControlEvaluation.hasMany(Risk);

Area.hasMany(Context);
User.hasMany(Context, { as: "contexts" });

Entity.hasMany(User);

Risk.hasMany(Treatment, { as: "treatments" });
StatusTreatment.hasMany(Treatment);
TypesTreatment.hasMany(Treatment);

Context.hasMany(Criticality, { as: "criticalities" });

Risk.belongsTo(Category);
Risk.belongsTo(TypesOrigin);
Risk.belongsTo(User);
Risk.belongsTo(Probability);
Risk.belongsTo(Impact);
Risk.belongsTo(ControlEvaluation);

User.belongsTo(Entity);

Treatment.belongsTo(Risk);
Treatment.belongsTo(User);
User.hasMany(Treatment, { as: "treatments" });

Context.belongsTo(Area);
Context.belongsTo(User);

Criticality.belongsTo(Context);
Criticality.belongsTo(Impact);

export {
  Area,
  Category,
  Context,
  Criticality,
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

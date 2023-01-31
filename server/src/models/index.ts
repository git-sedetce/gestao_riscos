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

Area.hasMany(Risk);
Category.hasMany(Risk, { as: "risks"});
Impact.hasMany(Risk);
Period.hasMany(Risk);
Probability.hasMany(Risk);
RisksOrigin.hasMany(Risk);
TypesOrigin.hasMany(Risk);
User.hasMany(Risk);

Entity.hasMany(User);

Risk.hasMany(Treatment, { as: "treatments" });
StatusTreatment.hasMany(Treatment);
TypesTreatment.hasMany(Treatment);

Risk.belongsTo(Area);
Risk.belongsTo(Category);
Risk.belongsTo(Impact);
Risk.belongsTo(Period);
Risk.belongsTo(Probability);
Risk.belongsTo(RisksOrigin);
Risk.belongsTo(TypesOrigin);
Risk.belongsTo(User)

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
};

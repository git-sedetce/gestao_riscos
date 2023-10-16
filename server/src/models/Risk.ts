import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Risk {
  id: number;
  types_originId: number;
  name: string;
  event: string;
  cause: string;
  consequence: string;
  category_id: number;
  userId: number;
  impactId: number;
  probabilityId: number;
  inherent: number | null;
  control_identification: string;
  control_evaluationId: number;
  residual_risk: number | null;
}

export interface RiskCreationAttributes extends Optional<Risk, "id"> {}

export interface RiskInstance
  extends Model<Risk, RiskCreationAttributes>,
    Risk {}

export const Risk = sequelize.define<RiskInstance, Risk>("Risk", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  types_originId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "types_origins", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  event: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cause: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  consequence: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "categories", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  impactId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "impacts", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  probabilityId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "probabilities", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  inherent: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  control_identification: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  control_evaluationId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "control_evaluations", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  residual_risk: {
    allowNull: true,
    type: DataTypes.DECIMAL(5, 1),
  },
});

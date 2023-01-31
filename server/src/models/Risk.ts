import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Risk {
  id: number;
  areaId: number;
  userId: number;
  types_originId: number;
  risks_originId: number;
  name: string;
  periodId: number;
  event: string;
  cause: string;
  consequence: string;
  categoryId: number;
  probabilityId: number;
  impactId: number;
  priority: boolean;
}

export interface RiskCreationAttributes
  extends Optional<Risk, "id" | "priority"> {}

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
  areaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "areas", key: "id" },
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
  types_originId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "types_origins", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  risks_originId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "risks_origins", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  periodId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "periods", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
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
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "categories", key: "id" },
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
  impactId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "impacts", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  priority: {
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
});

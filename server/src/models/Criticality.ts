import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Criticality {
  id: number;
  contextId: number;
  name: string;
  impactId: number;
  existence: string;
  deficiency: string;
  threat: string;
  opportunity: string;
}

export interface CriticalityCreationAttributes
  extends Optional<Criticality, "id"> {}

export interface CriticalityInstance
  extends Model<Criticality, CriticalityCreationAttributes>,
    Criticality {}

export const Criticality = sequelize.define<CriticalityInstance, Criticality>(
  "Criticality",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    contextId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "contexts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    impactId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "impacts", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    existence: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    deficiency: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    threat: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    opportunity: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }
);

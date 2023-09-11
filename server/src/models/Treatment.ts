import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Treatment {
  id: number;
  riskId: number;
  types_treatmentId: number;
  name: string;
  user: string;
  start_date: Date;
  end_date: Date;
  status_treatmentId: number;
  notes: string;
}

export interface TreatmentCreationAttributes
  extends Optional<Treatment, "id"> {}

export interface TreatmentInstance
  extends Model<Treatment, TreatmentCreationAttributes>,
    Treatment {}

export const Treatment = sequelize.define<TreatmentInstance, Treatment>(
  "Treatment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    riskId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "risks", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    types_treatmentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "types_treatments", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    user: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    start_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    end_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    status_treatmentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "status_treatments", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    notes: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  }
);

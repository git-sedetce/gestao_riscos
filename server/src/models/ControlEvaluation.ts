import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface ControlEvaluation {
  id: number;
  name: string;
  algorithm: number;
  position: number;
}

export interface ControlEvaluationCreationAttributes
  extends Optional<ControlEvaluation, "id"> {}

export interface ControlEvaluationInstance
  extends Model<ControlEvaluation, ControlEvaluationCreationAttributes>,
    ControlEvaluation {}

export const ControlEvaluation = sequelize.define<ControlEvaluationInstance, ControlEvaluation>(
  "ControlEvaluation",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    algorithm: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    position: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  }
);

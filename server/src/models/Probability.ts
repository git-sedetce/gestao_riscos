import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Probability {
  id: number;
  name: string;
  algorithm: number;
  position: number;
}

export interface ProbabilityCreationAttributes
  extends Optional<Probability, "id"> {}

export interface ProbabilityInstance
  extends Model<Probability, ProbabilityCreationAttributes>,
    Probability {}

export const Probability = sequelize.define<ProbabilityInstance, Probability>(
  "Probability",
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

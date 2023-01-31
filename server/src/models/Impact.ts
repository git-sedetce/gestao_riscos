import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Impact {
  id: number;
  name: string;
  algorithm: number;
  position: number;
}

export interface ImpactCreationAttributes extends Optional<Impact, "id"> {}

export interface ImpactInstance
  extends Model<Impact, ImpactCreationAttributes>,
    Impact {}

export const Impact = sequelize.define<ImpactInstance, Impact>("Impact", {
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
});

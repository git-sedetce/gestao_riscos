import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Context {
  id: number;
  name: string;
  areaId: number;
  critical_process: string;
  priority: number;
  userId: number;
  critical_identification: string;
}

export interface ContextCreationAttributes extends Optional<Context, "id"> {}

export interface ContextInstance
  extends Model<Context, ContextCreationAttributes>,
    Context {}

export const Context = sequelize.define<ContextInstance, Context>("Context", {
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
  areaId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "areas", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  critical_process: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  priority: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  critical_identification: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

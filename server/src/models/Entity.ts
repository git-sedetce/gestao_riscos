import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Entity {
  id: number;
  name: string;
  position: number;
}

export interface EntityCreationAttributes extends Optional<Entity, "id"> {}

export interface EntityInstance
  extends Model<Entity, EntityCreationAttributes>,
    Entity {}

export const Entity = sequelize.define<EntityInstance, Entity>("Entity", {
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
  position: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
  },
});

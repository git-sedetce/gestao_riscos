import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Area {
  id: number;
  name: string;
  description: string;
  position: number;
}

export interface AreaCreationAttributes extends Optional<Area, "id"> {}

export interface AreaInstance
  extends Model<Area, AreaCreationAttributes>,
    Area {}

export const Area = sequelize.define<AreaInstance, Area>("Area", {
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
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  position: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
  },
});

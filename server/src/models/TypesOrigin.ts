import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface TypesOrigin {
  id: number;
  name: string;
  position: number;
}

export interface TypesOriginCreationAttributes
  extends Optional<TypesOrigin, "id"> {}

export interface TypesOriginInstance
  extends Model<TypesOrigin, TypesOriginCreationAttributes>,
    TypesOrigin {}

export const TypesOrigin = sequelize.define<TypesOriginInstance, TypesOrigin>(
  "TypesOrigin",
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
    position: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  }
);

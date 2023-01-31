import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface RisksOrigin {
  id: number;
  name: string;
  description: string;
  position: number;
}

export interface RisksOriginCreationAttributes
  extends Optional<RisksOrigin, "id"> {}

export interface RisksOriginInstance
  extends Model<RisksOrigin, RisksOriginCreationAttributes>,
    RisksOrigin {}

export const RisksOrigin = sequelize.define<RisksOriginInstance, RisksOrigin>(
  "RisksOrigin",
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
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    position: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  }
);

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface TypesTreatment {
  id: number;
  name: string;
  position: number;
}

export interface TypesTreatmentCreationAttributes
  extends Optional<TypesTreatment, "id"> {}

export interface TypesTreatmentInstance
  extends Model<TypesTreatment, TypesTreatmentCreationAttributes>,
    TypesTreatment {}

export const TypesTreatment = sequelize.define<TypesTreatmentInstance, TypesTreatment>(
  "TypesTreatment",
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

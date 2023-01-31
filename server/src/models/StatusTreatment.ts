import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface StatusTreatment {
  id: number;
  name: string;
  position: number;
}

export interface StatusTreatmentCreationAttributes extends Optional<StatusTreatment, "id"> {}

export interface StatusTreatmentInstance
  extends Model<StatusTreatment, StatusTreatmentCreationAttributes>,
    StatusTreatment {}

export const StatusTreatment = sequelize.define<StatusTreatmentInstance, StatusTreatment>(
  "StatusTreatment",
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

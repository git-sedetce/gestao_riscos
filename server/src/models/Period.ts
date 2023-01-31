import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Period {
  id: number;
  name: string;
  year: number;
  sequence: number;
}

export interface PeriodCreationAttributes extends Optional<Period, "id"> {}

export interface PeriodInstance
  extends Model<Period, PeriodCreationAttributes>,
    Period {}

export const Period = sequelize.define<PeriodInstance, Period>("Period", {
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
  year: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  sequence: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

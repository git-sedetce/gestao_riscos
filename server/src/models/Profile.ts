import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Profile {
  id: number;
  name: string;
  isAdmin: boolean;
}

export interface ProfileCreationAttributes extends Optional<Profile, "id"> {}

export interface ProfileInstance
  extends Model<Profile, ProfileCreationAttributes>,
    Profile {}

export const Profile = sequelize.define<ProfileInstance, Profile>("Profile", {
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
  isAdmin: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
});

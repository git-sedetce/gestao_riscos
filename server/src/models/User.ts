import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

const bcrypt = require("bcryptjs");

type CheckPasswordCallback = (err?: Error, isSame?: boolean) => void;

export interface User {
  id: number;
  name: string;
  email: string;
  entityId: number;
  password: string;
  profileId: number;
  isActive: boolean;
  sign_in_count: number;
  accessed_at: Date;
}

export interface UserCreationAttributes extends Optional<User, "id"> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
}

export const User = sequelize.define<UserInstance, User>(
  "User",
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
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    entityId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "entities", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profileId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      references: { model: "profiles", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    isActive: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    sign_in_count: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    accessed_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);

User.prototype.checkPassword = function (
  password: string,
  callbackfn: CheckPasswordCallback
) {
  bcrypt.compare(password, this.password, (err: Error, isSame: boolean) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};

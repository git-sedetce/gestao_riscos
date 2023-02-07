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
  role: "admin" | "user";
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
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [["admin", "user"]],
      },
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

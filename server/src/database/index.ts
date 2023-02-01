import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  database: "gestao_riscos",
  username: "postgres",
  password: "230591",
  define: {
    underscored: true,
  },
});

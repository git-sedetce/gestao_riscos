import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "172.20.19.178",
  database: "gestao_riscos",
  username: "postgres",
  password: "&2PFDBS6^blLy",
  define: {
    underscored: true,
  },
});

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

// export const sequelize = new Sequelize({
//   dialect: "postgres",
//   host: "localhost",
//   database: "gestao_riscos",
//   username: "postgres",
//   password: "230591",
//   define: {
//     underscored: true,
//   },
// });

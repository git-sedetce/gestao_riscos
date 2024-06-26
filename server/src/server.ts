import express from "express";
import cors from "cors";

import { sequelize } from "./database";
import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use(router);

const PORT = process.env.port || 3000;
// const PORT = process.env.port || 4001;

app.listen(PORT, async () => {
  await sequelize.authenticate().then(() => {
    console.log("DB connection successful.");
  });

  console.log(`Server started successfully at port ${PORT}.`);
});

import express from "express";
import cors from "cors";

import { getHealthController } from "./controller/HealthController.js";
import { DatabaseModel } from "./model/DatabaseModel.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const databaseModel = new DatabaseModel();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API funcionando corretamente" });
});

app.get("/health", getHealthController);

databaseModel.testeConexao().then((resDb) => {
  if (resDb) {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } else {
    console.log("Não foi possível conectar ao banco de dados");
  }
});

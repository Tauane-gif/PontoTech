import "dotenv/config";
import express from "express";
import cors from "cors";

import { router } from "./routes.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

server.get("/", (_req, res) => {
  res.json({ message: "API funcionando corretamente" });
});

server.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "projeto-backend" });
});

const PORT = Number(process.env.PORT) || 3333;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export { server };

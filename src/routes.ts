
import { Router } from "express";
import type { Request, Response } from "express";

import { ClienteController } from "./controller/ClienteController.js";
import { AparelhoController } from "./controller/AparelhoController.js";
import { PagamentoController } from "./controller/PagamentoController.js";

const router: Router = Router();

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "API da assistência técnica funcionando!" });
});

// Rotas de clientes
const clienteController = new ClienteController();

router.get("/api/clientes", (req, res) => clienteController.listarClientes(req, res));
router.post("/api/clientes", (req, res) => clienteController.cadastrarCliente(req, res));
router.put("/api/clientes/:id", (req, res) => clienteController.atualizarCliente(req, res));
router.get("/api/clientes/:id", (req, res) => clienteController.buscarCliente(req, res));
router.delete("/api/clientes/:id", (req, res) => clienteController.excluirCliente(req, res));

// Rotas de pagamentos
const pagamentoController = new PagamentoController();

router.get("/api/pagamentos", (req, res) => pagamentoController.listarPagamentos(req, res));
router.post("/api/pagamentos", (req, res) => pagamentoController.cadastrarPagamento(req, res));
router.put("/api/pagamentos/:id", (req, res) => pagamentoController.atualizarPagamento(req, res));
router.get("/api/pagamentos/:id", (req, res) => pagamentoController.buscarPagamento(req, res));
router.delete("/api/pagamentos/:id", (req, res) => pagamentoController.excluirPagamento(req, res));

export { router };

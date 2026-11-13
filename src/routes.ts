
import { Router } from "express";
import type { Request, Response } from "express";

import { ClienteController } from "./controller/ClienteController.js";
import { FuncionarioController } from "./controller/FuncionarioController.js";
import { AparelhoController } from "./controller/AparelhoController.js";
import { OrdemServicoController } from "./controller/OrdemServicoController.js";
import { ServicoController } from "./controller/ServicoController.js";
import { PecaController } from "./controller/PecaController.js";
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

// Rotas de funcionários
const funcionarioController = new FuncionarioController();

router.get("/api/funcionarios", (req, res) => funcionarioController.listarFuncionarios(req, res));
router.post("/api/funcionarios", (req, res) => funcionarioController.cadastrarFuncionario(req, res));
router.put("/api/funcionarios/:id", (req, res) => funcionarioController.atualizarFuncionario(req, res));
router.get("/api/funcionarios/:id", (req, res) => funcionarioController.buscarFuncionario(req, res));
router.delete("/api/funcionarios/:id", (req, res) => funcionarioController.excluirFuncionario(req, res));

// Rotas de aparelhos
const aparelhoController = new AparelhoController();

router.get("/api/aparelhos", (req, res) => aparelhoController.listarAparelhos(req, res));
router.post("/api/aparelhos", (req, res) => aparelhoController.cadastrarAparelho(req, res));
router.put("/api/aparelhos/:id", (req, res) => aparelhoController.atualizarAparelho(req, res));
router.get("/api/aparelhos/:id", (req, res) => aparelhoController.buscarAparelho(req, res));
router.delete("/api/aparelhos/:id", (req, res) => aparelhoController.excluirAparelho(req, res));

// Rotas de ordens de serviço
const ordemServicoController = new OrdemServicoController();

router.get("/api/ordens-servico", (req, res) => ordemServicoController.listarOrdensServico(req, res));
router.post("/api/ordens-servico", (req, res) => ordemServicoController.cadastrarOrdemServico(req, res));
router.put("/api/ordens-servico/:id", (req, res) => ordemServicoController.atualizarOrdemServico(req, res));
router.get("/api/ordens-servico/:id", (req, res) => ordemServicoController.buscarOrdemServico(req, res));
router.delete("/api/ordens-servico/:id", (req, res) => ordemServicoController.excluirOrdemServico(req, res));

// Rotas de serviços
const servicoController = new ServicoController();

router.get("/api/servicos", (req, res) => servicoController.listarServicos(req, res));
router.post("/api/servicos", (req, res) => servicoController.cadastrarServico(req, res));
router.put("/api/servicos/:id", (req, res) => servicoController.atualizarServico(req, res));
router.get("/api/servicos/:id", (req, res) => servicoController.buscarServico(req, res));
router.delete("/api/servicos/:id", (req, res) => servicoController.excluirServico(req, res));

// Rotas de peças
const pecaController = new PecaController();

router.get("/api/pecas", (req, res) => pecaController.listarPecas(req, res));
router.post("/api/pecas", (req, res) => pecaController.cadastrarPeca(req, res));
router.put("/api/pecas/:id", (req, res) => pecaController.atualizarPeca(req, res));
router.get("/api/pecas/:id", (req, res) => pecaController.buscarPeca(req, res));
router.delete("/api/pecas/:id", (req, res) => pecaController.excluirPeca(req, res));

// Rotas de pagamentos
const pagamentoController = new PagamentoController();

router.get("/api/pagamentos", (req, res) => pagamentoController.listarPagamentos(req, res));
router.post("/api/pagamentos", (req, res) => pagamentoController.cadastrarPagamento(req, res));
router.put("/api/pagamentos/:id", (req, res) => pagamentoController.atualizarPagamento(req, res));
router.get("/api/pagamentos/:id", (req, res) => pagamentoController.buscarPagamento(req, res));
router.delete("/api/pagamentos/:id", (req, res) => pagamentoController.excluirPagamento(req, res));

export { router };

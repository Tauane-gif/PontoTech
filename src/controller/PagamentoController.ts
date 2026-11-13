
import type { Request, Response } from "express";
import { PagamentoModel } from "../model/PagamentoModel.js";

const pagamentoModel = new PagamentoModel();

const formasPagamento = [
  "Dinheiro",
  "Pix",
  "Cartão de crédito",
  "Cartão de débito"
];

const statusPermitidos = [
  "Pendente",
  "Pago",
  "Cancelado"
];

export class PagamentoController {
  public async listarPagamentos(_req: Request, res: Response) {
    try {
      const pagamentos = await pagamentoModel.listarPagamentos();

      res.status(200).json(pagamentos);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar pagamentos."
      });
    }
  }

  public async buscarPagamento(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const pagamento = await pagamentoModel.buscarPagamento(id);

      if (!pagamento) {
        res.status(404).json({
          mensagem: "Pagamento não encontrado."
        });
        return;
      }

      res.status(200).json(pagamento);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar pagamento."
      });
    }
  }

  public async cadastrarPagamento(req: Request, res: Response) {
    try {
      const { id_ordem, valor, forma_pagamento } = req.body;

      if (
        !id_ordem ||
        valor === undefined ||
        valor === null ||
        !forma_pagamento
      ) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const ordemNumerica = Number(id_ordem);
      const valorNumerico = Number(valor);

      if (
        !Number.isInteger(ordemNumerica) ||
        ordemNumerica <= 0 ||
        !Number.isFinite(valorNumerico) ||
        valorNumerico <= 0
      ) {
        res.status(400).json({
          mensagem: "Informe uma ordem válida e um valor maior que zero."
        });
        return;
      }

      if (!formasPagamento.includes(forma_pagamento)) {
        res.status(400).json({
          mensagem: "Forma de pagamento inválida."
        });
        return;
      }

      const pagamento = await pagamentoModel.cadastrarPagamento(
        ordemNumerica,
        valorNumerico,
        forma_pagamento
      );

      res.status(201).json(pagamento);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar pagamento."
      });
    }
  }

  public async atualizarPagamento(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const {
        id_ordem,
        valor,
        forma_pagamento,
        status
      } = req.body;

      if (
        !id_ordem ||
        valor === undefined ||
        valor === null ||
        !forma_pagamento ||
        !status
      ) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const ordemNumerica = Number(id_ordem);
      const valorNumerico = Number(valor);

      if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !Number.isInteger(ordemNumerica) ||
        ordemNumerica <= 0 ||
        !Number.isFinite(valorNumerico) ||
        valorNumerico <= 0
      ) {
        res.status(400).json({
          mensagem: "Informe dados válidos para atualizar o pagamento."
        });
        return;
      }

      if (!formasPagamento.includes(forma_pagamento)) {
        res.status(400).json({
          mensagem: "Forma de pagamento inválida."
        });
        return;
      }

      if (!statusPermitidos.includes(status)) {
        res.status(400).json({
          mensagem: "Status de pagamento inválido."
        });
        return;
      }

      const pagamento = await pagamentoModel.atualizarPagamento(
        id,
        ordemNumerica,
        valorNumerico,
        forma_pagamento,
        status
      );

      if (!pagamento) {
        res.status(404).json({
          mensagem: "Pagamento não encontrado."
        });
        return;
      }

      res.status(200).json(pagamento);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar pagamento."
      });
    }
  }

  public async excluirPagamento(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const pagamento = await pagamentoModel.excluirPagamento(id);

      if (!pagamento) {
        res.status(404).json({
          mensagem: "Pagamento não encontrado."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Pagamento excluído com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir pagamento."
      });
    }
}
}

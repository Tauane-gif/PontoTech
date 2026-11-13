
import type { Request, Response } from "express";
import { PecaModel } from "../model/PecaModel.js";

const pecaModel = new PecaModel();

export class PecaController {
  public async listarPecas(_req: Request, res: Response) {
    try {
      const pecas = await pecaModel.listarPecas();

      res.status(200).json(pecas);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar peças."
      });
    }
  }

  public async buscarPeca(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const peca = await pecaModel.buscarPeca(id);

      if (!peca) {
        res.status(404).json({
          mensagem: "Peça não encontrada."
        });
        return;
      }

      res.status(200).json(peca);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar peça."
      });
    }
  }

  public async cadastrarPeca(req: Request, res: Response) {
    try {
      const { nome, preco, quantidade } = req.body;

      if (
        !nome ||
        preco === undefined ||
        preco === null ||
        quantidade === undefined ||
        quantidade === null
      ) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const precoNumerico = Number(preco);
      const quantidadeNumerica = Number(quantidade);

      if (
        !Number.isFinite(precoNumerico) ||
        precoNumerico < 0 ||
        !Number.isInteger(quantidadeNumerica) ||
        quantidadeNumerica < 0
      ) {
        res.status(400).json({
          mensagem: "Informe um preço e uma quantidade válidos."
        });
        return;
      }

      const peca = await pecaModel.cadastrarPeca(
        nome,
        precoNumerico,
        quantidadeNumerica
      );

      res.status(201).json(peca);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar peça."
      });
    }
  }

  public async atualizarPeca(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { nome, preco, quantidade } = req.body;

      if (
        !nome ||
        preco === undefined ||
        preco === null ||
        quantidade === undefined ||
        quantidade === null
      ) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const precoNumerico = Number(preco);
      const quantidadeNumerica = Number(quantidade);

      if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !Number.isFinite(precoNumerico) ||
        precoNumerico < 0 ||
        !Number.isInteger(quantidadeNumerica) ||
        quantidadeNumerica < 0
      ) {
        res.status(400).json({
          mensagem: "Informe dados válidos para atualizar a peça."
        });
        return;
      }

      const peca = await pecaModel.atualizarPeca(
        id,
        nome,
        precoNumerico,
        quantidadeNumerica
      );

      if (!peca) {
        res.status(404).json({
          mensagem: "Peça não encontrada."
        });
        return;
      }

      res.status(200).json(peca);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar peça."
      });
    }
  }

  public async excluirPeca(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const peca = await pecaModel.excluirPeca(id);

      if (!peca) {
        res.status(404).json({
          mensagem: "Peça não encontrada."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Peça excluída com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir peça."
      });
    }
}
}


import type { Request, Response } from "express";
import { ServicoModel } from "../model/ServicoModel.js";

const servicoModel = new ServicoModel();

export class ServicoController {
  public async listarServicos(_req: Request, res: Response) {
    try {
      const servicos = await servicoModel.listarServicos();

      res.status(200).json(servicos);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar serviços."
      });
    }
  }

  public async buscarServico(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const servico = await servicoModel.buscarServico(id);

      if (!servico) {
        res.status(404).json({
          mensagem: "Serviço não encontrado."
        });
        return;
      }

      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar serviço."
      });
    }
  }

  public async cadastrarServico(req: Request, res: Response) {
    try {
      const { id_ordem, descricao, valor } = req.body;

      if (!id_ordem || !descricao || valor === undefined || valor === null) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const valorNumerico = Number(valor);
      const ordemNumerica = Number(id_ordem);

      if (
        !Number.isInteger(ordemNumerica) ||
        ordemNumerica <= 0 ||
        !Number.isFinite(valorNumerico) ||
        valorNumerico < 0
      ) {
        res.status(400).json({
          mensagem: "Informe uma ordem válida e um valor maior ou igual a zero."
        });
        return;
      }

      const servico = await servicoModel.cadastrarServico(
        ordemNumerica,
        descricao,
        valorNumerico
      );

      res.status(201).json(servico);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar serviço."
      });
    }
  }

  public async atualizarServico(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { id_ordem, descricao, valor } = req.body;

      if (!id_ordem || !descricao || valor === undefined || valor === null) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const valorNumerico = Number(valor);
      const ordemNumerica = Number(id_ordem);

      if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !Number.isInteger(ordemNumerica) ||
        ordemNumerica <= 0 ||
        !Number.isFinite(valorNumerico) ||
        valorNumerico < 0
      ) {
        res.status(400).json({
          mensagem: "Informe dados válidos para atualizar o serviço."
        });
        return;
      }

      const servico = await servicoModel.atualizarServico(
        id,
        ordemNumerica,
        descricao,
        valorNumerico
      );

      if (!servico) {
        res.status(404).json({
          mensagem: "Serviço não encontrado."
        });
        return;
      }

      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar serviço."
      });
    }
  }

  public async excluirServico(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const servico = await servicoModel.excluirServico(id);

      if (!servico) {
        res.status(404).json({
          mensagem: "Serviço não encontrado."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Serviço excluído com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir serviço."
      });
    }
}
}

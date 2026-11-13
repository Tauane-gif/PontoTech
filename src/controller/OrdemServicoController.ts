
import type { Request, Response } from "express";
import { OrdemServicoModel } from "../model/OrdemServicoModel .js";

const ordemServicoModel = new OrdemServicoModel();

const statusPermitidos = [
  "Aberta",
  "Em andamento",
  "Aguardando peça",
  "Concluída",
  "Entregue",
  "Cancelada"
];

export class OrdemServicoController {
  public async listarOrdensServico(_req: Request, res: Response) {
    try {
      const ordens = await ordemServicoModel.listarOrdensServico();

      res.status(200).json(ordens);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar ordens de serviço."
      });
    }
  }

  public async buscarOrdemServico(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const ordem = await ordemServicoModel.buscarOrdemServico(id);

      if (!ordem) {
        res.status(404).json({
          mensagem: "Ordem de serviço não encontrada."
        });
        return;
      }

      res.status(200).json(ordem);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar ordem de serviço."
      });
    }
  }

  public async cadastrarOrdemServico(req: Request, res: Response) {
    try {
      const {
        id_cliente,
        id_aparelho,
        id_funcionario,
        problema
      } = req.body;

      if (!id_cliente || !id_aparelho || !problema) {
        res.status(400).json({
          mensagem: "Preencha os campos obrigatórios."
        });
        return;
      }

      const funcionario = id_funcionario
        ? Number(id_funcionario)
        : null;

      const ordem = await ordemServicoModel.cadastrarOrdemServico(
        Number(id_cliente),
        Number(id_aparelho),
        funcionario,
        problema
      );

      res.status(201).json(ordem);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar ordem de serviço."
      });
    }
  }

  public async atualizarOrdemServico(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const {
        id_cliente,
        id_aparelho,
        id_funcionario,
        problema,
        status,
        valor
      } = req.body;

      if (
        !id_cliente ||
        !id_aparelho ||
        !problema ||
        !status ||
        valor === undefined
      ) {
        res.status(400).json({
          mensagem: "Preencha todos os campos obrigatórios."
        });
        return;
      }

      if (!statusPermitidos.includes(status)) {
        res.status(400).json({
          mensagem: "Status inválido."
        });
        return;
      }

      if (Number(valor) < 0 || !Number.isFinite(Number(valor))) {
        res.status(400).json({
          mensagem: "O valor deve ser maior ou igual a zero."
        });
        return;
      }

      const funcionario = id_funcionario
        ? Number(id_funcionario)
        : null;

      const ordem = await ordemServicoModel.atualizarOrdemServico(
        id,
        Number(id_cliente),
        Number(id_aparelho),
        funcionario,
        problema,
        status,
        Number(valor)
      );

      if (!ordem) {
        res.status(404).json({
          mensagem: "Ordem de serviço não encontrada."
        });
        return;
      }

      res.status(200).json(ordem);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar ordem de serviço."
      });
    }
  }

  public async excluirOrdemServico(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const ordem = await ordemServicoModel.excluirOrdemServico(id);

      if (!ordem) {
        res.status(404).json({
          mensagem: "Ordem de serviço não encontrada."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Ordem de serviço excluída com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir ordem de serviço."
      });
    }
  }
}

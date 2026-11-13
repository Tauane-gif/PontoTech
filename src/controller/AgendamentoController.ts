import type { Request, Response } from "express";
import { AgendamentoModel } from "../model/AgendamentoModel.js";

const agendamentoModel = new AgendamentoModel();

export class AgendamentoController {
  public async listarAgendamentos(_req: Request, res: Response) {
    try {
      const agendamentos = await agendamentoModel.listarAgendamentos();
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar agendamentos."
      });
    }
  }

  public async buscarAgendamento(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const agendamento = await agendamentoModel.buscarAgendamento(id);

      if (!agendamento) {
        res.status(404).json({
          mensagem: "Agendamento não encontrado."
        });
        return;
      }

      res.status(200).json(agendamento);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar agendamento."
      });
    }
  }

  public async cadastrarAgendamento(req: Request, res: Response) {
    try {
      const { id_cliente, data, horario, observacao } = req.body;

      if (!id_cliente || !data || !horario) {
        res.status(400).json({
          mensagem: "Preencha o cliente, a data e o horário."
        });
        return;
      }

      const idCliente = Number(id_cliente);

      if (
        !Number.isInteger(idCliente) ||
        idCliente <= 0 ||
        typeof data !== "string" ||
        !data.trim() ||
        typeof horario !== "string" ||
        !horario.trim() ||
        (observacao !== undefined && typeof observacao !== "string")
      ) {
        res.status(400).json({
          mensagem: "Informe dados válidos para cadastrar o agendamento."
        });
        return;
      }

      const agendamento = await agendamentoModel.cadastrarAgendamento(
        idCliente,
        data,
        horario,
        observacao ?? ""
      );

      res.status(201).json(agendamento);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar agendamento."
      });
    }
  }

  public async atualizarAgendamento(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { id_cliente, data, horario, status, observacao } = req.body;

      if (!id_cliente || !data || !horario || !status) {
        res.status(400).json({
          mensagem: "Preencha todos os campos obrigatórios."
        });
        return;
      }

      const idCliente = Number(id_cliente);

      if (
        !Number.isInteger(id) ||
        id <= 0 ||
        !Number.isInteger(idCliente) ||
        idCliente <= 0 ||
        typeof data !== "string" ||
        !data.trim() ||
        typeof horario !== "string" ||
        !horario.trim() ||
        typeof status !== "string" ||
        !status.trim() ||
        (observacao !== undefined && typeof observacao !== "string")
      ) {
        res.status(400).json({
          mensagem: "Informe dados válidos para atualizar o agendamento."
        });
        return;
      }

      const agendamento = await agendamentoModel.atualizarAgendamento(
        id,
        idCliente,
        data,
        horario,
        status,
        observacao ?? ""
      );

      if (!agendamento) {
        res.status(404).json({
          mensagem: "Agendamento não encontrado."
        });
        return;
      }

      res.status(200).json(agendamento);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar agendamento."
      });
    }
  }

  public async excluirAgendamento(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({
          mensagem: "ID inválido."
        });
        return;
      }

      const agendamento = await agendamentoModel.excluirAgendamento(id);

      if (!agendamento) {
        res.status(404).json({
          mensagem: "Agendamento não encontrado."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Agendamento excluído com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir agendamento."
      });
    }
  }
}
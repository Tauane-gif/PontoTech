
import type { Request, Response } from "express";
import { ClienteModel } from "../model/ClienteModel.js";

const clienteModel = new ClienteModel();

export class ClienteController {
  public async listarClientes(_req: Request, res: Response): Promise<void> {
    try {
      const clientes = await clienteModel.listarClientes();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar clientes."
      });
    }
  }

  public async buscarCliente(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const cliente = await clienteModel.buscarCliente(id);

      if (!cliente) {
        res.status(404).json({
          mensagem: "Cliente não encontrado."
        });
        return;
      }

      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar cliente."
      });
    }
  }

  public async cadastrarCliente(req: Request, res: Response): Promise<void> {
    try {
      const { nome, cpf, telefone, email } = req.body;

      if (!nome || !telefone) {
        res.status(400).json({
          mensagem: "Nome e telefone são obrigatórios."
        });
        return;
      }

      const cliente = await clienteModel.cadastrarCliente(
        nome,
        cpf,
        telefone,
        email
      );

      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar cliente."
      });
    }
  }

  public async atualizarCliente(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { nome, cpf, telefone, email } = req.body;

      const cliente = await clienteModel.atualizarCliente(
        id,
        nome,
        cpf,
        telefone,
        email
      );

      if (!cliente) {
        res.status(404).json({
          mensagem: "Cliente não encontrado."
        });
        return;
      }

      res.status(200).json(cliente);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar cliente."
      });
    }
  }

  public async excluirCliente(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const cliente = await clienteModel.excluirCliente(id);

      if (!cliente) {
        res.status(404).json({
          mensagem: "Cliente não encontrado."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Cliente excluído com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir cliente."
      });
    }
  }
}

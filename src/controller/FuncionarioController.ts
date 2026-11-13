
import type { Request, Response } from "express";
import { FuncionarioModel } from "../model/FuncionarioMode.js";

const funcionarioModel = new FuncionarioModel();

export class FuncionarioController {
  public async listarFuncionarios(_req: Request, res: Response): Promise<void> {
    try {
      const funcionarios = await funcionarioModel.listarFuncionarios();
      res.status(200).json(funcionarios);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar funcionários."
      });
    }
  }

  public async buscarFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const funcionario = await funcionarioModel.buscarFuncionario(id);

      if (!funcionario) {
        res.status(404).json({
          mensagem: "Funcionário não encontrado."
        });
        return;
      }

      res.status(200).json(funcionario);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar funcionário."
      });
    }
  }

  public async cadastrarFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, senha, cargo } = req.body;

      if (!nome || !email || !senha || !cargo) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      if (!["Administrador", "Técnico", "Atendente"].includes(cargo)) {
        res.status(400).json({
          mensagem: "Cargo inválido."
        });
        return;
      }

      const funcionario = await funcionarioModel.cadastrarFuncionario(
        nome,
        email,
        senha,
        cargo
      );

      res.status(201).json(funcionario);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar funcionário."
      });
    }
  }

  public async atualizarFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { nome, email, senha, cargo } = req.body;

      const funcionario = await funcionarioModel.atualizarFuncionario(
        id,
        nome,
        email,
        senha,
        cargo
      );

      if (!funcionario) {
        res.status(404).json({
          mensagem: "Funcionário não encontrado."
        });
        return;
      }

      res.status(200).json(funcionario);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar funcionário."
      });
    }
  }

  public async excluirFuncionario(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const funcionario = await funcionarioModel.excluirFuncionario(id);

      if (!funcionario) {
        res.status(404).json({
          mensagem: "Funcionário não encontrado."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Funcionário excluído com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir funcionário."
      });
    }
  }
}

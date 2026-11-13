
import type { Request, Response } from "express";
import { AparelhoModel } from "../model/AparelhoModel.js";

const aparelhoModel = new AparelhoModel();

export class AparelhoController {
  public async listarAparelhos(_req: Request, res: Response) {
    try {
      const aparelhos = await aparelhoModel.listarAparelhos();
      res.status(200).json(aparelhos);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar aparelhos."
      });
    }
  }

  public async buscarAparelho(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const aparelho = await aparelhoModel.buscarAparelho(id);

      if (!aparelho) {
        res.status(404).json({
          mensagem: "Aparelho não encontrado."
        });
        return;
      }

      res.status(200).json(aparelho);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar aparelho."
      });
    }
  }

  public async cadastrarAparelho(req: Request, res: Response) {
    try {
      const { id_cliente, tipo, marca, modelo } = req.body;

      if (!id_cliente || !tipo || !marca || !modelo) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const aparelho = await aparelhoModel.cadastrarAparelho(
        Number(id_cliente),
        tipo,
        marca,
        modelo
      );

      res.status(201).json(aparelho);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar aparelho."
      });
    }
  }

  public async atualizarAparelho(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { id_cliente, tipo, marca, modelo } = req.body;

      if (!id_cliente || !tipo || !marca || !modelo) {
        res.status(400).json({
          mensagem: "Preencha todos os campos."
        });
        return;
      }

      const aparelho = await aparelhoModel.atualizarAparelho(
        id,
        Number(id_cliente),
        tipo,
        marca,
        modelo
      );

      if (!aparelho) {
        res.status(404).json({
          mensagem: "Aparelho não encontrado."
        });
        return;
      }

      res.status(200).json(aparelho);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar aparelho."
      });
    }
  }

  public async excluirAparelho(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const aparelho = await aparelhoModel.excluirAparelho(id);

      if (!aparelho) {
        res.status(404).json({
          mensagem: "Aparelho não encontrado."
        });
        return;
      }

      res.status(200).json({
        mensagem: "Aparelho excluído com sucesso."
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir aparelho."
      });
    }
  }
}

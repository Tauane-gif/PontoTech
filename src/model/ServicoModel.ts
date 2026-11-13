
import { DatabaseModel } from "./DatabaseModel.js";

export class ServicoModel {
  private database: DatabaseModel;

  constructor() {
    this.database = new DatabaseModel();
  }

  public async listarServicos() {
    const sql = `
      SELECT * FROM servico
      ORDER BY id_servico
    `;

    const resultado = await this.database.pool.query(sql);
    return resultado.rows;
  }

  public async buscarServico(id: number) {
    const sql = `
      SELECT * FROM servico
      WHERE id_servico = $1
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }

  public async cadastrarServico(
    id_ordem: number,
    descricao: string,
    valor: number
  ) {
    const sql = `
      INSERT INTO servico (id_ordem, descricao, valor)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const valores = [id_ordem, descricao, valor];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async atualizarServico(
    id: number,
    id_ordem: number,
    descricao: string,
    valor: number
  ) {
    const sql = `
      UPDATE servico
      SET id_ordem = $1,
          descricao = $2,
          valor = $3
      WHERE id_servico = $4
      RETURNING *
    `;

    const valores = [id_ordem, descricao, valor, id];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async excluirServico(id: number) {
    const sql = `
      DELETE FROM servico
      WHERE id_servico = $1
      RETURNING *
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }
}

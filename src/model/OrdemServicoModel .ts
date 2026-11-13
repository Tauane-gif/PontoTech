
import { DatabaseModel } from "./DatabaseModel.js";

export class OrdemServicoModel {
  private database: DatabaseModel;

  constructor() {
    this.database = new DatabaseModel();
  }

  public async listarOrdensServico() {
    const sql = `
      SELECT * FROM ordem_servico
      ORDER BY id_ordem
    `;

    const resultado = await this.database.pool.query(sql);
    return resultado.rows;
  }

  public async buscarOrdemServico(id: number) {
    const sql = `
      SELECT * FROM ordem_servico
      WHERE id_ordem = $1
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }

  public async cadastrarOrdemServico(
    id_cliente: number,
    id_aparelho: number,
    id_funcionario: number | null,
    problema: string
  ) {
    const sql = `
      INSERT INTO ordem_servico
      (id_cliente, id_aparelho, id_funcionario, problema)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const valores = [
      id_cliente,
      id_aparelho,
      id_funcionario,
      problema
    ];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async atualizarOrdemServico(
    id: number,
    id_cliente: number,
    id_aparelho: number,
    id_funcionario: number | null,
    problema: string,
    status: string,
    valor: number
  ) {
    const sql = `
      UPDATE ordem_servico
      SET id_cliente = $1,
          id_aparelho = $2,
          id_funcionario = $3,
          problema = $4,
          status = $5,
          valor = $6
      WHERE id_ordem = $7
      RETURNING *
    `;

    const valores = [
      id_cliente,
      id_aparelho,
      id_funcionario,
      problema,
      status,
      valor,
      id
    ];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async excluirOrdemServico(id: number) {
    const sql = `
      DELETE FROM ordem_servico
      WHERE id_ordem = $1
      RETURNING *
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }
}

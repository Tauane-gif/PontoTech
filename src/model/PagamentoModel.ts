
import { DatabaseModel } from "./DatabaseModel.js";

export class PagamentoModel {
  private database: DatabaseModel;

  constructor() {
    this.database = new DatabaseModel();
  }

  public async listarPagamentos() {
    const sql = `
      SELECT * FROM pagamento
      ORDER BY id_pagamento
    `;

    const resultado = await this.database.pool.query(sql);
    return resultado.rows;
  }

  public async buscarPagamento(id: number) {
    const sql = `
      SELECT * FROM pagamento
      WHERE id_pagamento = $1
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }

  public async cadastrarPagamento(
    id_ordem: number,
    valor: number,
    forma_pagamento: string
  ) {
    const sql = `
      INSERT INTO pagamento (id_ordem, valor, forma_pagamento)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const valores = [id_ordem, valor, forma_pagamento];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async atualizarPagamento(
    id: number,
    id_ordem: number,
    valor: number,
    forma_pagamento: string,
    status: string
  ) {
    const sql = `
      UPDATE pagamento
      SET id_ordem = $1,
          valor = $2,
          forma_pagamento = $3,
          status = $4
      WHERE id_pagamento = $5
      RETURNING *
    `;

    const valores = [
      id_ordem,
      valor,
      forma_pagamento,
      status,
      id
    ];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async excluirPagamento(id: number) {
    const sql = `
      DELETE FROM pagamento
      WHERE id_pagamento = $1
      RETURNING *
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }
}

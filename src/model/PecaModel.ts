
import { DatabaseModel } from "./DatabaseModel.js";

export class PecaModel {
  private database: DatabaseModel;

  constructor() {
    this.database = new DatabaseModel();
  }

  public async listarPecas() {
    const sql = `
      SELECT * FROM peca
      ORDER BY id_peca
    `;

    const resultado = await this.database.pool.query(sql);
    return resultado.rows;
  }

  public async buscarPeca(id: number) {
    const sql = `
      SELECT * FROM peca
      WHERE id_peca = $1
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }

  public async cadastrarPeca(
    nome: string,
    preco: number,
    quantidade: number
  ) {
    const sql = `
      INSERT INTO peca (nome, preco, quantidade)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const valores = [nome, preco, quantidade];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async atualizarPeca(
    id: number,
    nome: string,
    preco: number,
    quantidade: number
  ) {
    const sql = `
      UPDATE peca
      SET nome = $1,
          preco = $2,
          quantidade = $3
      WHERE id_peca = $4
      RETURNING *
    `;

    const valores = [nome, preco, quantidade, id];

    const resultado = await this.database.pool.query(sql, valores);
    return resultado.rows[0];
  }

  public async excluirPeca(id: number) {
    const sql = `
      DELETE FROM peca
      WHERE id_peca = $1
      RETURNING *
    `;

    const resultado = await this.database.pool.query(sql, [id]);
    return resultado.rows[0];
  }
}

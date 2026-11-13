
import { DatabaseModel } from "./DatabaseModel.js";

export class AparelhoModel {
  private database: DatabaseModel;

  constructor() {
    this.database = new DatabaseModel();
  }

  public async listarAparelhos() {
    const sql = "SELECT * FROM aparelho ORDER BY id_aparelho";
    const resultado = await this.database.pool.query(sql);

    return resultado.rows;
  }

  public async buscarAparelho(id: number) {
    const sql = "SELECT * FROM aparelho WHERE id_aparelho = $1";
    const resultado = await this.database.pool.query(sql, [id]);

    return resultado.rows[0];
  }

  public async cadastrarAparelho(
    id_cliente: number,
    tipo: string,
    marca: string,
    modelo: string
  ) {
    const sql = `
      INSERT INTO aparelho (id_cliente, tipo, marca, modelo)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const valores = [id_cliente, tipo, marca, modelo];
    const resultado = await this.database.pool.query(sql, valores);

    return resultado.rows[0];
  }

  public async atualizarAparelho(
    id: number,
    id_cliente: number,
    tipo: string,
    marca: string,
    modelo: string
  ) {
    const sql = `
      UPDATE aparelho
      SET id_cliente = $1, tipo = $2, marca = $3, modelo = $4
      WHERE id_aparelho = $5
      RETURNING *
    `;

    const valores = [id_cliente, tipo, marca, modelo, id];
    const resultado = await this.database.pool.query(sql, valores);

    return resultado.rows[0];
  }

  public async excluirAparelho(id: number) {
    const sql = `
      DELETE FROM aparelho
      WHERE id_aparelho = $1
      RETURNING *
    `;

    const resultado = await this.database.pool.query(sql, [id]);

    return resultado.rows[0];
  }
}

import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

/**
 * Classe que representa o modelo de banco de dados.
 */
export class DatabaseModel {
  /**
   * Configuração para conexão com o banco de dados.
   */
  private readonly _config: pg.PoolConfig;

  /**
   * Pool de conexões com o banco de dados.
   */
  private readonly _pool: pg.Pool;

  /**
   * Cliente de conexão com o banco de dados.
   */
  private readonly _client: pg.Client;

  /**
   * Construtor da classe DatabaseModel.
   */
  constructor() {
    this._config = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST ?? "localhost",
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT ?? 5432),
      max: 10,
      idleTimeoutMillis: 10000,
    };

    this._pool = new pg.Pool(this._config);
    this._client = new pg.Client(this._config);
  }

  /**
   * Método para testar a conexão com o banco de dados.
   */
  public async testeConexao(): Promise<boolean> {
    try {
      await this._client.connect();
      console.log("Database connected!");
      await this._client.end();
      return true;
    } catch (error) {
      console.log("Error to connect database X(");
      console.error(error);
      await this._client.end().catch(() => undefined);
      return false;
    }
  }

  /**
   * Getter para o pool de conexões.
   */
  public get pool(): pg.Pool {
    return this._pool;
  }
}

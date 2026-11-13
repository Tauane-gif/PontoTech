
import { DatabaseModel } from "./DatabaseModel.js";

export class ClienteModel {
    private database: DatabaseModel;

    constructor() {
        this.database = new DatabaseModel();
    }

    // Listar clientes
    public async listarClientes() {
        const sql = "SELECT * FROM cliente ORDER BY id_cliente";

        const resultado = await this.database.pool.query(sql);

        return resultado.rows;
    }

    // Buscar cliente pelo ID
    public async buscarCliente(id: number) {
        const sql = "SELECT * FROM cliente WHERE id_cliente = $1";

        const resultado = await this.database.pool.query(sql, [id]);

        return resultado.rows[0];
    }

    // Cadastrar cliente
    public async cadastrarCliente(
        nome: string,
        cpf: string,
        telefone: string,
        email: string
    ) {
        const sql = `
            INSERT INTO cliente (nome, cpf, telefone, email)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [
            nome,
            cpf,
            telefone,
            email
        ]);

        return resultado.rows[0];
    }

    // Atualizar cliente
    public async atualizarCliente(
        id: number,
        nome: string,
        cpf: string,
        telefone: string,
        email: string
    ) {
        const sql = `
            UPDATE cliente
            SET nome = $1, cpf = $2, telefone = $3, email = $4
            WHERE id_cliente = $5
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [
            nome,
            cpf,
            telefone,
            email,
            id
        ]);

        return resultado.rows[0];
    }

    // Excluir cliente
    public async excluirCliente(id: number) {
        const sql = "DELETE FROM cliente WHERE id_cliente = $1 RETURNING *";

        const resultado = await this.database.pool.query(sql, [id]);

        return resultado.rows[0];
    }
}


import { DatabaseModel } from "./DatabaseModel.js";

export class FuncionarioModel {
    private database: DatabaseModel;

    constructor() {
        this.database = new DatabaseModel();
    }

    // Listar funcionários
    public async listarFuncionarios() {
        const sql = "SELECT * FROM funcionario ORDER BY id_funcionario";

        const resultado = await this.database.pool.query(sql);

        return resultado.rows;
    }

    // Buscar funcionário pelo ID
    public async buscarFuncionario(id: number) {
        const sql = "SELECT * FROM funcionario WHERE id_funcionario = $1";

        const resultado = await this.database.pool.query(sql, [id]);

        return resultado.rows[0];
    }

    // Cadastrar funcionário
    public async cadastrarFuncionario(
        nome: string,
        email: string,
        senha: string,
        cargo: string
    ) {
        const sql = `
            INSERT INTO funcionario (nome, email, senha, cargo)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [
            nome,
            email,
            senha,
            cargo
        ]);

        return resultado.rows[0];
    }

    // Atualizar funcionário
    public async atualizarFuncionario(
        id: number,
        nome: string,
        email: string,
        senha: string,
        cargo: string
    ) {
        const sql = `
            UPDATE funcionario
            SET nome = $1, email = $2, senha = $3, cargo = $4
            WHERE id_funcionario = $5
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [
            nome,
            email,
            senha,
            cargo,
            id
        ]);

        return resultado.rows[0];
    }

    // Excluir funcionário
    public async excluirFuncionario(id: number) {
        const sql = `
            DELETE FROM funcionario
            WHERE id_funcionario = $1
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [id]);

        return resultado.rows[0];
    }
}

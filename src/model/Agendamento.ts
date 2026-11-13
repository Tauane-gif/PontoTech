import { DatabaseModel } from "./DatabaseModel.js";

export class AgendamentoModel {
    private database: DatabaseModel;

    constructor() {
        this.database = new DatabaseModel();
    }

    // Listar agendamentos
    public async listarAgendamentos() {
        const sql = `
            SELECT * FROM agendamento
            ORDER BY data, horario, id_agendamento
        `;

        const resultado = await this.database.pool.query(sql);

        return resultado.rows;
    }

    // Buscar agendamento pelo ID
    public async buscarAgendamento(id: number) {
        const sql = "SELECT * FROM agendamento WHERE id_agendamento = $1";

        const resultado = await this.database.pool.query(sql, [id]);

        return resultado.rows[0];
    }

    // Cadastrar agendamento
    public async cadastrarAgendamento(
        id_cliente: number,
        data: string,
        horario: string,
        observacao: string
    ) {
        const sql = `
            INSERT INTO agendamento (id_cliente, data, horario, observacao)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [
            id_cliente,
            data,
            horario,
            observacao
        ]);

        return resultado.rows[0];
    }

    // Atualizar agendamento
    public async atualizarAgendamento(
        id: number,
        id_cliente: number,
        data: string,
        horario: string,
        status: string,
        observacao: string
    ) {
        const sql = `
            UPDATE agendamento
            SET id_cliente = $1,
                data = $2,
                horario = $3,
                status = $4,
                observacao = $5
            WHERE id_agendamento = $6
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [
            id_cliente,
            data,
            horario,
            status,
            observacao,
            id
        ]);

        return resultado.rows[0];
    }

    // Excluir agendamento
    public async excluirAgendamento(id: number) {
        const sql = `
            DELETE FROM agendamento
            WHERE id_agendamento = $1
            RETURNING *
        `;

        const resultado = await this.database.pool.query(sql, [id]);

        return resultado.rows[0];
    }
}
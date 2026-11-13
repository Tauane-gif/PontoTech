
-- TABELA CLIENTE
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100)
);

-- TABELA AGENDAMENTO
CREATE TABLE agendamento (
    id_agendamento SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    status VARCHAR(30) DEFAULT 'Agendado',
    observacao TEXT,

    FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente)
);

-- TABELA APARELHO
CREATE TABLE aparelho (
    id_aparelho SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(100) NOT NULL,

    FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente)
);

-- TABELA PAGAMENTO
CREATE TABLE pagamento (
    id_pagamento SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    valor NUMERIC(10,2) NOT NULL,
    forma_pagamento VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendente',

    FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente),

    CHECK (valor > 0)
);

-- LISTAR CLIENTES
SELECT * FROM cliente;

-- LISTAR AGENDAMENTOS
SELECT * FROM agendamento;

-- LISTAR APARELHOS
SELECT * FROM aparelho;

-- LISTAR PAGAMENTOS
SELECT * FROM pagamento;


-- CADASTRAR CLIENTES
INSERT INTO cliente (nome, cpf, telefone, email) VALUES
('João Silva', '123.456.789-00', '(16) 99999-1111', 'joao@gmail.com'),
('Maria Oliveira', '234.567.890-11', '(16) 98888-2222', 'maria@gmail.com'),
('Pedro Santos', '345.678.901-22', '(16) 97777-3333', 'pedro@gmail.com'),
('Ana Costa', '456.789.012-33', '(16) 96666-4444', 'ana@gmail.com'),
('Lucas Souza', '567.890.123-44', '(16) 95555-5555', 'lucas@gmail.com');


-- CADASTRAR APARELHOS
INSERT INTO aparelho (id_cliente, tipo, marca, modelo) VALUES
(1, 'Celular', 'Samsung', 'Galaxy S23'),
(2, 'Notebook', 'Dell', 'Inspiron 15'),
(3, 'Tablet', 'Apple', 'iPad 10'),
(4, 'Televisão', 'LG', 'Smart TV 50'),
(5, 'Computador', 'Acer', 'Aspire TC');


-- CADASTRAR AGENDAMENTOS
INSERT INTO agendamento
(id_cliente, data, horario, status, observacao) VALUES
(1, '2026-11-15', '09:00', 'Agendado', 'Avaliação de celular'),
(2, '2026-11-15', '10:00', 'Agendado', 'Avaliação de notebook'),
(3, '2026-11-16', '14:00', 'Agendado', 'Verificar bateria'),
(4, '2026-11-16', '15:00', 'Agendado', 'Avaliação de televisão'),
(5, '2026-11-17', '09:30', 'Agendado', 'Manutenção de computador');


-- CADASTRAR PAGAMENTOS
INSERT INTO pagamento
(id_cliente, valor, forma_pagamento, status) VALUES
(1, 200.00, 'Pix', 'Pago'),
(2, 100.00, 'Cartão', 'Pendente'),
(3, 250.00, 'Dinheiro', 'Pendente'),
(4, 500.00, 'Pix', 'Pago'),
(5, 180.00, 'Cartão', 'Pago');


-- CONSULTAR TODAS AS TABELAS
SELECT * FROM cliente;
SELECT * FROM agendamento;
SELECT * FROM aparelho;
SELECT * FROM pagamento;

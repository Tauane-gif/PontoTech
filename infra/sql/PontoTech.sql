-- TABELA CLIENTE
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100)
);

-- TABELA FUNCIONARIO
CREATE TABLE funcionario (
    id_funcionario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(30) NOT NULL
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

-- TABELA ORDEM DE SERVICO
CREATE TABLE ordem_servico (
    id_ordem SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    id_aparelho INTEGER NOT NULL,
    id_funcionario INTEGER,
    data_entrada DATE DEFAULT CURRENT_DATE,
    problema TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'Aberta',
    valor NUMERIC(10,2) DEFAULT 0,

    FOREIGN KEY (id_cliente)
    REFERENCES cliente(id_cliente),

    FOREIGN KEY (id_aparelho)
    REFERENCES aparelho(id_aparelho),

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionario(id_funcionario),

    CHECK (valor >= 0),

    CHECK (status IN (
        'Aberta',
        'Em andamento',
        'Aguardando peça',
        'Concluída',
        'Entregue',
        'Cancelada'
    ))
);

-- TABELA SERVICO
CREATE TABLE servico (
    id_servico SERIAL PRIMARY KEY,
    id_ordem INTEGER NOT NULL,
    descricao VARCHAR(150) NOT NULL,
    valor NUMERIC(10,2) NOT NULL,

    FOREIGN KEY (id_ordem)
    REFERENCES ordem_servico(id_ordem),

    CHECK (valor >= 0)
);

-- TABELA PECA
CREATE TABLE peca (
    id_peca SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    quantidade INTEGER DEFAULT 0,

    CHECK (preco >= 0),
    CHECK (quantidade >= 0)
);

-- TABELA PAGAMENTO
CREATE TABLE pagamento (
    id_pagamento SERIAL PRIMARY KEY,
    id_ordem INTEGER NOT NULL,
    valor NUMERIC(10,2) NOT NULL,
    forma_pagamento VARCHAR(30) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendente',

    FOREIGN KEY (id_ordem)
    REFERENCES ordem_servico(id_ordem),

    CHECK (valor > 0)
);

-- TABELA MOVIMENTACAO DE ESTOQUE
CREATE TABLE movimentacao_estoque (
    id_movimentacao SERIAL PRIMARY KEY,
    id_peca INTEGER NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    quantidade INTEGER NOT NULL,
    data DATE DEFAULT CURRENT_DATE,

    FOREIGN KEY (id_peca)
    REFERENCES peca(id_peca),

    CHECK (tipo IN ('Entrada', 'Saída')),
    CHECK (quantidade > 0)
);

-- Listar clientes
SELECT * FROM cliente;

-- Listar aparelhos
SELECT * FROM aparelho;

-- Listar ordens de serviço
SELECT * FROM ordem_servico;

-- Consultar pagamentos
SELECT * FROM pagamento;

-- Consultar peças em estoque
SELECT * FROM peca;

INSERT INTO cliente (nome, cpf, telefone, email) VALUES
('João Silva', '123.456.789-00', '(16) 99999-1111', 'joao@gmail.com'),
('Maria Oliveira', '234.567.890-11', '(16) 98888-2222', 'maria@gmail.com'),
('Pedro Santos', '345.678.901-22', '(16) 97777-3333', 'pedro@gmail.com'),
('Ana Costa', '456.789.012-33', '(16) 96666-4444', 'ana@gmail.com'),
('Lucas Souza', '567.890.123-44', '(16) 95555-5555', 'lucas@gmail.com');

INSERT INTO funcionario (nome, email, senha, cargo) VALUES
('Carlos Mendes', 'carlos@gmail.com', 'hash_senha_1', 'Técnico'),
('Fernanda Lima', 'fernanda@gmail.com', 'hash_senha_2', 'Atendente'),
('Roberto Alves', 'roberto@gmail.com', 'hash_senha_3', 'Administrador');

INSERT INTO aparelho (id_cliente, tipo, marca, modelo) VALUES
(1, 'Celular', 'Samsung', 'Galaxy S23'),
(2, 'Notebook', 'Dell', 'Inspiron 15'),
(3, 'Tablet', 'Apple', 'iPad 10'),
(4, 'Televisão', 'LG', 'Smart TV 50'),
(5, 'Computador', 'Acer', 'Aspire TC');

INSERT INTO ordem_servico
(id_cliente, id_aparelho, id_funcionario, problema, status, valor)
VALUES
(1, 1, 1, 'Tela quebrada', 'Em andamento', 450.00),
(2, 2, 1, 'Notebook não liga', 'Aguardando peça', 300.00),
(3, 3, 1, 'Problema na bateria', 'Aberta', 250.00),
(4, 4, 1, 'Televisão sem imagem', 'Concluída', 500.00),
(5, 5, 1, 'Computador lento', 'Entregue', 180.00);

INSERT INTO servico (id_ordem, descricao, valor) VALUES
(1, 'Troca de tela', 450.00),
(2, 'Diagnóstico de placa', 300.00),
(3, 'Troca de bateria', 250.00),
(4, 'Reparo na tela', 500.00),
(5, 'Limpeza e formatação', 180.00);

INSERT INTO peca (nome, preco, quantidade) VALUES
('Tela Samsung S23', 250.00, 10),
('Bateria de notebook Dell', 120.00, 8),
('Bateria iPad', 100.00, 5),
('Placa de televisão LG', 300.00, 4),
('Memória RAM 8GB', 90.00, 15);

INSERT INTO pagamento (id_ordem, valor, forma_pagamento, status) VALUES
(1, 200.00, 'Pix', 'Pago'),
(2, 100.00, 'Cartão', 'Pendente'),
(3, 250.00, 'Dinheiro', 'Pendente'),
(4, 500.00, 'Pix', 'Pago'),
(5, 180.00, 'Cartão', 'Pago');

INSERT INTO movimentacao_estoque
(id_peca, tipo, quantidade) VALUES
(1, 'Entrada', 10),
(2, 'Entrada', 8),
(3, 'Entrada', 5),
(4, 'Entrada', 4),
(5, 'Entrada', 15),
(1, 'Saída', 1),
(5, 'Saída', 2);

SELECT * FROM cliente;
SELECT * FROM funcionario;
SELECT * FROM aparelho;
SELECT * FROM ordem_servico;
SELECT * FROM servico;
SELECT * FROM peca;
SELECT * FROM pagamento;
SELECT * FROM movimentacao_estoque;
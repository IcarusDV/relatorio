<?php
// Configurações de conexão com o banco de dados PostgreSQL
$host = "localhost"; // Endereço do servidor PostgreSQL
$port = "5432"; // Porta do PostgreSQL
$dbname = "relatorio_agendamentos"; // Nome do banco de dados
$username = "postgres"; // Usuário do banco de dados
$password = "postgres"; // Senha do banco de dados

// Criar a conexão com PostgreSQL
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$username password=$password");

// Verificar a conexão
if (!$conn) {
    die("Conexão falhou: " . pg_last_error());
}
?>

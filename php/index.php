<?php
include('db.php'); // Conexão com o banco de dados

// Definir a página atual e o número de registros por página
$pagina_atual = isset($_GET['page']) ? $_GET['page'] : 1;
$registros_por_pagina = 10;
$offset = ($pagina_atual - 1) * $registros_por_pagina;

// Consulta para pegar os dados necessários com paginação e filtros
$search = isset($_POST['search']) ? $_POST['search'] : '';
$sql = "SELECT * FROM agendamentos WHERE placa ILIKE '%$search%' LIMIT $registros_por_pagina OFFSET $offset";
$result = pg_query($conn, $sql);

// Contar o número total de registros
$count_sql = "SELECT COUNT(*) FROM agendamentos WHERE placa ILIKE '%$search%'";
$count_result = pg_query($conn, $count_sql);
$total_registros = pg_fetch_result($count_result, 0, 0);
$total_paginas = ceil($total_registros / $registros_por_pagina);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Agendamentos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container mt-5">
        <h2 class="text-center">Relatório de Agendamentos</h2>
        <!-- Filtro de Busca -->
        <form method="POST" action="">
            <div class="mb-3">
                <input type="text" class="form-control" name="search" placeholder="Buscar por placa" value="<?= $search ?>">
            </div>
            <button type="submit" class="btn btn-primary">Buscar</button>
        </form>
        
        <!-- Tabela de Dados -->
        <table class="table table-bordered mt-4">
            <thead class="table-light">
                <tr>
                    <th>Data de Solicitação</th>
                    <th>Empresa</th>
                    <th>Relatório</th>
                    <th>Placas</th>
                    <th>Data Início</th>
                    <th>Data Fim</th>
                    <th>E-mail</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = pg_fetch_assoc($result)): ?>
                    <tr>
                        <td><?= $row['data_solicitacao'] ?></td>
                        <td><?= $row['empresa'] ?></td>
                        <td><?= $row['relatorio'] ?></td>
                        <td><?= implode(', ', explode(';', $row['placas'])) ?></td>
                        <td><?= $row['data_inicio'] ?></td>
                        <td><?= $row['data_fim'] ?></td>
                        <td><?= $row['email'] ?></td>
                        <td><?= $row['status'] ?></td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>

        <!-- Paginação -->
        <nav>
            <ul class="pagination justify-content-center">
                <?php for ($i = 1; $i <= $total_paginas; $i++): ?>
                    <li class="page-item <?= $i == $pagina_atual ? 'active' : '' ?>">
                        <a class="page-link" href="?page=<?= $i ?>&search=<?= $search ?>"><?= $i ?></a>
                    </li>
                <?php endfor; ?>
            </ul>
        </nav>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="scripts.js"></script>
</body>
</html>

<?php pg_close($conn); ?>

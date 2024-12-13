// Função para exibir o relatório
// function gerarRelatorio() {
//     const placasSelecionadas = $('#placas').val(); // Pega as placas selecionadas
//     const dataInicial = $('#data_inicial').val();
//     const dataFinal = $('#data_final').val();

    // Simulando os dados de carros
//     const dados = [
//         { placa: 'ABC1234', status: 'Agendado', data: '2024-12-13' },
//         { placa: 'XYZ5678', status: 'Executado', data: '2024-12-14' },
//         { placa: 'LMN9876', status: 'Agendado', data: '2024-12-12' },
//     ];

//     // Filtrando os dados conforme os filtros
//     const resultado = dados.filter(item => {
//         const data = new Date(item.data);
//         const inicio = new Date(dataInicial);
//         const fim = new Date(dataFinal);
//         return placasSelecionadas.includes(item.placa) &&
//             data >= inicio && data <= fim;
//     });

//     // Exibindo o relatório
//     const relatorio = resultado.map(item => {
//         return `<tr><td>${item.placa}</td><td>${item.status}</td><td>${item.data}</td><td><button class="btn btn-info">Detalhes</button></td></tr>`;
//     }).join('');
//     $('#relatorio').html(relatorio);
// }

// // Gerar o relatório ao aplicar filtros
// $('#placas, #data_inicial, #data_final').on('change', function() {
//     gerarRelatorio();
// });

// // Enviar e-mail
// $('#enviar-email').on('click', function() {
//     const email = $('#email').val();
//     if (email) {
//         alert('Relatório enviado para: ' + email);
//     } else {
//         alert('Por favor, insira um e-mail');
//     }
// });

// $(document).ready(function () {
//     // Exemplo de funcionalidade para animações ou interações
// });


// Função para gerar relatório
function gerarRelatorio(tipo) {
    let relatorio = "";

    if (tipo === "dados") {
        // Relatório completo
        relatorio = "Relatório de Dados\n\n";
        data.forEach(item => {
            relatorio += `
                Empresa: ${item.empresa}\n
                Relatório: ${item.relatorio}\n
                Placas: ${item.placas}\n
                Data Início: ${item.inicio}\n
                Data Fim: ${item.fim}\n
                Status: ${item.status}\n
                Data Envio: ${item.envio}\n
                -----------------------------------\n
            `;
        });
    } else if (tipo === "status") {
        // Relatório de Status
        relatorio = "Relatório de Status\n\n";
        data.forEach(item => {
            relatorio += `
                Empresa: ${item.empresa}\n
                Status: ${item.status}\n
                -----------------------------------\n
            `;
        });
    } else if (tipo === "agendamento") {
        // Relatório de Agendamento
        relatorio = "Relatório de Agendamento\n\n";
        data.forEach(item => {
            relatorio += `
                Empresa: ${item.empresa}\n
                Relatório: ${item.relatorio}\n
                Status: ${item.status}\n
                -----------------------------------\n
            `;
        });
    }

    return relatorio;
}

// Função para enviar e-mail
function sendEmail(data) {
    const emailParams = {
        to_email: data.email,           // Destinatário do e-mail
        subject: `Relatório: ${data.relatorio}`,  // Assunto do e-mail
        message: `Olá, o relatório da empresa ${data.empresa} está pronto. 
                  Relatório: ${data.relatorio}
                  Placas: ${data.placas}
                  Status: ${data.status}
                  Data Início: ${data.inicio}
                  Data Fim: ${data.fim}`,  // Corpo do e-mail
    };

    emailjs.send("service_id", "template_id", emailParams)
        .then(response => {
            alert("E-mail enviado com sucesso!");
        })
        .catch(error => {
            alert("Falha ao enviar o e-mail: " + error.text);
        });
}

// Evento para alternar visibilidade do formulário
document.getElementById("novoAgendamentoBtn").addEventListener("click", function() {
    const form = document.getElementById("agendamentoForm");
    if (form.style.display === "none") {
        form.style.display = "block";
        this.innerText = "Fechar Formulário"; // Mudar texto do botão
    } else {
        form.style.display = "none";
        this.innerText = "Novo Agendamento"; // Restaura texto original
    }
});

// Evento de submit do formulário de agendamento
document.querySelector("#agendamento-form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Coletando os dados do formulário
    const empresa = document.querySelector("#empresa").value;
    const relatorio = document.querySelector("#relatorio").value;
    const placas = document.querySelector("#placas").value;
    const inicio = document.querySelector("#inicio").value;
    const fim = document.querySelector("#fim").value;
    const email = document.querySelector("#email").value;
    const status = document.querySelector("#status").value;

    // Criando o objeto de dados
    const newData = {
        solicitacao: new Date().toLocaleDateString(),
        empresa,
        relatorio,
        placas,
        inicio,
        fim,
        email,
        status,
        envio: "N/A"
    };

    // Adicionando os dados ao array e re-renderizando a tabela
    data.push(newData);
    renderTable(currentPage);

    // Enviar e-mail
    sendEmail(newData);

    // Limpar o formulário
    document.querySelector("#agendamento-form").reset();
});

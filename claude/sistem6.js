// ========================================
// JAVASCRIPT BÁSICO PARA SISTEMA DE FUNCIONÁRIOS
// ========================================

// 1. VARIÁVEIS GLOBAIS
// Estas variáveis ficam disponíveis em todo o código
let funcionarios = []; // Array (lista) para armazenar todos os funcionários
let proximoId = 1; // Variável para controlar o próximo ID único

// ========================================
// 2. FUNÇÃO QUE EXECUTA QUANDO A PÁGINA CARREGA
// ========================================
window.onload = function() {
    console.log("Página de funcionários carregada com sucesso!");
    
    // Busca o formulário na página
    const formulario = document.querySelector('form');
    
    // Se encontrou o formulário, adiciona um "ouvinte" de evento
    if (formulario) {
        // Quando o formulário for enviado, executa a função cadastrarFuncionario
        formulario.addEventListener('submit', cadastrarFuncionario);
    }
    
    // Carrega funcionários salvos anteriormente (se existirem)
    carregarFuncionariosSalvos();
    
    // Configura máscaras e formatações nos campos
    configurarMascaras();
    
    // Define a data de contratação como hoje
    configurarDataHoje();
};

// ========================================
// 3. FUNÇÃO PRINCIPAL - CADASTRAR FUNCIONÁRIO
// ========================================
function cadastrarFuncionario(evento) {
    // Impede que o formulário seja enviado normalmente
    evento.preventDefault();
    
    console.log("Iniciando cadastro de funcionário...");
    
    // PEGA OS VALORES DOS CAMPOS DO FORMULÁRIO
    const nome = document.getElementById('nomeFuncionario').value;
    const cpf = document.getElementById('cpfFuncionario').value;
    const rg = document.getElementById('rgFuncionario').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('emailFuncionario').value;
    const telefone = document.getElementById('telefoneFuncionario').value;
    const cargo = document.getElementById('cargoFuncionario').value;
    const dataContratacao = document.getElementById('dataContratacao').value;
    const salario = document.getElementById('salarioFuncionario').value;
    const endereco = document.getElementById('enderecoFuncionario').value;
    
    // VALIDAÇÃO BÁSICA DOS CAMPOS OBRIGATÓRIOS
    if (!validarCamposFuncionario(nome, cpf, email, cargo, salario)) {
        return; // Para a execução se a validação falhar
    }
    
    // CRIA UM OBJETO FUNCIONÁRIO
    // Um objeto é como uma ficha com informações organizadas
    const funcionario = {
        id: proximoId++, // Usa o próximo ID e depois incrementa
        nome: nome,
        cpf: cpf,
        rg: rg,
        dataNascimento: dataNascimento,
        email: email,
        telefone: telefone,
        cargo: cargo,
        dataContratacao: dataContratacao,
        salario: salario,
        endereco: endereco,
        dataCadastro: new Date().toLocaleDateString('pt-BR'), // Data atual
        ativo: true // Funcionário está ativo
    };
    
    // ADICIONA O FUNCIONÁRIO NA LISTA
    funcionarios.push(funcionario); // push = adicionar no final da lista
    
    console.log("Funcionário cadastrado:", funcionario);
    console.log("Total de funcionários:", funcionarios.length);
    
    // SALVA NO NAVEGADOR E MOSTRA MENSAGEM
    salvarFuncionarios();
    mostrarMensagemSucesso("Funcionário cadastrado com sucesso!");
    limparFormularioFuncionario();
}

// ========================================
// 4. FUNÇÃO DE VALIDAÇÃO ESPECÍFICA PARA FUNCIONÁRIOS
// ========================================
function validarCamposFuncionario(nome, cpf, email, cargo, salario) {
    // Verifica se os campos obrigatórios estão preenchidos
    
    // Validação do nome
    if (nome === "" || nome.trim() === "") {
        alert("Por favor, preencha o nome do funcionário!");
        document.getElementById('nomeFuncionario').focus();
        return false;
    }
    
    // Validação do CPF (formato básico)
    if (cpf === "" || cpf.length < 11) {
        alert("Por favor, preencha um CPF válido!");
        document.getElementById('cpfFuncionario').focus();
        return false;
    }
    
    // Verifica se o CPF já existe
    const cpfExiste = funcionarios.some(funcionario => funcionario.cpf === cpf);
    if (cpfExiste) {
        alert("Este CPF já está cadastrado! Verifique se o funcionário já existe.");
        document.getElementById('cpfFuncionario').focus();
        return false;
    }
    
    // Validação do email
    if (email === "" || !validarEmail(email)) {
        alert("Por favor, preencha um email válido!");
        document.getElementById('emailFuncionario').focus();
        return false;
    }
    
    // Verifica se o email já existe
    const emailExiste = funcionarios.some(funcionario => funcionario.email === email);
    if (emailExiste) {
        alert("Este email já está cadastrado!");
        document.getElementById('emailFuncionario').focus();
        return false;
    }
    
    // Validação do cargo
    if (cargo === "") {
        alert("Por favor, selecione um cargo!");
        document.getElementById('cargoFuncionario').focus();
        return false;
    }
    
    // Validação do salário
    if (salario === "" || salario === "R$0.00" || salario === "R$0,00") {
        alert("Por favor, preencha o salário do funcionário!");
        document.getElementById('salarioFuncionario').focus();
        return false;
    }
    
    return true; // Tudo OK
}

// ========================================
// 5. FUNÇÃO AUXILIAR PARA VALIDAR EMAIL
// ========================================
function validarEmail(email) {
    // Expressão regular simples para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ========================================
// 6. FUNÇÕES DE FORMATAÇÃO E MÁSCARAS
// ========================================
function configurarMascaras() {
    // Máscara para CPF
    const campoCpf = document.getElementById('cpfFuncionario');
    if (campoCpf) {
        campoCpf.addEventListener('input', function() {
            formatarCPF(this);
        });
    }
    
    // Máscara para telefone
    const campoTelefone = document.getElementById('telefoneFuncionario');
    if (campoTelefone) {
        campoTelefone.addEventListener('input', function() {
            formatarTelefone(this);
        });
    }
    
    // Formatação de salário
    const campoSalario = document.getElementById('salarioFuncionario');
    if (campoSalario) {
        campoSalario.addEventListener('input', function() {
            formatarMoedaFuncionario(this);
        });
    }
    
    // Máscara para data
    const campoDataNasc = document.getElementById('dataNascimento');
    if (campoDataNasc) {
        campoDataNasc.addEventListener('input', function() {
            formatarData(this);
        });
    }
    
    const campoDataCont = document.getElementById('dataContratacao');
    if (campoDataCont) {
        campoDataCont.addEventListener('input', function() {
            formatarData(this);
        });
    }
}

function formatarCPF(campo) {
    // Remove tudo que não é número
    let valor = campo.value.replace(/\D/g, '');
    
    // Adiciona a formatação do CPF (000.000.000-00)
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    campo.value = valor;
}

function formatarTelefone(campo) {
    // Remove tudo que não é número
    let valor = campo.value.replace(/\D/g, '');
    
    // Adiciona a formatação do telefone (00) 00000-0000
    if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
        valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    campo.value = valor;
}

function formatarMoedaFuncionario(campo) {
    // Remove tudo que não é número
    let valor = campo.value.replace(/\D/g, '');
    
    // Converte para formato de moeda
    valor = (valor / 100).toFixed(2);
    
    // Adiciona R$ na frente
    campo.value = 'R$ ' + valor.replace('.', ',');
}

function formatarData(campo) {
    // Remove tudo que não é número
    let valor = campo.value.replace(/\D/g, '');
    
    // Adiciona a formatação da data (dd/mm/aaaa)
    valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
    valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
    
    // Limita a 10 caracteres
    if (valor.length > 10) {
        valor = valor.substring(0, 10);
    }
    
    campo.value = valor;
}

// ========================================
// 7. FUNÇÕES DE ARMAZENAMENTO
// ========================================
function salvarFuncionarios() {
    // Salva a lista de funcionários no navegador
    localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    console.log("Funcionários salvos no navegador");
}

function carregarFuncionariosSalvos() {
    // Carrega funcionários salvos anteriormente
    const funcionariosSalvos = localStorage.getItem('funcionarios');
    
    if (funcionariosSalvos) {
        funcionarios = JSON.parse(funcionariosSalvos);
        
        // Atualiza o próximo ID baseado no último funcionário
        if (funcionarios.length > 0) {
            const ultimoId = Math.max(...funcionarios.map(f => f.id));
            proximoId = ultimoId + 1;
        }
        
        console.log("Funcionários carregados:", funcionarios.length);
    }
}

// ========================================
// 8. FUNÇÕES DE INTERFACE
// ========================================
function mostrarMensagemSucesso(texto) {
    // Cria uma div para mostrar mensagem de sucesso
    const mensagem = document.createElement('div');
    mensagem.innerHTML = '✅ ' + texto;
    mensagem.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 5px;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        font-weight: bold;
    `;
    
    // Adiciona a mensagem na página
    document.body.appendChild(mensagem);
    
    // Remove a mensagem após 3 segundos
    setTimeout(function() {
        if (document.body.contains(mensagem)) {
            document.body.removeChild(mensagem);
        }
    }, 3000);
}

function limparFormularioFuncionario() {
    // Limpa todos os campos do formulário
    document.getElementById('nomeFuncionario').value = '';
    document.getElementById('cpfFuncionario').value = '';
    document.getElementById('rgFuncionario').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('emailFuncionario').value = '';
    document.getElementById('telefoneFuncionario').value = '';
    document.getElementById('cargoFuncionario').value = '';
    document.getElementById('dataContratacao').value = '';
    document.getElementById('salarioFuncionario').value = 'R$0,00';
    document.getElementById('enderecoFuncionario').value = '';
    
    // Coloca o foco no primeiro campo
    document.getElementById('nomeFuncionario').focus();
    
    // Reconfigura a data de hoje
    configurarDataHoje();
}

function configurarDataHoje() {
    // Pega a data de hoje
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    
    // Define a data de contratação como hoje (se estiver vazia)
    const campoDataContratacao = document.getElementById('dataContratacao');
    if (campoDataContratacao && campoDataContratacao.value === '') {
        campoDataContratacao.value = dataFormatada;
    }
}

// ========================================
// 9. FUNÇÕES AUXILIARES PARA CONSULTA
// ========================================
function listarTodosFuncionarios() {
    // Função para ver todos os funcionários (útil para debug)
    console.log("=== LISTA DE FUNCIONÁRIOS ===");
    funcionarios.forEach(function(funcionario, index) {
        console.log(`${index + 1}. ${funcionario.nome} - CPF: ${funcionario.cpf} - Cargo: ${funcionario.cargo}`);
    });
    console.log(`Total: ${funcionarios.length} funcionários`);
}

function buscarFuncionarioPorCPF(cpf) {
    // Busca um funcionário específico pelo CPF
    return funcionarios.find(funcionario => funcionario.cpf === cpf);
}

function buscarFuncionariosPorCargo(cargo) {
    // Busca funcionários por cargo
    return funcionarios.filter(funcionario => funcionario.cargo === cargo);
}

function buscarFuncionariosPorNome(nome) {
    // Busca funcionários que contenham o nome
    return funcionarios.filter(funcionario => 
        funcionario.nome.toLowerCase().includes(nome.toLowerCase())
    );
}

function calcularTotalFolhaPagamento() {
    // Calcula o total da folha de pagamento
    let total = 0;
    funcionarios.forEach(function(funcionario) {
        if (funcionario.ativo) {
            // Remove R$ e vírgula para calcular
            const salarioNum = parseFloat(funcionario.salario.replace('R$ ', '').replace(',', '.'));
            total += salarioNum;
        }
    });
    
    console.log(`Total da folha de pagamento: R$ ${total.toFixed(2).replace('.', ',')}`);
    return total;
}

// ========================================
// 10. FUNÇÃO PARA TESTAR O SISTEMA
// ========================================
function testarSistemaFuncionarios() {
    console.log("=== TESTE DO SISTEMA DE FUNCIONÁRIOS ===");
    console.log("Funcionários cadastrados:", funcionarios.length);
    console.log("Próximo ID:", proximoId);
    
    // Lista todos os funcionários
    listarTodosFuncionarios();
    
    // Calcula folha de pagamento
    calcularTotalFolhaPagamento();
    
    // Estatísticas por cargo
    const cargos = ['cargo1', 'cargo2', 'cargo3', 'cargo4'];
    const nomesCargos = ['Atendente', 'Gerente', 'Caixa', 'Auxiliar de Cozinha'];
    
    console.log("=== ESTATÍSTICAS POR CARGO ===");
    cargos.forEach(function(cargo, index) {
        const funcionariosCargo = buscarFuncionariosPorCargo(cargo);
        console.log(`${nomesCargos[index]}: ${funcionariosCargo.length} funcionários`);
    });
}

// ========================================
// 11. FUNÇÃO PARA INATIVAR FUNCIONÁRIO
// ========================================
function inativarFuncionario(cpf) {
    const funcionario = buscarFuncionarioPorCPF(cpf);
    if (funcionario) {
        funcionario.ativo = false;
        funcionario.dataInativacao = new Date().toLocaleDateString('pt-BR');
        salvarFuncionarios();
        console.log(`Funcionário ${funcionario.nome} foi inativado.`);
        return true;
    } else {
        console.log("Funcionário não encontrado!");
        return false;
    }
}

// ========================================
// 12. FUNÇÃO PARA LIMPAR TODOS OS DADOS
// ========================================
function limparTodosOsDadosFuncionarios() {
    if (confirm("Tem certeza que deseja apagar todos os funcionários?")) {
        funcionarios = [];
        proximoId = 1;
        localStorage.removeItem('funcionarios');
        console.log("Todos os dados de funcionários foram apagados!");
    }
}

// ========================================
// COMANDOS ÚTEIS PARA O CONSOLE:
// ========================================
// testarSistemaFuncionarios() - Mostra informações do sistema
// listarTodosFuncionarios() - Lista todos os funcionários
// calcularTotalFolhaPagamento() - Calcula total de salários
// buscarFuncionarioPorCPF('000.000.000-00') - Busca por CPF
// buscarFuncionariosPorCargo('cargo1') - Busca por cargo
// inativarFuncionario('000.000.000-00') - Inativa funcionário
// limparTodosOsDadosFuncionarios() - Apaga todos os dados
// funcionarios - Mostra o array de funcionários
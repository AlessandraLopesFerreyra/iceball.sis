// ========================================
// JAVASCRIPT BÁSICO PARA SISTEMA DE PRODUTOS
// ========================================

// 1. VARIÁVEIS GLOBAIS
// Estas variáveis ficam disponíveis em todo o código
let produtos = []; // Array (lista) para armazenar todos os produtos
let proximoId = 1; // Variável para controlar o próximo ID único

// ========================================
// 2. FUNÇÃO QUE EXECUTA QUANDO A PÁGINA CARREGA
// ========================================
window.onload = function() {
    console.log("Página carregada com sucesso!");
    
    // Busca o formulário na página pelo ID
    const formulario = document.querySelector('form');
    
    // Se encontrou o formulário, adiciona um "ouvinte" de evento
    if (formulario) {
        // Quando o formulário for enviado, executa a função cadastrarProduto
        formulario.addEventListener('submit', cadastrarProduto);
    }
    
    // Carrega produtos salvos anteriormente (se existirem)
    carregarProdutosSalvos();
    
    // Configura a data de hoje nos campos de data
    configurarDataHoje();
};

// ========================================
// 3. FUNÇÃO PRINCIPAL - CADASTRAR PRODUTO
// ========================================
function cadastrarProduto(evento) {
    // Impede que o formulário seja enviado normalmente
    evento.preventDefault();
    
    console.log("Iniciando cadastro de produto...");
    
    // PEGA OS VALORES DOS CAMPOS DO FORMULÁRIO
    // getElementById busca um elemento pela sua ID
    const nome = document.getElementById('nomeProduto').value;
    const codigo = document.getElementById('codProduto').value;
    const valor = document.getElementById('valorProduto').value;
    const dataCompra = document.getElementById('dataCompra').value;
    const dataValidade = document.getElementById('dataValidade').value;
    const fornecedora = document.getElementById('fornecedora').value;
    const descricao = document.getElementById('descricaoProduto').value;
    
    // VALIDAÇÃO BÁSICA DOS CAMPOS OBRIGATÓRIOS
    if (!validarCampos(nome, codigo, valor)) {
        return; // Para a execução se a validação falhar
    }
    
    // CRIA UM OBJETO PRODUTO
    // Um objeto é como uma ficha com informações organizadas
    const produto = {
        id: proximoId++, // Usa o próximo ID e depois incrementa
        nome: nome,
        codigo: codigo,
        valor: valor,
        dataCompra: dataCompra,
        dataValidade: dataValidade,
        fornecedora: fornecedora,
        descricao: descricao,
        dataCadastro: new Date().toLocaleDateString('pt-BR') // Data atual
    };
    
    // ADICIONA O PRODUTO NA LISTA
    produtos.push(produto); // push = adicionar no final da lista
    
    console.log("Produto cadastrado:", produto);
    console.log("Total de produtos:", produtos.length);
    
    // SALVA NO NAVEGADOR E MOSTRA MENSAGEM
    salvarProdutos();
    mostrarMensagemSucesso();
    limparFormulario();
}

// ========================================
// 4. FUNÇÃO DE VALIDAÇÃO
// ========================================
function validarCampos(nome, codigo, valor) {
    // Verifica se os campos obrigatórios estão preenchidos
    
    if (nome === "" || nome.trim() === "") {
        alert("Por favor, preencha o nome do produto!");
        document.getElementById('nomeProduto').focus(); // Coloca o cursor no campo
        return false;
    }
    
    if (codigo === "" || isNaN(codigo)) {
        alert("Por favor, preencha um código válido (apenas números)!");
        document.getElementById('codProduto').focus();
        return false;
    }
    
    if (valor === "" || valor === "R$0.00") {
        alert("Por favor, preencha o valor do produto!");
        document.getElementById('valorProduto').focus();
        return false;
    }
    
    // Verifica se o código já existe
    const codigoExiste = produtos.some(produto => produto.codigo === codigo);
    if (codigoExiste) {
        alert("Este código já existe! Use um código diferente.");
        document.getElementById('codProduto').focus();
        return false;
    }
    
    return true; // Tudo OK
}

// ========================================
// 5. FUNÇÕES DE FORMATAÇÃO
// ========================================
function formatarMoeda() {
    // Esta função pode ser chamada para formatar o campo de valor
    const campoValor = document.getElementById('valorProduto');
    let valor = campoValor.value;
    
    // Remove tudo que não é número
    valor = valor.replace(/\D/g, '');
    
    // Converte para formato de moeda
    valor = (valor / 100).toFixed(2);
    
    // Adiciona R$ na frente
    campoValor.value = 'R$ ' + valor.replace('.', ',');
}

// ========================================
// 6. FUNÇÕES DE ARMAZENAMENTO
// ========================================
function salvarProdutos() {
    // Salva a lista de produtos no navegador
    // JSON.stringify converte objeto JavaScript em texto
    localStorage.setItem('produtos', JSON.stringify(produtos));
    console.log("Produtos salvos no navegador");
}

function carregarProdutosSalvos() {
    // Carrega produtos salvos anteriormente
    const produtosSalvos = localStorage.getItem('produtos');
    
    if (produtosSalvos) {
        // JSON.parse converte texto de volta para objeto JavaScript
        produtos = JSON.parse(produtosSalvos);
        
        // Atualiza o próximo ID baseado no último produto
        if (produtos.length > 0) {
            const ultimoId = Math.max(...produtos.map(p => p.id));
            proximoId = ultimoId + 1;
        }
        
        console.log("Produtos carregados:", produtos.length);
    }
}

// ========================================
// 7. FUNÇÕES DE INTERFACE
// ========================================
function mostrarMensagemSucesso() {
    // Cria uma div para mostrar mensagem de sucesso
    const mensagem = document.createElement('div');
    mensagem.innerHTML = '✅ Produto cadastrado com sucesso!';
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
    `;
    
    // Adiciona a mensagem na página
    document.body.appendChild(mensagem);
    
    // Remove a mensagem após 3 segundos
    setTimeout(function() {
        document.body.removeChild(mensagem);
    }, 3000);
}

function limparFormulario() {
    // Limpa todos os campos do formulário
    document.getElementById('nomeProduto').value = '';
    document.getElementById('codProduto').value = '';
    document.getElementById('valorProduto').value = 'R$0.00';
    document.getElementById('dataCompra').value = '';
    document.getElementById('dataValidade').value = '';
    document.getElementById('fornecedora').value = '';
    document.getElementById('descricaoProduto').value = '';
    
    // Coloca o foco no primeiro campo
    document.getElementById('nomeProduto').focus();
}

function configurarDataHoje() {
    // Pega a data de hoje
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    
    // Define a data de compra como hoje (se estiver vazia)
    const campoDataCompra = document.getElementById('dataCompra');
    if (campoDataCompra && campoDataCompra.value === '') {
        campoDataCompra.value = dataFormatada;
    }
}

// ========================================
// 8. FUNÇÕES AUXILIARES PARA CONSULTA
// ========================================
function listarTodosProdutos() {
    // Função para ver todos os produtos (útil para debug)
    console.log("=== LISTA DE PRODUTOS ===");
    produtos.forEach(function(produto, index) {
        console.log(`${index + 1}. ${produto.nome} - Código: ${produto.codigo} - Valor: ${produto.valor}`);
    });
    console.log(`Total: ${produtos.length} produtos`);
}

function buscarProdutoPorCodigo(codigo) {
    // Busca um produto específico pelo código
    return produtos.find(produto => produto.codigo === codigo);
}

function buscarProdutosPorNome(nome) {
    // Busca produtos que contenham o nome
    return produtos.filter(produto => 
        produto.nome.toLowerCase().includes(nome.toLowerCase())
    );
}

// ========================================
// 9. FUNÇÃO PARA TESTAR O SISTEMA
// ========================================
function testarSistema() {
    console.log("=== TESTE DO SISTEMA ===");
    console.log("Produtos cadastrados:", produtos.length);
    console.log("Próximo ID:", proximoId);
    
    // Lista todos os produtos
    listarTodosProdutos();
    
    // Teste a busca
    if (produtos.length > 0) {
        const primeiroProduto = produtos[0];
        console.log("Teste de busca por código:", buscarProdutoPorCodigo(primeiroProduto.codigo));
    }
}

// ========================================
// 10. EVENTOS ADICIONAIS
// ========================================

// Adiciona formatação automática no campo de valor quando o usuário digita
document.addEventListener('DOMContentLoaded', function() {
    const campoValor = document.getElementById('valorProduto');
    if (campoValor) {
        campoValor.addEventListener('input', formatarMoeda);
    }
});

// Função que pode ser chamada no console para limpar todos os dados
function limparTodosOsDados() {
    if (confirm("Tem certeza que deseja apagar todos os produtos?")) {
        produtos = [];
        proximoId = 1;
        localStorage.removeItem('produtos');
        console.log("Todos os dados foram apagados!");
    }
}

// ========================================
// COMANDOS ÚTEIS PARA O CONSOLE:
// ========================================
// testarSistema() - Mostra informações do sistema
// listarTodosProdutos() - Lista todos os produtos
// limparTodosOsDados() - Apaga todos os dados
// produtos - Mostra o array de produtos
// proximoId - Mostra o próximo ID
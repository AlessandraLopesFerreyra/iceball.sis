// ============================================
// JAVASCRIPT BÁSICO PARA FORMULÁRIO DE CLIENTE
// ============================================

// 1. ARRAY PARA ARMAZENAR OS CLIENTES
// Um array é como uma lista que guarda vários clientes
let clientes = [];

// 2. CONTADOR AUTOMÁTICO PARA CÓDIGO DO CLIENTE
// Começamos com 1 e vai aumentando automaticamente
let proximoCodigo = 1;

// ============================================
// 3. FUNÇÃO PARA GERAR CÓDIGO AUTOMÁTICO
// ============================================
function gerarCodigoAutomatico() {
    // Pega o campo do código no HTML
    const campocodigo = document.getElementById('codclient');
    
    // Coloca o próximo código disponível
    campocodigo.value = proximoCodigo;
    
    // Deixa o campo somente leitura (não pode editar)
    campocodigo.readOnly = true;
}

// ============================================
// 4. FUNÇÃO PARA VALIDAR CPF (BÁSICA)
// ============================================
function validarCPF(cpf) {
    // Remove pontos e traços do CPF
    cpf = cpf.replace(/[.-]/g, '');
    
    // Verifica se tem 11 números
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verifica se não são todos números iguais (111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    return true;
}

// ============================================
// 5. FUNÇÃO PARA FORMATAR CPF
// ============================================
function formatarCPF(cpf) {
    // Remove tudo que não é número
    cpf = cpf.replace(/\D/g, '');
    
    // Adiciona pontos e traço: 123.456.789-01
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    return cpf;
}

// ============================================
// 6. FUNÇÃO PARA FORMATAR TELEFONE
// ============================================
function formatarTelefone(telefone) {
    // Remove tudo que não é número
    telefone = telefone.replace(/\D/g, '');
    
    // Formata como (45) 99999-9999
    telefone = telefone.replace(/(\d{2})(\d)/, '($1) $2');
    telefone = telefone.replace(/(\d{5})(\d)/, '$1-$2');
    
    return telefone;
}

// ============================================
// 7. FUNÇÃO PARA LIMPAR O FORMULÁRIO
// ============================================
function limparFormulario() {
    // Pega todos os campos do formulário
    document.getElementById('nomeCliente').value = '';
    document.getElementById('cpfCliente').value = '';
    document.getElementById('emailCliente').value = '';
    document.getElementById('telefoneCliente').value = '';
    document.getElementById('enderecoCliente').value = '';
    
    // Gera um novo código automático
    gerarCodigoAutomatico();
    
    // Coloca o foco no primeiro campo (nome)
    document.getElementById('nomeCliente').focus();
}

// ============================================
// 8. FUNÇÃO PARA VERIFICAR SE CLIENTE JÁ EXISTE
// ============================================
function clienteJaExiste(cpf) {
    // Procura no array de clientes se já existe alguém com esse CPF
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].cpf === cpf) {
            return true; // Encontrou cliente com mesmo CPF
        }
    }
    return false; // Não encontrou
}

// ============================================
// 9. FUNÇÃO PRINCIPAL PARA CADASTRAR CLIENTE
// ============================================
function cadastrarCliente(event) {
    // Impede que o formulário recarregue a página
    event.preventDefault();
    
    // PASSO 1: Pegar os valores dos campos
    const codigo = document.getElementById('codclient').value;
    const nome = document.getElementById('nomeCliente').value;
    const cpf = document.getElementById('cpfCliente').value;
    const email = document.getElementById('emailCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;
    const endereco = document.getElementById('enderecoCliente').value;
    
    // PASSO 2: Validar campos obrigatórios
    if (!nome.trim()) {
        alert('Por favor, digite o nome do cliente!');
        document.getElementById('nomeCliente').focus();
        return;
    }
    
    if (!cpf.trim()) {
        alert('Por favor, digite o CPF do cliente!');
        document.getElementById('cpfCliente').focus();
        return;
    }
    
    // PASSO 3: Validar CPF
    if (!validarCPF(cpf)) {
        alert('CPF inválido! Digite um CPF válido.');
        document.getElementById('cpfCliente').focus();
        return;
    }
    
    // PASSO 4: Verificar se cliente já existe
    const cpfLimpo = cpf.replace(/[.-]/g, '');
    if (clienteJaExiste(cpfLimpo)) {
        alert('Este CPF já está cadastrado!');
        document.getElementById('cpfCliente').focus();
        return;
    }
    
    // PASSO 5: Criar objeto cliente
    const cliente = {
        codigo: parseInt(codigo),
        nome: nome.trim(),
        cpf: cpfLimpo,
        email: email.trim(),
        telefone: telefone.replace(/\D/g, ''), // Remove formatação
        endereco: endereco.trim()
    };
    
    // PASSO 6: Adicionar cliente ao array
    clientes.push(cliente);
    
    // PASSO 7: Aumentar o próximo código
    proximoCodigo++;
    
    // PASSO 8: Mostrar mensagem de sucesso
    alert(`Cliente ${nome} cadastrado com sucesso!\nCódigo: ${codigo}`);
    
    // PASSO 9: Limpar formulário para próximo cadastro
    limparFormulario();
    
    // PASSO 10: Mostrar lista de clientes no console (para teste)
    console.log('Clientes cadastrados:', clientes);
}

// ============================================
// 10. FUNÇÃO PARA MOSTRAR CLIENTES (OPCIONAL)
// ============================================
function mostrarClientes() {
    if (clientes.length === 0) {
        alert('Nenhum cliente cadastrado ainda!');
        return;
    }
    
    let lista = 'CLIENTES CADASTRADOS:\n\n';
    
    for (let i = 0; i < clientes.length; i++) {
        const cliente = clientes[i];
        lista += `Código: ${cliente.codigo}\n`;
        lista += `Nome: ${cliente.nome}\n`;
        lista += `CPF: ${formatarCPF(cliente.cpf)}\n`;
        lista += `Email: ${cliente.email}\n`;
        lista += `Telefone: ${formatarTelefone(cliente.telefone)}\n`;
        lista += `Endereço: ${cliente.endereco}\n`;
        lista += '------------------------\n';
    }
    
    alert(lista);
}

// ============================================
// 11. EVENTOS QUE EXECUTAM QUANDO A PÁGINA CARREGA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Gera o primeiro código automático
    gerarCodigoAutomatico();
    
    // Pega o formulário
    const formulario = document.querySelector('form');
    
    // Adiciona evento de envio do formulário
    formulario.addEventListener('submit', cadastrarCliente);
    
    // FORMATAÇÃO AUTOMÁTICA DOS CAMPOS
    
    // CPF - formata enquanto digita
    document.getElementById('cpfCliente').addEventListener('input', function(e) {
        e.target.value = formatarCPF(e.target.value);
    });
    
    // Telefone - formata enquanto digita
    document.getElementById('telefoneCliente').addEventListener('input', function(e) {
        e.target.value = formatarTelefone(e.target.value);
    });
    
    // Nome - transforma primeira letra em maiúscula
    document.getElementById('nomeCliente').addEventListener('blur', function(e) {
        const nome = e.target.value;
        if (nome) {
            // Primeira letra maiúscula de cada palavra
            e.target.value = nome.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        }
    });
    
    // Email - transforma em minúsculo
    document.getElementById('emailCliente').addEventListener('blur', function(e) {
        e.target.value = e.target.value.toLowerCase();
    });
});

// ============================================
// 12. FUNÇÃO EXTRA: BOTÃO PARA VER CLIENTES
// ============================================
// Você pode adicionar um botão no HTML para testar:
// <button type="button" onclick="mostrarClientes()">Ver Clientes</button>
// ========================================
// SISTEMA DE PESQUISA DE CLIENTES - JAVASCRIPT BÁSICO
// ========================================

// 1. DADOS DOS CLIENTES (Array de objetos)
// Aqui criamos uma lista com todos os clientes
let clientes = [
    {
        id: 1,
        nome: "Alessandro Lopes",
        telefone: "(71) 98888-8888",
        email: "alessandro@email.com",
        cpf: "111.222.333-44",
        endereco: {
            rua: "Rua dos Pinheiros",
            bairro: "Pituba",
            cep: "41830-000",
            numero: "456", 
            complemento: "Casa 2"
        }
    },
    {
        id: 2,
        nome: "Anna Clara Lemos",
        telefone: "(71) 97777-7777",
        email: "anna@email.com",
        cpf: "222.333.444-55",
        endereco: {
            rua: "Av. Paralela",
            bairro: "Imbuí",
            cep: "41720-000",
            numero: "789",
            complemento: "Bloco A"
        }
    },
    {
        id: 3,
        nome: "Isadora Santos",
        telefone: "(71) 96666-6666",
        email: "isadora@email.com",
        cpf: "333.444.555-66",
        endereco: {
            rua: "Rua da Paz",
            bairro: "Barra",
            cep: "40140-000",
            numero: "321",
            complemento: "Apto 502"
        }
    },
    {
        id: 4,
        nome: "Pamela Lordelo",
        telefone: "(71) 99999-9999",
        email: "pamela@email.com",
        cpf: "123.456.789-00",
        endereco: {
            rua: "Rua das Flores",
            bairro: "Centro",
            cep: "40000-000",
            numero: "123",
            complemento: "Apto 101"
        }
    }
];

// 2. VARIÁVEIS GLOBAIS
// Variável para armazenar o cliente selecionado
let clienteSelecionado = null;

// 3. FUNÇÃO PARA EXIBIR LISTA DE CLIENTES
function exibirListaClientes(listaClientes) {
    // Pega o elemento da lista no HTML
    const listaHTML = document.querySelector('.client-list');
    
    // Limpa a lista atual
    listaHTML.innerHTML = '';
    
    // Para cada cliente, cria um item na lista
    listaClientes.forEach(function(cliente) {
        // Cria um novo elemento <li>
        const itemLista = document.createElement('li');
        
        // Adiciona as classes CSS
        itemLista.className = 'client-item';
        
        // Define o texto do item (nome do cliente)
        itemLista.textContent = cliente.nome;
        
        // Adiciona um evento de clique no item
        itemLista.addEventListener('click', function() {
            selecionarCliente(cliente);
        });
        
        // Adiciona o item na lista
        listaHTML.appendChild(itemLista);
    });
}

// 4. FUNÇÃO PARA SELECIONAR UM CLIENTE
function selecionarCliente(cliente) {
    // Armazena o cliente selecionado
    clienteSelecionado = cliente;
    
    // Remove a classe 'active' de todos os itens
    const todosItens = document.querySelectorAll('.client-item');
    todosItens.forEach(function(item) {
        item.classList.remove('active');
    });
    
    // Adiciona a classe 'active' no item clicado
    event.target.classList.add('active');
    
    // Preenche os detalhes do cliente
    preencherDetalhesCliente(cliente);
}

// 5. FUNÇÃO PARA PREENCHER OS DETALHES DO CLIENTE
function preencherDetalhesCliente(cliente) {
    // Preenche os campos do formulário de detalhes
    document.getElementById('det-nome').value = cliente.nome;
    document.getElementById('det-tel').value = cliente.telefone;
    document.getElementById('det-gmail').value = cliente.email;
    document.getElementById('det-cpf').value = cliente.cpf;
    document.getElementById('det-rua').value = cliente.endereco.rua;
    document.getElementById('det-bairro').value = cliente.endereco.bairro;
    document.getElementById('det-cep').value = cliente.endereco.cep;
    document.getElementById('det-numero').value = cliente.endereco.numero;
    document.getElementById('det-comp').value = cliente.endereco.complemento;
    
    // Atualiza o título da coluna de detalhes
    const titulo = document.querySelector('.details-column .form-title');
    titulo.textContent = cliente.nome;
}

// 6. FUNÇÃO DE PESQUISA
function pesquisarCliente() {
    // Pega o valor do campo de pesquisa
    const campoPesquisa = document.querySelector('.search-box input');
    const termoPesquisa = campoPesquisa.value.toLowerCase();
    
    // Filtra os clientes baseado no termo de pesquisa
    const clientesFiltrados = clientes.filter(function(cliente) {
        return cliente.nome.toLowerCase().includes(termoPesquisa);
    });
    
    // Exibe a lista filtrada
    exibirListaClientes(clientesFiltrados);
}

// 7. FUNÇÃO PARA ADICIONAR NOVO CLIENTE
function adicionarNovoCliente() {
    // Pede os dados do novo cliente
    const nome = prompt('Digite o nome do cliente:');
    const telefone = prompt('Digite o telefone:');
    const email = prompt('Digite o email:');
    const cpf = prompt('Digite o CPF:');
    
    // Verifica se o usuário preencheu pelo menos o nome
    if (nome && nome.trim() !== '') {
        // Cria um novo objeto cliente
        const novoCliente = {
            id: clientes.length + 1,
            nome: nome,
            telefone: telefone || '',
            email: email || '',
            cpf: cpf || '',
            endereco: {
                rua: '',
                bairro: '',
                cep: '',
                numero: '',
                complemento: ''
            }
        };
        
        // Adiciona o novo cliente na lista
        clientes.push(novoCliente);
        
        // Atualiza a exibição
        exibirListaClientes(clientes);
        
        // Mostra mensagem de sucesso
        alert('Cliente adicionado com sucesso!');
    } else {
        alert('Por favor, digite pelo menos o nome do cliente.');
    }
}

// 8. FUNÇÃO PARA EXCLUIR CLIENTE
function excluirCliente() {
    // Verifica se há um cliente selecionado
    if (clienteSelecionado) {
        // Pergunta se o usuário tem certeza
        const confirmacao = confirm('Tem certeza que deseja excluir o cliente ' + clienteSelecionado.nome + '?');
        
        if (confirmacao) {
            // Remove o cliente da lista
            clientes = clientes.filter(function(cliente) {
                return cliente.id !== clienteSelecionado.id;
            });
            
            // Limpa os detalhes
            limparDetalhes();
            
            // Atualiza a lista
            exibirListaClientes(clientes);
            
            // Reseta o cliente selecionado
            clienteSelecionado = null;
            
            alert('Cliente excluído com sucesso!');
        }
    } else {
        alert('Selecione um cliente para excluir.');
    }
}

// 9. FUNÇÃO PARA LIMPAR OS DETALHES
function limparDetalhes() {
    document.getElementById('det-nome').value = '';
    document.getElementById('det-tel').value = '';
    document.getElementById('det-gmail').value = '';
    document.getElementById('det-cpf').value = '';
    document.getElementById('det-rua').value = '';
    document.getElementById('det-bairro').value = '';
    document.getElementById('det-cep').value = '';
    document.getElementById('det-numero').value = '';
    document.getElementById('det-comp').value = '';
    
    const titulo = document.querySelector('.details-column .form-title');
    titulo.textContent = 'Detalhes do Cliente';
}

// 10. FUNÇÃO QUE EXECUTA QUANDO A PÁGINA CARREGA
function inicializarSistema() {
    // Exibe a lista inicial de clientes
    exibirListaClientes(clientes);
    
    // Adiciona evento de pesquisa
    const campoPesquisa = document.querySelector('.search-box input');
    campoPesquisa.addEventListener('input', pesquisarCliente);
    
    // Adiciona evento ao botão de pesquisa
    const botaoPesquisa = document.querySelector('.search-icon');
    botaoPesquisa.addEventListener('click', pesquisarCliente);
    
    // Adiciona evento ao botão de adicionar cliente
    const botaoAdicionar = document.querySelector('.add-btn');
    botaoAdicionar.addEventListener('click', adicionarNovoCliente);
    
    // Adiciona evento ao botão de excluir cliente
    const botaoExcluir = document.querySelector('.delete-btn');
    botaoExcluir.addEventListener('click', excluirCliente);
    
    // Seleciona o primeiro cliente por padrão (Pamela Lordelo)
    if (clientes.length > 0) {
        selecionarCliente(clientes[3]); // Pamela é o índice 3
    }
}

// 11. EXECUTA O SISTEMA QUANDO A PÁGINA TERMINA DE CARREGAR
// Esta é uma função especial que espera a página carregar completamente
document.addEventListener('DOMContentLoaded', inicializarSistema);
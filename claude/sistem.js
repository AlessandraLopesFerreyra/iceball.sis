// JavaScript para Sistema de Movimento Financeiro
// Versão para iniciantes com comentários explicativos

// 1. AGUARDAR O CARREGAMENTO DA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada com sucesso!');
    
    // Chamar todas as funções de inicialização
    inicializarFormulario();
    inicializarFiltros();
    inicializarTabela();
    inicializarNavegacao();
});

// 2. FUNÇÕES DO FORMULÁRIO DE MOVIMENTO FINANCEIRO
function inicializarFormulario() {
    console.log('Inicializando formulário...');
    
    // Pegar o formulário pelo querySelector
    const formulario = document.querySelector('form');
    const botaoSalvar = document.querySelector('.btn-primary');
    const botaoLimpar = document.querySelector('.btn-secondary');
    
    // Adicionar evento de envio do formulário
    if (formulario) {
        formulario.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Impede o envio real do formulário
            salvarMovimento();
        });
    }
    
    // Adicionar evento ao botão limpar
    if (botaoLimpar) {
        botaoLimpar.addEventListener('click', function() {
            limparFormulario();
        });
    }
    
    // Formatar o campo de valor automaticamente
    const campoValor = document.getElementById('valorMovimento');
    if (campoValor) {
        campoValor.addEventListener('input', formatarValor);
    }
    
    // Formatar o campo de data automaticamente
    const campoData = document.getElementById('dataMovimento');
    if (campoData) {
        campoData.addEventListener('input', formatarData);
    }
}

// Função para salvar movimento
function salvarMovimento() {
    console.log('Salvando movimento...');
    
    // Pegar todos os valores do formulário
    const tipo = document.getElementById('tipoMovimento').value;
    const categoria = document.getElementById('categoriaMovimento').value;
    const data = document.getElementById('dataMovimento').value;
    const valor = document.getElementById('valorMovimento').value;
    const responsavel = document.getElementById('responsavelMovimento').value;
    const descricao = document.getElementById('descricaoMovimento').value;
    
    // Verificar se os campos obrigatórios estão preenchidos
    if (!tipo || !categoria || !data || !valor || !responsavel) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }
    
    // Simular o salvamento
    alert('Movimento financeiro salvo com sucesso!');
    
    // Adicionar à tabela
    adicionarLinhaNaTabela(data, tipo, categoria, descricao, responsavel, valor);
    
    // Limpar o formulário após salvar
    limparFormulario();
    
    // Atualizar os totais
    atualizarTotais();
}

// Função para limpar o formulário
function limparFormulario() {
    console.log('Limpando formulário...');
    
    document.getElementById('tipoMovimento').value = '';
    document.getElementById('categoriaMovimento').value = '';
    document.getElementById('dataMovimento').value = '';
    document.getElementById('valorMovimento').value = 'R$0.00';
    document.getElementById('responsavelMovimento').value = '';
    document.getElementById('descricaoMovimento').value = '';
    
    alert('Formulário limpo!');
}

// Função para formatar valor em reais
function formatarValor(evento) {
    let valor = evento.target.value;
    
    // Remove tudo que não é número
    valor = valor.replace(/\D/g, '');
    
    // Converte para centavos
    valor = (valor / 100).toFixed(2) + '';
    
    // Adiciona os pontos e vírgulas
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    valor = valor.replace(/(\d)(\d{3}),/g, '$1.$2,');
    
    // Adiciona o R$
    evento.target.value = 'R$' + valor;
}

// Função para formatar data
function formatarData(evento) {
    let data = evento.target.value;
    
    // Remove tudo que não é número
    data = data.replace(/\D/g, '');
    
    // Adiciona as barras
    data = data.replace(/(\d{2})(\d)/, '$1/$2');
    data = data.replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    
    evento.target.value = data;
}

// 3. FUNÇÕES DOS FILTROS
function inicializarFiltros() {
    console.log('Inicializando filtros...');
    
    const botaoFiltrar = document.querySelector('.filter-btn');
    
    if (botaoFiltrar) {
        botaoFiltrar.addEventListener('click', function() {
            aplicarFiltros();
        });
    }
}

// Função para aplicar filtros
function aplicarFiltros() {
    console.log('Aplicando filtros...');
    
    const mes = document.getElementById('filtroMes').value;
    const ano = document.getElementById('filtroAno').value;
    const tipo = document.getElementById('filtroTipo').value;
    
    console.log('Filtros selecionados:', {mes, ano, tipo});
    
    // Simular aplicação de filtros
    alert(`Filtros aplicados:\nMês: ${mes}\nAno: ${ano}\nTipo: ${tipo}`);
    
    // Aqui você pode adicionar a lógica real de filtros
    filtrarTabela(mes, ano, tipo);
}

// Função para filtrar a tabela
function filtrarTabela(mes, ano, tipo) {
    const linhas = document.querySelectorAll('.data-table tbody tr');
    
    linhas.forEach(function(linha) {
        let mostrar = true;
        
        // Pegar os dados da linha
        const dataLinha = linha.cells[0].textContent;
        const tipoLinha = linha.cells[1].textContent.toLowerCase();
        
        // Verificar filtros
        if (tipo !== 'todos' && !tipoLinha.includes(tipo)) {
            mostrar = false;
        }
        
        // Mostrar ou esconder a linha
        if (mostrar) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

// 4. FUNÇÕES DA TABELA
function inicializarTabela() {
    console.log('Inicializando tabela...');
    
    // Adicionar evento de clique nas linhas da tabela
    const linhasTabela = document.querySelectorAll('.data-table tbody tr');
    
    linhasTabela.forEach(function(linha) {
        linha.addEventListener('click', function() {
            selecionarLinha(linha);
        });
    });
}

// Função para selecionar linha da tabela
function selecionarLinha(linha) {
    // Remove seleção de outras linhas
    const todasLinhas = document.querySelectorAll('.data-table tbody tr');
    todasLinhas.forEach(function(l) {
        l.style.backgroundColor = '';
    });
    
    // Adiciona seleção na linha clicada
    linha.style.backgroundColor = '#e3f2fd';
    
    console.log('Linha selecionada:', linha.cells[3].textContent);
}

// Função para adicionar nova linha na tabela
function adicionarLinhaNaTabela(data, tipo, categoria, descricao, responsavel, valor) {
    const tabela = document.querySelector('.data-table tbody');
    const novaLinha = document.createElement('tr');
    
    // Determinar a classe CSS do valor (receita ou despesa)
    const classeValor = tipo.toLowerCase() === 'receita' ? 'receita' : 'despesa';
    
    novaLinha.innerHTML = `
        <td>${data}</td>
        <td>${tipo}</td>
        <td>${categoria}</td>
        <td>${descricao}</td>
        <td>${responsavel}</td>
        <td class="${classeValor}">${valor}</td>
    `;
    
    // Adicionar evento de clique na nova linha
    novaLinha.addEventListener('click', function() {
        selecionarLinha(novaLinha);
    });
    
    // Inserir no início da tabela
    tabela.insertBefore(novaLinha, tabela.firstChild);
}

// 5. FUNÇÕES DOS TOTALIZADORES
function atualizarTotais() {
    console.log('Atualizando totais...');
    
    let totalReceitas = 0;
    let totalDespesas = 0;
    
    // Percorrer todas as linhas da tabela
    const linhas = document.querySelectorAll('.data-table tbody tr');
    
    linhas.forEach(function(linha) {
        if (linha.style.display !== 'none') { // Só contar linhas visíveis
            const valorTexto = linha.cells[5].textContent;
            const valor = converterValorParaNumero(valorTexto);
            const tipo = linha.cells[1].textContent.toLowerCase();
            
            if (tipo === 'receita') {
                totalReceitas += valor;
            } else if (tipo === 'despesa') {
                totalDespesas += valor;
            }
        }
    });
    
    const saldo = totalReceitas - totalDespesas;
    
    // Atualizar os elementos na tela
    document.querySelector('.total-receitas .value').textContent = formatarMoeda(totalReceitas);
    document.querySelector('.total-despesas .value').textContent = formatarMoeda(totalDespesas);
    document.querySelector('.total-saldo .value').textContent = formatarMoeda(saldo);
}

// Função para converter texto de valor para número
function converterValorParaNumero(valorTexto) {
    return parseFloat(valorTexto.replace('R$', '').replace(/\./g, '').replace(',', '.')) || 0;
}

// Função para formatar número como moeda
function formatarMoeda(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// 6. FUNÇÕES DE NAVEGAÇÃO
function inicializarNavegacao() {
    console.log('Inicializando navegação...');
    
    // Links do menu de navegação
    const linkCadastro = document.querySelector('a[href="claudeproduto.html"]');
    const linkPesquisa = document.querySelector('a[href="pequisa_cliente.html"]');
    const linkFecharSistema = document.querySelector('a[href="fechamento_sistema.html"]');
    
    // Links do footer
    const linksFooter = document.querySelectorAll('.footer a');
    
    // Adicionar eventos aos links principais
    if (linkCadastro) {
        linkCadastro.addEventListener('click', function(evento) {
            evento.preventDefault();
            navegarPara('Cadastro de Produtos');
        });
    }
    
    if (linkPesquisa) {
        linkPesquisa.addEventListener('click', function(evento) {
            evento.preventDefault();
            navegarPara('Pesquisa de Clientes');
        });
    }
    
    if (linkFecharSistema) {
        linkFecharSistema.addEventListener('click', function(evento) {
            evento.preventDefault();
            confirmarFechamentoSistema();
        });
    }
    
    // Adicionar eventos aos links do footer
    linksFooter.forEach(function(link) {
        link.addEventListener('click', function(evento) {
            evento.preventDefault();
            const textoLink = link.textContent;
            navegarPara(textoLink);
        });
    });
}

// Função para simular navegação
function navegarPara(pagina) {
    console.log('Navegando para:', pagina);
    alert(`Redirecionando para: ${pagina}\n(Em um sistema real, você seria levado para esta página)`);
}

// Função para confirmar fechamento do sistema
function confirmarFechamentoSistema() {
    const confirmacao = confirm('Tem certeza que deseja fechar o sistema?');
    
    if (confirmacao) {
        alert('Sistema sendo fechado...\nObrigado por usar o PAIA Systems!');
        // Em um sistema real, aqui faria logout ou redirecionamento
    }
}

// 7. FUNÇÕES UTILITÁRIAS EXTRAS

// Função para mostrar mensagens de sucesso
function mostrarSucesso(mensagem) {
    alert('✅ ' + mensagem);
}

// Função para mostrar mensagens de erro
function mostrarErro(mensagem) {
    alert('❌ ' + mensagem);
}

// Função para validar data
function validarData(data) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(data);
}

// Função para validar valor
function validarValor(valor) {
    const numero = converterValorParaNumero(valor);
    return numero > 0;
}

// 8. EVENTOS GLOBAIS

// Evento para detectar teclas pressionadas
document.addEventListener('keydown', function(evento) {
    // Atalho Ctrl+S para salvar
    if (evento.ctrlKey && evento.key === 's') {
        evento.preventDefault();
        salvarMovimento();
    }
    
    // Atalho Ctrl+L para limpar
    if (evento.ctrlKey && evento.key === 'l') {
        evento.preventDefault();
        limparFormulario();
    }
    
    // Atalho F5 para atualizar totais
    if (evento.key === 'F5') {
        evento.preventDefault();
        atualizarTotais();
    }
});

// Mostrar mensagem de boas-vindas quando a página carregar
window.addEventListener('load', function() {
    console.log('Sistema de Movimento Financeiro carregado!');
    setTimeout(function() {
        alert('🎉 Bem-vindo ao Sistema de Movimento Financeiro!\n\nDicas:\n- Ctrl+S: Salvar\n- Ctrl+L: Limpar\n- F5: Atualizar totais');
    }, 1000);
});

// Função para debug (apenas para desenvolvimento)
function debug() {
    console.log('=== INFORMAÇÕES DE DEBUG ===');
    console.log('Total de linhas na tabela:', document.querySelectorAll('.data-table tbody tr').length);
    console.log('Filtros ativos:', {
        mes: document.getElementById('filtroMes').value,
        ano: document.getElementById('filtroAno').value,
        tipo: document.getElementById('filtroTipo').value
    });
    console.log('============================');
}

// Tornar a função debug disponível globalmente
window.debug = debug;
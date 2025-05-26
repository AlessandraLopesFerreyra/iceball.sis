// ========================================
// JAVASCRIPT PARA LINKS DO SISTEMA - NÍVEL INICIANTE
// ========================================

// Aguarda a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada!');
    
    // ========================================
    // NAVEGAÇÃO DO MENU SUPERIOR
    // ========================================
    
    // Função para navegar entre as páginas principais
    function navegarPagina(pagina) {
        console.log('Navegando para: ' + pagina);
        
        // Simula navegação (em um sistema real, usaria window.location.href)
        switch(pagina) {
            case 'cadastro':
                alert('Navegando para seção de Cadastro');
                // window.location.href = 'claudeproduto.html';
                break;
            case 'movimento':
                alert('Navegando para Movimento Financeiro');
                // window.location.href = 'movimento_financeiro.html';
                break;
            case 'pesquisa':
                alert('Navegando para Pesquisa');
                // window.location.href = 'pequisa_cliente.html';
                break;
        }
    }
    
    // ========================================
    // NAVEGAÇÃO DO MENU LATERAL
    // ========================================
    
    // Função para navegar no menu lateral
    function navegarMenuLateral(opcao) {
        console.log('Menu lateral selecionado: ' + opcao);
        
        // Remove a classe 'active' de todos os itens
        var itensMenu = document.querySelectorAll('.sidebar li');
        for(var i = 0; i < itensMenu.length; i++) {
            itensMenu[i].classList.remove('active');
        }
        
        // Simula navegação do menu lateral
        switch(opcao) {
            case 'produto':
                alert('Navegando para Cadastro de Produto');
                // window.location.href = 'claudeproduto.html';
                break;
            case 'cliente':
                alert('Você já está na página de Cliente');
                // Já está na página atual
                break;
            case 'funcionario':
                alert('Navegando para Cadastro de Funcionário');
                // window.location.href = 'funcionario-html.html';
                break;
            case 'servico':
                alert('Navegando para Cadastro de Serviço');
                // window.location.href = 'servico-html.html';
                break;
        }
    }
    
    // ========================================
    // FORMULÁRIO DE CLIENTE
    // ========================================
    
    // Função para cadastrar cliente
    function cadastrarCliente() {
        console.log('Iniciando cadastro de cliente...');
        
        // Pega os valores dos campos
        var nome = document.getElementById('nomeCliente').value;
        var cpf = document.getElementById('cpfCliente').value;
        var email = document.getElementById('emailCliente').value;
        var telefone = document.getElementById('telefoneCliente').value;
        var endereco = document.getElementById('enderecoCliente').value;
        
        // Validação simples
        if(nome === '') {
            alert('Por favor, preencha o nome do cliente!');
            return false;
        }
        
        if(cpf === '') {
            alert('Por favor, preencha o CPF do cliente!');
            return false;
        }
        
        if(email === '') {
            alert('Por favor, preencha o email do cliente!');
            return false;
        }
        
        // Se chegou até aqui, os dados estão válidos
        alert('Cliente cadastrado com sucesso!\n\n' +
              'Nome: ' + nome + '\n' +
              'CPF: ' + cpf + '\n' +
              'Email: ' + email + '\n' +
              'Telefone: ' + telefone + '\n' +
              'Endereço: ' + endereco);
        
        // Limpa o formulário
        document.getElementById('nomeCliente').value = '';
        document.getElementById('cpfCliente').value = '';
        document.getElementById('emailCliente').value = '';
        document.getElementById('telefoneCliente').value = '';
        document.getElementById('enderecoCliente').value = '';
        
        return false; // Impede o envio real do formulário
    }
    
    // ========================================
    // LINKS DO FOOTER
    // ========================================
    
    // Função para links do footer
    function navegarFooter(destino) {
        console.log('Navegando pelo footer para: ' + destino);
        
        switch(destino) {
            case 'inicio':
                alert('Navegando para página Inicial');
                // window.location.href = 'index.html';
                break;
            case 'sobre':
                alert('Navegando para página Sobre Nós');
                // window.location.href = 'sobre.html';
                break;
            case 'servicos':
                alert('Navegando para página de Serviços');
                // window.location.href = 'servicos.html';
                break;
            case 'contato':
                alert('Navegando para página de Contato');
                // window.location.href = 'contato.html';
                break;
            case 'facebook':
                alert('Abrindo Facebook da PAIA Systems');
                // window.open('https://facebook.com/paiasystems', '_blank');
                break;
            case 'instagram':
                alert('Abrindo Instagram da PAIA Systems');
                // window.open('https://instagram.com/paiasystems', '_blank');
                break;
            case 'linkedin':
                alert('Abrindo LinkedIn da PAIA Systems');
                // window.open('https://linkedin.com/company/paiasystems', '_blank');
                break;
            case 'tiktok':
                alert('Abrindo TikTok da PAIA Systems');
                // window.open('https://tiktok.com/@paiasystems', '_blank');
                break;
            case 'privacidade':
                alert('Abrindo Política de Privacidade');
                // window.location.href = 'politica-privacidade.html';
                break;
            case 'termos':
                alert('Abrindo Termos de Uso');
                // window.location.href = 'termos-uso.html';
                break;
        }
    }
    
    // ========================================
    // FUNÇÃO PARA FECHAR SISTEMA
    // ========================================
    
    function fecharSistema() {
        console.log('Tentando fechar sistema...');
        
        var confirmacao = confirm('Tem certeza que deseja fechar o sistema?');
        
        if(confirmacao) {
            alert('Sistema sendo fechado...');
            // window.location.href = 'fechamento_sistema.html';
        } else {
            alert('Operação cancelada!');
        }
    }
    
    // ========================================
    // EVENTOS DOS LINKS (MÉTODO INICIANTE)
    // ========================================
    
    // Links do menu superior
    var linkCadastro = document.querySelector('a[href="claudeproduto.html"]');
    if(linkCadastro) {
        linkCadastro.onclick = function(e) {
            e.preventDefault();
            navegarPagina('cadastro');
        };
    }
    
    var linkMovimento = document.querySelector('a[href="movimento_financeiro.html"]');
    if(linkMovimento) {
        linkMovimento.onclick = function(e) {
            e.preventDefault();
            navegarPagina('movimento');
        };
    }
    
    var linkPesquisa = document.querySelector('a[href="pequisa_cliente.html"]');
    if(linkPesquisa) {
        linkPesquisa.onclick = function(e) {
            e.preventDefault();
            navegarPagina('pesquisa');
        };
    }
    
    // Links do menu lateral
    var linkProduto = document.querySelector('.sidebar a[href="claudeproduto.html"]');
    if(linkProduto) {
        linkProduto.onclick = function(e) {
            e.preventDefault();
            navegarMenuLateral('produto');
        };
    }
    
    var linkCliente = document.querySelector('.sidebar a[href="claudecliente.html"]');
    if(linkCliente) {
        linkCliente.onclick = function(e) {
            e.preventDefault();
            navegarMenuLateral('cliente');
        };
    }
    
    var linkFuncionario = document.querySelector('.sidebar a[href="funcionario-html.html"]');
    if(linkFuncionario) {
        linkFuncionario.onclick = function(e) {
            e.preventDefault();
            navegarMenuLateral('funcionario');
        };
    }
    
    var linkServico = document.querySelector('.sidebar a[href="servico-html.html"]');
    if(linkServico) {
        linkServico.onclick = function(e) {
            e.preventDefault();
            navegarMenuLateral('servico');
        };
    }
    
    // Botão de cadastrar cliente
    var botaoCadastrar = document.querySelector('.btn-cadastrar');
    if(botaoCadastrar) {
        botaoCadastrar.onclick = function(e) {
            e.preventDefault();
            cadastrarCliente();
        };
    }
    
    // Botão fechar sistema
    var botaoFechar = document.querySelector('.btn-fechar a[href="fechamento_sistema.html"]');
    if(botaoFechar) {
        botaoFechar.onclick = function(e) {
            e.preventDefault();
            fecharSistema();
        };
    }
    
    // Links do footer - Links rápidos
    var linkInicio = document.querySelector('.footer a[href="index.html"]');
    if(linkInicio) {
        linkInicio.onclick = function(e) {
            e.preventDefault();
            navegarFooter('inicio');
        };
    }
    
    var linkSobre = document.querySelector('.footer a[href="sobre.html"]');
    if(linkSobre) {
        linkSobre.onclick = function(e) {
            e.preventDefault();
            navegarFooter('sobre');
        };
    }
    
    var linkServicos = document.querySelector('.footer a[href="servicos.html"]');
    if(linkServicos) {
        linkServicos.onclick = function(e) {
            e.preventDefault();
            navegarFooter('servicos');
        };
    }
    
    var linkContato = document.querySelector('.footer a[href="contato.html"]');
    if(linkContato) {
        linkContato.onclick = function(e) {
            e.preventDefault();
            navegarFooter('contato');
        };
    }
    
    // Redes sociais
    var linkFacebook = document.querySelector('.social-icon.facebook');
    if(linkFacebook) {
        linkFacebook.onclick = function(e) {
            e.preventDefault();
            navegarFooter('facebook');
        };
    }
    
    var linkInstagram = document.querySelector('.social-icon.instagram');
    if(linkInstagram) {
        linkInstagram.onclick = function(e) {
            e.preventDefault();
            navegarFooter('instagram');
        };
    }
    
    var linkLinkedin = document.querySelector('.social-icon.linkedin');
    if(linkLinkedin) {
        linkLinkedin.onclick = function(e) {
            e.preventDefault();
            navegarFooter('linkedin');
        };
    }
    
    var linkTiktok = document.querySelector('.social-icon.tiktok');
    if(linkTiktok) {
        linkTiktok.onclick = function(e) {
            e.preventDefault();
            navegarFooter('tiktok');
        };
    }
    
    // ========================================
    // FORMATAÇÃO AUTOMÁTICA DOS CAMPOS
    // ========================================
    
    // Formatação do CPF
    var campoCpf = document.getElementById('cpfCliente');
    if(campoCpf) {
        campoCpf.oninput = function() {
            var valor = this.value.replace(/\D/g, ''); // Remove tudo que não é número
            
            if(valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
                valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            
            this.value = valor;
        };
    }
    
    // Formatação do telefone
    var campoTelefone = document.getElementById('telefoneCliente');
    if(campoTelefone) {
        campoTelefone.oninput = function() {
            var valor = this.value.replace(/\D/g, ''); // Remove tudo que não é número
            
            if(valor.length <= 11) {
                if(valor.length <= 10) {
                    valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
                    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    valor = valor.replace(/(\d{2})(\d)/, '($1) $2');
                    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
                }
            }
            
            this.value = valor;
        };
    }
    
    // ========================================
    // MENSAGEM DE BOAS-VINDAS
    // ========================================
    
    console.log('Sistema de links carregado com sucesso!');
    console.log('Todas as funções estão prontas para uso.');
    
}); // Fim do DOMContentLoaded

// ========================================
// FUNÇÕES GLOBAIS (PODEM SER CHAMADAS A QUALQUER MOMENTO)
// ========================================

// Função para mostrar informações do sistema
function mostrarInfoSistema() {
    alert('Sistema de Gerenciamento PAIA\n' +
          'Versão: 1.0\n' +
          'Desenvolvido para controle de estoque\n' +
          'Página atual: Cadastro de Cliente');
}

// Função para limpar todos os campos
function limparFormulario() {
    var confirmacao = confirm('Tem certeza que deseja limpar todos os campos?');
    
    if(confirmacao) {
        document.getElementById('nomeCliente').value = '';
        document.getElementById('cpfCliente').value = '';
        document.getElementById('emailCliente').value = '';
        document.getElementById('telefoneCliente').value = '';
        document.getElementById('enderecoCliente').value = '';
        
        alert('Formulário limpo com sucesso!');
    }
}

// Função para validar email
function validarEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para validar CPF (validação simples)
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    
    if(cpf.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if(/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    return true; // Validação básica
}

// ========================================
// COMENTÁRIOS PARA INICIANTES
// ========================================

/*
EXPLICAÇÃO DO CÓDIGO PARA INICIANTES:

1. DOMContentLoaded: Espera a página carregar completamente antes de executar o código

2. querySelector: Encontra elementos HTML na página usando seletores CSS

3. onclick: Define o que acontece quando alguém clica em um elemento

4. preventDefault(): Impede que o link navegue para outra página (para nossos testes)

5. alert(): Mostra uma caixa de mensagem para o usuário

6. confirm(): Mostra uma caixa perguntando "sim" ou "não"

7. value: Pega ou define o valor de um campo de input

8. replace(): Substitui texto (usado para formatar CPF e telefone)

9. test(): Testa se um texto corresponde a um padrão (usado para validar email)

PARA USAR EM PRODUÇÃO:
- Descomente as linhas com window.location.href para navegação real
- Conecte com um banco de dados para salvar os dados
- Adicione mais validações conforme necessário
- Implemente autenticação de usuário

DICAS:
- Sempre teste seu código no console do navegador (F12)
- Use console.log() para debug
- Mantenha o código organizado com comentários
- Valide sempre os dados antes de processar
*/
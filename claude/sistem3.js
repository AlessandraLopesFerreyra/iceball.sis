// ============================================
// JAVASCRIPT BÁSICO PARA SISTEMA DE LOGIN
// ============================================

// 1. USUÁRIOS VÁLIDOS DO SISTEMA
// Um objeto que guarda os IDs válidos e seus nomes
const usuariosValidos = {
    'admin': 'Administrador',
    '001': 'João Silva',
    '002': 'Maria Santos',
    '003': 'Pedro Costa',
    'gerente': 'Gerente Geral',
    'func01': 'Ana Oliveira',
    'func02': 'Carlos Souza'
};

// 2. VARIÁVEL PARA CONTROLAR TENTATIVAS DE LOGIN
let tentativasLogin = 0;
const maxTentativas = 3;

// ============================================
// 3. FUNÇÃO PARA VALIDAR ID DO USUÁRIO
// ============================================
function validarID(id) {
    // Remove espaços em branco do início e fim
    id = id.trim();
    
    // Verifica se o ID não está vazio
    if (id === '') {
        return {
            valido: false,
            mensagem: 'Por favor, digite um ID!'
        };
    }
    
    // Verifica se o ID tem pelo menos 3 caracteres
    if (id.length < 3) {
        return {
            valido: false,
            mensagem: 'ID deve ter pelo menos 3 caracteres!'
        };
    }
    
    // Verifica se o ID existe na lista de usuários válidos
    if (usuariosValidos[id]) {
        return {
            valido: true,
            nome: usuariosValidos[id]
        };
    } else {
        return {
            valido: false,
            mensagem: 'ID não encontrado no sistema!'
        };
    }
}

// ============================================
// 4. FUNÇÃO PARA MOSTRAR MENSAGENS NA TELA
// ============================================
function mostrarMensagem(mensagem, tipo) {
    // Remove mensagem anterior se existir
    const mensagemAnterior = document.querySelector('.mensagem');
    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }
    
    // Cria elemento da mensagem
    const divMensagem = document.createElement('div');
    divMensagem.className = 'mensagem';
    divMensagem.textContent = mensagem;
    
    // Define cor baseada no tipo
    if (tipo === 'erro') {
        divMensagem.style.color = '#ff0000';
        divMensagem.style.backgroundColor = '#ffe6e6';
        divMensagem.style.border = '1px solid #ff0000';
    } else if (tipo === 'sucesso') {
        divMensagem.style.color = '#008000';
        divMensagem.style.backgroundColor = '#e6ffe6';
        divMensagem.style.border = '1px solid #008000';
    } else {
        divMensagem.style.color = '#0066cc';
        divMensagem.style.backgroundColor = '#e6f3ff';
        divMensagem.style.border = '1px solid #0066cc';
    }
    
    // Estilo da mensagem
    divMensagem.style.padding = '10px';
    divMensagem.style.borderRadius = '5px';
    divMensagem.style.marginBottom = '15px';
    divMensagem.style.textAlign = 'center';
    
    // Adiciona mensagem antes do formulário
    const formArea = document.querySelector('.form-area');
    formArea.insertBefore(divMensagem, formArea.firstChild);
    
    // Remove mensagem após 5 segundos
    setTimeout(function() {
        if (divMensagem.parentNode) {
            divMensagem.remove();
        }
    }, 5000);
}

// ============================================
// 5. FUNÇÃO PARA BLOQUEAR SISTEMA TEMPORARIAMENTE
// ============================================
function bloquearSistema() {
    const campoID = document.getElementById('user-id');
    const botaoEntrar = document.querySelector('.btn-entrar');
    
    // Desabilita campo e botão
    campoID.disabled = true;
    botaoEntrar.disabled = true;
    
    // Muda aparência para indicar bloqueio
    campoID.style.backgroundColor = '#f0f0f0';
    botaoEntrar.style.backgroundColor = '#f0f0f0';
    botaoEntrar.style.cursor = 'not-allowed';
    
    mostrarMensagem('Sistema bloqueado por 30 segundos devido a muitas tentativas incorretas!', 'erro');
    
    // Desbloqueiar após 30 segundos
    setTimeout(function() {
        campoID.disabled = false;
        botaoEntrar.disabled = false;
        campoID.style.backgroundColor = 'white';
        botaoEntrar.style.backgroundColor = 'white';
        botaoEntrar.style.cursor = 'pointer';
        tentativasLogin = 0;
        mostrarMensagem('Sistema desbloqueado! Você pode tentar novamente.', 'sucesso');
        campoID.focus();
    }, 30000); // 30 segundos
}

// ============================================
// 6. FUNÇÃO PRINCIPAL PARA FAZER LOGIN
// ============================================
function fazerLogin() {
    // Pega o valor digitado no campo ID
    const campoID = document.getElementById('user-id');
    const id = campoID.value;
    
    // Valida o ID
    const resultado = validarID(id);
    
    if (resultado.valido) {
        // LOGIN BEM-SUCEDIDO
        
        // Mostra mensagem de boas-vindas
        mostrarMensagem(`Bem-vindo(a), ${resultado.nome}!`, 'sucesso');
        
        // Salva informações do usuário (simulação de sessão)
        const usuarioLogado = {
            id: id,
            nome: resultado.nome,
            dataLogin: new Date().toLocaleString('pt-BR')
        };
        
        // Simula salvamento da sessão
        console.log('Usuário logado:', usuarioLogado);
        
        // Aguarda 2 segundos e redireciona
        setTimeout(function() {
            // Em um sistema real, aqui você redirecionaria para a página principal
            mostrarMensagem('Redirecionando...', 'info');
            
            // Simula redirecionamento após mais 1 segundo
            setTimeout(function() {
                window.location.href = 'claudeproduto.html';
            }, 1000);
        }, 2000);
        
    } else {
        // LOGIN FALHOU
        
        tentativasLogin++;
        const tentativasRestantes = maxTentativas - tentativasLogin;
        
        if (tentativasLogin >= maxTentativas) {
            // Muitas tentativas - bloquear sistema
            bloquearSistema();
        } else {
            // Mostra erro e número de tentativas restantes
            const mensagemErro = `${resultado.mensagem}\nTentativas restantes: ${tentativasRestantes}`;
            mostrarMensagem(mensagemErro, 'erro');
            
            // Limpa o campo e coloca foco nele
            campoID.value = '';
            campoID.focus();
        }
    }
}

// ============================================
// 7. FUNÇÃO PARA MOSTRAR LISTA DE USUÁRIOS VÁLIDOS
// ============================================
function mostrarUsuariosValidos() {
    let lista = 'USUÁRIOS VÁLIDOS DO SISTEMA:\n\n';
    
    for (let id in usuariosValidos) {
        lista += `ID: ${id} - ${usuariosValidos[id]}\n`;
    }
    
    alert(lista);
}

// ============================================
// 8. FUNÇÃO PARA FORMATAR ID ENQUANTO DIGITA
// ============================================
function formatarID(event) {
    let valor = event.target.value;
    
    // Remove espaços
    valor = valor.replace(/\s/g, '');
    
    // Converte para minúsculas
    valor = valor.toLowerCase();
    
    // Limita a 10 caracteres
    if (valor.length > 10) {
        valor = valor.substring(0, 10);
    }
    
    // Atualiza o campo
    event.target.value = valor;
}

// ============================================
// 9. FUNÇÃO PARA DETECTAR TECLA ENTER
// ============================================
function detectarEnter(event) {
    // Se pressionou Enter (código 13)
    if (event.keyCode === 13 || event.key === 'Enter') {
        // Chama função de login
        fazerLogin();
    }
}

// ============================================
// 10. EVENTOS QUE EXECUTAM QUANDO A PÁGINA CARREGA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Pega elementos da página
    const campoID = document.getElementById('user-id');
    const botaoEntrar = document.querySelector('.btn-entrar');
    
    // Remove o link do botão (vamos controlar o clique via JavaScript)
    const linkDentroBtn = botaoEntrar.querySelector('a');
    if (linkDentroBtn) {
        botaoEntrar.innerHTML = 'Entrar...';
    }
    
    // Adiciona evento de clique no botão
    botaoEntrar.addEventListener('click', fazerLogin);
    
    // Adiciona evento de tecla no campo ID
    campoID.addEventListener('keypress', detectarEnter);
    
    // Adiciona formatação automática no campo ID
    campoID.addEventListener('input', formatarID);
    
    // Coloca foco no campo ID quando a página carrega
    campoID.focus();
    
    // Mostra mensagem de boas-vindas
    mostrarMensagem('Digite seu ID para acessar o sistema', 'info');
    
    // Cria botão para mostrar usuários válidos (apenas para teste/desenvolvimento)
    const containerPrincipal = document.querySelector('.container');
    const botaoAjuda = document.createElement('button');
    botaoAjuda.textContent = 'Ver IDs Válidos (Apenas para teste)';
    botaoAjuda.style.marginTop = '20px';
    botaoAjuda.style.padding = '8px 16px';
    botaoAjuda.style.backgroundColor = '#e6f3ff';
    botaoAjuda.style.border = '1px solid #0066cc';
    botaoAjuda.style.borderRadius = '5px';
    botaoAjuda.style.cursor = 'pointer';
    botaoAjuda.addEventListener('click', mostrarUsuariosValidos);
    containerPrincipal.appendChild(botaoAjuda);
});

// ============================================
// 11. FUNÇÃO PARA LOGOUT (USAR EM OUTRAS PÁGINAS)
// ============================================
function fazerLogout() {
    // Limpa informações de sessão
    console.log('Usuário fez logout');
    
    // Redireciona para página de login
    window.location.href = 'claudelogin.html';
}

// ============================================
// 12. CONSOLE LOGS PARA DEBUGGING
// ============================================
console.log('Sistema de Login Carregado');
console.log('Usuários válidos:', Object.keys(usuariosValidos));

// Avisar se há problemas
if (Object.keys(usuariosValidos).length === 0) {
    console.error('ERRO: Nenhum usuário válido configurado!');
}
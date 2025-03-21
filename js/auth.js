// Simulação de banco de dados de usuários
let users = [];

// Função de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        alert('Login bem-sucedido!');
        window.location.href = 'home.html';
    } else {
        alert('E-mail ou senha incorretos.');
    }
});

// Função de registro
document.getElementById('registerLink').addEventListener('click', function (e) {
    e.preventDefault();
    const email = prompt('Digite seu e-mail:');
    const password = prompt('Digite sua senha:');
    if (email && password) {
        users.push({ email, password });
        alert('Cadastro realizado com sucesso!');
    }
});
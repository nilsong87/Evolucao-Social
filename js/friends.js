// Simulação de lista de usuários cadastrados
let allUsers = [
    { id: 1, name: "João Silva", avatar: "img/perfil2.jpeg" },
    { id: 2, name: "Maria Oliveira", avatar: "img/perfil3.jpeg" },
    { id: 3, name: "Carlos Souza", avatar: "img/perfil4.jpeg" },
    { id: 4, name: "Ana Costa", avatar: "img/perfil5.jpeg" },
    { id: 5, name: "Pedro Santos", avatar: "img/perfil6.jpeg" },
];

// Simulação de lista de amigos do usuário atual
let friends = [
    { id: 1, name: "João Silva", avatar: "img/perfil2.jpeg" },
];

// Função para renderizar todos os usuários
function renderUsers() {
    const friendsGrid = document.querySelector('.friends-grid');
    friendsGrid.innerHTML = '';

    allUsers.forEach(user => {
        const isFriend = friends.some(friend => friend.id === user.id);
        const friendCard = document.createElement('div');
        friendCard.className = 'friend-card';
        friendCard.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}">
            <h3>${user.name}</h3>
            ${isFriend ?
                `<button class="remove" onclick="removeFriend(${user.id})">Remover</button>` :
                `<button onclick="addFriend(${user.id})">Adicionar</button>`
            }
        `;
        friendsGrid.appendChild(friendCard);
    });
}

// Função para adicionar amigo
function addFriend(userId) {
    const user = allUsers.find(u => u.id === userId);
    if (user && !friends.some(friend => friend.id === user.id)) {
        friends.push(user);
        renderUsers();
    }
}

// Função para remover amigo
function removeFriend(userId) {
    friends = friends.filter(friend => friend.id !== userId);
    renderUsers();
}

// Função para pesquisar usuários
document.getElementById('searchFriend').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(searchTerm));
    renderFilteredUsers(filteredUsers);
});

// Função para renderizar usuários filtrados
function renderFilteredUsers(filteredUsers) {
    const friendsGrid = document.querySelector('.friends-grid');
    friendsGrid.innerHTML = ''; // Limpa a lista atual

    if (filteredUsers.length === 0) {
        // Exibe a mensagem "Usuário não encontrado" se não houver resultados
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = "Usuário não encontrado";
        noResultsMessage.style.color = "#ffffff"; // Cor do texto
        noResultsMessage.style.textAlign = "center"; // Centraliza o texto
        noResultsMessage.style.marginTop = "20px"; // Espaçamento superior
        friendsGrid.appendChild(noResultsMessage);
    } else {
        // Renderiza os usuários filtrados
        filteredUsers.forEach(user => {
            const isFriend = friends.some(friend => friend.id === user.id);
            const friendCard = document.createElement('div');
            friendCard.className = 'friend-card';
            friendCard.innerHTML = `
                <img src="${user.avatar}" alt="${user.name}">
                <h3>${user.name}</h3>
                ${isFriend ?
                    `<button class="remove" onclick="removeFriend(${user.id})">Remover</button>` :
                    `<button onclick="addFriend(${user.id})">Adicionar</button>`
                }
            `;
            friendsGrid.appendChild(friendCard);
        });
    }
}

// Renderizar todos os usuários ao carregar a página
document.addEventListener('DOMContentLoaded', renderUsers);
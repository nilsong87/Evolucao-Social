// Simulação de lista de grupos
let groups = [
    {
        id: 1,
        name: "Grupo de Tecnologia",
        description: "Discussões sobre inovações tecnológicas.",
        cover: "https://via.placeholder.com/600x200",
        privacy: "public",
        creator: "admin",
        members: ["admin"],
        posts: [],
        requests: []
    },
    {
        id: 2,
        name: "Grupo de Música",
        description: "Compartilhamento de playlists e discussões sobre música.",
        cover: "https://via.placeholder.com/600x200",
        privacy: "public",
        creator: "admin",
        members: ["admin"],
        posts: [],
        requests: []
    },
    {
        id: 3,
        name: "Grupo de Esportes",
        description: "Notícias e debates sobre esportes.",
        cover: "https://via.placeholder.com/600x200",
        privacy: "private",
        creator: "admin",
        members: ["admin"],
        posts: [],
        requests: []
    },
    {
        id: 4,
        name: "Grupo de Filmes",
        description: "Recomendações e críticas de filmes.",
        cover: "https://via.placeholder.com/600x200",
        privacy: "public",
        creator: "admin",
        members: ["admin"],
        posts: [],
        requests: []
    }
];

// Função para renderizar grupos
function renderGroups() {
    const groupList = document.getElementById('groupItems');
    if (!groupList) {
        console.error("Elemento 'groupItems' não encontrado no HTML.");
        return;
    }

    groupList.innerHTML = ''; // Limpa o conteúdo anterior

    groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';
        groupCard.innerHTML = `
            <h3>${group.name}</h3>
            <p>${group.description}</p>
            <div class="group-cover">
                <img src="${group.cover}" alt="Capa do Grupo">
            </div>
            <div class="group-actions">
                ${group.members.includes(currentUser.id) ?
                    `<button class="leave" onclick="leaveGroup(${group.id})">Sair</button>` :
                    `<button onclick="joinGroup(${group.id})">Entrar</button>`
                }
            </div>
            <div class="group-members">
                <h4>Membros (${group.members.length}):</h4>
                <p>${group.members.join(', ')}</p>
            </div>
        `;
        groupList.appendChild(groupCard);
    });
}

// Função para criar um grupo
document.getElementById('createGroupButton').addEventListener('click', function () {
    const groupName = document.getElementById('groupName').value;
    const groupDescription = document.getElementById('groupDescription').value;
    const groupCover = document.getElementById('groupCover').files[0];
    const groupPrivacy = document.getElementById('groupPrivacy').value;

    if (groupName && groupDescription) {
        const newGroup = {
            id: groups.length + 1,
            name: groupName,
            description: groupDescription,
            cover: groupCover ? URL.createObjectURL(groupCover) : "https://via.placeholder.com/600x200",
            privacy: groupPrivacy,
            creator: currentUser.id,
            members: [currentUser.id],
            posts: [],
            requests: []
        };
        groups.push(newGroup);
        renderGroups();
        document.getElementById('groupName').value = '';
        document.getElementById('groupDescription').value = '';
        document.getElementById('groupCover').value = '';
    } else {
        alert('Por favor, preencha o nome e a descrição do grupo.');
    }
});

// Função para entrar em um grupo
function joinGroup(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group.members.includes(currentUser.id)) {
        if (group.privacy === "public") {
            group.members.push(currentUser.id);
            alert(`Você entrou no grupo: ${group.name}`);
        } else {
            group.requests.push(currentUser.id);
            alert("Solicitação de entrada enviada. Aguarde aprovação.");
        }
        renderGroups();
    } else {
        alert("Você já faz parte deste grupo.");
    }
}

// Função para sair de um grupo
function leaveGroup(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (group.members.includes(currentUser.id)) {
        group.members = group.members.filter(member => member !== currentUser.id);
        alert(`Você saiu do grupo: ${group.name}`);
        renderGroups();
    } else {
        alert("Você não faz parte deste grupo.");
    }
}

// Renderizar grupos ao carregar a página
document.addEventListener('DOMContentLoaded', renderGroups);
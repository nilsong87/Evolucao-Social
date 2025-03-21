// Dados simulados de usuários e postagens
let users = [
    { id: 1, name: "João Silva", avatar: "img/avatars/joao.jpg" },
    { id: 2, name: "Maria Oliveira", avatar: "img/avatars/maria.jpg" },
    { id: 3, name: "Carlos Souza", avatar: "img/avatars/carlos.jpg" },
    { id: 4, name: "Ana Costa", avatar: "img/avatars/ana.jpg" },
];

let posts = [
    {
        id: 1,
        userId: 1,
        content: "Hoje foi um dia incrível!",
        media: null,
        timestamp: "10:00"
    },
    {
        id: 2,
        userId: 2,
        content: "Adorei o passeio no parque!",
        media: "img/posts/maria-park.jpg",
        timestamp: "11:30"
    },
    {
        id: 3,
        userId: 3,
        content: "Novo projeto lançado! 🚀",
        media: null,
        timestamp: "12:45"
    },
    {
        id: 4,
        userId: 4,
        content: "Finalmente terminei meu livro!",
        media: "img/posts/ana-book.jpg",
        timestamp: "14:00"
    },
    {
        id: 5,
        userId: currentUser.id,
        content: "Estou muito feliz com a minha rede social!",
        media: null,
        timestamp: "15:15"
    }
];

// Função para renderizar postagens
function renderPosts() {
    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '';

    posts.forEach(post => {
        const user = post.userId === currentUser.id ? currentUser : users.find(u => u.id === post.userId);
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${user.avatar}" alt="${user.name}">
                <h3>${user.name}</h3>
                <span class="timestamp">${post.timestamp}</span>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.media ? `<img src="${post.media}" alt="Media" class="post-media">` : ''}
            </div>
            <div class="post-actions">
                <button>Curtir</button>
                <button>Comentar</button>
                <button>Compartilhar</button>
            </div>
        `;
        timeline.appendChild(postElement);
    });
}

// Função para adicionar nova postagem
document.getElementById('postButton').addEventListener('click', function () {
    const content = document.getElementById('postContent').value;
    const media = document.getElementById('mediaUpload').files[0];

    if (content || media) {
        const newPost = {
            id: posts.length + 1,
            userId: currentUser.id,
            content: content,
            media: media ? URL.createObjectURL(media) : null,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        posts.unshift(newPost); // Adiciona no início da lista
        renderPosts();
        document.getElementById('postContent').value = '';
        document.getElementById('mediaUpload').value = '';
    } else {
        alert('Digite algo ou adicione uma mídia para postar.');
    }
});

// Renderizar postagens ao carregar a página
document.addEventListener('DOMContentLoaded', renderPosts);
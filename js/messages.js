// Dados simulados
let users = [
    { id: 1, name: "João Silva", avatar: "img/perfil2.jpeg", isFriend: true, status: "online" },
    { id: 2, name: "Maria Oliveira", avatar: "img/perfil3.jpeg", isFriend: true, status: "online" },
    { id: 3, name: "Carlos Souza", avatar: "img/Perfil4.jpeg", isFriend: false, status: "offline" },
];

let conversations = [
    {
        id: 1,
        participants: [1, 3],
        messages: [
            { senderId: 1, text: "Oi, tudo bem?", timestamp: "10:00" },
            { senderId: 3, text: "Estou bem, obrigado!", timestamp: "10:05" }
        ],
        isGroup: false
    }
];

let currentUser = { id: 0, name: "Você", avatar: "img/avatars/user.jpg", status: "online" };
let currentConversationId = null;

// Funções principais
function renderConversations() {
    const list = document.getElementById('conversationItems');
    list.innerHTML = '';

    conversations.forEach(conversation => {
        const participants = conversation.participants
            .map(id => users.find(u => u.id === id))
            .filter(u => u.id !== currentUser.id);

        const convoElement = document.createElement('div');
        convoElement.className = 'conversation-item';
        convoElement.innerHTML = `
            <img src="${participants[0]?.avatar || 'img/perfil.jpg'}" 
                 alt="${participants[0]?.name || 'Grupo'}">
            <div>
                <h4>${participants.map(p => p.name).join(', ')}</h4>
                <p>${conversation.messages[conversation.messages.length - 1]?.text || ''}</p>
            </div>
        `;
        
        convoElement.addEventListener('click', () => loadConversation(conversation.id));
        list.appendChild(convoElement);
    });
}

function loadConversation(conversationId) {
    const conversation = conversations.find(c => c.id === conversationId);
    currentConversationId = conversationId;

    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    conversation.messages.forEach(msg => {
        const sender = msg.senderId === currentUser.id ? currentUser : users.find(u => u.id === msg.senderId);
        const messageElement = document.createElement('div');
        messageElement.className = `message ${msg.senderId === currentUser.id ? 'sent' : 'received'}`;
        messageElement.innerHTML = `
            <div class="message-avatar">
                <img src="${sender.avatar}" alt="${sender.name}">
            </div>
            <div class="message-content">
                <div class="message-info">
                    <span>${sender.name}</span>
                    <span>${msg.timestamp}</span>
                </div>
                <div class="message-text">${msg.text}</div>
            </div>
        `;
        messageList.appendChild(messageElement);
    });

    // Atualizar cabeçalho do chat
    const participants = conversation.participants
        .map(id => users.find(u => u.id === id))
        .filter(u => u.id !== currentUser.id);

    document.getElementById('currentChatAvatar').src = participants[0]?.avatar || 'img/avatars/default.jpg';
    document.getElementById('currentChatName').textContent = participants.map(p => p.name).join(', ');
    document.getElementById('currentChatStatus').textContent = participants[0]?.status || '';
}

// Envio de mensagens
document.getElementById('sendMessageButton').addEventListener('click', () => {
    const text = document.getElementById('messageText').value;
    if (text && currentConversationId) {
        const newMessage = {
            senderId: currentUser.id,
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        const activeConversation = conversations.find(c => c.id === currentConversationId);
        activeConversation.messages.push(newMessage);
        
        loadConversation(currentConversationId);
        document.getElementById('messageText').value = '';
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderConversations();
    if (conversations.length > 0) {
        loadConversation(conversations[0].id);
    }
});
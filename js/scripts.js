// Alternar entre abas de navegação
document.querySelectorAll('.profile-nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.profile-nav a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        this.classList.add('active');
        document.querySelector(this.getAttribute('href')).classList.add('active');
    });
});

// Editar perfil
document.getElementById('editProfileButton').addEventListener('click', function () {
    const newBio = prompt("Digite sua nova biografia:");
    if (newBio) {
        document.querySelector('.profile-info .bio').textContent = newBio;
    }
});

// Seguir/Deixar de seguir
document.getElementById('followButton').addEventListener('click', function () {
    const isFollowing = this.textContent === 'Seguir';
    this.textContent = isFollowing ? 'Deixar de seguir' : 'Seguir';
    this.style.backgroundColor = isFollowing ? '#ff0000' : '#00ff00';
});

// Editar foto de perfil
document.getElementById('editProfilePicture').addEventListener('click', function () {
    const newPhoto = prompt("Cole o URL da nova foto de perfil:");
    if (newPhoto) {
        document.querySelector('.profile-picture img').src = newPhoto;
    }
});

// Editar foto de capa
document.getElementById('editCoverPhoto').addEventListener('click', function () {
    const newCover = prompt("Cole o URL da nova foto de capa:");
    if (newCover) {
        document.querySelector('.cover-photo img').src = newCover;
    }
});
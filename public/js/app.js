var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {

    const card = document.getElementById('card');

    console.log(input.value);
    e.preventDefault();

    if (input.value) {
        const info = document.createElement('div');
        info.id = 'info';
        card.appendChild(info);

        const infoPour = document.createElement('p');
        infoPour.id ='info_pour';
        info.appendChild(infoPour);

        form.innerHTML = '';
        
        socket.emit('post-link', input.value);
        input.value = '';
    }
});

socket.on('info', function (msg) {
    const info = document.getElementById('info');
    const infoPour = document.getElementById('info_pour');
    const url = document.getElementById('url');

    if (msg.info != 'null') {
        infoPour.textContent = msg.info;
        info.style.width = msg.info;
    }

    console.log(msg.media);

    if (msg.media != 'undefined' && msg.media != 'mp3') {
        const download = document.createElement('a');
        info.style.display = 'none';

        download.id = 'download';
        download.innerText = 'Télecharger : ' + msg.media.split('/')[1];
        download.href = msg.media;
        download.setAttribute("download", msg.media);
       // download.click();

        url.appendChild(download);
        restart();

    }

});

socket.on('info-error', function (msg) {

    console.log(msg);
    const info = document.getElementById('info');
    const infoPour = document.getElementById('info_pour');
    info.style.width = '100%';
    infoPour.innerText = msg;
    restart();

});

const restart = ()=>{

    const card = document.getElementById('card');
    const reload = document.createElement('p');
    reload.id = 'reload';
    reload.innerText = 'Télécharger une nouvelle musique';
    reload.addEventListener('click',()=>{
        location.reload();
    })
    card.appendChild(reload);
}
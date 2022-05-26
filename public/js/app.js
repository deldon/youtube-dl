var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {

    const card = document.getElementById('card');
    const info = document.createElement('div');
    info.id = 'info'
    card.appendChild(info)

  e.preventDefault();
  form.innerHTML = '';
  if (input.value) {
      console.log(input.value);
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  const info = document.getElementById('info')
  const url = document.getElementById('url');
  


  if (msg.info != 'null') {
      info.textContent = msg.info;
      info.style.width = msg.info
  }
console.log(msg.media);
  
  if (msg.media != 'undefined' && msg.media != 'mp3') {
        const download = document.createElement('a');
        info.style.display = 'none'

        download.id = 'download'
        download.innerText = 'Télecharger le mp3 : ' + msg.media.split('/')[1];
        download.href = msg.media

        url.appendChild(download)

  }

});
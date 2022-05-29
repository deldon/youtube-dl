const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { spawn } = require('child_process');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    socket.on('post-link', (link) => {

        
        const code = link.match(/(?:.+?)?(?:\/v\/|watch\/|\?v=|\&v=|youtu\.be\/|\/v=|^youtu\.be\/|watch\%3Fv\%3D)([a-zA-Z0-9_-]{11})+/);

        const child = spawn('youtube-dl', ['-o', './public/mp3/%(title)s.%(ext)s', '-x', '--audio-format', "mp3", code]);
       
        let infosx = '';
        let mediaUrl = '';

        child.stdout.on('data', data => {
            console.log(data.toString());

            infosx = `${data}`.match(/[0-9].[0-9]%|[0-9][0-9].[0-9]%|[0-9][0-9][0-9]%/);
            mediaUrl = `${data}`.match(/[A-z].*.mp3/);
            media = `${mediaUrl}`.split('c/');

            const info = {
                info: `${infosx}`,
                media: `${media[1]}`
            }

            console.log(socket.id + ' - ' + infosx );
            io.to(socket.id).emit('info', info);

        });

        child.stderr.on('data', data => {
            console.error(`stderr: ${data}`);
           io.to(socket.id).emit('info-error', `Le lien youtube n'est pas valide`);
        });

    });
});

server.listen(3000, () => {
    console.log(`Listening on port 3000`);
})




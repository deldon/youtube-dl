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

    socket.on('chat message', (msg) => {

        console.log('message: ' + msg);

        const child = spawn('youtube-dl', ['-o', './public/mp3/%(title)s.%(ext)s', '-x', '--audio-format', "mp3", msg]);
        let infosx = ''
        let mediaUrl = ''

        child.stdout.on('data', data => {

            infosx = `${data}`.match(/[0-9].[0-9]%|[0-9][0-9].[0-9]%|[0-9][0-9][0-9]%/);
            mediaUrl = `${data}`.match(/[A-z].*.mp3/);
            media = `${mediaUrl}`.split('c/')

            console.log(`${data}`);

            const msg = {
                info: `${infosx}`,
                media: `${media[1]}`
            }

            console.log(socket.id + ' - ' + infosx );
            io.to(socket.id).emit('chat message', msg);

        });

        child.stderr.on('data', data => {
            console.error(`stderr: ${data}`);
        });

    });
});

server.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})




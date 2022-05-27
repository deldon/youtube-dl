# youtube-dl


## Interface graphique pour youtube-dl
**Téléchargez vos musiques favorites sur youtube !**  

L'application,  par le biais du child_process https://nodejs.org/api/child_process.html  </br> va faire tourner en fond de tâche le logiciel youtube-dl https://youtube-dl.org/  
à la demande du client.

<img src="./doc/youtubedl-1.png">  

Grâce au module socket.io, le serveur renvoie la progression du téléchargement en temps réel au client.  

<img src="./doc/youtubedl-2.png">  

## Installation de l'application

### Installer youtube-dl

Commande ci-dessous pour UNIX (linux, macOS, etc.)
``` 
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl

sudo chmod a+rx /usr/local/bin/youtube-dl
```
Source : http://ytdl-org.github.io/youtube-dl/download.html

### Installer ffmpeg

```
sudo apt install ffmpeg 
```

### Installer express et socket.io grâce à NPM

```
npm i 
```

### Démarrer l'application
```
npm start
```

<img src="./doc/youtubedl-3.png">  
# C4
![](https://cdn.discordapp.com/attachments/605343680047480864/643377529331253248/wallpaper.png)

A very rough implementation of Connect4 for Discord

### Installation

Clone to your home directory
```sh
$ # Clone the repository
$ git clone https://github.com/Senre/C4.git
$ cd C4/
$ git checkout C4-MultiGaming # Making sure to be in the active branch
$ npm install # Install dependencies
$ npm audit fix # Run if npm suggests you to
```

### Configuring Environment variables

You need a bot token which you can learn from [here](https://www.writebots.com/discord-bot-token/). If you got your token you're pretty much good to go

```sh
$ mv .env.example .env
$ nano .env # Or any of your editor of choice
```
No need for quotation marks just replace your token in there and you're set
```sh
$ npm start
```

### Todos

 - Fix this mess
 - Rebuild this with a better architectural implementation

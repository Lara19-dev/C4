const C4 = require('./Connect4');
const { RichEmbed } = require('discord.js');
const { botVersion } = require('./config');


module.exports = class GameThread {
    constructor() {
        this.games = [];
        this.channels = [];
        this.messages = [];
        this.players_active = [];   
    }

    newGame(){
        let startGame = new RichEmbed()
        .setTitle('Connect Four™')
        .setImage('https://cdn.discordapp.com/attachments/596907650042691584/624841411715399711/game.png')
        .addField('New Player\'s Turn!', "React to position your coin")
        .setFooter(`| Report bugs | Version ${botVersion}`)
        .setColor('#FFFFFF');
        return startGame;
    }

    begun(message, message_id){
        this.games.push(new C4(message, message_id))
        console.log(this.games.length);
    }

    nextMove(vertical_axis, player, avatar, message_id){
    let game = this.search(message_id);
    if(game === 0) return
    game.fallcoin(vertical_axis, player, avatar);
    }

    nextTurn(gameCache, message_id){
    let game = this.search(message_id);
    if(game === 0) return
    game.currentGame(gameCache);
    this.games = this.games.filter(game => game.over !== true);
    console.log(`Games in cache: ${this.games.length}`);
    }

    search(message_id){
        for(let i = 0; i < this.games.length; i++){
            if(this.games[i].message_id === message_id) return this.games[i];
        }
        return 0;
    }
}
const { RichEmbed } = require('discord.js');
const C4 = require('./Connect4');
const { botVersion } = require('./config');


module.exports = class GameThread {
  constructor() {
    this.games = [];
    this.channels = [];
    this.messages = [];
    this.players_active = [];
  }

  static newGame() {
    const startGame = new RichEmbed()
      .setTitle('Connect Four™')
      .setImage('https://cdn.discordapp.com/attachments/605343680047480864/643377529331253248/wallpaper.png')
      .addField('New Player\'s Turn!', 'React to position your coin')
      .setFooter(`| Report bugs | Version ${botVersion}`)
      .setColor('#FFFFFF');
    return startGame;
  }

  begun(message, messageId) {
    this.games.push(new C4(message, messageId));
    // eslint-disable-next-line no-console
    console.log(this.games.length);
  }

  nextMove(verticalAxis, player, avatar, messageId) {
    const game = this.search(messageId);
    if (game === 0) return;
    game.fallcoin(verticalAxis, player, avatar);
  }

  nextTurn(gameCache, messageId) {
    const game = this.search(messageId);
    if (game === 0) return;
    game.currentGame(gameCache);
    this.games = this.games.filter((_game) => _game.over !== true);
    // eslint-disable-next-line no-console
    console.log(`Games in cache: ${this.games.length}`);
  }

  search(messageId) {
    for (let i = 0; i < this.games.length; i += 1) {
      if (this.games[i].message_id === messageId) return this.games[i];
    }
    return 0;
  }
};

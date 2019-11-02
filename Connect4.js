/* eslint-disable max-len */
/* eslint-disable no-plusplus */
const { Client, RichEmbed, Attachment } = require('discord.js');
const Canvas = require('canvas');
const {
  token,
  column,
  row,
  botVersion,
} = require('./config');

const client = new Client();

module.exports = class Connect4 {
  constructor(message, messageId) {
    this.board = {
      6: [0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0],
      1: [0, 0, 0, 0, 0, 0, 0],
    };
    this.canvasInit();
    this.message_id = messageId;
    this.messageObject = message;
    this.over = false;
    this.turns = 1;
    this.player1 = '';
    this.player2 = '';
    this.buf = {};
  }

  async fallcoin(input, player, avatar) {
    // assigns player 1
    if (this.turns === 1) this.player1 = player;
    // assigns player 2
    if (this.turns === 2 && player === this.player1) return;
    if (this.turns === 2) this.player2 = player;

    // rejects if the user who reacted isn't a listed player
    if (this.turns >= 3 && player !== this.player1 && player !== this.player2) return;
    /* based on the number of turns, it rejects if the reaction is from the previous player
            If the no. of turns is an odd number, it rejects player2's input
            If the no. of turns is an even number, it rejects player1's input */
    if (this.turns >= 3 && this.turns % 2 === 1 && player === this.player2) return;
    if (this.turns >= 3 && this.turns % 2 === 0 && player === this.player1) return;
    // rejects all input once game is over
    if (this.over) return;
    // increment turns if all conditions above aren't met
    ++this.turns;
    // Coordinates
    let level = 0;

    if (this.board[1][input - 1] === 0) {
      this.board[1][input - 1] = player;
      level = 1;
    } else if (this.board[2][input - 1] === 0) {
      this.board[2][input - 1] = player;
      level = 2;
    } else if (this.board[3][input - 1] === 0) {
      this.board[3][input - 1] = player;
      level = 3;
    } else if (this.board[4][input - 1] === 0) {
      this.board[4][input - 1] = player;
      level = 4;
    } else if (this.board[5][input - 1] === 0) {
      this.board[5][input - 1] = player;
      level = 5;
    } else if (this.board[6][input - 1] === 0) {
      this.board[6][input - 1] = player;
      level = 6;
    } else {
      --this.turns;
      return;
    }
    this.update(player);
    await this.generateBoard(avatar, level, input);
  }

  async canvasInit() {
    // This initializes the canvas board
    const canvas = Canvas.createCanvas(355, 273);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./wallpaper.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    this.buf = canvas.toBuffer();
  }

  async generateBoard(avatarURL, x, y) {
    const canvas = Canvas.createCanvas(355, 273);
    const ctx = canvas.getContext('2d');

    // Uses the previous board game buffer
    const background = await Canvas.loadImage(this.buf);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Defining the border color
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draws Circular Path with provided coordinates to crop Avatar into Circle shape
    ctx.beginPath();
    ctx.arc(column[y][0], row[x][0], 22, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Draws Avatar of Player's coordinates
    const avatar = await Canvas.loadImage(avatarURL);
    ctx.drawImage(avatar, column[y][1], row[x][1], 45, 45);

    //  Current Game saved to buffer
    this.buf = canvas.toBuffer();
    const attachment = new Attachment(await this.buf, 'game.png');
    client.channels.get('617407223395647520').send(this.message_id, attachment);
  }

  async currentGame(imgLink) {
    const bool = this.turns % 2 === 1;
    const foor = this.turns >= 3;
    const p1 = client.users.get(this.player1);
    const p2 = client.users.get(this.player2);

    const currentGame = new RichEmbed()
      .setTitle('Connect Four™')
      .addField(`${this.over ? `${bool ? p2.username : p1.username} won! 🎉` : `${foor ? `${(bool ? p1.username : p2.username)}'s Turn!` : 'New Player\'s Turn!'}`}`, `${this.over ? `Finished ${this.turns - 1} turns` : 'React to position your coin'}`)
      .setImage(`${imgLink}`)
      .setFooter(`| Report bugs | Version ${botVersion}`)
      .setColor('#FFFFFF');
    if (this.over) {
      currentGame.setThumbnail(bool ? p2.avatarURL : p1.avatarURL);
      this.messageObject.clearReactions();
    }
    await this.messageObject.edit(currentGame);
  }

  update(player) {
    /* Checks the board if any of the arrays has the player string occuring 4
        times consecutively, if at least one of these is true, game is over. */
    const check = [
      // Left top to bottom Right Diagonals
      [this.board[3][0], this.board[4][1], this.board[5][2], this.board[6][3]],
      [this.board[2][0], this.board[3][1], this.board[4][2], this.board[5][3], this.board[6][4]],
      [this.board[1][0], this.board[2][1], this.board[3][2], this.board[4][3], this.board[5][4], this.board[6][5]],
      [this.board[1][1], this.board[2][2], this.board[3][3], this.board[4][4], this.board[5][5], this.board[6][6]],
      [this.board[1][2], this.board[2][3], this.board[3][4], this.board[4][5], this.board[5][6]],
      [this.board[1][3], this.board[2][4], this.board[3][5], this.board[4][6]],
      // Right top to bottom Left Diagonals
      [this.board[3][6], this.board[4][5], this.board[5][4], this.board[6][3]],
      [this.board[2][6], this.board[3][5], this.board[4][4], this.board[5][3], this.board[6][2]],
      [this.board[1][6], this.board[2][5], this.board[3][4], this.board[4][3], this.board[5][2], this.board[6][1]],
      [this.board[1][5], this.board[2][4], this.board[3][3], this.board[4][2], this.board[5][1], this.board[6][0]],
      [this.board[1][4], this.board[2][3], this.board[3][2], this.board[4][1], this.board[5][0]],
      [this.board[1][3], this.board[2][2], this.board[3][1], this.board[4][0]],
      // Columns
      [this.board[1][0], this.board[2][0], this.board[3][0], this.board[4][0], this.board[5][0], this.board[6][0]],
      [this.board[1][1], this.board[2][1], this.board[3][1], this.board[4][1], this.board[5][1], this.board[6][1]],
      [this.board[1][2], this.board[2][2], this.board[3][2], this.board[4][2], this.board[5][2], this.board[6][2]],
      [this.board[1][3], this.board[2][3], this.board[3][3], this.board[4][3], this.board[5][3], this.board[6][3]],
      [this.board[1][4], this.board[2][4], this.board[3][4], this.board[4][4], this.board[5][4], this.board[6][4]],
      [this.board[1][5], this.board[2][5], this.board[3][5], this.board[4][5], this.board[5][5], this.board[6][5]],
      [this.board[1][6], this.board[2][6], this.board[3][6], this.board[4][6], this.board[5][6], this.board[6][6]],
      // Rows
      this.board[1],
      this.board[2],
      this.board[3],
      this.board[4],
      this.board[5],
      this.board[6],
    ];

    for (let i = 0; i < check.length; i++) {
      if (Connect4.C4(check[i], player)) {
        this.over = true;
        return;
      }
    }
  }

  static C4(arr, player) {
    // Iterates on an array and determines whether 4 of the same player are in a row
    let count = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const i of arr) {
      if (i === player) {
        if (++count === 4) break;
      } else {
        count = 0;
      }
    }
    return count === 4;
  }
};

client.login(token);

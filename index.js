
const { Client } = require('discord.js');
const { prefix, token, gameRoom} = require('./config');

const client = new Client();
const C4 = require('./Connect4');


client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Create game
var game;
var rooms = [gameRoom,"622801138692915212"];

client.on('message', async message => {
    if(message.author.bot || message.channel.type == "dm") return
    // if(!rooms.includes(message.channel.id)) return
    let msg = message.content.toLowerCase();
    if(msg == `${prefix}connect4` || msg == `${prefix}c4`) {
        game = new C4(message.channel.id);   
    }
});

client.on('message', message => {
    if(message.channel.id != "617407223395647520") return
    let attach = (message.attachments).array();
    // attach.forEach(attachments => console.log(attachments.url));
    game.currentGame(attach[0].url);
})


/* Handles reactions to the game 
   Takes the vertical; axis value, channel id, user's avatarUrl, and message object */
client.on('messageReactionAdd', async (reaction, user) => {
    if(user.bot || game.over) return
    if(reaction.emoji.id === "621304998428672010") await game.fallcoin(1, user.id, user.displayAvatarURL, reaction.message);
    if(reaction.emoji.id === "621304999938359306") await game.fallcoin(2, user.id, user.displayAvatarURL, reaction.message);
    if(reaction.emoji.id === "621304999883833347") await game.fallcoin(3, user.id, user.displayAvatarURL, reaction.message);
    if(reaction.emoji.id === "621304999057817601") await game.fallcoin(4, user.id, user.displayAvatarURL, reaction.message);
    if(reaction.emoji.id === "621304999171063809") await game.fallcoin(5, user.id, user.displayAvatarURL, reaction.message);
    if(reaction.emoji.id === "621304999451951105") await game.fallcoin(6, user.id, user.displayAvatarURL, reaction.message);
    if(reaction.emoji.id === "621304998919274506") await game.fallcoin(7, user.id, user.displayAvatarURL, reaction.message);
    reaction.remove(user);
});
    
// Logs in the client
client.login(token);

module.exports = client;

const { Client } = require('discord.js');
const { prefix, token, gameServer, gameRoom } = require('./config');
const GameThread = require('./GameThread');

const client = new Client();
// Create Game MultiHandling Object
var Games = new GameThread();

client
    .once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
    })
    .on('message', async message => {
    if(message.author.bot || message.channel.type == "dm") return
    // if(!rooms.includes(message.channel.id)) return
    let msg = message.content.toLowerCase();
    if(msg == `${prefix}connect4` || msg == `${prefix}c4`) {
        if(message.guild.id === gameServer && !gameRoom.includes(message.channel.id)) return
        message.channel.send("Initializing <a:loading:617628744512700447>").then(async message =>{
        await message.react("621304998428672010");
        await message.react("621304999938359306");
        await message.react("621304999883833347");
        await message.react("621304999057817601");
        await message.react("621304999171063809");
        await message.react("621304999451951105");
        await message.react("621304998919274506");
        await message.edit(Games.newGame());
        });
    }
})  // Links which game is which
    .on('message', message => {
    if(message.author.id === client.user.id){
        if(message.content === "Initializing <a:loading:617628744512700447>"){
            Games.begun(message, message.id);
        }
        if(message.channel.id != "617407223395647520") return
        let attach = (message.attachments).array();
        Games.nextTurn(attach[0].url, message.content);
    }
}) /* Handles reactions to the game 
   Takes the vertical; axis value, channel id, user's avatarUrl, and message object */
    .on('messageReactionAdd', async (reaction, user) => {
    if(user.bot || reaction.message.author.id !== client.user.id) return
    if(reaction.emoji.id === "621304998428672010") Games.nextMove(1, user.id, user.displayAvatarURL, reaction.message.id);
    if(reaction.emoji.id === "621304999938359306") Games.nextMove(2, user.id, user.displayAvatarURL, reaction.message.id);
    if(reaction.emoji.id === "621304999883833347") Games.nextMove(3, user.id, user.displayAvatarURL, reaction.message.id);
    if(reaction.emoji.id === "621304999057817601") Games.nextMove(4, user.id, user.displayAvatarURL, reaction.message.id);
    if(reaction.emoji.id === "621304999171063809") Games.nextMove(5, user.id, user.displayAvatarURL, reaction.message.id);
    if(reaction.emoji.id === "621304999451951105") Games.nextMove(6, user.id, user.displayAvatarURL, reaction.message.id);
    if(reaction.emoji.id === "621304998919274506") Games.nextMove(7, user.id, user.displayAvatarURL, reaction.message.id);
    reaction.remove(user);
})
    // Logs in the client
    .login(token);

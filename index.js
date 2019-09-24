const Discord = require('discord.js');
const GameThread = require('./GameThread');

// Some Configuration variables
const { 
    prefix, token,
    gameServer, gameRoom,
    reaction_, dumpChannel, 
    gameInit 
} = require('./config');

// Create Discord Client
const client = new Discord.Client();

// Create Game MultiThreading Object
const games = new GameThread();

client
    .once('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
})  // Responds to Connect4 command
    .on('message', async message => {
    if(message.author.bot || message.channel.type == "dm") return
    if(message.content.toLowerCase() !== `${prefix}c4`) return
    if(message.guild.id === gameServer && !gameRoom.includes(message.channel.id)) return
    message.channel.send(gameInit).then(async message => {
        await message.react(reaction_[1]);  
        await message.react(reaction_[2]);
        await message.react(reaction_[3]);
        await message.react(reaction_[4]);
        await message.react(reaction_[5]);
        await message.react(reaction_[6]);
        await message.react(reaction_[7]);
        await message.edit(games.newGame());
    });
})  // Links to which game is which
    .on('message', message => {
    if(message.author.id === client.user.id){
        // Checks if message is the initialization of the game, then creates Connect4 object
        if(message.content === gameInit) games.begun(message, message.id)
        // Takes the img url and message id from the dump channel
        if(message.channel.id === dumpChannel) games.nextTurn((message.attachments).array()[0].url, message.content);
    }
})  // Handles reactions to the game 
    .on('messageReactionAdd', async(reaction, user) => {
    if(user.bot || reaction.message.author.id !== client.user.id) return
    switch(reaction.emoji.id){
        case reaction_[1]:
        games.nextMove(1, user.id, user.displayAvatarURL, reaction.message.id);  
        await reaction.remove(user);
        break;
        case reaction_[2]:
        games.nextMove(2, user.id, user.displayAvatarURL, reaction.message.id);  
        await reaction.remove(user);
        break;
        case reaction_[3]:
        games.nextMove(3, user.id, user.displayAvatarURL, reaction.message.id);  
        await reaction.remove(user);
        break;
        case reaction_[4]:
        games.nextMove(4, user.id, user.displayAvatarURL, reaction.message.id);  
        await reaction.remove(user);
        break;
        case reaction_[5]:
        games.nextMove(5, user.id, user.displayAvatarURL, reaction.message.id);  
        await reaction.remove(user);
        break;
        case reaction_[6]:
        games.nextMove(6, user.id, user.displayAvatarURL, reaction.message.id);  
        await reaction.remove(user);
        break;
        case reaction_[7]:
        games.nextMove(7, user.id, user.displayAvatarURL, reaction.message.id);  
        await reaction.remove(user);
        break;                    
    }
})  // Logs in the client
    .login(token);

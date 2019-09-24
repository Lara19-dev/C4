require('dotenv-flow').config();

module.exports = {  
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    botVersion: process.env.BOTVERSION,
    gameServer: '622349094290980884',
    gameRoom: ['622393663091376172','622801138692915212'],
    column : {
        "1" : [29,6],
        "2" : [79,56],
        "3" : [128,105],
        "4" : [177,155],
        "5" : [226,204],
        "6" : [276,254],
        "7" : [326,304],
    },
    row : {
        "6" : [25,2],
        "5" : [70,47],
        "4" : [114,91],
        "3" : [157,134],
        "2" : [201,178],
        "1" : [246,223],
    },
};

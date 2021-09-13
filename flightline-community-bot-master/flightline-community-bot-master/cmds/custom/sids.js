const Discord = require('discord.js');

module.exports.run = async (bot, postgres, message, args) => {

    message.channel.send("The below video goes over on each step of the flight during a given SID/STAR. It should give you a general good idea on how to use those charts: \nhttps://www.youtube.com/watch?v=w8zc8Lqt13k. \n\nIf you have any further questions regarding specifics, feel free to ask in <#593979260830482452>.")

}

module.exports.help = {
    name: "sids",
    format: "sids",
    description: "-",
    moderation: false,
    atc: false,
    custom: true
}

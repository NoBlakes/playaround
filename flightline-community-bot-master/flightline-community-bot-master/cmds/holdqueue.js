const Discord = require('discord.js');
const queues = require('./holdqueueadd.js')

function embedMsgQueue(airportQueue) {

    let embed = new Discord.MessageEmbed()

    airportQueue.forEach(function (item, index) {
        embed.addField(`Number ${index + 1} for landing:`, item);
        embed.setDescription("All the planes that are in a holding pattern.")
        embed.setColor("#FFF700")
        embed.setTimestamp(Date.now());
    });

    return embed;
}

module.exports.run = async (bot, postgres, message, args) => {

    if (message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);
    if (!args[0]) return message.channel.send("No airport specified!")
    
    let key = "queue" + args[0]
    if (queues[key]) {
        message.channel.send(embedMsgQueue(queues[key])).catch(console.error);
    } else message.channel.send(`There is no holdqueue for ${args[0]}`);
}

module.exports.help = {
    "name": "holdqueue",
    "format": "holdqueue [AirportICAO]",
    "description": "Displays the Holdqueue of an airport",
    moderation: false,
    atc: false
}

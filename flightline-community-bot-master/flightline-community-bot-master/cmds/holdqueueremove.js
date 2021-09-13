const queues = require('./holdqueueadd.js');

module.exports.run = async (bot, postgres, message, args) => {

    if (message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);
    if (!args[0]) return message.channel.send("No airport specified!")

    let guildID = "593830690777333770";
    let guild = bot.guilds.cache.get(guildID);
    let member = message.guild.member(message.author);
    let role = member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");

    if (!member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to remove from the Holding Pattern Queue.");

    if (args[0] === "JTPH") {
        queues.queueJTPH.shift();
        if (queues.queueJTPH.length === 0) return message.channel.send("No planes are in a holding pattern at JTPH!");
        message.channel.send(embedMsgQueue(queues.queueJTPH)).catch(console.error);
    }

    if (args[0] === "JSLL") {
        queues.queueJSLL.shift();
        if (queues.queueJSLL.length === 0) return message.channel.send("No planes are in a holding pattern at JSLL!");
        message.channel.send(embedMsgQueue(queues.queueJSLL)).catch(console.error);
    }

    if (args[0] === "JCO4") {
        queues.queueJTPH.shift();
        if (queues.queueJCO4.length === 0) return message.channel.send("No planes are in a holding pattern at JCO4!");
        message.channel.send(embedMsgQueue(queues.queueJCO4)).catch(console.error);
    }

}

module.exports.help = {
    name: "holdqueueremove",
    format: "holdqueueremove [AirportICAO]",
    description: "Removes the aircraft that just landed from the queue of an airport.",
    moderation: false,
    atc: true
}

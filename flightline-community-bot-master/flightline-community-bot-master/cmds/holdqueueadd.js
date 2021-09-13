const Discord = require('discord.js');

let queueJTPH = [];
let queueJSLL = [];
let queueJCO4 = [];

function embedMsgQueue(airportQueue){
    
    if(airportQueue.length == 0)return "There is no planes in a holding pattern!"
    
    let embed = new Discord.MessageEmbed()
    
    airportQueue.forEach(function(item, index) {
        embed.addField(`Number ${index + 1} for landing:`, item);
    
    embed.setDescription("All the planes that are in a holding pattern.")
    embed.setColor("#FFF700")
    embed.setTimestamp(Date.now());
    
    
    });
    return embed
}

module.exports.run = async (bot, postgres, message, args) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);

        let guildID = "593830690777333770";
        let guild = bot.guilds.cache.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");
        
        if(!member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to add to Holding Pattern Queue!");

        let messageArray = message.content.split(",");
        let sArgs = messageArray.slice(0);
        let firArg = sArgs[0].split(" ");
        let firstArg = firArg[1];
        
        if(!firstArg) return message.channel.send("No airport specified!")
        if(!args.slice(1).join(" ")) return message.channel.send("No aircraft specified!")        

        let Aircraft = args.slice(1).join(" ");
        
        if(firstArg === "JTPH"){
            queueJTPH.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJTPH)).catch(console.error);
            module.exports.queueJTPH = queueJTPH;
        }

        if(firstArg === "JSLL"){
            queueJSLL.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJSLL)).catch(console.error);
            module.exports.queueJSLL = queueJSLL;
        }

        if(firstArg === "JCO4"){
            queueJCO4.push(Aircraft);
            message.channel.send(embedMsgQueue(queueJCO4)).catch(console.error);
            module.exports.queueJCO4 = queueJCO4;
        }

}

module.exports.help = {
    name: "holdqueueadd",
    format: "holdqueueadd [AirportICAO] [Callsign]",
    description: "Adds an aircraft to the holding queue of an airport.",
    moderation: false,
    atc: true
}

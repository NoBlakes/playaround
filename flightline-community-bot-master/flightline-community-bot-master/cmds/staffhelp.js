const Discord = require('discord.js')
const config = require('../config.json')
const prefix = config.botConfig.prefix
const index = require("../index.js");

function embedStaffHelp(){
    let embed = new Discord.MessageEmbed()
    embed.addField("***Note:***", "Anything that has [something], takes a parameter.")
        index.commands.forEach(el => {
            if(el.help.moderation === false) { return; }
            else if(el.help.atc === true) { return; }
            else if(el.help.ownerOnly === true) { return; }
            else if(el.help.name === "staffhelp") { return; } 
            else if(el.help.moderation === true){
                embed.addField(prefix + el.help.name, el.help.description)
            }
        });
        
    return embed
}

module.exports.run = async (bot, postgres, message, args) => {

    let member = message.guild.member(message.author);
    let role = member.guild.roles.cache.find(r => r.name === "-------------- SERVER STAFF --------------" || r.name === "-------------- SENIOR STAFF --------------");

    if(!member.roles.cache.has(role.id)) return message.channel.send("Only Server Staff have permission to execute this command!");

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")
    message.channel.send(embedStaffHelp());
}

module.exports.help = {
    name: "staffhelp",
    format: "staffhelp",
    usage: "Displays help section for staff",
    moderation: true,
    atc: false
}

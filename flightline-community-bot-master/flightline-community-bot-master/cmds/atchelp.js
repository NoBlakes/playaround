const Discord = require('discord.js');
const index = require("../index.js");
const prefix = require("../config.json").botConfig.prefix

module.exports.run = async (bot, postgres, message, args) => {

    function embedMsgATC(){
        let embed = new Discord.MessageEmbed()
        embed.addField("***Note:***", "Anything that has [something], takes a parameter.")
            index.commands.forEach(el => {
                if(el.help.moderation === true) { return; }
                else if(el.help.ownerOnly === true) { return; }
                else if(el.help.name === "atchelp") { return; }
                else if(el.help.atc === true){
                    embed.addField(prefix + el.help.name, el.help.description)
                }
            });
        
        return embed
    }  
    
    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);
    
    let role = message.member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");
    if(!message.member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to view this help section.")
    
    message.channel.send(embedMsgATC()).catch(console.error);
}

module.exports.help = {
    name: "atchelp",
    format: "atchelp",
    description: "Displays the ATC help section.",
    moderation: false,
    atc: true
}

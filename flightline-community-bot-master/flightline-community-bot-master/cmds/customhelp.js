const Discord = require('discord.js')
const config = require('../config.json')
const prefix = config.botConfig.prefix
const fs = require("fs")
const index = require("../index.js");

module.exports.run = async (bot, postgres, message, args) => {

    function embedMsgHelp(){
        
        let chars = "";

        index.commands.forEach(el => {
            if(el.help.moderation === true) { return; }
            else if(el.help.atc === true) { return; }
            else if(el.help.ownerOnly === true) { return; }
            else if(el.help.custom === true){
                chars = chars.concat(el.help.name + "\n")
            }
        });
    
        let embed = new Discord.MessageEmbed()
            embed.addField("Available custom commands: ", chars)

        
            return embed

    }    

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);
    message.channel.send(embedMsgHelp()).catch(console.error);

}

module.exports.help = {
    name: "customhelp"
}

const Discord = require('discord.js');

function embedMsgICAO(){
    return new Discord.MessageEmbed()
        .setTimestamp(Date.now())
        .setDescription("All Airports in ICAOs in Flightline!")
        .addField("Airports:", "-------------------------------------------------")
        .addField("JTPH", "Tophon Bridge Intl.")
        .addField("JSLL", "Wellingsaul Square Intl.")
        .addField("JCO4", "Connerview Airfield")
        .setColor("#00FF00");
}

module.exports.run = async (bot, postgres, message, args) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);
    if(args[0] === "JTPH" || "JSLL" || "JCO4") return message.channel.send(embedMsgICAO()).catch(console.error);
    message.channel.send(embedMsgICAO()).catch(console.error);

}

module.exports.help = {
    name: "ICAOS",
    format: "ICAOS",
    description: "Displays all of the ICAOS of all the aiports in the game.",
    moderation: false,
    atc: false
}

const Discord = require('discord.js');

function embedMsgChart() {
    return new Discord.MessageEmbed()
        .setTimestamp(Date.now())
        .setTitle("Charts of the Official Flightline Community!")
        .setDescription("This is the map for all airports!")
        .addField("Below find the links for the Aerodrome map of all airports!", "JTPH: https://flightlinecharts.weebly.com/jtph.html \n JSLL: https://flightlinecharts.weebly.com/jsll.html \n JCO4: https://flightlinecharts.weebly.com/jc04.html")
        .setColor("#00FF00");
}

module.exports.run = async (bot, postgres, message, args) => {

    if (message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);
    message.channel.send(embedMsgChart()).catch(console.error);

}

module.exports.help = {
    name: "charts",
    format: "charts",
    description: "Gives you link to the chart page.",
    moderation: false,
    atc: false
}

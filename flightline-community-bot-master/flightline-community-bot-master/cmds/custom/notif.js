const Discord = require('discord.js');

module.exports.run = async (bot, postgres, message, args) => {

    message.channel.send("If you are getting too many notifications, follow the GIF below to disable them: \n\n https://gph.is/g/ZWd9pPK")

}

module.exports.help = {
    name: "notif",
    format: "notif",
    description: "-",
    moderation: false,
    atc: false,
    custom: true
}

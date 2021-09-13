const Discord = require("discord.js")

module.exports.run = async (bot, postgres, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You do not have the correct permissions to use this command!")
    if (!args[0]) return message.channel.send("You have not input a slowmode duration!")

    let channel = message.channel

    if (channel.rateLimitPerUser == args[0]) {
        return message.channel.send(`This channel already has ${args[0]} seconds of slowmode`)
    } else {
        channel.setRateLimitPerUser(args[0]).catch(error => console.log(error))
    }

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())

    if (args[0] == 0) {
        embed.setTitle(`#${channel.name} slowmode has been reset to 0 seconds`)
    } else {
        embed.setTitle(`#${channel.name} slowmode has been set to ${args[0]} seconds`)
    }

    if (args[1]) {
        embed.setDescription(`**Reason for slowmode: ${args[1]}**`)
    } else {
        embed.setDescription(`‎ ‎`)
    }

    message.channel.send(embed)
}

module.exports.help = {
    name: "slowmode",
    format: "slowmode <slowmode time in seconds> <Reason (Optional)>",
    description: "Sets the slowmode of a channel",
    moderation: true,
    atc: false
} 
const Discord = require('discord.js');

module.exports.run = async (bot, postgres, message, args) => {
    if (!message.member.roles.cache.find(r => r.name === "-------------- SERVER STAFF --------------")) return message.reply("You must be part of the moderation team to use this command!")

    let roleReq = args.slice(0).join(" ")

    let role = message.guild.roles.cache.find(r => r.name === roleReq)

    if (typeof role === "undefined") return message.channel.send("You have input an invalid role! Please try again!")

    let roleId = role.id
    let roleMembs = message.guild.roles.cache.get(roleId).members.map(m => m.user.tag)

    let roleList = ""

    if (roleMembs.length > 25) {
        let embed = new Discord.MessageEmbed()
        for (let i = 0; i < 25; i++) {
            roleList = roleList.concat(`${roleMembs[i]}\n`)
        }

        let roleList2 = ""
        let roleList3 = ""

        let x = 0
        let y = 0

        while (x < 25) {
            roleList2 = roleList2.concat(`${roleMembs[x + 25]}\n`)
            x++
            if (typeof roleMembs[x + 25] === "undefined") {
                break;
            }
        }

        if (roleMembs.length > 50) {
            while (y < 25) {
                roleList3 = roleList3.concat(`${roleMembs[y + 50]}\n`)
                y++
                if (typeof roleMembs[y + 50] === "undefined") {
                    break;
                }
            }
        }

        embed.setAuthor(bot.user.username, bot.user.displayAvatarURL())
        embed.setTimestamp()
        embed.setTitle(`${roleMembs.length} Members with the ${roleReq} role:`)
        embed.setColor("#add8e6")
        embed.addField("‏‏‎ ‎", roleList, true)
        embed.addField("‏‏‎ ‎", roleList2, true)
        if (roleList3.length > 0) {
            embed.addField("‏‏‎ ‎", roleList3, true)
        }

        message.channel.send(embed)
    } else {
        roleMembs.forEach(member => {
            roleList = roleList.concat(`${member}\n`)
        })
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(bot.user.username, bot.user.displayAvatarURL())
        embed.setTimestamp()
        embed.setTitle(`${roleMembs.length} Members with the ${roleReq} role:`)
        embed.setColor("#add8e6")
        embed.addField(`‏‏‎ `, roleList)
        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "members",
    format: "members [roleName]",
    description: "Lists up to 75 members of the inputted role",
    moderation: true,
    atc: false
} 
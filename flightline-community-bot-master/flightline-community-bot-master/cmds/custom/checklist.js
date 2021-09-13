const Discord = require('discord.js');

module.exports.run = async (bot, postgres, message, args) => {
    message.channel.send("Here find the checklist that is available to take for your flight: \nhttps://docs.google.com/document/d/1jdDATl8mMZrccJELlRQiNLSg6IB3mR7HqBjyFolpEIM/edit?usp=sharing (Provided by Middy)")
}

module.exports.help = {
    name: "checklist",
    format: "checklist",
    description: "-",
    moderation: false,
    atc: false,
    custom: true
}
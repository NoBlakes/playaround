const Discord = require('discord.js');

module.exports.run = async (bot, postgres, message, args) => {

    message.channel.send("Welcome to the server! Please make sure to read <#593832972713459739> and <#628684307698941953>. If you have more than 10 flight hours on Flightline, you can post a screenshot of them in <#593832554063200276>. Ping an available member of the Moderation Staff to get your role updated and do this every time you reach a benchmark in <#593833633471660042>. If you are unsure of any ATC communications or other aviation related information go to <#593983622503989280> and read the handbook found here: https://docs.google.com/presentation/d/1qEEOuPOaJxEimlVYgj_3fuIfBAEMhbgt83-zJVyAHmY/edit#slide=id.p. You can type /charts in <#594195546806419456> for a link to the charts. You can use /help to know all commands with the Flightline Community Bot and you can ask anyone for help if needed. If you want to be pinged when we have an event, go to <#694564820175028334> and react accordingly. Events will be announced in <#593832864081117252>. When we do events, you will need to file a flight plan. Type %help in<#656046381269516300> for help on how to file one. If you have any suggestions or ideas on how we can improve the server, please dont hesitate to use <#626707858179883009>. If you ever forget any of this, the basics of this server are in <#594113638139428874>, which also includes the link to invite your friends. Thanks for joining!")

}

module.exports.help = {
    name: "welcome",
    format: "welcome",
    description: "-",
    moderation: false,
    atc: false,
    custom: true
}
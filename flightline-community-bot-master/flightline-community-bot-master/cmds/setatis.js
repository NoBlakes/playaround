const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.botConfig.prefix;

class Atis {
    constructor(Airport, Information, ActRun, Wind, Cloud, Vis, Remarks, Delivery, Ground, Tower, Dir, Center){
        this.Airport = Airport;
        this.Information = Information;
        this.ActRun = ActRun;
        this.Wind = Wind;
        this.Cloud = Cloud;
        this.Visibility = Vis;
        this.Remarks = Remarks;
        this.Delivery = Delivery;
        this.Ground = Ground;
        this.Tower = Tower;
        this.Director = Dir;
        this.Center = Center;
    }

    embedMsgATIS(){
    return new Discord.MessageEmbed()
    .setTitle(`ATIS for ${this.Airport}`)
    .addField("Information for Airport:", `${this.Airport}`)
    .addField("Information:", `${this.Information}`)
    .addField("Time:", `${new Date()}`)
    .addField("Active Runways:", `${this.ActRun}`)
    .addField("Wind:", `${this.Wind}`)
    .addField("Cloud:", `${this.Cloud}`)
    .addField("Visibility:", `${this.Visibility}`)
    .addField("Remarks", `${this.Remarks}`)
    .addField("Delivery Frequency:", `${this.Delivery}`)
    .addField("Ground Frequency:", `${this.Ground}`)
    .addField("Tower Frequency:", `${this.Tower}`)
    .addField("Director Frequency:", `${this.Director}`)
    .addField("Center Frequency:", `${this.Center}`)
    .setFooter("ATIS is constantly updated, beware of sudden weather changes!")
    .setColor("#00BFFF");
    }
}

function embedMsgCommandHintSetATIS(){
    return new Discord.MessageEmbed()
    .setDescription(`Usage for ${prefix}setatis:`)
    .addField("/setatis Airport,Information,ActiveRunways,Wind,Cloud,Visibility,Remarks", "Make sure that there is NO SPACES BETWEEN LETTER/NUMBERS AND COMMAS(,). The only Spaces that can be used ARE IN BETWEEN WORDS AND SEPERATING /setatis FROM THE AIRPORT.")
    .addField("If there is any errors, please contact JusSupra#0962.","--------------------------------------------")
    .addField("Reason of error:", "Insufficent information for the ATIS!")
    .setTimestamp(Date.now())
    .setColor("#FF0000");
}

module.exports.run = async (bot, postgres, message, args, queueJTPH, queueJSLL, queueJCO4) => {

    if(message.channel.type === "dm") return message.channel.send("This command only works in the server chats!")

        let guildID = "593830690777333770";
        let guild = bot.guilds.cache.get(guildID);
        let member = message.guild.member(message.author);
        let role = member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");

        if(!member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to set ATIS'es");

            let messageArray = message.content.split(",");
            let sArgs = messageArray.slice(0);
            let firArg = sArgs[0].split(" ");
            let firstArg = firArg[1];

            if(sArgs.length < 7) return message.channel.send(embedMsgCommandHintSetATIS());

            module.exports.airportSelected = firstArg;

            if(firstArg === "JTPH"){

                let DeliveryFreq = "118.400MHz";
                let GroundFreq = "120.750MHz";
                let TowerFreq = "124.225MHz";
                let DirectorFreq = "126.825MHz";
                let CenterFreq = "132.600MHz";

                let finishedATISJTPH = new Atis(firstArg, sArgs[1], sArgs[2], sArgs[3], sArgs[4], sArgs[5], sArgs[6], DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
                message.channel.send(finishedATISJTPH.embedMsgATIS());
                module.exports.atisJTPH = finishedATISJTPH.embedMsgATIS();
                module.exports.atisJTPHRawObj = finishedATISJTPH;
            }

            else if(firstArg === "JSLL"){

                let DeliveryFreq = "122.225MHz";
                let GroundFreq = "119.600MHz";
                let TowerFreq = "123.775MHz";
                let DirectorFreq = "130.500MHz";
                let CenterFreq = "131.775MHz";

                let finishedATISJSLL = new Atis(firstArg, sArgs[1], sArgs[2], sArgs[3], sArgs[4], sArgs[5], sArgs[6], DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
                message.channel.send(finishedATISJSLL.embedMsgATIS());
                module.exports.atisJSLL = finishedATISJSLL.embedMsgATIS();
                module.exports.atisJSLLRawObj = finishedATISJSLL;
            }

            else if(firstArg === "JCO4"){

                let DeliveryFreq = "None";
                let GroundFreq = "None";
                let TowerFreq = "124.225MHz (Controlled by JTPH Tower!)";
                let DirectorFreq = "None";
                let CenterFreq = "None";

                let finishedATISJCO4 =  new Atis(firstArg, sArgs[1], sArgs[2], sArgs[3], sArgs[4], sArgs[5], sArgs[6], DeliveryFreq, GroundFreq, TowerFreq, DirectorFreq, CenterFreq);
                message.channel.send(finishedATISJCO4.embedMsgATIS());
                module.exports.atisJCO4 = finishedATISJCO4.embedMsgATIS();
                module.exports.atisJCO4RawObj = finishedATISJCO4;
            }
}

module.exports.help = {
    name: "setatis",
    format: "setatis",
    description: "Sets the ATIS at the specified airport with the parameters. To see the parameters, just type in" + prefix +"setatis and check the usage section.",
    moderation: false,
    atc: true
}

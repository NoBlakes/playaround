const setAtis = require('./setatis.js');

module.exports.run = async (bot, postgres, message, args) => {

    let Airport = args[0];
    let w = args.slice(0).join(" ");
    let wind = w.slice(5);
    
    if(!Airport) return message.channel.send("No airport provided!");
    if(!wind) return message.channel.send("No wind provided!");

    if(Airport === "JTPH"){
        let atis = setAtis.atisJTPHRawObj;
        if(!atis) return
        atis.Wind = wind;
        message.channel.send(atis.embedMsgATIS());
        module.exports.atisJTPHRawObj = atis;
        module.exports.atisJTPH = atis.embedMsgATIS();
    }

    if(Airport === "JSLL"){
        let atis = setAtis.atisJSLLRawObj;
        if(!atis) return
        atis.Wind = wind;
        message.channel.send(finishedATISJSLL.embedMsgATIS());
        module.exports.atisJSLLRawObj = atis
        module.exports.atisJSLL = atis.embedMsgATIS();
    }

    if(Airport === "JCO4"){
        let atis = setAtis.atisJCO4RawObj;
        if(!atis) return
        atis.Wind = wind;
        message.channel.send(finishedATISJCO4.embedMsgATIS());
        module.exports.atisJCO4RawObj = atis;
        module.exports.atisJCO4 = atis.embedMsgATIS();
    }
}

module.exports.help = {
    name: "wind",
    format: "wind [AirportICAO] [XXX @ XX]",
    description: "Updates the wind for the ATIS at the specified airport. This command can be used by anybody!",
    moderation: false,
    atc: false
}


const config = require("./config.json");
const Discord = require("discord.js");
const setAtis = require('./cmds/setatis.js');
const windFile = require('./cmds/wind.js');
const nicknameFile = require('./cmds/JSONS/nickname.json');
const { Client } = require('pg')
const fs = require('fs')

const bot = new Discord.Client({ disableEveryone: true });
const postgres = new Client({
    user: config.psqlConfig.user,
    host: config.psqlConfig.host,
    database: config.psqlConfig.database,
    password: config.psqlConfig.password,
    port: config.psqlConfig.port
})

bot.commands = new Discord.Collection();
module.exports.commands = bot.commands;

fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);

	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0){
		console.log("No commands to load!");
		return;
	}

	console.log("--------------------------------------------------------------------------------------------");
	console.log(`Loading ${jsfiles.length} commands:`)
	console.log("                                   ")

	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`)
		console.log(`${i + 1}: ${f} loaded!`)
		bot.commands.set(props.help.name, props)
    });
    
    console.log("--------------------------------------------------------------------------------------------");
    
    fs.readdir("./cmds/custom", (e, f) => {
        if(e) console.error(e);

        let custom = f.filter(f => f.split(".").pop() === "js");
        if(custom.length <= 0){
            console.log("No custom commands to load!");
            return;
        }
    
        console.log(`Loading ${custom.length} custom commands:`)
        console.log("                                   ")
    
        custom.forEach((f, i) => {
            let props = require(`./cmds/custom/${f}`)
            console.log(`${i + 1}: ${f} loaded!`)
            bot.commands.set(props.help.name, props)
        });
        
        console.log("--------------------------------------------------------------------------------------------");
    })

});

postgres.connect(err => {
	if(err) throw err;
	console.log(`Connecting to database: ${postgres.database}`)
  	console.log(`Connecting as: ${postgres.user}`)
	console.log(`Connecting to ${postgres.host}:${postgres.port}`)
	console.log("                        ")
    console.log("Connected to Database...")
});

const prefix = config.botConfig.prefix

bot.on("ready", async () => {
    try {
        var link = await bot.generateInvite(["ADMINISTRATOR"]);
    } catch (e) {
        console.log(e.stack)
    }

    console.log("--------------------------------------------------------------------------------------------");
    console.log(`Bot is ready! Logged in as: ${bot.user.username}`);
    console.log(`Logged in on: ${config.botConfig.token}`);
    console.log(`Time Logged on: ${new(Date)}`);
    console.log(`The prefix is: ${prefix}`);
    console.log("Below find the invite link should it be needed for the bot to be invited to another server:");
    console.log(link);
    console.log("--------------------------------------------------------------------------------------------");

    bot.setInterval(() => {
        for(let i in nicknameFile) {
            let newTimer = nicknameFile[i].timer + 5000
            nicknameFile[i].timer = newTimer

            fs.writeFile("./cmds/JSONS/nickname.json", JSON.stringify(nicknameFile, null, 2), (err) => {
               if(err) {
                   bot.users.cache.find("367722931993968650").send(`${nicknameFile[i].username} has received an error when counting hours, stopped timing to reduce API spam.`)
                   console.log(err)
               }
            })
        }
    }, 5000);

});

bot.on("message", async message => {
    if (message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
	if(cmd) cmd.run(bot, postgres, message, args);

// -------------------------------------------------------------

    if(command === `${prefix}setatis`){

        let AirChose = setAtis.airportSelected

        if(AirChose === "JTPH"){
            module.exports.atisJTPHRawObj = setAtis.atisJTPHRawObj
            module.exports.atisJTPH = setAtis.atisJTPH
        }

        if(AirChose === "JSLL"){
            module.exports.atisJSLLRawObj = setAtis.atisJSLLRawObj
            module.exports.atisJSLL = setAtis.atisJSLL
        }

        if(AirChose === "JCO4"){
            module.exports.atisJCO4RawObj = setAtis.atisJCO4RawObj
            module.exports.atisJCO4 = setAtis.atisJCO4
        }
    }

    if(command === `${prefix}wind`){

       let AirChose = args[0]

       if(AirChose === "JTPH"){
            if(!setAtis.atisJTPHRawObj) return message.channel.send("There is no ATIS set for JTPH so the bot cannot just change the wind of this Airport!")
            module.exports.atisJTPHRawObj = windFile.atisJTPHRawObj
            module.exports.atisJTPH = windFile.atisJTPH
       }

       if(AirChose === "JSLL"){
            if(!setAtis.atisJSLLRawObj) return message.channel.send("There is no ATIS set for JSLL so the bot cannot just change the wind of this Airport!")
            module.exports.atisJSLLRawObj = windFile.atisJSLLRawObj
            module.exports.atisJSLL = windFile.atisJSLL
        }

        if(AirChose === "JCO4"){
            if(!setAtis.atisJCO4RawObj) return message.channel.send("There is no ATIS set for JTPH so the bot cannot just change the wind of this Airport!")
            module.exports.atisJCO4RawObj = windFile.atisJCO4HRawObj
            module.exports.atisJCO4 = windFile.atisJCO4
       }
   }
});

bot.login(config.botConfig.token);

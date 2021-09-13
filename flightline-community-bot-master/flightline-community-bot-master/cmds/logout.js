const nicknameFile = require('./JSONS/nickname.json');
const fs = require('fs');
const ms = require('ms');

class logoutInfo {
    constructor(username, currentSessionLength, totalHours) {
        this.username = username;
        this.currentSessionLength = currentSessionLength;
        this.totalHours = totalHours;
    }
}

module.exports.run = async (bot, postgres, message, args) => {

    if (message.channel.type === "dm") return message.channel.send("This command only works in the server chats!").catch(console.error);

    let role = message.member.guild.roles.cache.find(r => r.name === "----------------- ATC Staff -----------------");
    if (!message.member.roles.cache.has(role.id)) return message.channel.send("Only ATC's are allowed to login and out as ATC!");

    if (!nicknameFile[message.author.id]) return message.channel.send("You are not logged in!")

    let DutyRole = message.guild.roles.cache.find(r => r.name === "On Duty")

    if(message.member.roles.cache.find(r => r.name === "On Duty")){
        message.member.roles.remove(DutyRole);
    }

    let TimeEnd = new Date().toISOString()

    await postgres.query(`UPDATE login_logs SET status = 'FIN_DUTY', time_end = '${TimeEnd}', duration = '${ms(nicknameFile[message.author.id].timer, { long: true })}', durationUNIX = ${nicknameFile[message.author.id].timer}, time_end_unix = ${Date.now()} WHERE username = '${nicknameFile[message.author.id].username}' AND time_start = '${nicknameFile[message.author.id].timeStart}'`, (err, res) => {
        if (err) console.log(err)

        if (message.member.manageable) {
            message.member.setNickname(`${nicknameFile[message.author.id].originNick}`).catch(console.error)
        }

        let username = nicknameFile[message.author.id].username

        let info;

        postgres.query(`SELECT SUM(durationunix) FROM login_logs WHERE username = '${username}' UNION SELECT durationunix FROM login_logs WHERE time_end = '${TimeEnd}';`, (e, r) => {

            if (e) {
                message.channel.send("Database error. Please contact Supra for more information.");
                console.error(e);
            }

            // r.rows[0].sum == Session Duration
            // r.rows[1].sum == Total ATC Hours

            let tHours;
            let CSL;

            if (!r.rows[1]) {
                tHours = 0
            } else tHours = r.rows[1].sum;

            if(r.rows[0].sum === typeof null){
                CSL = 0
            } else CSL = r.rows[0].sum

            info = new logoutInfo(username, ms(parseInt(r.rows[0].sum), { long: true }), tHours / 1000 / 60 / 60);

            let percentageMin = parseFloat((info.totalHours % 1))
            let infoMinutes = Math.floor(percentageMin * 60)

            delete nicknameFile[message.author.id]

            fs.writeFile('./cmds/JSONS/nickname.json', JSON.stringify(nicknameFile, null, 2), err => {
                if (err) console.log(err)
            })

            message.author.send(`Current Statistics for ATC: ${username} \n \nTotal Service Time: ${Math.floor(info.totalHours)} hours and ${infoMinutes} minute(s) \nSession Duration: ${info.currentSessionLength} \n \nLogout successful!`)
        });


    });
}

module.exports.help = {
    name: "logout",
    format: "logout",
    description: "Logs you out of your session that you are logged into.",
    moderation: false,
    atc: true
}

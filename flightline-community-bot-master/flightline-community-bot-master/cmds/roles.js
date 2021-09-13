module.exports.run = async (bot, postgres, message, args) => {

    if(!message.member.roles.cache.some(r => ['692447850826694758', '594443623324581938'].includes(r.id))) return message.channel.send("You do not have permission to give the starter roles!")

    let person = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);

    person.roles.add(['594441271871799296', '593830876035416164']);
    message.channel.send("Added starter roles to " + person.user.tag + ". \nPlease note that if the member already had some of the starter roles, no changes occured to those roles.")
}

module.exports.help = {
    name: "roles",
    format: "roles [Member Mention or userID]",
    description: "Gives the starter roles for all members.",
    moderation: true,
    atc: false
}

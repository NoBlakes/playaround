const { SlashCommandBuilder } = require('@discordjs/builders');
const { Message } = require('discord.js');
const { rolesMsg } = require('../functions/embeds');
const filter = i => i.customId === 'PING-LC' && 'PING-QOTD' && 'PING-EVT' && 'PING-GIVE';
const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
const LC1 = interaction.guild.roles.cache.find(r => r.name == "Ping - Landing Comp")
const QOTD1 = interaction.guild.roles.cache.find(r => r.name == 'Ping - QOTD')
const EVT1 = interaction.guild.roles.cache.find(r => r.name == 'Ping - Event')
const GIVE1 = interaction.guild.roles.cache.find(r => r.name == 'Ping - Giveaway')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("pingroles")
        .setDescription(" Choose the Ping Roles you would like "),
    async execute(interaction) {
        await interaction.reply({ content: 'Below you can chose between Ping - Event, Ping - LC/Landing Comp, Ping - QOTD and Ping - Giveaway, every time there is something relating that ping role, you will get pinged (LC and event need event access to properly work)', components: [rolesMsg()] });    
        collector.on('collect', async i => {
            if (i.customId === 'PING-LC' && (interaction.member.roles.cache.find(r => r.name === "Events Access"))) {
                await i.update({ content: 'the Ping - Landing Comp role was added to you!' , components: []});  interaction.member.roles.add(LC1)
            }  
            else if(!interaction.member.roles.cache.find(r => r.name === "Events Access")) {
                await i.update({ content: 'You need to have event access to get this role, go to #application-forms for more info' , components: []});
            }


            if (i.customId === 'PING-QOTD') {
                await i.update({ content: 'the Ping - QOTD role was added to you!' , components: [] });  interaction.member.roles.add(QOTD1)
            }


            if (i.customId === 'PING-EVENT' && (interaction.member.roles.cache.find(r => r.name === "Events Access"))) {
                await i.update({ content: 'the Ping - Event role was added to you!'  , components: [] });interaction.member.roles.add(EVT1)
            }
            else if(!interaction.member.roles.cache.find(r => r.name === "Events Access")) {
                await i.update({ content: 'You need to have event access to get this role, go to #application-forms for more info' , components: []});
            }

            
            if (i.customId === 'PING-GIVE') {
                await i.update({ content: 'the Ping - Giveaway role was added to you!', components: [] });  interaction.member.roles.add(GIVE1)
            }
        })
        


    },


    help: {
        "name": "pingroles",
        "description": " Choose the Ping Roles you would like ",
        "category": "custom"
    }

}


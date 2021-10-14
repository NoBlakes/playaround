const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("erc")
        .setDescription("Shows the ERC charts for Flightline"),
    async execute(interaction) {
        await interaction.reply({ content: 'Below you can find the ERC High & ERC Low charts that contain the waypoints and a map for Flightline', components: [ercMsg()] });
    },

    help: {
        "name": "erc",
        "description": "Shows the ERC charts for Flightline",
        "category": "custom"
    }

}
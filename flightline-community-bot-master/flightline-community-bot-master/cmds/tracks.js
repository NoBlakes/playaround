const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Tracks")
        .setDescription("Here, You can find the maps for tracks A, B and C"),
    async execute(interaction) {
        await interaction.reply({ content: "Below you can find the buttons that link you to the the appropriate track charts: ", components: [tracksMsg()]})
    },

    help: {
        "name": "Tracks",
        "description": "Here, You can find the maps for tracks A, B and C",
        "category": "custom"
    }

}
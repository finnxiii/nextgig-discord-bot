const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("List all available commands and their descriptions"),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("NextGig Help")
            .setDescription("Here are the available commands you can use:")
            .setColor(0x5865F2)
            .addFields(
                { name: "/subscribe", value: "Subscribe to job alerts with keyword, location, and frequency.", inline: false },
                { name: "/unsubscribe", value: "Unsubscribe from job alerts and stop receiving notifications.", inline: false },
                { name: "/mysettings", value: "View your current job alert settings.", inline: false },
                { name: "/jobs", value: "Search for jobs instantly.", inline: false },
                { name: "/ping", value: "Check if the bot is online and responsive.", inline: false }
            )
            .setFooter({ text: "NextGig | Your career assistant bot" });

        await interaction.reply({
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
    },
};
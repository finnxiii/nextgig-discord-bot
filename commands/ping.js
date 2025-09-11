const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check if the bot is online and responsive"),

    async execute(interaction) {
        const sent = await interaction.reply({
            content: "Pinging...",
            fetchReply: true,
            flags: MessageFlags.Ephemeral
        });

        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setTitle("Bot Status")
            .setColor(0x5865F2)
            .addFields(
                { name: "Bot Latency", value: `${latency}ms`, inline: true },
                { name: "API Latency", value: `${apiLatency}ms`, inline: true }
            )
            .setFooter({ text: "NextGig | Your career assistant bot" });

        await interaction.editReply({
            content: null,
            embeds: [embed],
            flags: MessageFlags.Ephemeral
        });
    },
};
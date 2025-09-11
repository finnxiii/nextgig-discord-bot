const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const User = require("../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mysettings")
        .setDescription("View your current job alert settings"),

    async execute(interaction) {
        const discordId = interaction.user.id;

        try {
            const user = await User.findOne({ discordId });

            if (!user) {
                const embed = new EmbedBuilder()
                    .setTitle("My Job Alert Settings")
                    .setDescription("You do not have any active job alert subscriptions. Use `/subscribe` to create one.")
                    .setColor(0x5865F2);

                await interaction.reply({
                    embeds: [embed],
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            // Build an embed card
            const embed = new EmbedBuilder()
                .setTitle("My Job Alert Settings")
                .setColor(0x5865f2)
                .addFields(
                    { name: "Keyword", value: user.keyword || "N/A", inline: true },
                    { name: "Location", value: user.location || "N/A", inline: true },
                    { name: "Frequency", value: user.frequency || "N/A", inline: true },
                )
                .setFooter({ text: `Subscribed on ${user.subscribedAt.toLocaleDateString()}` });

            await interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);

            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("An error occurred while fetching your job alerts. Please try again later.")
                .setColor(0xFF0000);

            await interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
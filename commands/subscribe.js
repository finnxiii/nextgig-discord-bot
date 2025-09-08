const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const User = require("../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("subscribe")
        .setDescription("Subscribe to job alerts")
        .addStringOption(option =>
            option.setName("keyword")
                .setDescription("Job title or keyword")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("location")
                .setDescription("Location (city or country)")
                .setRequired(false))
        .addStringOption(option =>
            option.setName("frequency")
                .setDescription("How often do you want alerts?")
                .setRequired(false)
                .addChoices(
                    { name: "Hourly", value: "hourly" },
                    { name: "Daily", value: "daily" },
                    { name: "Weekly", value: "weekly" }
                )
        ),

    async execute(interaction) {
        const keyword = interaction.options.getString("keyword");
        const location = interaction.options.getString("location") || "remote";
        const frequency = interaction.options.getString("frequency") || "daily";
        const discordId = interaction.user.id;

        try {
            let user = await User.findOne({ discordId });

            if (user) {
                user.keyword = keyword;
                user.location = location;
                user.frequency = frequency;
                await user.save();

                await interaction.reply({
                    content: `🔄 Updated subscription: **${keyword} in ${location} (${frequency})**`,
                    flags: MessageFlags.Ephemeral
                });
            } else {
                await User.create({ discordId, keyword, location, frequency });

                await interaction.reply({
                    content: `✅ Subscribed to job alerts for **${keyword} in ${location}** (${frequency})`,
                    flags: MessageFlags.Ephemeral
                });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "⚠️ Failed to save your subscription.",
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
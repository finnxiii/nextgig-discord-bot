const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const User = require("../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("myjobs")
        .setDescription("View your current job subscription"),
    async execute(interaction) {
        const discordId = interaction.user.id;

        try {
            const user = await User.findOne({ discordId });

            if (!user) {
                await interaction.reply({
                    content: "ℹ️ You don’t have any saved job alerts. Use `/subscribe` first.",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            const msg = `
📋 **Your Current Job Alert**
- 🔑 Keyword: **${user.keyword}**
- 🌍 Location: **${user.location}**
- ⏰ Frequency: **${user.frequency}**
      `;

            await interaction.reply({
                content: msg,
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "⚠️ Failed to fetch your job alerts.",
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
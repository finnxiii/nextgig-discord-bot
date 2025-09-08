const { SlashCommandBuilder } = require("discord.js");
const { MessageFlags } = require("discord.js");
const User = require("../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mysettings")
        .setDescription("View your current job alert subscription settings"),

    async execute(interaction) {
        const discordId = interaction.user.id;

        try {
            const user = await User.findOne({ discordId });

            if (user) {
                const msg = `
📋 **Your Job Alert Settings**
- 🔑 Keyword: **${user.keyword}**
- 🌍 Location: **${user.location}**
- ⏰ Frequency: **${user.frequency}**
- 📅 Subscribed At: ${user.subscribedAt.toLocaleDateString()}
        `;

                // Send DM
                try {
                    const dm = await interaction.client.users.fetch(discordId);
                    await dm.send(msg);
                    await interaction.reply({
                        content: "📨 I’ve sent your subscription details to your DM.",
                        flags: MessageFlags.Ephemeral
                    });
                } catch (dmError) {
                    console.error(`❌ Could not DM user ${discordId}:`, dmError.message);
                    await interaction.reply("⚠️ I couldn’t DM you. Please enable DMs from server members.");
                }
            } else {
                await interaction.reply({ content: "ℹ️ You don’t have an active job alert subscription. Use `/subscribe` to set one up.", ephemeral: true });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "⚠️ Failed to fetch your settings. Please try again later.", ephemeral: true });
        }
    },
};
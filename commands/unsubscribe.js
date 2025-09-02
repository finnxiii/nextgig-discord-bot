const { SlashCommandBuilder } = require("discord.js");
const User = require("../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unsubscribe")
        .setDescription("Unsubscribe from job alerts"),

    async execute(interaction) {
        const discordId = interaction.user.id;

        try {
            const user = await User.findOneAndDelete({ discordId });

            if (user) {
                await interaction.reply("✅ You have unsubscribed from job alerts. A confirmation has been sent to your DMs.");

                // Try sending a DM confirmation
                try {
                    const dm = await interaction.client.users.fetch(discordId);
                    await dm.send("📭 You have successfully unsubscribed from job alerts. You will no longer receive notifications.");
                } catch (dmError) {
                    console.error(`❌ Failed to DM unsubscribe confirmation to ${discordId}:`, dmError.message);
                }
            } else {
                await interaction.reply("ℹ️ You were not subscribed to any job alerts.");
            }
        } catch (error) {
            console.error(error);
            await interaction.reply("⚠️ Failed to unsubscribe. Please try again later.");
        }
    },
};
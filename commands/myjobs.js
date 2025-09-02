const { SlashCommandBuilder } = require("discord.js");
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
                return interaction.reply("You are not subscribed to any job alerts. Use `/subscribe` to set up a subscription.");
            }

            await interaction.reply(`You are subscribed to daily job alerts for **${user.keyword} in ${user.location}**.`);
        } catch (error) {
            console.error("Error fetching user subscription:", error);
            await interaction.reply("Sorry, there was an error fetching your subscription. Please try again later.");
        }
    },
};
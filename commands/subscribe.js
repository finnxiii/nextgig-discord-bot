const { SlashCommandBuilder, escapeBold } = require('discord.js');
const User = require('../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription('Subscribe to daily job alerts')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Job title or keyword')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('location')
                .setDescription('Location (city, state, or country)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('frequency')
                .setDescription('Alert frequency (daily, weekly)')
                .setRequired(false)
                .addChoices(
                    { name: 'Hourly', value: 'hourly' },
                    { name: 'Daily', value: 'daily' },
                    { name: 'Weekly', value: 'weekly' }
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
                await interaction.reply(`Your subscription has been updated to **${keyword} in ${location} (${frequency})**.`);
            } else {
                await User.create({ discordId, keyword, location, frequency });
                await interaction.reply(`You have successfully subscribed to daily job alerts for **${keyword} in ${location}** (${frequency}).`);
            }
        } catch (error) {
            console.error('Error subscribing user:', error);
            await interaction.reply('Sorry, there was an error processing your subscription. Please try again later.');
        }
    },
};
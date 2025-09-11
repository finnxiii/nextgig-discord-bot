const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
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
            let embed;

            if (user) {
                user.keyword = keyword;
                user.location = location;
                user.frequency = frequency;
                await user.save();

                embed = new EmbedBuilder()
                    .setTitle("Subscription Updated")
                    .setColor(0x5865F2)
                    .addFields(
                        { name: "Keyword", value: user.keyword, inline: true },
                        { name: "Location", value: user.location, inline: true },
                        { name: "Frequency", value: user.frequency, inline: true },
                    )
                    .setFooter({ text: `Updated on ${new Date().toLocaleDateString()}` });
            } else {
                const newUser = await User.create({ discordId, keyword, location, frequency });

                embed = new EmbedBuilder()
                    .setTitle("Subscription Created")
                    .setColor(0x5865F2)
                    .addFields(
                        { name: "Keyword", value: newUser.keyword, inline: true },
                        { name: "Location", value: newUser.location, inline: true },
                        { name: "Frequency", value: newUser.frequency, inline: true },
                    )
                    .setFooter({ text: `Subscribed on ${newUser.subscribedAt.toLocaleDateString()}` });
            }

            // Reply ephemeral in-channel
            await interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });

            // Try sending a DM confirmation
            try {
                const dmUser = await interaction.client.users.fetch(discordId);
                await dmUser.send({ embeds: [embed] });
            } catch (dmError) {
                console.error(`Failed to DM subscription confirmation to ${discordId}:`, dmError.message);
            }
        } catch (error) {
            console.error(error);

            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("An error occurred while saving your subscription. Please try again later.")
                .setColor(0xFF0000);

            await interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
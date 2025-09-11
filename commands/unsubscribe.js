const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const User = require("../models/User");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unsubscribe")
        .setDescription("Unsubscribe from job alerts"),

    async execute(interaction) {
        const discordId = interaction.user.id;

        try {
            const user = await User.findOneAndDelete({ discordId });
            let embed;

            if (user) {
                embed = new EmbedBuilder()
                    .setTitle("Unsubscribed")
                    .setDescription("You have successfully unsubscribed from job alerts. You will no longer receive notifications.")
                    .setColor(0xFF0000)
                    .setFooter({ text: `Unsubscribed on ${new Date().toLocaleDateString()}` });


            } else {

            }

            // Reply ephemeral in-channel
            await interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });

            // Try sending a DM confirmation
            try {
                const dm = await interaction.client.users.fetch(discordId);
                await dm.send({ embeds: [embed] });
            } catch (dmError) {
                console.error(`Failed to DM unsubscribe confirmation to ${discordId}:`, dmError.message);
            }
        } catch (error) {
            console.error(error);

            const embed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("An error occurred while trying to unsubscribe. Please try again later.")
                .setColor(0xFF0000);

            await interaction.reply({
                embeds: [embed],
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
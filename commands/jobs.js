const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const { searchJobs } = require("../services/jobsApi");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jobs")
        .setDescription("Search for jobs instantly")
        .addStringOption(option =>
            option.setName("keyword")
                .setDescription("Job title or keyword")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("location")
                .setDescription("Location (city or country)")
                .setRequired(false)),

    async execute(interaction) {
        const keyword = interaction.options.getString("keyword");
        const location = interaction.options.getString("location") || "remote";

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        try {
            const jobs = await searchJobs(keyword, location);

            if (jobs.length === 0) {
                await interaction.editReply({
                    content: "⚠️ No jobs found. Try different keywords or location.",
                    flags: MessageFlags.Ephemeral
                });
                return;
            }

            // Create embed cards for first 5 jobs
            const embeds = jobs.slice(0, 5).map((job, idx) =>
                new EmbedBuilder()
                    .setTitle(`${job.title}`)
                    .setURL(job.url)
                    .setDescription(`🏢 ${job.company}\n🌍 ${job.location}`)
                    .setFooter({ text: `Result ${idx + 1} of ${jobs.length}` })
                    .setColor(0x5865F2)
            );

            // Button to see more jobs (link to our Express webpage)
            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel("🔗 View More Jobs")
                    .setStyle(ButtonStyle.Link)
                    .setURL(`http://localhost:3000/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`)
            );

            await interaction.editReply({
                content: `📋 Job search results for **${keyword} in ${location}**`,
                embeds,
                components: [row],
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                content: "⚠️ Failed to fetch jobs.",
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
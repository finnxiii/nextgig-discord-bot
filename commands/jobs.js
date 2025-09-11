const { SlashCommandBuilder, EmbedBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
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

            if (!jobs || jobs.length === 0) {
                const noResultsEmbed = new EmbedBuilder()
                    .setTitle("No Jobs Found")
                    .setDescription(`No jobs found for **${keyword}** in **${location}**.`)
                    .setColor(0x5865F2);

                await interaction.editReply({ embeds: [noResultsEmbed] });
                return;
            }

            const jobsToShow = jobs.slice(0, 5);

            const embeds = jobsToShow.map((job, index) => {
                const embed = new EmbedBuilder()
                    .setTitle(job.title)
                    .setURL(job.url)
                    .setDescription(`${job.company} — ${job.location}`)
                    .setColor(0x5865F2)
                    .setFooter({ text: `Result ${index + 1} of ${jobs.length} | NextGig` });
                return embed;
            });

            const components = [];

            if (jobs.length > 5) {
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel("View More Jobs")
                        .setStyle(ButtonStyle.Link)
                        .setURL(
                            `http://localhost:3000/jobs?keyword=${encodeURIComponent(
                                keyword
                            )}&location=${encodeURIComponent(location)}`
                        )
                );
                components.push(row);
            }

            await interaction.editReply({
                content: `Job search results for **${keyword} in ${location}**:`,
                embeds: embeds,
                components,
                flags: MessageFlags.Ephemeral
            });
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("Unable to fetch job results. Please try again later.")
                .setColor(0xFF0000);

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
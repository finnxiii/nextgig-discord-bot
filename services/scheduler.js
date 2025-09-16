const cron = require('node-cron');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const User = require('../models/User');
const { searchJobs } = require('./jobsApi');

function startJobAlerts(client) {
    const isDev = process.env.NODE_ENV === "development";

    // Development: run every minute
    if (isDev) {
        cron.schedule("* * * * *", async () => {
            console.log("⏱️ Running DEV job alert task (every minute)...");
            await processJobAlerts(client, "hourly");
        });
    } else {
        // Production schedules
        cron.schedule("0 * * * *", async () => {
            await processJobAlerts(client, "hourly");
        });
        cron.schedule("0 9 * * *", async () => {
            await processJobAlerts(client, "daily");
        });
        cron.schedule("0 9 * * 1", async () => {
            await processJobAlerts(client, "weekly");
        });
    }
}


async function processJobAlerts(client, frequency) {
    console.log(`Running job alert task for ${frequency} users...`);
    try {
        const users = await User.find({ frequency });

        for (const user of users) {
            const jobs = await searchJobs(user.keyword, user.location);
            const dm = await client.users.fetch(user.discordId);

            if (jobs.length > 0) {
                const jobsToShow = jobs.slice(0, 5);

                const embed = new EmbedBuilder()
                    .setTitle(`Job Alerts: ${user.keyword} in ${user.location}`)
                    .setColor(0x5865f2)
                    .setDescription(
                        jobsToShow
                            .map(
                                (job, idx) =>
                                    `**${idx + 1}. [${job.title.length > 200
                                        ? job.title.slice(0, 197) + "..."
                                        : job.title
                                    }](${job.url})**\n${job.company} — ${job.location}`
                            )
                            .join("\n\n")
                    )
                    .setFooter({
                        text: `NextGig • Showing ${jobsToShow.length} of ${jobs.length} results`,
                    });

                // Add "View More" button if more results available
                const components = [];
                const webUrl = process.env.WEB_URL || "http://localhost:3000";

                if (jobs.length > 5) {
                    const row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setLabel("View More Jobs")
                            .setStyle(ButtonStyle.Link)
                            .setURL(`${webUrl}/jobs?keyword=${encodeURIComponent(user.keyword)}&location=${encodeURIComponent(user.location)}`)
                    );
                    components.push(row);
                }

                try {
                    await dm.send({
                        content: "Here are your job alerts:",
                        embeds: [embed],
                        components,
                    });
                    console.log(`✅ Sent DM to ${user.discordId}`);
                } catch (err) {
                    console.error(`❌ Failed to send DM to ${user.discordId}:`, err);
                }
            } else {
                const noJobsEmbed = new EmbedBuilder()
                    .setTitle("Job Alerts")
                    .setDescription("No new jobs found this time.")
                    .setColor(0x5865f2);

                await dm.send({
                    content: "Here are your job alerts:",
                    embeds: [noJobsEmbed],
                });
            }
        }
    } catch (error) {
        console.error("❌ Error in job alert task:", error.message);
    }
}

module.exports = { startJobAlerts };
const cron = require('node-cron');
const User = require('../models/User');
const { searchJobs } = require('./jobsApi');

function startJobAlerts(client) {
    cron.schedule('0 * * * *', async () => {
        console.log('Running daily job alert task...');

        try {
            const users = await User.find();
            console.log("📋 Subscribed users:", users.length);

            for (const user of users) {
                const now = new Date();

                if (user.frequency === 'hourly' ||
                    (user.frequency === 'daily' && now.getHours() === 9) || // 9AM daily
                    (user.frequency === 'weekly' && now.getDay() === 1 && now.getHours() === 9) // 9AM every Monday
                ) {
                    console.log(`🔎 Sending jobs to ${user.discordId} (${user.frequency})`);

                    const jobs = await searchJobs(user.keyword, user.location);
                    console.log("Jobs found:", jobs.length);

                    try {
                        const dm = await client.users.fetch(user.discordId);

                        if (jobs.length > 0) {
                            const message = jobs.slice(0, 3).map((job, idx) =>
                                `**${idx + 1}. ${job.title}** at ${job.company}\n🌍 ${job.location}\n🔗 ${job.url}\n`
                            ).join('\n');

                            await dm.send(`📢 Daily job alerts for **${user.keyword} in ${user.location}**:\n\n${message}`);
                            console.log(`📨 Sent DM to ${user.discordId}`);
                        } else {
                            await dm.send("ℹ️ No new jobs found this time 👀");
                            console.log(`📨 Sent no-job DM to ${user.discordId}`);
                        }
                    } catch (dmError) {
                        console.error(`❌ Could not DM user ${user.discordId}:`, dmError.message);
                    }
                }
            }
        } catch (error) {
            console.error(`❌ Error in daily job alert task:`, dmError.message);
        }
    });
}

module.exports = { startJobAlerts };
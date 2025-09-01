const { SlashCommandBuilder } = require('discord.js');
const { searchJobs } = require('../services/jobsApi');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jobs')
        .setDescription('Find jobs by keyword and location')
        .addStringOption(option =>
            option.setName('keyword')
                .setDescription('Job title or keyword')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('location')
                .setDescription('Location (city, state, or country)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();

        const keyword = interaction.options.getString('keyword');
        const location = interaction.options.getString('location') || 'remote';

        try {
            const jobs = await searchJobs(keyword, location);
            if (jobs.length === 0) {
                return interaction.editReply(`No jobs found for "${keyword}" in "${location}".`);
            }

            let reply = `🔎 **Jobs for ${keyword} in ${location}:**\n\n`;
            jobs.slice(0, 5).forEach((job, idx) => {
                reply += `**${idx + 1}. ${job.title}** at ${job.company}\n🌍 ${job.location}\n🔗 ${job.url}\n\n`;
            });

            await interaction.editReply(reply);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            await interaction.editReply('Sorry, there was an error fetching job listings. Please try again later.');
        }
    }
}
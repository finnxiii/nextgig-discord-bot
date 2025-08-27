const { SlashCommandBuilder } = require("discord.js");
const { askQuestion } = require("../services/openai");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ask")
        .setDescription("Ask the AI a question")
        .addStringOption(option =>
            option.setName("question")
                .setDescription("Your question here")
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const question = interaction.options.getString("question");
        const answer = await askQuestion(question);
        await interaction.editReply(answer);
    }
};
require('dotenv').config();
const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY);

async function askQuestion(question) {
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.3", // free instruct model
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ],
            max_tokens: 300,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ Hugging Face request failed:", error.message);
        return "⚠️ Sorry, I couldn't process your question.";
    }
}

module.exports = { askQuestion };
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function askQuestion(question) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: question }
            ],
            max_tokens: 300,
        });

        console.log("💡 OpenAI response:", response); // debug log
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ OpenAI request failed:", error.message);
        return "⚠️ Sorry, I couldn't process your question.";
    }
}

module.exports = { askQuestion };
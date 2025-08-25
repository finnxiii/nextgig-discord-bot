require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on("clientReady", () => {
    console.log('Our bot is ready to go!!!');
})

client.on("messageCreate", msg => {
    if (msg.content === "ping") {
        msg.channel.send("Pong!")
        // msg.reply("Pong!")
    }
})

client.login(process.env.BOT_TOKEN);
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const connectDB = require('./config/config');

console.log("🔍 Starting bot...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

// Load commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        if (command?.data?.name) {
            client.commands.set(command.data.name, command);
            console.log(`Loaded command: ${command.data.name}`);
        } else {
            console.warn(`Skipped ${file} (no valid command export)`);
        }
    } catch (err) {
        console.error(`Error loading command ${file}:`, err);
    }
}

// Interaction handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.warn(`Unknown command: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command ${interaction.commandName}:`, error);
        if (interaction.deferred || interaction.replied) {
            await interaction.followUp({ content: 'There was an error executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });
        }
    }
});

// Ready event
client.once("clientReady", () => {
    console.log(`🤖 Logged in as ${client.user.tag}`);
});

// Main async function
async function startBot() {
    try {
        // Connect to Database  
        await connectDB();

        // Login to Discord
        console.log("🔑 Logging in to Discord...");
        await client.login(process.env.BOT_TOKEN);
    } catch (error) {
        console.error("Bot startup failed:", error);
        process.exit(1);
    }
};

startBot();
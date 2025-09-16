# 🎯 NextGig Discord Bot

A Discord bot that helps users find job opportunities and receive automated job alerts. Built with Node.js, Discord.js, and MongoDB.

## ✨ Features

- **Job Search**: Search for jobs directly in Discord using the `/jobs` command
- **Job Alerts**: Subscribe to receive automated job notifications 
- **Web Interface**: View job listings on a dedicated web portal
- **Customizable Alerts**: Set frequency (hourly/daily/weekly) and location preferences
- **Direct Messages**: Receive job notifications directly in your Discord DMs

## 🛠 Tech Stack

- Node.js
- Discord.js
- Express.js
- MongoDB
- EJS Templates
- JSearch API

## Commands

- `/subscribe` - Subscribe to job alerts with keyword, location, and frequency
- `/unsubscribe` - Stop receiving job alerts
- `/mysettings` - View your current job alert settings
- `/jobs` - Search for jobs instantly
- `/ping` - Check bot status
- `/help` - List all available commands

## 🚀 Setup

1. Clone the repository:
```sh
git clone https://github.com/your-username/nextgig-discord-bot.git
cd nextgig-discord-bot
```

2. Install dependencies:
```sh
npm install
```

3. Create a `.env` file with the following variables:
```
BOT_TOKEN=your_discord_bot_token
MONGODB_URI=your_mongodb_connection_string
CLIENT_ID=your_discord_client_id
GUILD_ID=your_discord_server_id
JSEARCH_API_KEY=your_jsearch_api_key
NODE_ENV=development
```

4. Deploy Discord commands:
```sh
npm run deploy
```

5. Start the bot and web server:
```sh
npm run dev:all
```

## Available Scripts

- `npm start` - Start the Discord bot
- `npm run dev` - Start the bot with nodemon
- `npm run web` - Start the web server
- `npm run dev:all` - Start both bot and web server with nodemon
- `npm run deploy` - Deploy Discord slash commands

## Web Interface

The web interface is available at `http://localhost:3000/jobs` and allows users to:
- Search for jobs using keywords and location
- View detailed job listings
- Access job application links

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. Feel free to contribute.

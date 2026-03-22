# NextGig Discord Bot

![Deployment](https://img.shields.io/github/actions/workflow/status/finnxiii/nextgig-discord-bot/deploy.yml?label=deployment)

NextGig is a Discord-based job discovery platform that enables users to search for job opportunities and receive automated, personalised job alerts directly within Discord.

Built with Node.js, Discord.js, and MongoDB, the system integrates external job APIs with a real-time messaging interface to deliver a seamless job search experience.

<br>

## Key Features

- Real-time job search via Discord slash commands  
- Automated job alerts with configurable frequency (hourly, daily, weekly)  
- Personalised filtering by keyword and location  
- Direct message delivery for notifications  
- Web interface for browsing and viewing job listings  
- Persistent user preferences stored in MongoDB  

<br>

## System Architecture

1. **Discord Interface**  
   Users interact with the system through slash commands powered by Discord.js.

2. **Backend Services**  
   Node.js + Express handles API requests, job fetching, and user preference management.

3. **Job Data Integration**  
   External job listings are retrieved via the JSearch API.

4. **Database Layer**  
   MongoDB stores user subscriptions, preferences, and alert configurations.

5. **Notification System**  
   Scheduled jobs trigger alerts and deliver job updates via Discord DMs.

6. **Web Interface**  
   An Express + EJS web app provides a browser-based job search experience.

<br>

## Commands

- `/subscribe` — Subscribe to job alerts (keyword, location, frequency)  
- `/unsubscribe` — Stop receiving job alerts  
- `/mysettings` — View current alert configuration  
- `/jobs` — Perform an instant job search  
- `/ping` — Check bot status  
- `/help` — List available commands  

<br>

## Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Discord.js](https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![EJS](https://img.shields.io/badge/EJS-8CC84B?style=for-the-badge&logo=ejs&logoColor=black)](https://ejs.co/)
[![JSearch API](https://img.shields.io/badge/JSearch%20API-FF5A5F?style=for-the-badge&logo=rapidapi&logoColor=white)](https://rapidapi.com/)

<br>

## Installation

1. Clone the repository:
```sh
git clone https://github.com/github_username/repo_name.git
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

<br>

## Available Scripts

- `npm start` - Start the Discord bot
- `npm run dev` - Start the bot with nodemon
- `npm run web` - Start the web server
- `npm run dev:all` - Start both bot and web server with nodemon
- `npm run deploy` - Deploy Discord slash commands

<br>

## Web Interface

The web interface is available at `http://localhost:3000/jobs` and allows users to:
- Search for jobs using keywords and location
- View detailed job listings
- Access job application links

<br>

<!--
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. Feel free to contribute.
-->

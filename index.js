require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Get token from .env
const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('❌ BOT_TOKEN not provided in .env file!');
  process.exit(1);
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `👋 Hello ${msg.from.first_name}! I am your HYPE Token bot.`);
});

// Example echo handler
bot.on('message', (msg) => {
  if (msg.text !== '/start') {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});

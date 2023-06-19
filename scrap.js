const axios = require('axios');
const cheerio = require('cheerio');
const TelegramBot = require('node-telegram-bot-api');

// Token du bot Telegram
const telegramToken = '##';

// ID du chat ou du destinataire pour recevoir les messages
const telegramChatId = '##';

// Créer une instance du bot Telegram
const bot = new TelegramBot(telegramToken);

async function testPageContent() {
  const baseUrl = 'https://mega4upload.com/';
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  const numTests = 50000; // Nombre de tests à effectuer

  for (let i = 0; i < numTests; i++) {
    let randomString = generateRandomString(12, characters);
    let url = baseUrl + randomString;

    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const h2Element = $('h2.title');

      if (h2Element.length > 0 && h2Element.text() === 'File Not Found') {
        // console.log(`[✗] Lien HS: ${url} + ${h2Element.text()}`);
      } else {
        sendMessage(`[✓] ${url} + ${h2Element.text()}`);
      }
    } catch (error) {
      sendMessage(`[✗✗] ${url}: ${error}`);
      console.log(`Erreur lors de la requête à l'URL `);
    }

    // Attente aléatoire entre 1 et 5 secondes
    await delay(getRandomDelay(0));
  }
}

function generateRandomString(length, characters) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min) * 1000; // Convertir en millisecondes
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendMessage(message) {
  bot.sendMessage(telegramChatId, message);
}

testPageContent();



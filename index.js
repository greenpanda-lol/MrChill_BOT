const express = require("express");
const app = express();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const Database = require("@replit/database");
const db = new Database();

app.listen(3000, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// parancsok:

client.on("messageCreate", async (message) => {
  if (message.content === "ping") {
    message.channel.send("pong!");
  }
  
  if(message.content.toLocaleLowerCase().startsWith("!bal")) {
    let balance = await db.get(`wallet_${message.author.id}`);
    let bank = await db.get(`bank_${message.author.id}`);

    if(balance === null || typeof balance === 'object') balance = 0;
    if(bank === null || typeof bank === 'object') bank = 0;
    let currency = "💵";
    let moneyEmbed = new EmbedBuilder()
      .setTitle(message.author.username + " pénze")
      .setDescription(`Készpénzed: ${balance}${currency}\nBankszámlád: ${bank}${currency}`)
      .setColor("Random")
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}));
    
    message.channel.send({embeds: [moneyEmbed]});

  if(message.content.toLocaleLowerCase().startsWith("!daily")) {
    const check = await db.get(`dailyCheck_${message.author.id}`);
    const timeout = 86400000;
    if (check !== null && timeout - (date.now() - check > 0)) {
      const ms = require("pretty-ms");
      const timeLeft = ms(timeout - (Date.now() - check));
      message.channel.send(`Már begyűjtötted a napi pénzed. Próbáld újra ${timeLeft} múlva!`)
    } else {
      let reward = 250
      let currentBalance = await db.get(`wallet_${message.author.id}`)
      message.channel.send("Begyűjtötted a napi pénzed! +250💵")
      await db.set(`wallet_${message.author.id}`, currentBalance + reward)
      await db.set(`dailyCheck_${message.author.id}`, Date.now())
    }
  }
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "pong") {
    message.channel.send("ping!");
  }
});

// parancsok vége

client.login(process.env.token);
const express = require("express");
const app = express();
const { Client, GatewayIntentBits } = require("discord.js");
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
    
    message.channel.send(`A készpénzed: **${Number(balance)}** és a bankszámlád: **${Number(bank)}**`) 
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "pong") {
    message.channel.send("ping!");
  }
});

// parancsok vége

client.login(process.env.token);
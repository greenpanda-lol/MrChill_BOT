const express = require("express");
const app = express();
const { Client, GatewayIntentBits } = require("discord.js");

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

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong!");
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "pong") {
    message.channel.send("ping!");
  }
});

client.login(process.env.token);

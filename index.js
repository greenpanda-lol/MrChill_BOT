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

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("pong!");
  }
});

client.login(process.env.token);

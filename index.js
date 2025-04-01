const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activities: [{ name: "!help" }], status: "dnd" });
});

const hugGifs = [
  "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
  "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
  "https://media.giphy.com/media/3M4NpbLCTxBqU/giphy.gif",
];

client.on("messageCreate", async (message) => {
  if (message.content === "ping") {
    message.channel.send("pong!");
  } else if (message.content === "!help") {
    message.channel.send("hamarosan");
  } else if (message.content === "pong") {
    message.channel.send("ping!");
  } else if (message.content === "!netfit") {
    message.channel.send(
      "A netfit 20 méteres ingafutás tesztjében fokozatosan emelkedő sebességű futással kell a kijelölt 20 méteres távokat teljesíteni. Két hangjelzés között *tünn* kell átfutni az egyik vonaltól a másikig. Vagyis a hangjelzésekkel egy időben kell megfordulni. A teszt lassú sebességű futással kezdődik, majd egy percenként fokozatosan gyorsul, amit egy másik hangjelzés fog jelezni *speed up*. A teszt során mindig egyenes vonalban fuss oda-vissza. Ha a második alkalommal nem tudod elérni a túloldalat a hangjelzésig, akkor véget ér számodra a teszt. Törekedj arra, hogy minél több távot teljesíts! Álljatok fel a rajtvonalnál! *zene* Felkészülni, start!",
    );
  } else if (message.content.startsWith("!love")) {
    const args = message.content.split(" ").slice(1);
    let response = "";

    if (args.length > 0) {
      const person = args.join(" ");
      response = `🤗 <@${message.author.id}> ölelést küld **${person}**-nak/nek! ❤️`;
    } else {
      response = "Meg kell adnod valakit, akinek ölelést szeretnél küldeni!";
    }

    const gif = hugGifs[Math.floor(Math.random() * hugGifs.length)];
    message.channel.send(`${response}\n${gif}`);
  }
});

app.listen(3000, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

client.login(process.env.token);

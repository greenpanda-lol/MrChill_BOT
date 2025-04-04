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

const fightGifs = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGd6eWtyNTcyenpxeDJyOGxzbmpjN3Z2dTJzMzl4cGpjaDZwcms1OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohc0QQkTH6YK8g4zS/giphy.gif",
  "http://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmI5b2VjYXFvbDA4MDUwMGpreG5jNzh1ZXpqd2F1czR5cWhiYW9mcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rcRwO8GMSfNV6/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTUyMGJieDM3Ym44MHhod3Izdjk1YmEyNTFrZmdxMmJ6NnNnOGRrbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/w5FSoU86sXRFm/giphy.gif",
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

    const gif = hugGifs[Math.floor(Math.random() * fightGifs.length)];
    message.channel.send(`${response}\n${gif}`);
  } else if (message.content.startsWith("!fight")) {
    const args = message.content.split(" ").slice(1);
    let response = "";

    if (args.length > 0) {
      const person = args.join(" ");
      response = `🔪 <@${message.author.id}> megveri **${person}**-t! 👊`;
    } else {
      response = "Meg kell adnod valakit, akinek verést szeretnél küldeni!";
    }

    const gif = fightGifs[Math.floor(Math.random() * fightGifs.length)];
    message.channel.send(`${response}\n${gif}`);
  } else if (message.content.startsWith("!bunyó")) {
    const args = message.content.split(" ").slice(1);
    let response = "";

    if (args.length > 1) {
      const [fighter1, fighter2] = args;
      response = `💣Emberek! ${fighter1} és ${fighter2} bunyózni fog! Verd meg! Verd meg!🗣️`;';
    } else {
      response = "Meg kell adnod két embert!";
    }

    const gif = fightGifs[Math.floor(Math.random() * fightGifs.length)];
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

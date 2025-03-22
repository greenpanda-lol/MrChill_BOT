const { REST, Routes } = require("discord.js");
const botID = "1352996316564820061"
const serverID = "1347631690943828049"
const botToken = process.env.token

const rest = new REST().setToken(botToken)
const slashRegister = async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(botID, serverID),) {
      body: [
        {
          name: "ping",
          description: "pong!",
        }
      ]
    }
  } catch (error) {
    console.error(error)
  }
}
slashRegister()
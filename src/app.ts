import { GatewayIntentBits } from "discord.js";
import BotClient from "./classes/BotClient.js";
import Logger from "./utils/Logger.js";

process.on("uncaughtException", (error, orr) => {
  Logger.Error(error.message);
  console.log(orr);
});

process.on("unhandledRejection", (reason, promise) => {
  Logger.Warn(reason as string);
  console.log(promise);
});

process.on("warning", (reason) => {
  Logger.Warn(reason.message);
  console.log(reason.stack);
});

const client = new BotClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});

client.login(process.env.TOKEN);

import {
  ActivityType,
  ApplicationCommandDataResolvable,
  EmbedBuilder,
  TextChannel,
} from "discord.js";
import BotEvent from "../../classes/BotEvent.js";
import Logger from "../../utils/Logger.js";
import fetch from "node-fetch";

/**
 * CLasse pour l'événement ready.
 */
export default class ReadyEvent extends BotEvent {
  /**
   * Constructeur pour l'événement ready.
   */
  constructor() {
    super("ready", true);
  }

  /**
   * Méthode pour l'événement ready.
   */
  async exec() {
    Logger.Client(
      `${this.client?.user?.username} est pret ! [v.${process.env.npm_package_version}]`
    );

    this.#registerCommands();
    this.#statsInActivty();
  }

  /**
   * On enregistre toutes les commandes sur les serveurs concernés.
   */
  #registerCommands() {
    if (process.env.DEV_GUILD_ID) {
      const devGuild = this.client?.guilds.cache.get(
        process.env.DEV_GUILD_ID as string
      );
      devGuild?.commands.set(
        this.client?.interactionCommands.map(
          (cmd) => cmd.interactionCommandOptions
        ) as ApplicationCommandDataResolvable[]
      );
    } else {
      if (process.env.NODE_ENV == "prod") {
        this.client?.application?.commands.set(
          this.client?.interactionCommands.map(
            (cmd) => cmd.interactionCommandOptions
          ) as ApplicationCommandDataResolvable[]
        );
      }
    }
  }

  /**
   * On change l'activité toutes les X secondes avec des statistiques différentes.
   */
  #statsInActivty() {
    setTimeout(async () => {
      while (true) {
        let message = "discord.gg/StAPyC4r3g";

        if (process.env.SUPER_SECRET_KEY) {
          try {
            const req = await fetch(
              `${process.env.API_URL}/subscriptions?apiKey=${process.env.SUPER_SECRET_KEY}`
            );

            const res = (await req.json()) as {
              message: string;
              total_search: number;
            };

            const total_search = res.total_search;

            if (total_search) {
              message = `${total_search} recherches`;
            }
          } catch (err) {
            if (err instanceof Error) {
              Logger.Error(err.message);
            }
          }
        }

        this.client?.user?.setActivity({
          name: message,
          type: ActivityType.Watching,
        });
        await sleep(7000);
      }
    }, 1);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

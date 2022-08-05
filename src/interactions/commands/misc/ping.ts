import { CommandInteraction } from "discord.js";
import InteractionCommand from "../../../classes/InteractionCommand.js";
import BotClient from "../../../classes/BotClient.js";

/**
 * Classe pour la commande ping.
 */
export default class PingCommand extends InteractionCommand {
  constructor() {
    super({
      name: "ping",
      description: "Retourne la latence avec l'API Discord.",
      category: "💡 Misc",
    });
  }

  /**
   * Méthode pour la commande ping.
   *
   * @param client Le BotClient actuel.
   * @param interaction L'interaction à gérer.
   */
  async exec(client: BotClient, interaction: CommandInteraction) {
    interaction.reply({
      content: `La latence avec l'API est de **${
        Date.now() - interaction.createdTimestamp
      } ms** 🏓`,
      ephemeral: true,
    });
  }
}

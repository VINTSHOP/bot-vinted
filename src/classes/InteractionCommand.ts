import { CommandInteraction } from "discord.js";
import { interactionCommandOptions } from "../types/InteractionCommandOptions.js";
import BotClient from "./BotClient.js";

/**
 * Classe par défaut pour toutes les commandes.
 */
export default class InteractionCommand {
  /**
   * Options pour la commandes.
   */
  interactionCommandOptions: interactionCommandOptions;

  /**
   * Constructeur par défaut pour toutes les commandes.
   *
   * @param interactionCommandOptions Options pour la commandes.
   */
  constructor(interactionCommandOptions: interactionCommandOptions) {
    this.interactionCommandOptions = interactionCommandOptions;
  }

  /**
   * Méthode par défaut pour toutes les commandes.
   *
   * @param client Le BotClient acutel.
   * @param interaction L'interaction devant être traitée.
   */
  exec(client: BotClient, interaction: CommandInteraction) {
    interaction.reply({
      content: "Cette commande n'est pas encore prête.",
      ephemeral: true,
    });
  }
}

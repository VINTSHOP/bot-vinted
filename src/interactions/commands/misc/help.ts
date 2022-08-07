import {
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder,
} from "discord.js";
import InteractionCommand from "../../../classes/InteractionCommand.js";
import BotClient from "../../../classes/BotClient.js";

/**
 * Classe pour la commande help.
 */
export default class HelpCommand extends InteractionCommand {
  constructor() {
    super({
      name: "help",
      description: "Afficher l'aide sur les commandes.",
      category: "💡 Misc",
      options: [
        {
          name: "commande",
          description: "Commande pour laquelle vous voulez afficher l'aide.",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  /**
   * Méthode pour la commande help.
   *
   * @param client Le BotClient actuel.
   * @param interaction L'interaction à gérer.
   */
  async exec(client: BotClient, interaction: CommandInteraction) {
    const options = interaction.options as CommandInteractionOptionResolver;

    const commande = options.getString("commande");

    if (!commande) {
      let eb = new EmbedBuilder()
        .setTitle("Help")
        .setColor("Gold")
        .addFields([
          {
            name: "Liste des commandes",
            value:
              "Pour plus d'informations complémentaires, tapez `/help <command>`.",
          },
        ])
        .setFooter({
          text: `${client.user?.username}`,
          iconURL: `${client.user?.avatarURL()}`,
        });

      let commandCategories: Record<string, string[]> = {};

      for (const command of client.interactionCommands) {
        if (!commandCategories[command[1].interactionCommandOptions.category]) {
          commandCategories[command[1].interactionCommandOptions.category] =
            new Array();
        }

        commandCategories[command[1].interactionCommandOptions.category].push(
          command[1].interactionCommandOptions.name
        );
      }

      for (const category in commandCategories) {
        eb.addFields([
          {
            name: `${category.toUpperCase()}`,
            value: `\`${commandCategories[category].join(", ")}\``,
          },
        ]);
      }

      interaction.reply({ embeds: [eb] });
      return;
    } else {
    }
  }
}

import {
  BaseInteraction,
  ButtonInteraction,
  ChannelType,
  CommandInteraction,
  SelectMenuInteraction,
} from "discord.js";
import BotClient from "../../classes/BotClient.js";
import BotEvent from "../../classes/BotEvent.js";

/**
 * CLasse pour l'événement interactionCreate.
 */
export default class InteractionCreateEvent extends BotEvent {
  /**
   * Constructeur pour l'événement interactionCreate.
   */
  constructor() {
    super("interactionCreate", false);
  }

  /**
   * Méthode pour l'événement interactionCreate.
   */
  async exec(interaction: BaseInteraction) {
    if (interaction instanceof CommandInteraction) {
      const cmd = this.client?.interactionCommands.get(interaction.commandName);

      if (
        cmd?.interactionCommandOptions.permissions ||
        cmd?.interactionCommandOptions.ownerOnly ||
        !cmd?.interactionCommandOptions.dm
      ) {
        if (interaction.channel?.type != ChannelType.GuildText) {
          interaction.reply({
            content:
              "Vous pouvez utiliser cette commande uniquement sur le serveur.",
            ephemeral: true,
          });
          return;
        }

        if (cmd?.interactionCommandOptions.permissions) {
          if (
            !interaction.memberPermissions?.has(
              cmd?.interactionCommandOptions.permissions
            )
          ) {
            interaction.reply({
              content: "Vous n'avez pas la permission de faire ça.",
              ephemeral: true,
            });
            return;
          }
        }

        if (cmd?.interactionCommandOptions.ownerOnly) {
          if (interaction.guild?.ownerId != interaction.user.id) {
            interaction.reply({
              content:
                "Cette commande est reservée au propriétaire du serveur.",
              ephemeral: true,
            });
            return;
          }
        }
      }

      if (cmd?.interactionCommandOptions.dm) {
        if (interaction.inGuild()) {
          interaction.reply({
            content:
              "Vous pouvez utiliser cette commande uniquement en message privé.",
            ephemeral: true,
          });
          return;
        }
      }

      cmd?.exec(this.client as BotClient, interaction);
    }
  }
}

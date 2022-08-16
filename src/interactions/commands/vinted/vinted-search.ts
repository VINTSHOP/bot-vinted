import {
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOptionResolver,
  EmbedBuilder,
} from "discord.js";
import InteractionCommand from "../../../classes/InteractionCommand.js";
import BotClient from "../../../classes/BotClient.js";
import fetch from "node-fetch";

/**
 * Classe pour la commande vinted-search.
 */
export default class VintedSearchCommand extends InteractionCommand {
  constructor() {
    super({
      name: "vinted-search",
      description: "Gérer les recherches vinted.",
      category: "👕 Vinted",
      usage:
        "/vinted-search add <lien_recherche> <lien_webhook> <clé_api>\n\n/vinted-search remove <id_recherche> <clé_api>",
      options: [
        {
          name: "add",
          description: "Ajouter une recherche.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "lien",
              description: "Lien de la recherche.",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
            {
              name: "webhook_url",
              description: "Webhook dans lequel il faut envoyer le message.",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
            {
              name: "api_key",
              description:
                "Clé API (Si vous ne la possédez pas, il faut rejoindre le Discord de Basic Resell pour la générer).",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
        {
          name: "remove",
          description: "Supprimer une recherche.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "id",
              description: "ID de la recherche.",
              type: ApplicationCommandOptionType.Integer,
              required: true,
            },
            {
              name: "api_key",
              description:
                "Clé API (Si vous ne la possédez pas, il faut rejoindre le Discord de Basic Resell pour la générer).",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
        {
          name: "list",
          description: "Avoir la liste de vos recherches.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "api_key",
              description:
                "Clé API (Si vous ne la possédez pas, il faut rejoindre le Discord de Basic Resell pour la générer).",
              type: ApplicationCommandOptionType.String,
              required: true,
            },
          ],
        },
      ],
    });
  }

  /**
   * Méthode pour la commande vinted-search.
   *
   * @param client Le BotClient actuel.
   * @param interaction L'interaction à gérer.
   */
  async exec(client: BotClient, interaction: CommandInteraction) {
    const options = interaction.options as CommandInteractionOptionResolver;

    if (options.getSubcommand() == "add") {
      let lien = options.getString("lien");
      const webhook_url = options.getString("webhook_url")?.replace("ptb.", "");
      const api_key = options.getString("api_key");

      if (!lien?.includes("order=newest_first")) {
        lien += "&order=newest_first";
      }

      const req = await fetch(`${process.env.API_URL}/subscriptions`, {
        method: "POST",
        body: JSON.stringify({
          search_url: lien,
          webhook_url: webhook_url,
          api_key: api_key,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const res = (await req.json()) as { message: string; search_id?: number };

      if (res.message == "Format du lien Vinted incorrect.") {
        interaction.reply({
          content:
            "Le format du lien Vinted que vous avez indiqué est incorrect.",
          ephemeral: true,
        });
      } else if (res.message == "Format du Webhook incorrect.") {
        interaction.reply({
          content:
            "Le format du lien du Webhook que vous avez indiqué est incorrect.",
          ephemeral: true,
        });
      } else if (res.message == "Clé API inconnue.") {
        interaction.reply({
          content:
            "La clé API que vous avez indiquée est incorrect.\n\nPour obtenir une clé rendez-vous sur https://discord.gg/StAPyC4r3g.",
          ephemeral: true,
        });
      } else if (res.message == "Limite de recherches atteinte.") {
        interaction.reply({
          content: `Vous avez atteint votre limite de recherche`,
          ephemeral: true,
        });
      } else if (res.message == "Votre abonnement a été ajouté.") {
        interaction.reply({
          content: `La recherche a bien été ajoutée (**ID: ${res.search_id}**).\n\n(Garder l'ID dans un coin, il vous servira pour supprimer la recherche.)`,
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content:
            "Une erreur est survenue, merci de contacter un administrateur sur https://discord.gg/StAPyC4r3g.",
          ephemeral: true,
        });
      }
    } else if (options.getSubcommand() == "remove") {
      const id = options.getInteger("id");
      const api_key = options.getString("api_key");

      const req = await fetch(`${process.env.API_URL}/subscriptions`, {
        method: "DELETE",
        body: JSON.stringify({
          search_id: id,
          api_key: api_key,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const res = (await req.json()) as { message: string };

      if (res.message == "Aucune recherche trouvée.") {
        interaction.reply({
          content:
            "Aucune recherche trouvée.\n\nMerci de vérifier l'ID de la recherche ainsi que la clé API.",
          ephemeral: true,
        });
      } else if (res.message == "Votre recherche a été supprimée.") {
        interaction.reply({
          content: "La recherche a été supprimée.",
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content:
            "Une erreur est survenue, merci de contacter un administrateur sur https://discord.gg/StAPyC4r3g.",
          ephemeral: true,
        });
      }
    } else if (options.getSubcommand() == "list") {
      const api_key = options.getString("api_key");

      const req = await fetch(
        `${process.env.API_URL}/subscriptions?apiKey=${api_key}`
      );

      const res = (await req.json()) as {
        message: string;
        total_search?: number;
        searches?: { id: number; search_link: string }[];
      };

      if (res.message == "Une erreur est survenue.") {
        interaction.reply({
          content:
            "Une erreur est survenue, merci de contacter un administrateur sur https://discord.gg/StAPyC4r3g.",
          ephemeral: true,
        });
      } else {
        let message = `Vous avez **${res.total_search} ${
          res.searches!.length > 0 ? "recherches" : "recherche"
        }** actives:\n\n`;

        res.searches?.forEach((search) => {
          message += `[ID: ${search.id}](${search.search_link})\n`;
        });

        const eb = new EmbedBuilder()
          .setColor("Random")
          .setDescription(message);

        interaction.reply({ embeds: [eb], ephemeral: true });
      }
    }
  }
}

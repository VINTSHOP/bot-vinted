import { Client, ClientOptions, Collection } from "discord.js";
import EventHandler from "../handlers/EventHandler.js";
import InteractionHandler from "../handlers/InteractionHandler.js";
import InteractionCommand from "./InteractionCommand.js";

/**
 * Classe pour gérer le client.
 */
export default class BotClient extends Client {
  /**
   * Collection des commandes.
   */
  interactionCommands: Collection<string, InteractionCommand>;

  /**
   * Constructeur pour BotClient.
   *
   * @param clientOptions Options du client.
   */
  constructor(clientOptions: ClientOptions) {
    super(clientOptions);

    this.interactionCommands = new Collection();

    new EventHandler(this);
    new InteractionHandler(this);
  }
}

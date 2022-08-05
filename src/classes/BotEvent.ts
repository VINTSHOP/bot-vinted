import BotClient from "./BotClient.js";

/**
 * Classe par défaut pour tous les évenements.
 */
export default class BotEvent {
  /**
   * Nom de l'évévenement.
   */
  name: string;

  /**
   * Occurence de l'évenement.
   */
  once: boolean;

  /**
   * Le BotClient acutel.
   */
  client?: BotClient;

  /**
   * Constructeur par défaut pour tous les événements.
   *
   * @param name Nom de l'événement.
   * @param once Occurence de l'événement.
   */
  constructor(name: string, once: boolean) {
    this.name = name;
    this.once = once;
  }

  /**
   * Méthode par défaut pour tous les événements.
   *
   * @param args Tous les arguements de l'événement.
   */
  exec(...args: any) {
    throw new Error(`L'événement ${this.name} n'est pas encore implémenté.`);
  }

  /**
   * Permet d'enregistrer l'événement.
   *
   * @param client Le BotClient actuel.
   */
  register(client: BotClient) {
    this.client = client;

    if (this.once) client.once(this.name, (...args) => this.exec(...args));
    else client.on(this.name, (...args) => this.exec(...args));
  }
}

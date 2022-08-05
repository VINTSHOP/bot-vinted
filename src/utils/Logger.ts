import chalk, { Color } from "chalk";
import dayjs from "dayjs";

enum LogType {
  Error = "ERROR",
  Warn = "WARN",
  Client = "CLIENT",
  Commande = "COMMANDE",
  Event = "EVENT",
  Database = "DATABASE",
  Vinted = "VINTED",
  Button = "BUTTON",
  SelectMenu = "SELECTMENU",
}

export default class Logger {
  /**
   * Log pour les erreurs.
   *
   * @param message Message.
   */
  static Error(message: string): void {
    this.#log(message, LogType.Error, "black", "bgRed");
  }

  /**
   * Log pour les warns.
   *
   * @param message Message.
   */
  static Warn(message: string): void {
    this.#log(message, LogType.Warn, "black", "bgYellow");
  }

  /**
   * Log pour le client.
   *
   * @param message Message.
   */
  static Client(message: string): void {
    this.#log(message, LogType.Client, "black", "bgBlue");
  }

  /**
   * Log pour les commandes.
   *
   * @param message Message.
   */
  static Commande(message: string): void {
    this.#log(message, LogType.Commande, "black", "bgMagenta");
  }

  /**
   * Log pour les events.
   *
   * @param message Message.
   */
  static Event(message: string): void {
    this.#log(message, LogType.Event, "black", "bgCyan");
  }

  /**
   * Log pour la base de données.
   *
   * @param message Message.
   */
  static Database(message: string): void {
    this.#log(message, LogType.Database, "black", "bgGreen");
  }

  /**
   * Log pour Vinted.
   *
   * @param message Message.
   */
  static Vinted(message: string): void {
    this.#log(message, LogType.Vinted, "black", "bgGrey");
  }

  /**
   * Log pour les boutons
   *
   * @param message Message.
   */
  static Button(message: string): void {
    this.#log(message, LogType.Button, "black", "bgGreenBright");
  }

  /**
   * Log pour les select menus.
   *
   * @param message Message.
   */
  static SelectMenu(message: string): void {
    this.#log(message, LogType.SelectMenu, "black", "bgGray");
  }

  /**
   * Envoie des logs formattées dans la console.
   *
   * @param message Message.
   * @param logType Type.
   * @param colorType Couleur du texte.
   * @param bgColorType Couleur du background.
   */
  static #log(
    message: string,
    logType: LogType,
    colorType: Color,
    bgColorType: Color
  ): void {
    const logFormat = "{datetime} {type} → {message}";

    const logMessage = logFormat
      .replace(
        "{datetime}",
        chalk.gray(`[${dayjs().format("DD/MM/YYYY - HH:mm:ss")}]`)
      )
      .replace("{type}", chalk[bgColorType][colorType](`[${logType}]`))
      .replace("{message}", chalk.white(message));

    console.log(logMessage);
  }
}

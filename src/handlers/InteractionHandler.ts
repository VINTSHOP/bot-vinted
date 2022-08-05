import BotClient from "../classes/BotClient.js";
import Logger from "../utils/Logger.js";
import path, { resolve } from "path";
import { readdirSync } from "fs";

/**
 * Classe pour charger toutes les interactions.
 */
export default class InteractionHandler {
  /**
   * Constructeur pour charger toutes les interactions.
   *
   * @param client Le BotClient actuel.
   */
  constructor(client: BotClient) {
    // On charge toutes les commandes.
    (async () => {
      for await (const cmdFile of this.getFiles(
        path.join(path.dirname(process.argv[1]), "./interactions/commands")
      )) {
        const cmdImported = await import("file:///" + cmdFile);
        const cmd = new cmdImported.default();
        client.interactionCommands.set(cmd.interactionCommandOptions.name, cmd);
        Logger.Commande(`${cmd.interactionCommandOptions.name} a été chargé.`);
      }
    })();
  }

  /**
   * On récupére tous les fichiers de façon récursive.
   *
   * @param dir Dossier de base.
   */
  async *getFiles(dir: string): any {
    const dirents = readdirSync(dir, { withFileTypes: true });

    for (const dirent of dirents) {
      const res = resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        yield* this.getFiles(res);
      } else {
        yield res;
      }
    }
  }
}

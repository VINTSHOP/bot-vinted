import BotClient from "../classes/BotClient.js";
import Logger from "../utils/Logger.js";
import path, { resolve } from "path";
import { readdirSync } from "fs";

/**
 * Classe pour charger tous les événements.
 */
export default class EventHandler {
  /**
   * Constructeur pour charger tous les événements.
   *
   * @param client Le BotClient actuel.
   */
  constructor(client: BotClient) {
    (async () => {
      for await (const eventFile of this.getFiles(
        path.join(path.dirname(process.argv[1]), "./events")
      )) {
        const eventImported = await import("file:///" + eventFile);
        const event = new eventImported.default();
        event.register(client);
        Logger.Event(`${event.name} a été chargé.`);
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

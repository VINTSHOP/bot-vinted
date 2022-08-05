import { ApplicationCommandOption, PermissionResolvable } from "discord.js";

/**
 * Options pour les commandes.
 */
export interface interactionCommandOptions {
  name: string;
  description: string;
  category: string;
  permissions?: PermissionResolvable[];
  ownerOnly?: boolean;
  dm?: boolean;
  usage?: string;
  examples?: string[];
  cooldown?: number;
  options?: ApplicationCommandOption[];
}

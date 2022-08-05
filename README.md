<h1 align="center">Bot Vinted Discord</h1>

<p align="center">
  <img alt="node" src="https://img.shields.io/node/v/discord.js?style=for-the-badge">
  <img alt="npm" src="https://img.shields.io/npm/v/discord.js?label=Discord.js&style=for-the-badge">
</p>

<hr>

<p align="center">
  <a href="#dart-a-propos">A propos</a> &#xa0; | &#xa0; 
  <a href="#sparkles-fonctionnalités">Fonctionnalités</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-conditions-requises">Conditions requises</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-commencer-avec-docker">Commencer avec Docker</a> &#xa0; | &#xa0;
  <a href="#hammer_and_pick-utilisation-du-bot">Utilisation du bot</a>
</p>

<br>

:warning: Le bot est en version béta, par conséquent il se peut que vous rencontriez des bugs. Si c'est le cas, merci d'ouvrir une issue ou de me le signaler sur le Discord de Basic Resell.

## :dart: A propos

Bot Vinted pour Discord permettant d'afficher en temps réelles les nouvelles annonces.

![imge de presentation](https://media.discordapp.net/attachments/991646012873646100/1005039093052350464/basicresell-bot-vinted-opensource.png?width=1193&height=671)

## :sparkles: Fonctionnalités

✔ Ajouter des abonnements\
✔ Supprimer des abonnements

## :rocket: Technologies

Les outils suivants ont été utilisés dans ce projet :

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com)

## :white_check_mark: Conditions requises

Avant de commencer 🏁, il faut avoir [Docker](https://www.docker.com) d'installé.

## :checkered_flag: Commencer avec Docker

Démarrer l'image Docker en remplacant les valeurs des variables d'environnement :

```bash
$ docker run \
--restart always \
-e NODE_ENV=dev \
-e TOKEN=YOUR_TOKEN \
-e DEV_GUILD_ID=YOUR_GUILD_ID \
-e API_URL=https://api.zyxp.fr/api \
-e TZ=Europe/Paris \
ghcr.io/bot-vinted/bot-vinted:latest
```

## :hammer_and_pick: Utilisation du bot

La version gratuite du bot de Basic Resell vous donne accès à 30 recherches personnalisées
avec néanmoins un délai supérieur à la version premium : seulement 15 secondes pour la
version premium contre plus de 2 minutes pour la version gratuite.

Pour pouvoir utiliser la version gratuite de ce bot, vous devrez compléter quelques étapes :

Tout d’abord rejoignez rejoindre notre Discord si ce n’est pas déjà fait, avec le lien d’invitation
suivant : https://discord.gg/ZMVJ2d5rTZ afin de générer une clé API qui vous permettra
d’ajouter vos recherches personnalisées.

Une fois sur le serveur Discord, rendez-vous dans le salon #cle-api et cliquer sur le bouton
« Générer une clé API ».

:warning: Cette clé est privée, vous ne devez la partager avec personne. En cas d’abus vous risquez
une suspension de votre clé.

![image de presentation](https://media.discordapp.net/attachments/993523996882636931/1005125194916053042/unknown.png)

![image de presentation](https://media.discordapp.net/attachments/993523996882636931/1005125436407283862/unknown.png)

Une fois la clé en votre possession vous pourrez ajouter une recherche à l’aide de la
commande /vinted-search add.
Il vous faudra alors renseigner le lien avec les filtres pour votre recherche Vinted (pensez bien
à trier par les plus récents sur Vinted), le lien de votre webhook Discord ainsi que votre clé
API.

![image de presentation](https://cdn.discordapp.com/attachments/993523996882636931/1005125666703937677/unknown.png)

Et voilà ! Il ne vous reste plus qu’à patienter pour voir les premiers articles arriver.

\
Made with ❤️ by <a href="https://github.com/ZyXProFR" target="_blank">ZyXProFR</a>

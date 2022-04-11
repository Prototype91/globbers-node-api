# Globbers API

Globbers API est une API qui permet de stocker les pays et villes visités par un utilisateur. Elle permet également à ce dernier de rechercher un pays ainsi qu'une ville via une API externe dédiée (GeoDB).

### Membres du groupe :

- [Dylan Lecomte](https://github.com/Prototype91)
- [Sami Hattab](https://github.com/Raze91)

### API mise en ligne via Heroku à l'adresse suivant :
- [globbers-node-api](https://globbers-node-api.herokuapp.com/)

### API déployée sur npm :
- [globbers-node-api](https://www.npmjs.com/package/globbers-node-api)
- Pour l'utiliser : 
    - `npm i globbers-node-api`
    - dans un fichier `index.js` : `const app = require('globbers-node-api');`
    - créer un fichier `.env` à la racine avec les bonnes données en se basant sur le `.env.example`
    - `node index.js`

### Installation des dépendances :

`npm install`

### Database :
- Créer un fichier `.env` à la racine avec les bonnes données en se basant sur le `.env.example`

### Lancement du projet :

`npm run start`

### Lancement des tests unitaires :

`npm run test`

### Features :

#### Users
- Inscription et connexion d'un utilisateur (avec gestion du role admin / user)
- Supprimer un utilisateur (uniquement pour les admins)
- Voir tous les utilisateurs (uniquement pour les admins)
- Toutes les routes sont protégées avec un JWT.

#### Countries
- Ajouter un pays
- Supprimer un pays (uniquement s'il m'appartient)
- Voir tous les pays que j'ai visités
- Modifier un pays (uniquement s'il m'appartient)
- Voir les informations d'un pays que j'ai visité

#### Cities
- Ajouter une ville
- Supprimer une ville (uniquement si elle m'appartient)
- Voir toutes les ville que j'ai visitées
- Modifier une ville (uniquement si elle m'appartient)
- Voir les informations d'une ville que j'ai visitée

#### Calls externes :
- Possibilité de rechercher une ville avant de l'ajouter à la base de donnée via l'API GeoDB
- Possibilité de rechercher un pays avant de l'ajouter à la base de donnée via l'API GeoDB


#### Scénario :

- Je crée un compte via la route `user/auth/signup` (POST)
- Je me connecte via la route `user/auth/signin` (POST)

- Je recherche une ville ou un pays via la route `/search/city` ou `/search/country` (GET)
- Je l'ajoute à ma base de donnée via les routes `/city` ou `/country` (POST)
- Je peux voir toutes mes villes / pays visités via les routes `/city` ou `/country` (GET)
- Je peux modifier une ville / pays via les routes `/city/:id` ou `/country/:id` (PUT)
- Je peux supprimer une ville / pays via les routes `/city/:id` ou `/country/:id` (DELETE)

- Je peux modifier / supprimer les informations de mon compte via la route `/user/:id` (DELETE) ou `/user` (PUT)
- Si je suis un utilisateur admin, je peux supprimer n'importe quel compte d'un utilisateur via la route `/user/:id` (DELETE)


## Middlewares :

- `AuthJwtMiddleware` : Ce middleware nous sert à détecter si un token valide nous ai envoyé pour la sécurité de l'application ainsi qu'a détécter si l'utilisateur est un simple user ou un admin (selon son role, des actions lui sont permises).

- `VerifySignUpMiddleware` : Ce middleware nous permet de checker lors du signup si le role donné existe, s'il n'existe pas, une erreur est retournée.

## Technologies utilisées :

- [express](https://www.npmjs.com/package/express)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [body-parser](https://www.npmjs.com/package/body-parser)

- [typescript](https://www.npmjs.com/package/typescript)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [sequelize](https://www.npmjs.com/package/sequelize)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [uuid](https://www.npmjs.com/package/uuid)

- [jest](https://www.npmjs.com/package/jest)

- [axios](https://www.npmjs.com/package/axios)
- [country-list-js](https://www.npmjs.com/package/country-list-js)

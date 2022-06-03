# Piiquante
## _Construction d'une API sécurisée pour une application d'avis gastronomiques_


![Build Status](https://badge.buildkite.com/sample.svg?status=passing)

6ème projet de la formation de développeur web d'OpenClassroom.

## Enjeux
---
- Implémentation d'un modèle logique de données conformément à la réglementation.
- Mise en oeuvre d'opérations CRUD de manière sécurisée.
- Stockage de données de manière sécurisée.

## Livrables attendus
---
### Contexte du projet

- Création d'une application web dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

### Spécifications de l'API

**Création de différentes routes pour le fonctionnement de l'API**

- Route POST pour la création d'un compte ``(/api/auth/signup)`` avec authentification par adresse e-mail et mot de passe. L'adresse e-mail ainsi que le mot de passe sont cryptés dans la base de données et l'authentification se fait par TOKEN.
- Route POST pour se connecter à un compte ``(/api/auth/login)`` avec authentification par adresse e-mail et mot de passe. La vérification se fait en utilisant le système de TOKEN.
- Route GET ``(/api/sauces)`` => fonction READ de l'API qui renvoie un tableau de toutes les sauces de la base de données.
- Route GET ``(/api/sauces/:id)`` => fonction READ de l'API qui renvoie la sauce avec l'id fournie.
- Route POST ``(/api/sauces)`` => fonction CREATE de l'API qui permet via l'utilisation d'un formulaire sur le frontend de créer une entrée pour une sauce dans la base de données avec différents champs ainsi qu'une image.
- Route PUT ``(/api/sauces/:id)`` => fonction UPDATE de l'API qui permet à l'utilisateur de modifier une sauce existante dans la base de données. La sauce n'est modifiable que par l'utilisateur qui l'a créée.
- Route DELETE ``(/api/sauces/:id)`` => fonction DELETE de l'API qui permet à l'utilisateur de supprimer une sauce existante dans la base de données. La sauce n'est supprimable que par l'utilisateur qui l'a créée.
- Route POST ``(/api/sauces/:id/like)`` => permet aux utilisateurs authentifiée d'ajouter ou retirer un "like" ou un "dislike" à une sauce. Il pas possible de "liker" ou "disliker" plusieurs fois la même sauce.

### Spécifications techniques

**Gestion des API errors**
- Les erreurs sont renvoyées telles qu'elles sans modification ni ajout.

**Gestion des routes**
- Toutes les routes pour les sauces disposent d'une autorisation (TOKEN) envoyées par le front-end. Si le userId ne correspond pas, l'API renvoie une erreur 403, ainsi seul le propriétaire des sauces et autorisé à apporter des modifications à celles-ci.

**Utilisation du modèle Mongo DB**
- Modèle de Sauce : 
-- ``` userId ``` : identifiant MongoDB unique de l'utilisateur qui créé la sauce.
-- ```name``` : nom de la sauce
-- ```manufacturer``` : fabricant de la sauce
-- ```description``` : description de la sauce
-- ```mainPepper``` : principal ingrédient de la sauce
-- ```imageUrl``` : url de l'image de la sauce téléchargée par l'utilisateur
-- ```heat``` : nombre entre 1 et 10 décrivant la sauce
-- ```likes``` : nombre d'utilisateurs qui aiment la sauce
-- ```dislikes``` : nombre d'utilisateurs qui n'aiment pas la sauce
-- ```usersLiked``` : tableau des identifiants des utilisateurs qui ont aimé la sauce
-- ```usersDisliked``` : tableau des identifiants des utilisateurs qui n'ont pas aimé la sauce

- Modèle utilisateur :
-- ```email``` : adresse e-mail de l'utilisateur (unique)
-- ```password``` : mot de passe de l'utilisateur haché

**Exigences de sécurité (attendus)**
- Le mot de passe de l'utilisateur est haché.
- L'authentification est renforcée sur toutes les routes sauce requises.
- Les adresses e-mail de la base de données sont unique et un plug-in mongoose est utilisé pour garantir leur unicité et signaler les erreurs.
- La sécurité de la base de données MongoDB n'empêche pas l'application de se lancer sur la machine d'un utilisateur.
- Un plug-in Mongoose assure la remontée des erreurs issues de la base de données.
- Les versions les plus récentes des logiciels sont utilisées avec les correctifs de sécurité actualisés.
- Le contenu du dossier images n'est pas téléchargé sur GitHub.

**Exigences de sécurités (ajouts)**
- Cryptage dans la base de données de l'adresse e-mail de l'utilisateur (CryptoJs).
- Utilisation de variables d'environnement (DotEnv).
- Utilisation d'un bouncer pour éviter les attaques sur les login (express-bouncer).
- Utilisation d'un sanitizer pour les champs de formulaires (express-mongo-sanitize).
- Utilisation d'un plug-in pour sécuriser les en-têtes (helmet).
- Utilisation d'un validateur pour la création de mots de passe (password-validator).
- Utilisation d'un plug-in pour éviter les crash serveur si trop de requêtes (toobusy-js).
- Utilisation d'un validateur pour contrôler les champs (validator).

## Technologies utilisées
---
- [NODEJS] - Version 16.13.2
- [NPM] - Version 8.1.2
- [MONGODB] - Mongo DB Atlas
- [Webstorm] - Editeur de code

## Contraintes techniques
---
**Code source**
- Le code source est indenté et utilise des commentaires pour décrire les différentes fonctions et éléments du code.
- Modernisation de la syntaxe avec utilisation des conventions ECMA 2017 afin de clarifier et simplifier l'écriture et la maintenabilité du code.

## Installation
---
# Piiquante #

- Prérequis
Vous devez avoir Node et `npm` installés localement sur votre machine.

### Installation de la partie Front end ###
Cloner la partie front-end
```terminal
git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git
```
Utiliser la commande suivante pour installer les dépendances du projet
```terminal
npm install
```
Utiliser la commande suivante pour lancer la partie front end qui sera exécutée sur le port 4200 par défaut
```terminal
npm start
```

### Installation de la partie Back end ###
Cloner la partie front-end dans un dossier backend à la même racine que la partie front end
```terminal
git clone https://github.com/KLdvl/OC_P6_Piiquante_KM.git
```
Utiliser la commande suivante pour installer les dépendances du projet
```terminal
npm install
```
Utiliser la commande suivante pour lancer la partie back end qui sera exécutée sur le port 3000 par défaut
```terminal
npm start
```

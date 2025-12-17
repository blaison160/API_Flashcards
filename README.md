# API_FLASHCARDS
### Sommaire :
[Introduction](#Introduction)
[Installation](#Installation)
[Configuration](#Configuration)
[Lancement](#Lancement)
[Initialisation de la base](#Initialisation)

# 1-Introduction

API_FLASHCARDS est une API RESTful pour gérer des collections de flashcards avec une méthode de répétition espacée pour l’apprentissage.

L’objectif est de proposer un backend permettant à des utilisateurs de :

- créer un compte et se connecter,
- créer, modifier et partager des collections de cartes,
- réviser les cartes selon un système de répétition espacée,
- gérer des droits d’accès (public / privé).

Aucune interface frontend : le projet se concentre sur l’API et la conception backend.


# Installation

Clonez le dépôt GitHub, puis, dans un terminal, placez vous à la racine du projet (dans le dossier nommé API_FLASHCARDS) et effectuez la commande `npm install`.

> :warning: Le texte entre les symboles <> est à remplacer. Par exemple : <votre_nom> doit être remplacé par votre nom.
> 
> :warning: Toutes les manipulations s'effectuent à la racine du projet (dossier nommé API_FLASHCARDS)

# Configuration
### Création d'un fichier .env
Créez un nouveau fichier nommé `.env`.
Dans ce fichier, ajoutez :
`DB_FILE=file:<nom_fichier_base_de_donnees>.db`
`JWT_SECRET=<secret_JWT>` à générer [ici](https://jwtsecrets.com/)

# Lancement
Pour lancer le projet lancez la commande `npm run dev`

# Initialisation
Pour initialiser la base de données, lancez la commande `npm run db:push`. Un fichier avec le nom spécifié dans le .env sera créé à la racine du projet.

Pour peupler la base de donnée avec des données de test, lancez a commande `npm rn db:seed`.
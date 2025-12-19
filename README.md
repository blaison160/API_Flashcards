
# API_FLASHCARDS
### Summary:
[Introduction](#Introduction)
[Installation](#Installation)
[Configuration](#Configuration)
[Launch](#Launch)
[Database Initialization](#Initialization)
[Documentation](#Documentation)

# Introduction

API_FLASHCARDS is a RESTful API for managing collections of flashcards with a spaced repetition method for learning.

The goal is to provide a backend allowing users to:

- create an account and log in,
- create, modify, and share card collections,
- review cards according to a spaced repetition system,
- manage access rights (public/private).

No frontend interface: the project focuses on the API and backend design.

# Installation

Clone the GitHub repository, then, in a terminal, navigate to the root of the project (in the folder named API_FLASHCARDS) and run the command `npm install`.

> :warning: Text between the symbols <> should be replaced. For example: <your_name> must be replaced with your name.
>
> :warning: All operations are performed at the root of the project (folder named API_FLASHCARDS)

# Configuration
### Creating a .env file
Create a new file named `.env`.
In this file, add:
`DB_FILE=file:<database_filename>.db`
`JWT_SECRET=<JWT_secret>` to be generated [here](https://jwtsecrets.com/)
You can also specify a specific port for the app (default is 3000) :
`PORT=<port_number>`

# Launch
To start the project, run the command `npm run dev`

# Initialization
To initialize the database, run the command `npm run db:push`. A file with the name specified in the .env will be created at the root of the project.

To populate the database with test data, run the command `npm run db:seed`.

# Documentation
See the file [doc.md](./doc.md)
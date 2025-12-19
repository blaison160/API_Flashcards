# API_FLASHCARDS - Documentation

  

## Authentification

L'API utilise l'authentification par **Bearer Token**.

Pour obtenir un token, il est nécessaire de créer un compte et de se connecter.

## URL de base

Toutes les requêtes API doivent être envoyées à l'URL suivante : http://localhost/3000

## Endpoints

  

### Authentification

  

Toutes les requêtes doivent passer par la route /auth

#### Create a new account

  

POST /register

  

**Body**

- 'email' (String) : the email of the user

- 'name' (String) : the name of the user

- 'lastName'  (String) : the lastname of the user

- 'password' (String) : the password chosen for the account

  

exemple

- request

{

"email": "cdupond@mail.com",

"lastName": "Christopher",

"name": "Dupond",

"password": "123456789" 

}

- response 

{

"message": "User created",

"userData": {

"email": "cdupond@mail.com",

"lastName": "Christopher",

"name": "Dupond",

"id": "abdabbac-7cf4-48bd-9cae-5e930838d512"

},

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQi*******"

}

#### Login with an account

  

POST /login

  

**Body**

- 'email' (String) : the email of the user

- 'password' (String) : the password chosen for the account

  

exemple
- request
 {
  "email": "cdupond@mail.com",
  "password": "123456789"
}
-reponse 
{
  "message": "Login succsessful",
  "userData": {
    "email": "cdupond@mail.com",
    "id": "abdabbac-7cf4-48bd-9cae-******"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9******"
}

### Collections

Toutes les requêtes doivent passer par la route /collections
#### Create a new collection


POST /

**Body**

- 'title' (String) : the title of the collection

- 'description' (String) : the description of the collection

- 'visibility' (Boolean) : **true** ( to create a public collection that is foundable for other users) /  **false** ( to create a private collection)


exemple
- request
{
  "title":  "API",
  "description": "questions about API",
  "visibility": true
}
- response
 {
  "message": "Collection created",
  "data": {
    "id": "e6301ce6-297e-40f0-97db-46db9340cff5",
    "title": "API",
    "description": "questions about API",
    "visibility": 1,
    "createdBy": "abdabbac-7cf4-48bd-9cae-5e930838d512"
  }
}
#### Get all of my collections
GET /

**Body**

exemple
- request
- response
 [
  {
    "id": "e6301ce6-297e-40f0-97db-46db9340cff5",
    "title": "API",
    "description": "questions about API",
    "visibility": 1,
    "createdBy": "abdabbac-7cf4-48bd-9cae-5e930838d512"
  },
  {
    "id": "9e859db8-e34e-46a1-a4cf-a5cd1c7f7382",
    "title": "C# Questions",
    "description": "questions about C#",
    "visibility": 0,
    "createdBy": "abdabbac-7cf4-48bd-9cae-5e930838d512"
  }
]

### Get a Collection
Return a collection by its id

GET / : id
Parameters;
- id ( String) : UUID of the searched collection

**Body**

exemple
GET /e6301ce6-297e-40f0-97db-46db9340cff5
- request

- response
{
  "id": "e6301ce6-297e-40f0-97db-46db9340cff5",
  "title": "API",
  "description": "questions about API",
  "visibility": 1,
  "createdBy": "abdabbac-7cf4-48bd-9cae-5e930838d512"
}

### Get  public Collections by title
Return all public collections that have the given string in its title

GET /titles?title=












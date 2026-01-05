# API_FLASHCARDS - Documentation

## Authentication

The API uses **Bearer Token** authentication.

To obtain a token, you must create an account or log in.

## Base URL

All API requests must be sent to the following URL: `http://localhost:<port>`
The default port is 3000 but can be changed in your .env file (see [Creating a .env file](./README.md#creating-a-env-file))

## Endpoints

### Authentication

#### Create a New Account

**Route**
```POST /auth/register```

**Body**

- 'email' (String) : the email of the user

- 'name' (String) : the name of the user

- 'lastName'  (String) : the lastname of the user

- 'password' (String) : the password chosen for the account

**returned JSON**

if the request succeded :
- 'message' : a confirmation of message for successful register
- 'userData' : a JSON object containing the email, name, last name and id of the new account
- 'token' : the JWT of the new account

if the request failed:

- 'error' : the type of error
- 'details' : details about the error

#### Login with an account

```POST /auth/login```

**Body**

- 'email' (String) : the email of the user

- 'password' (String) : the password chosen for the account

**returned JSON**

if the request succeded :
- 'message' : a confirmation of message for successful login
- 'userData' : a JSON object containing the email and id of the account
- 'token' : the JWT for the account

if the request failed:

- 'error' : the type of error
- 'details' : details about the error

### Collections

#### Create a new collection

```POST /collections```

**Body**

- 'title' (String) : the title of the collection

- 'description' (String) : the description of the collection

- 'visibility' (Boolean) : **true** ( to create a public collection that is foundable for other users) /  **false** ( to create a private collection)

#### Get all of your collections
```GET /collections```

**returned JSON**

a list of JSON objects containing the ID, title, description, visibility and the creator's ID of each collection created by the user

[
  {
    "id": <uuid>,
    "title": <title>,
    "description": <description>,
    "visibility": <0/1>,
    "createdBy": <uuid>
  },
  {
    ...
  },
  ...
]

### Get a Collection
Finds a collection using the provided id

```GET /collection/:id```

Parameters :
- 'id' ( String) : UUID of the searched collection

**returned JSON**

- 'id' (String) : the UUID of the collection
- 'title' (String) : the title of the collection
- 'description' (String) : the description of the collection
- 'visibility' (int/boolean): 0 is private, 1 is public
- 'createdBy' (String) : the UUID of the user who created the collection

### Get  public Collections by title
Return all public collections that have the given string in its title

GET /collections/titles?title=












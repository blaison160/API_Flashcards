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

```GET /collections/titles?title=<title>```

Parameters :
- 'title' (String) : a string (most of the time a keyword)

**returned JSON**

a list of JSON objects containing the ID, title, description, visibility and the creator's ID of each collection where parts the collection's title maches the given string

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

### Update your Collections
Updates the user's collection matching the given ID with the provided data

```PATCH /collection/:id```

Parameters :
- 'id' ( String) : UUID of the collection to update

**Body**
These fields are optional

- 'title' (String) : the title of the collection

- 'description' (String) : the description of the collection

- 'visibility' (Boolean) : **true** ( to create a public collection that is foundable for other users) /  **false** ( to create a private collection)

**returned JSON**

A confirmation message if the update was successful, an error message otherwise.


### Delete your Collections
Deletes the user's collection matching the given ID

```DELETE /collection/:id```

Parameters :
- 'id' ( String) : UUID of the collection to delete

**returned JSON**

A confirmation message if the update was successful, an error message otherwise.

### Flashcards

#### Create a new flashcard
Create a new flashcard in a given collection

```POST /flashcards```

**Body**

- 'front' (String) : the text on the front of the flashcard

- 'back' (String) : the text on the back of the flashcard

- 'collectionId' (String) : UUID of the given collection

These fields are optional

- 'urlFront' (String) : the url on the front of the flashcard

- 'urlBack' (String) : the url on the back of the flashcard

#### Get all flashcard from a collection
Return all flashcards of a given public collection or from the user's private one

```GET /flashcards/collection/:id```

Parameters :

- 'id' ( String) : UUID of the collection

**returned JSON**

A list of JSON objects containing the ID, title, description, visibility and the creator's ID of each collection created by the user

[
  {
    "id": <uuid>,
    "front": <front>,
    "back": <back>,
    "urlFront": <urlFront>,
    "urlBack": <urlBack>,
    "collectionId": <uuid>
  },
  {
    ...
  },
  {
    ...
  }
]

#### Get a flashcard
Finds a flashcard that is in a public or user's private collection using the provided ID 

```GET /flashcards/:id```
Parameters :
- 'id' ( String) : UUID of the searched flashcard

**returned JSON**

- 'id' (String) : the UUID of the flashcard
- 'front' (String) : the text on the front of the flashcard
- 'back' (String) : the text on the back of the flashcard
- 'urlFront' (String) : the url on the front of the flashcard
- 'urlBack' (String) : the url on the back of the flashcard
- 'collectionId' (String) : the UUID of the flashcard collection

#### Get all flashcards to review
Return all flashcards a user have to review today

```GET /flashcards/review```

**returned JSON**

A list of JSON objects containing the ID, title, description, visibility and the creator's ID of each collection created by the user

[
  {
    "id": <uuid>,
    "front": <front>,
    "back": <back>,
    "urlFront": <urlFront>,
    "urlBack": <urlBack>,
    "collectionId": <uuid>
  },
  {
    ...
  },
  {
    ...
  }
]

#### Set the review delay of a flashcard
Set the delay for the next time the flashcard has to be reviewed

```PATCH /flashcards/review:id```

Parameters :
- 'id' ( String) : UUID of the searched flashcard

**Body**
- 'level' (Integer) : the delay <1/2/3/4/5>

#### Delete a flashcard
Delete a flashcard that is in a public or user's private collection using the provided ID 

```DELETE /flashcards/:id``

Parameters :
- 'id' ( String) : UUID of the searched flashcard

**returned JSON**

A confirmation message if the update was successful, an error message otherwise.

#### Update a flashcard
Update a flashcard that is in a public or user's private collection using the provided ID 

```PATCH /flashcards/:id``

Parameters :
- 'id' ( String) : UUID of the searched flashcard

**Body**

- 'id' (String) : the UUID of the flashcard
- 'front' (String) : the text on the front of the flashcard
- 'back' (String) : the text on the back of the flashcard
- 'urlFront' (String) : the url on the front of the flashcard
- 'urlBack' (String) : the url on the back of the flashcard


**returned JSON**

A confirmation message if the update was successful, an error message otherwise.


### Admin
> :warning: These operations require being an Admin

#### Get all users
```GET /users```

**returned JSON**

a list of all users as JSON objects if the request is succesful, an error message otherwise

#### Get a specific users
```GET /users/:id```

**returned JSON**

if the request is successful :

- 'id' the uuid of the user
- 'email' the email of the user
- 'lastName' the last name of the user
- 'name' the name of the user
- 'isAdmin' if the user is admin or not
- 'createdAt' the user's date of creation

else :

- 'error' : the type of error

#### Delete a specific user
Deletes the user matching the given ID. All of the user's private collections will be deleted but not the public ones.

```DELETE /users/:id```

Parameters :
- 'id' ( String) : UUID of the user to delete

**returned JSON**

A confirmation message if the update was successful, an error message otherwise.
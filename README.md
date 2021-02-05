# Api-node

Api-node is an API created for a NodeJS course.

## Installation

Install knex on your computer

```bash
npm install -g knex
```

Install packages in project

```bash
npm install
```

Configure your local database in knexfile.js, create 'node_api' database and run :
```bash
knex migrate:latest
knex seed:run
```

## Launch

```bash
npm run start
```

You can only access some routes with an admin user. The seeder creates one automatically.  
email: 'admin@gmail.com'  
password: 'password'

## Documentation

### Users

#### Register

Create a user account

__HTTP Request__

POST http://localhost/user/register

__Body parameters__

firstname - string - User's firstname  
lastname - string - User's lastname  
email - string - User's email  
password - string - User's password  

__Return__

```json
{  
    message: string,  
    user: {  
        id: int,  
        firstname: string,  
        lastname: string,  
        email: string,  
        password: string  
    }  
}  
```

***

#### Login

Login a user to generate a session token

__HTTP Request__

POST http://localhost/user/login

__Body parameters__

email - string - User's email  
password - string - User's password

__Return__

```json
{  
    message: string,  
    user: {  
        id: int,  
        firstname: string,  
        lastname: string,  
        email: string,  
        password: string,
        token: string
    }  
}  
```

***

#### Update user

Update user informations

__HTTP Request__

PUT http://localhost/user/{id}

__Header__

Authorization - string - User session token preceded by "Bearer "

__Request parameters__

id - int - User's ID to update

__Body parameters__

firstname - string - User's firstname  
lastname - string - User's lastname  
email - string - User's email  
password - string - User's password  

__Return__

```json
{  
    message: string,  
    user: {  
        id: int,  
        firstname: string,  
        lastname: string,  
        email: string,  
        password: string
    }  
}  
```

***

#### Delete user

Delete user account

__HTTP Request__

DELETE http://localhost/user/{id}

__Header__

Authorization - string - User session token preceded by "Bearer "

__Request parameters__

id - int - User's ID to delete

__Return__

```json
{  
    message: string,  
    user: {  
        id: int,  
        firstname: string,  
        lastname: string,  
        email: string,  
        password: string
    }  
}  
```

***
***

### Quizzs

#### Create quizz

Create a quizz

__HTTP Request__

POST http://localhost/quizz/

__Body parameters__

theme - string - Quizz's theme  

__Return__

```json
{  
    message: string,  
    quizz: {  
        id: int,  
        theme: string
    }  
}  
```

***

#### Create all quizz

Create a quizz with questions and responses

__HTTP Request__

POST http://localhost/quizz/all

__Body parameters__

theme - string - Quizz's theme  
questions - array - Quizz's list of questions  
questions[].question - string - Text of each question  
questions[].responses - array - Each question's responses  
questions[].responses[].response - string - Text of each response  
questions[].responses[].isCorrect - boolean - If each response is correct or not  

__Return__

```json
{  
    message: string
}  
```

***

#### Get all quizzs

Get a quizz

__HTTP Request__

GET http://localhost/quizz/

__Return__

```json
{  
    quizzs: [
        {  
            id: int,  
            theme: string
        }
    ]  
}  
```

***

#### Get quizz

Get a quizz

__HTTP Request__

GET http://localhost/quizz/{id}

__Request parameters__

id - int - Quizz's ID to get

__Return__

```json
{  
    message: string,  
    quizz: {  
        id: int,  
        theme: string
    }  
}  
```

***

#### Get quizz all

Get a quizz, questions and responses

__HTTP Request__

GET http://localhost/quizz/{id}/all

__Request parameters__

id - int - Quizz's ID to get

__Return__

```json
{  
    quizz: {
        id: int,
        theme: string,
        questions: [
            {
                id: int,
                question: string,
                responses: [
                    {
                        id: int,
                        response: string,
                        isCorrect: boolean,
                    },
                ]
            },
        ]
    }
}  
```

***

#### Update quizz

Update a quizz

__HTTP Request__

PUT http://localhost/quizz/{id}

__Request parameters__

id - int - Quizz's ID to update

__Body parameters__

theme - string - Quizz's theme

__Return__

```json
{  
    message: string,  
    quizz: {  
        id: int,  
        theme: string
    }  
}  
```

***

#### Delete quizz

Delete a quizz, his questions and responses. Need an admin token session.

__HTTP Request__

DELETE http://localhost/quizz/{id}

__Header__

Authorization - string - Admin session token preceded by "Bearer "

__Request parameters__

id - int - Quizz's ID to delete

__Return__

```json
{  
    message: string,  
    quizz: {  
        id: int,  
        theme: string
    }  
}  
```

***
***

### Questions

Questions CRUD at http://localhost/question/

***
***

### Responses

Responses CRUD at http://localhost/response/

***
***

## Contributing
[Antoine Durussel](https://github.com/AntoineDrsl) & [Nicolas Brazzolotto](https://github.com/Sharcan)
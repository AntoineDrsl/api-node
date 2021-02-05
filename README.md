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

Register a user

__HTTP Request__

POST http://localhost/user/register

__Body parameters__

firstname - string - User's firstname  
lastname - string - User's lastname  
email - string - User's email  
password - string - User's password  
role - string - User's role  

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

## Contributing
[Antoine Durussel](https://github.com/AntoineDrsl) & [Nicolas Brazzolotto](https://github.com/Sharcan)
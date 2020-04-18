# HeyURL! Code Challenge

## HeyURL! Code Challenge 
This repository has been created as a code challenge for candidates with FullStack Labs. The candidate will clone and setup an existing Node.js application. The application will contain routes, migrations, models, and minimal views but with no actual functionality created. The candidate will show all her/his expertise building apps with Node.js and express framework and problem solving skills.

## Overview
HeyURL! is a service to create awesome friendly URLs to make it easier for people to remember. Our team developed some mockup views but don't have our awesome functionality in place yet.

## Requirements
Implement actions to create shorter URLs based on a given full URL
If URL is not valid, the application returns an error message to the user
We want to be able to provide click metrics to our users for each URL in the system. Every time that someone clicks a short URL, it should record that click and also user platform and browser using the user agent request header
We want to create a metrics panel for the user to view the stats for every short URL. The user should be able to see total clicks per day on the current month along with a breakdown of browsers and platforms
If someone tries to visit a invalid short URL then it should return a custom 404 page
Unit Tests should be created which cover the code that is added as applicable

### Short URL Format
Max length 5 character e.g. NELNT
Allows upper and lower case characters
Allows numbers
Any non letter or number characters are not allowed, including whitespace
original_url and short_url must be unique
Original URL format should be validated

## Getting Started

1. Clone repository

2. Install dependencies
```sh
$ npm install
```

3. Install nodemon globally
```sh
$ npm install nodemone -g
```

4. create .env file in the proyect root with the following 
```sh
MYSQL_USERNAME=xxxxx
MYSQL_PASSWORD=xxxx
MYSQL_SERVER=xxxxxx
MYSQL_DATABASE=xxxxxxx
```

5. Create db tables
```sh
$  knex migrate:latest --env development
$  knex seed:run                          
```

6. Populate db tables
```sh
$  knex seed:run                          
```

7. Start server 
```sh
$  npm run devStart                          
```

## lint your code

```sh
$ npm run eslint
```

## run tests
when running the test a new database is created and seeded. The `.env` file has to be created prior to run the tests. At the end of the tests the tables created are droped. 
```sh
$ npm run mocha
```

## Considerations

Access swagger documentation at `/api-docs`

1. Make sure you have Mysql up and running
2. Check controller actions in `./controllers/`
3. Check views in `./views/`
4. Check models in `./models/`
5. Seed  in `./seeds/`
6. Create seed mockup examle
```sh
$ knex seed:make 03_clicks
```
7. Migrations  in `./migrations/`
8. Rollback migrations
```sh
$  knex migrate:rollback
```
9. Google Charts is already added to display charts, you can use any library


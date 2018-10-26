# Node-Payment
## Description

A Node-Wikis,  Responsive front-end design done with Bootstrap

View the <a href = "https://nodejs-payment.herokuapp.com/">site</a>

## Technologies & Tools

* Node.JS
* PostgreSQL

## Installation and Usage

### Requirements:

* Node.js installed

### Steps:
1. Clone repo on your local machine:
```
$ git clone https://github.com/mkavo92/node-payment
```
2. Install dependencies:
```
$ npm install
```

3. Customize your database  

- Go to db/config/config.json
- Change "username", "database" to your name 
- Run `sequelize db:migrate` to update your schema


4. Execute the app:<br/>
```
$ nodemon
```

5. App now running on localhost:3000
## banka System

Banka is an online platform to help users, admin and staff(cashier) to manage their activities.

## Admin

for admin user interface:
  1. email: juliushirwa@gmail.com
  2. password: Reg5050
  
## Staff

for staff user interface:
  1. email: divin@gmail.com
  2. password: Div5050
  
## Users

u can use any valid email and password which is compose with uppercase, lowercase characters and numbers.

visit this link to browse [banka](https://j4l13n.github.io/banka/UI/)

### Coveralls Report

[![Build Status](https://travis-ci.org/vkarpov15/fizzbuzz-coverage.svg?branch=master)](https://travis-ci.org/vkarpov15/fizzbuzz-coverage)
[![Coverage Status](https://coveralls.io/repos/vkarpov15/fizzbuzz-coverage/badge.svg)](https://coveralls.io/r/vkarpov15/fizzbuzz-coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/nickmerwin/node-coveralls/badge.svg)](https://snyk.io/test/github/nickmerwin/node-coveralls)


### ENDPOINT API

| Ressource URL                                 | Methods | Description                   |
| --------------------------------------------- | ------- | ----------------------------- |
| /                                             | GET     | welcome message               |
| /api/v2/auth/signup                           | POST    | Create a user account         |
| /api/v2/auth/signin                           | POST    | Login                         |
| /api/v2/users                                 | GET     | Fetch all users               |
| /api/v2/accounts                              | GET     | Fetch all accounts            |
| /api/v2/accounts                              | POST    | Create a new account          |
| /api/v2/account/:accountNumber                | PATCH   | Activate or Deactivate a      |
|                                               |         |    specific user account      |
| /api/v2/account/:accountNumber                | DELETE  | Delete an account             |
| /api/v2/transactions/:accountNumber/debit     | POST    | Debit from an active account  |
| /api/v2/transactions/:accountNumber/credit    | POST    | Credit to an active account   |
| /api/v2/accounts/:accountNumber/transactions  | GET     | Fetch a specific transaction  |
|                                               |         |                     history   |
| /api/v2/transactions/:id                      | GET     | Fetch a specific transaction  |
| /api/v2/user/:email/accounts                  | GET     | Fetch get specific user       |
|                                               |         |   accounts                    |
| /api/v2/accounts                              | GET     | Fetch all accounts            |


## Tools Used

- Language: Javascript
- Server environment: Node.js (A javascript server side environment which can help you build web applications,microservices and APIs)
- Back-end framework: Express (A server side web framework which can help you build back-end applications and APIs fast.)
- Testing library: Mocha.js (A javascript library used for unit testing)
- Assertion library: Chai (A Javascript library to create assertions used in testing)
- Continuous integration: Travis CI
- Test coverage: nyc (A javascript library used to generate coverage reports)
- Test coverage badge: Coveralls (It shows test coverage statistics)
- Front-end deployment: Github Pages
- Back-end deployment: Heroku

### Github Pages link

[Banka UI](https://j4l13n.github.io/banka/UI/)

### Heroku endpoints link

[Banka Endpoints](https://arcane-fjord-40797.herokuapp.com/)

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

To install the software on your local machine, you need first to clone the repository or download the zip file and once this is set up you are going to need this packages. [NodeJS]

```
 [Node Package Installer - NPM] this usually comes with Node or YARN in case NPM doesn't work.
```

## Installing

The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server

```
> npm start
```

## Run the test

```
> npm test
```

### Run development

```
> npm run dev
```

### Contributor

- Karangwa Hirwa Julien <juliushirwa@gmail.com>

## License & copyright

Copyright (c) Karangwa Hirwa Julien

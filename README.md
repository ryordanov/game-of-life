## Info
- When starting the Angular app, configuration is loaded from the Backend and MongoDB (grid size and step interval)
- When pressing the Reset button, a request is sent to the Backend to test the communication

## Project setup

```bash

# Node version: 20.15.1

# Install global dependencies:
$ npm i -g @nestjs/cli
$ npm i -g @angular/cli

```

```bash
# Build Angular:
$ cd ./client
$ npm i
$ npm run build

# Run Server
$ cd ../server
$ npm i
$ npm run build
$ npm run start:prod

# Open in browser http://localhost:3000

```

## Run tests

```bash
# Angular tests
$ cd ./client
$ npm run test

# NestJS tests
$ cd ./server
$ npm run test

```



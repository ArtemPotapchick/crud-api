# CRUD API

Simple CRUD API written on Node.js http web server without any frameworks.

## Installation

Clone my project and install all necessary dependencies

```bash
git clone https://github.com/ArtemPotapchick/crud-api.git
cd crud-api
npm install
```

## Run
#### There are 2 modes of running application (**development** and **production**):
- The application is run in **development** mode using **nodemon** there is a npm script
```bash
npm start:dev
```

- The application is run in **production** mode (there is a npm script that starts the build process and then runs the bundled file)
 ```bash 
npm start:prod
``` 
#### To run app tests use
 ```bash
 npm test 
``` 
#### Also performed ESlint for application use for detect code errors and warning
```bash
npm lint 
``` 
#### Then use format to auto fix some of them (if it's possible to auto format).
 ```bash 
npm format
```
```json
{
    "test": "jest",
    "start:dev": "npx nodemon",
    "start:prod": "cross-env webpack --config webpack.config.js && node dist/build.js ",
    "lint": "npx eslint ./src",
    "format": "npx eslint ./src --fix"
}
```

## Usage
1. Create **.env** file for using specific Port instead of default - 3000:
    + cd . > .env - for Windows
    + touch .env - for Linux/Mac
2. Open this file and write  PORT as you prefere (remember 1024–49151 allowed to use):
    + Example: PORT=5000
3. Go to command prompt and write ```npm start:dev``` or ```npm start:prod``` as you prefere
4. Open _Postman_ or whatever app you use to test endpoints
5. Make request to endpoints with port
    + Example: ***http://localhost:3000/api/users***

// DEPENDENCIES
const EXPRESS = require('express');
const BODYPARSER = require('body-parser');
const MASSIVE = require('massive');

// ENVIRONMENT
require('dotenv').config();
const {
    EXPRESS_PORT
} = process.env;

// CONSTANTS
const APP = EXPRESS();

// COUNT
let count = 0;

// MIDDLEWARES
APP.use(BODYPARSER.json());
// APP.use((req, res, next) => {
//     next();
// });

// ENDPOINTS
APP.get('/', (req, res) => {
    count++;
    res.status(200).send({ message: "It worked!", count });
});

// LISTEN
APP.listen(EXPRESS_PORT, () => console.log(`game express on ${EXPRESS_PORT}`));

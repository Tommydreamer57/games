const watchUrl = require('./listen');
const link = require('./link');
const createSwitch = require('./switch');

module.exports = watchUrl;

Object.assign(module.exports, {
    link,
    createSwitch
});

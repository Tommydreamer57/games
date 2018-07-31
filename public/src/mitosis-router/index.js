const watchUrl = require('./listen');
const link = require('./link');
const { default: createSwitch, nestSwitch } = require('./switch');

module.exports = watchUrl;

Object.assign(module.exports, {
    link,
    createSwitch,
    nestSwitch
});

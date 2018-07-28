const { createMultiple } = require('./route');

function createSwitch(update, ...routes) {
    let children = createMultiple(update, ...routes);
    let previous = {};
    let current = {};
    let previousLocation = "";
    let currentLocation = "";
    let emptyChild = { view() { return null } };
    return {
        view(model) {
            // find correct child
            let currentChild = children.find(child => child.path === model.router.match.route) || emptyChild;
            // track previous children
            [previous, current] = [current, currentChild];
            // track previous pathnames & locations
            let currentPathname = model.router.history.location.pathname;
            [previousLocation, currentLocation] = [currentLocation, currentPathname];
            // if changing pathnames or locations
            if (previous !== current || previousLocation !== currentLocation) {
                if (typeof previous.clear === 'function') previous.clear(model);
                if (typeof current.data === 'function') current.data(model);
            }
            // return view of correct child
            return currentChild.view(model);
        }
    };
}

module.exports = createSwitch;

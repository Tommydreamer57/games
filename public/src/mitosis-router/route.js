const { matchAndParse } = require('./utils');

// REGISTER ROUTES

// REGISTER SINGLE ROUTE
function registerRoute(update, route, exact = false) {
    route = {
        route,
        exact
    };
    update(model => {
        let routes = [...model.router.routes, route];
        let match = matchAndParse(model.router.history.location.pathname, routes);
        return Object.assign(
            {},
            model,
            {
                router: Object.assign(
                    {},
                    model.router,
                    {
                        match,
                        routes
                    }
                )
            }
        );
    });
}

// REGISTER MULTIPLE ROUTES
function registerMultiple(update, routes) {
    for (let route of routes) {
        if (!route.exact) route.exact = false;
    }
    update(model => {
        let newRoutes = [...model.router.routes, ...routes];
        let match = matchAndParse(model.router.history.location.pathname, newRoutes);
        return Object.assign(
            {},
            model,
            {
                router: Object.assign(
                    {},
                    model.router,
                    {
                        match,
                        routes: newRoutes
                    }
                )
            }
        );
    });
}

// CREATE ROUTES

// CREATE SINGLE ROUTE
function createRoute(path, createComponent, update, exact, register = true) {
    let component = createComponent(update);
    if (register) registerRoute(update, path, exact);
    return Object.assign(
        {},
        component,
        {
            path,
            view(model) {
                if (model.router.match.route !== path) return null;
                else return component.view(model)
            }
        }
    );
}

// CREATE MULTIPLE ROUTES
function createMultiple(update, ...args) {
    let routes = [];
    let components = [];
    for (let argSet of args) {
        let [path, createComponent, update, exact] = argSet;
        components.push(createRoute(path, createComponent, update, exact, false));
        routes.push({ path, exact });
    }
    registerMultiple(update, routes);
    return components;
}

Object.assign(module.exports, {
    createRoute,
    createMultiple
});

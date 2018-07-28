const { default: createHistory } = require('history/createBrowserHistory');
const { matchAndParse } = require('./utils');

function watchUrl(update) {

    let history = createHistory();

    function updateHistory(location, action) {
        let model = update.access();
        update(model => Object.assign(
            {},
            model,
            {
                router: Object.assign(
                    {},
                    model.router,
                    {
                        history,
                        location,
                        route_changed: true
                    }
                )
            }
        ), (model.router && model.router.callback) || (() => { }));
    }

    history.listen(updateHistory);

    updateHistory(window.location);

    return function routerMiddleware(model) {
        if ( // if no routes
            ( // or if route didn't change
                !model.router.routes
                ||
                !model.router.routes.length
            ) || (
                model.router.hasOwnProperty('route_changed')
                &&
                !model.router.route_changed
            )
        ) return model;
        const match = matchAndParse(model.router.history.location.pathname, model.router.routes);
        return Object.assign(
            {},
            model,
            {
                router: Object.assign(
                    {},
                    model.router,
                    {
                        history,
                        match,
                        route_changed: false
                    }
                )
            }
        );
    }
}

module.exports = watchUrl;

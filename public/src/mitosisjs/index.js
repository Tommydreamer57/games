
function mitosis (createApp, model, render, ...middles) {

    var middlewares, app, update;
   
    update = (callback, cb) => {

        let newModel = callback(model);

        if (newModel) {
            if (middlewares) for (let fn of middlewares) newModel = fn(newModel);

            model = newModel;

            if (app) render(app.view(model), cb);
        }
    }

    update.access = key => key ?
        Array.isArray(key) ?
            key.reduce((m, k) => m[k], model)
            :
            model[key]
        :
        model;
    
    update.middleware = middleware => middlewares.push(middleware(update));

    middlewares = middles.map(fn => fn(update));

    app = createApp(update);

    update(m => m);
}

module.exports = mitosis;

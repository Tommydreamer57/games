// DEPENDENCIES
import ReactDOM from 'react-dom';
import mitosis from './mitosisjs';
// MIDDLEWARES
import { watchUpdates, freeze } from './meiosis-middlewares';
import watchUrl from './mitosis-router';
// APP
import createApp from './app';
import initialModel from './model';

// ROOT ELEMENT
const root = document.getElementById('root');

// INITIALIZE
mitosis(
    createApp,
    initialModel,
    (view, cb) => ReactDOM.render(view, root, cb),
    // MIDDLEWARES
    watchUrl,
    watchUpdates({
        ignore: ['socket']
    }),
    // freeze -- doesn't work with sockets right now
);
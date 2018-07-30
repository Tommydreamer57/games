// DEPENDENCIES
import ReactDOM from 'react-dom';
import mitosis from './mitosisjs';
// MIDDLEWARES
import { watchUpdates, freeze } from './meiosis-middlewares';
import watchUrl from './mitosis-router';
import sockets from './sockets';
// APP
import createApp from './app';
import initialModel from './model';

const root = document.getElementById('root');

mitosis(
    createApp,
    initialModel,
    (view, cb) => ReactDOM.render(view, root, cb),
    // MIDDLEWARES
    sockets,
    watchUrl,
    watchUpdates({
        ignore: ['socket']
    }),
    freeze
);
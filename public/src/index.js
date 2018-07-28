import ReactDOM from 'react-dom';
import mitosis from './mitosisjs';
import createApp from './app';
import initialModel from './model';
import watchUrl from './mitosis-router';
import { watchUpdates, freeze } from './meiosis-middlewares';

const root = document.getElementById('root');

mitosis(
    createApp,
    initialModel,
    (view, cb) => ReactDOM.render(view, root, cb),
    watchUrl,
    watchUpdates,
    freeze
);
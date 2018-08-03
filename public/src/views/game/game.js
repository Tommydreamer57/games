import games from '../../games';

export default function createGames(update) {

    const components = {};

    for (let game_name in games) {
        components[game_name] = games[game_name].component(update);
    }

    let previousGame;

    return {
        view(model) {
            if (!model.current_game.game_code) {
                const history = update.access(['router', 'history']);
                setTimeout(() => history.push('/'));
            }
            // FIND CORRECT GAME
            console.log("COMPONENTS");
            console.log(components);
            console.log(model);
            let currentGame = components[model.current_game.game_name];
            // RENDER CORRECT GAME
            // if new game is rendered, allow old one to clear and new one to init
            if (currentGame !== previousGame) {
                if (previousGame && previousGame.clear) previousGame.clear(model);
                if (currentGame.init) currentGame.init(model);
            }
            return currentGame.view(model);
        }
    };
}

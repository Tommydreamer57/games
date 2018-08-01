import games from '../../games';

export default function createGames(update) {

    const gameComponents = {};

    for (let game_name in games) {
        gameComponents[game_name] = games[game_name].component(update);
    }

    return {
        view(model) {
            if (!model.current_game.game_code) {
                const history = update.access(['router', 'history']);
                setTimeout(() => history.push('/'));
            }
            // FIND CORRECT GAME
            let game = gameComponents[model.current_game.game_name];
            // RENDER CORRECT GAME
            return game.view(model);
        }
    };
}

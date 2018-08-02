import games from '../../games';

export default function createGames(update) {

    const components = {};

    for (let game_name in games) {
        components[game_name] = games[game_name].component(update);
    }

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
            let game = components[model.current_game.game_name];
            // RENDER CORRECT GAME
            return game.view(model);
        }
    };
}

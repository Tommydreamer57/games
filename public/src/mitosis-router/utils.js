
// FIND CORRECT ROUTE
function createMatch(pathname, routes, exact = true) {
    if (!pathname || !routes || !routes.length) return '';
    let pathArr = pathname.split('/');
    return routes.find(route => {
        let routeArr = route.split('/');
        return (
            routeArr.length === pathArr.length
            &&
            routeArr.reduce((pass, str, i) => pass && (
                str[0] === ':'
                ||
                pathArr[i] === str
                ||
                (!exact && pathArr[i].includes(str))
            ), true)
        );
    });
}

// CREATE MATCH OBJECT
function parse(pathname, route) {
    if (!route || !route.length) return {};
    if (createMatch(pathname, [route], false) !== route) throw new Error('can only parse legitimate route match');
    return route.split('/')
        .filter(str => str[0] === ':')
        .reverse()
        .reduce((params, param, i) => Object.assign(
            {},
            params,
            {
                [param.slice(1)]: pathname.split('/').reverse()[i]
            }
        ), {});
}

// FIND CORRECT ROUTE AND CREATE MATCH OBJECT
function matchAndParse(pathname, routes) {
    let exact = true;
    let route = createMatch(pathname, routes.map(route => route.path), exact);
    if (!route) {
        exact = false
        route = createMatch(pathname, routes.filter(route => !route.exact).map(route => route.path), exact);
    }
    let params = parse(pathname, route);
    return {
        route,
        exact,
        params
    };
}

Object.assign(exports, {
    matchAndParse
});

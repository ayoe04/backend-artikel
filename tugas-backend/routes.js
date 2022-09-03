const LoginController = require("./controllers/LoginController")
const UserController = require("./controllers/UserController")
const ArtikelController = require("./controllers/ArtikelController")
const KomentarControlller = require("./controllers/KomentarController")

const _routes = [
    ['', LoginController],
    ['/users', UserController],
    ['/artikels', ArtikelController],
    ['/komentars', KomentarControlller]
]

const routes = (app) => {
    _routes.forEach(route => {
        const [ url, controller ] = route
        app.use(`/api${url}`, controller)
    });
}

module.exports = routes
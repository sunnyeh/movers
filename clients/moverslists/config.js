var moverslists = require("./controllers/moverslists");
module.exports = function(app){
    app.get('/moverslists', moverslists.MoverslistController);
    app.get('/moverslist/:slug', moverslists.MoverslistDtlController);
}
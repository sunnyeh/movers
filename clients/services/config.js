var services = require("./controllers/services");
module.exports = function(app){
    app.get('/services', services.ServiceController);
    app.get('/service/:slug', services.ServiceDtlController);
}
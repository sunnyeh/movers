var about = require("./controllers/about");
module.exports = function(app){
    app.get('/about-us', about.AboutController);
}
module.exports = function(app){
    require('./home/config')(app);
    require('./about/config')(app);
    require('./services/config')(app);
    require('./contact-us/config')(app);
    require('./moverslists/config')(app);
    
}
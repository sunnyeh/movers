var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');
var cookieParser = require("cookie-parser");
var session = require("express-session");
var ejs = require("ejs");
var path = require("path");
var multiparty = require("connect-multiparty");
var config = require("./config");
var httpMsg = require('./core/httpMsg');

// myapp
var app = express();
app.set('trust proxy', 1)

//my middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(multiparty());
app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/cms',express.static(path.join(__dirname,'cms')));

app.set('views', path.join(__dirname, 'clients'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(function(req, res, next){
  app.locals.session = req.session;
  app.locals.moment = require('moment');
  app.locals.ejsFun = require('./core/commonFun');
  next();
});

var clients = express.Router();
require("./clients/config")(clients);
app.use(clients);

var cmsApi = express.Router();
require('./cms-api/config')(cmsApi);
app.use('/cms-api',cmsApi);


app.use(session({
  secret: 'abcdefghijklmnopqrstuvwxyz',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true },
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}))

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   console.log('req.url : ',req.url )
//   console.log('err : ',err )
//   err.status = 404;
//   next(err);
// });

if (app.get('env') === 'development') {
  	app.use(function(err, req, res, next) {
      console.log("err",err);
      	console.log("found in development mode");
  		httpMsg.show500N404(req,res,err,"HTML");
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("not found in envenment mode");
  	httpMsg.show500N404(req,res,err,"HTML");

});



// module.exports = app;

app.listen(config.PORT,function(){
	console.log("Server start on "+config.PORT+" port");
})
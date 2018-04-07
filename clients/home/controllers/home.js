var Config = require('../../../config');
var HttpMsg  = require('../../../core/httpMsg'); 
var CommonFun  = require('../../../core/commonFun'); 
var DB  = require('../../../core/db'); 
var Main  = require('../../main/global'); 
var Sync = require('sync'),
    Future = Sync.Future; 


exports.HomeController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
        	var TempMain = Main.globalControl.future(null);
        	result=TempMain.result;

            var tempSlider = DB.executeSql.future(null,"select name, list_image, cover_image, short_desc from slider where not status = -1 and not status = 0 order by sort_order limit 8");
            result.sliders = tempSlider.result;

        	var tempAbout = DB.executeSql.future(null,"select title, short_desc, listing_img from about where id=1");
			result.about = tempAbout.result[0];

        	var tempTestimonial = DB.executeSql.future(null,"select name, message, company, designation, image from testimony where not status = -1 and not status = 0 order by sort_order limit 8");
			result.testimonials = tempTestimonial.result;

        	var tempFigure = DB.executeSql.future(null,"select name, figures, symbol, icon from figure where not status = -1 and not status = 0 order by sort_order limit 4");
			result.figures = tempFigure.result;

            var tempService = DB.executeSql.future(null,"select name,short_desc, long_desc,list_image, cover_img, meta_desc, meta_title from service");
            result.services = tempService.result;

            var tempMoverslist = DB.executeSql.future(null,"select name,slug from moverslist");
            result.moverslist = tempMoverslist.result;

        	console.log(result);
    		res.render("home/views/home.html", result);
        } catch(err){
            HttpMsg.show500(req,res,err,"HTML");
        }
    })
};


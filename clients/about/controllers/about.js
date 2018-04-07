var Config = require('../../../config');
var HttpMsg  = require('../../../core/httpMsg'); 
var CommonFun  = require('../../../core/commonFun'); 
var DB  = require('../../../core/db'); 
var Main  = require('../../main/global'); 
var Sync = require('sync'),
    Future = Sync.Future;  


exports.AboutController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
        	var TempMain = Main.globalControl.future(null);
        	result=TempMain.result;

        	var tempAbout = DB.executeSql.future(null,"select title,long_desc, listing_img,cover_img, mission, vision, cover_img, meta_desc, meta_title from about where id=1");
			result.about = tempAbout.result[0];
			result.title = 'About | '+result.store.name;
			result.meta_title = result.about.meta_title;
			result.meta_desc = result.about.meta_desc;
        	console.log(result);
    		res.render("about/views/about.html", result);
        } catch(err){
        	HttpMsg.show500(req,res,err,"HTML");
        }
    })
    
};


var Config = require('../../../config');
var HttpMsg  = require('../../../core/httpMsg'); 
var CommonFun  = require('../../../core/commonFun');  
var DB  = require('../../../core/db'); 
var Main  = require('../../main/global'); 
var Sync = require('sync'),
    Future = Sync.Future;  


exports.ServiceController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
        	var TempMain = Main.globalControl.future(null);
        	result=TempMain.result;
            var tempService = DB.executeSql.future(null,"select slug,name,short_desc, long_desc,list_image, cover_img, meta_desc, meta_title from service");
            result.services = tempService.result;
			result.title = 'Service | '+result.store.name;
    		res.render("services/views/services.html", result);
        } catch(err){
        	HttpMsg.show500(req,res,err,"HTML");
        }
    })
    
};

exports.ServiceDtlController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
        	var slug = '';
        	if(CommonFun.isset(req.params.slug)){
        		slug = req.params.slug
        	} else {
        		return HttpMsg.show404(req,res,"Page not found","HTML");
        	}
        	var TempMain = Main.globalControl.future(null);
        	result=TempMain.result;
        	var tempService = DB.executeSql.future(null,"select name,long_desc,list_image, cover_img, meta_desc, meta_title from service where slug='"+slug+"'");
			result.serviceDtl = tempService.result[0];
			result.title = result.serviceDtl.name+' | '+result.store.name;
			result.seo.meta_title = result.serviceDtl.meta_title;
			result.seo.meta_desc = result.serviceDtl.meta_desc;
        	console.log("result is ",result)
    		res.render("services/views/service.html", result);
        } catch(err){
        	console.log("error is ",err)
        	HttpMsg.show500(req,res,err,"HTML");
        }
    })
    
};


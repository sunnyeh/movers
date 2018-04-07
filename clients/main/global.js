var Config = require('../../config');
var HttpMsg  = require('../../core/httpMsg');  
var CommonFun  = require('../../core/commonFun');  
var DB  = require('../../core/db');  
var Sync = require('sync'),
    Future = Sync.Future;

exports.globalControl = function(_callback)
{
    var result = {
    	title:"",
        seo:{
            meta_title:"",
            meta_desc:""
        }
    };
    Sync(function(){
        try {
        	var tempStoreSetting = DB.executeSql.future(null,"select name, description, logo, meta_title, meta_desc from store_setting where id=1");
			result.store = tempStoreSetting.result[0];
			result.title = "Home | "+result.store.name;
			result.seo.meta_title = result.store.meta_title;
			result.seo.meta_desc = result.store.meta_desc;
        	var tempSocial = DB.executeSql.future(null,"select name, icon, link from socialmedia where not status = -1 and not status = 0 order by sort_order");
			result.social = tempSocial.result;

        	var tempAddress = DB.executeSql.future(null,"select name, address, city, state, country, phone_no, email, geo_long, geo_lat from address where not status = -1 and not status = 0 order by sort_order");
			result.address = tempAddress.result;

        	var tempService = DB.executeSql.future(null,"select slug, name, icon, short_desc from service where not status = -1 and not status = 0 order by sort_order limit 6");
			result.services = tempService.result;

			_callback(null,result);
        } catch(err){
        	_callback(err,null);
        }
    })
}
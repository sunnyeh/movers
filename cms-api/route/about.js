var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/about',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempAbout = db.executeSql.future(null,"select * from about");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempAbout.result[0]})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})

	app.post('/about',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log("body : ", req.body);
				var about={
					title: commonFun.sqlstring(commonFun.isset(req.body.title)?req.body.title:''),
			        short_desc: commonFun.sqlstring(commonFun.isset(req.body.short_desc)?req.body.short_desc:''),
			        long_desc: commonFun.sqlstring(commonFun.isset(req.body.long_desc)?req.body.long_desc:''),
			        mission: commonFun.sqlstring(commonFun.isset(req.body.mission)?req.body.mission:''),
			        vision: commonFun.sqlstring(commonFun.isset(req.body.vision)?req.body.vision:''),
			        listing_img: commonFun.sqlstring(commonFun.isset(req.body.listing_img)?req.body.listing_img:''),
			        cover_img: commonFun.sqlstring(commonFun.isset(req.body.cover_img)?req.body.cover_img:''),
			        meta_title: commonFun.sqlstring(commonFun.isset(req.body.meta_title)?req.body.meta_title:''),
			        meta_desc: commonFun.sqlstring(commonFun.isset(req.body.meta_desc)?req.body.meta_desc:''),
			        updated_by: req.userData.name,
			        ip: commonFun.getIp(req)
				}
				console.log("about : ", about);
				if(about.title=='' || about.listing_img==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				var tempAbout = db.executeSql.future(null,"update about set title='"+about.title+"', short_desc='"+about.short_desc+"', long_desc='"+about.long_desc+"', mission='"+about.mission+"', vision='"+about.vision+"', listing_img='"+about.listing_img+"', cover_img='"+about.cover_img+"', meta_title='"+about.meta_title+"', meta_desc='"+about.meta_desc+"', updated_by='"+about.updated_by+"', ip='"+about.ip+"', updated_on=now() where id = 1 ")
				httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})

}    

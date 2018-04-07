var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/store-setting',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempStore = db.executeSql.future(null,"select * from store_setting");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempStore.result[0]})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})

	app.post('/store-setting',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var store={
					"name": commonFun.sqlstring(commonFun.isset(req.body.name)?req.body.name:''),
			        "description": commonFun.sqlstring(commonFun.isset(req.body.description)?req.body.description:''),
			        "tagline": commonFun.sqlstring(commonFun.isset(req.body.tagline)?req.body.tagline:''),
			        "logo": commonFun.sqlstring(commonFun.isset(req.body.logo)?req.body.logo:''),
			        "notify_email": commonFun.sqlstring(commonFun.isset(req.body.notify_email)?req.body.notify_email:''),
			        "career_email": commonFun.sqlstring(commonFun.isset(req.body.career_email)?req.body.career_email:''),
			        "conf_email": commonFun.sqlstring(commonFun.isset(req.body.conf_email)?req.body.conf_email:''),
			        "conf_password": commonFun.sqlstring(commonFun.isset(req.body.conf_password)?req.body.conf_password:''),
			        "conf_host": commonFun.sqlstring(commonFun.isset(req.body.conf_host)?req.body.conf_host:''),
			        "conf_port": commonFun.sqlstring(commonFun.isset(req.body.conf_port)?req.body.conf_port:''),
			        "conf_secure": commonFun.sqlstring(commonFun.isset(req.body.conf_secure)?req.body.conf_secure:''),
			        "meta_title": commonFun.sqlstring(commonFun.isset(req.body.meta_title)?req.body.meta_title:''),
			        "meta_desc": commonFun.sqlstring(commonFun.isset(req.body.meta_desc)?req.body.meta_desc:''),
			        "ip": commonFun.getIp(req)
				}
				if(store.name=='' || store.description=='' || store.logo == ''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				var tempStore = db.executeSql.future(null,"update store_setting set name='"+store.name+"', description='"+store.description+"', tagline='"+store.tagline+"', logo='"+store.logo+"', notify_email='"+store.notify_email+"', career_email='"+store.career_email+"', conf_password='"+store.conf_password+"', conf_host='"+store.conf_host+"', conf_port='"+store.conf_port+"', conf_secure='"+store.conf_secure+"', meta_title='"+store.meta_title+"', meta_desc='"+store.meta_desc+"', ip='"+store.ip+"', updated_on=now() where id = 1")
				httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})

}    

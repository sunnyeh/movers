var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/subscribe',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempSubscribe = db.executeSql.future(null,"select * from subscribes");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempSubscribe.result})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/subscribe/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSubscribe = db.executeSql.future(null,"select * from subscribes where id='"+id+"'");
				if(tempSubscribe.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempSubscribe.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/subscribe/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSubscribe = db.executeSql.future(null,"update subscribes set status='"+status+"' where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

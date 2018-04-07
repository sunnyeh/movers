var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/enquiry',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempEnquiry = db.executeSql.future(null,"select * from enquiry");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempEnquiry.result})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/enquiry/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempEnquiry = db.executeSql.future(null,"select * from enquiry where id='"+id+"'");
				if(tempEnquiry.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempEnquiry.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/enquiry',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var enquiry={
			        "remark": commonFun.sqlstring(commonFun.isset(req.body.remark)?req.body.remark:''),
			        "status": commonFun.isset(req.body.status)?req.body.status:'1'
				}
				if(enquiry.remark=='' || enquiry.status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				// var tempEnquiry = db.executeSql.future(null,"insert into enquiry (enq_for, name, email, phone, message, remark, status, inserted_on, ip) value ('"+enquiry.enq_for+"', '"+enquiry.name+"', '"+enquiry.email+"', '"+enquiry.phone+"', '"+enquiry.message+"', '"+enquiry.remark+"', '"+enquiry.status+"', now(), '"+enquiry.ip+"')");
				// 	httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				var update = "update enquiry set remark='"+enquiry.remark+"', status='"+enquiry.status+"' where id = '"+id+"'";
					console.log("update",update);
					var tempHoarding = db.executeSql.future(null,update);
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/enquiry/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempEnquiry = db.executeSql.future(null,"update enquiry set status='"+status+"' where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	// app.get('/contact',authCheck.ensureAuthorized,function(req,res,next){
	// 	Sync(function(){
	// 		try{
	// 			var tempEnquiry = db.executeSql.future(null,"select * from contact");
	// 			httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempEnquiry.result})
	// 		} catch(e){
	// 			console.log(e);
	// 			httpMsg.show500(req,res,e,"JSON");
	// 		}
	// 	})
	// })
	
	app.get('/contact',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var result = {};
				result.page = parseInt(commonFun.isset(req.query.page)?req.query.page:1,10);
				var SQLFilter = commonFun.isset(req.query.name)?(" and name like '%"+req.query.name+"%'"):'';
				result.limit = parseInt(commonFun.isset(req.query.limit)?req.query.limit:10,10);
				var skip = (result.page-1) * result.limit;

				// Here we compute the LIMIT parameter for MySQL query
				var SQLlimit = skip + ',' + result.limit;
				var sqlCount = "select count(id) as numRows from contact where not status=-1"+SQLFilter;
				console.log("sqlCount : ",sqlCount);
				var tempCount = db.executeSql.future(null,sqlCount);
				console.log(tempCount.result[0].numRows);
				result.total=tempCount.result[0].numRows;
				result.pages=Math.ceil(tempCount.result[0].numRows / result.limit);
				var sqlList = "select * from contact where not status = -1"+SQLFilter+" order by name limit "+SQLlimit;
				console.log("sqlList : ",sqlList)
				var tempType = db.executeSql.future(null,sqlList);
				result.docs = tempType.result;
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data: result});
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/contact/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempEnquiry = db.executeSql.future(null,"select * from contact where id='"+id+"'");
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
	app.post('/contact',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var contact={
			        "remark": commonFun.sqlstring(commonFun.isset(req.body.remark)?req.body.remark:''),
			        "status": commonFun.isset(req.body.status)?req.body.status:'1'
				}
				if(contact.remark=='' || contact.status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				// var tempEnquiry = db.executeSql.future(null,"insert into contact (enq_for, name, email, phone, message, remark, status, inserted_on, ip) value ('"+contact.enq_for+"', '"+contact.name+"', '"+contact.email+"', '"+contact.phone+"', '"+contact.message+"', '"+contact.remark+"', '"+contact.status+"', now(), '"+contact.ip+"')");
				// 	httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				var update = "update contact set remark='"+contact.remark+"', status='"+contact.status+"' where id = '"+id+"'";
					console.log("update",update);
					var tempHoarding = db.executeSql.future(null,update);
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/contact/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempEnquiry = db.executeSql.future(null,"update contact set status='"+status+"' where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

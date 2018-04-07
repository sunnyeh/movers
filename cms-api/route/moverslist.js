var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	// app.get('/moverslist',authCheck.ensureAuthorized,function(req,res,next){
	// 	Sync(function(){
	// 		try{
	// 			var tempMoverslist = db.executeSql.future(null,"select * from moverslist where not status=-1 order by sort_order");
	// 			httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempMoverslist.result})
	// 		} catch(e){
	// 			console.log(e);
	// 			httpMsg.show500(req,res,e,"JSON");
	// 		}
	// 	})
	// })
	app.get('/moverslist',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var result = {};
				result.page = parseInt(commonFun.isset(req.query.page)?req.query.page:1,10);
				var SQLFilter = commonFun.isset(req.query.name)?(" and name like '%"+req.query.name+"%'"):'';
				result.limit = parseInt(commonFun.isset(req.query.limit)?req.query.limit:10,10);
				var skip = (result.page-1) * result.limit;

				// Here we compute the LIMIT parameter for MySQL query
				var SQLlimit = skip + ',' + result.limit;
				var sqlCount = "select count(id) as numRows from moverslist where not status=-1"+SQLFilter;
				console.log("sqlCount : ",sqlCount);
				var tempCount = db.executeSql.future(null,sqlCount);
				console.log(tempCount.result[0].numRows);
				result.total=tempCount.result[0].numRows;
				result.pages=Math.ceil(tempCount.result[0].numRows / result.limit);
				var sqlList = "select * from moverslist where not status = -1"+SQLFilter+" order by name limit "+SQLlimit;
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
	app.get('/moverslist/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempMoverslist = db.executeSql.future(null,"select * from moverslist where id='"+id+"'");
				if(tempMoverslist.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempMoverslist.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/moverslist',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var moverslist={
					"name": commonFun.sqlstring(commonFun.isset(req.body.name)?req.body.name:''),
			        "slug": commonFun.sqlstring(commonFun.isset(req.body.slug)?req.body.slug:''),
			        "company_name": commonFun.sqlstring(commonFun.isset(req.body.company_name)?req.body.company_name:''),
			        "company_desc": commonFun.sqlstring(commonFun.isset(req.body.company_desc)?req.body.company_desc:''),
			        "company_contact": commonFun.sqlstring(commonFun.isset(req.body.company_contact)?req.body.company_contact:''),
			        "company_address": commonFun.sqlstring(commonFun.isset(req.body.company_address)?req.body.company_address:''),
			        "company_website": commonFun.sqlstring(commonFun.isset(req.body.company_website)?req.body.company_website:''),
			        "company_email": commonFun.sqlstring(commonFun.isset(req.body.company_email)?req.body.company_email:''),
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(moverslist.name=='' || moverslist.company_name==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				console.log(moverslist);
				var sql = "";
				if(id){
					sql = "update moverslist set `name`='"+moverslist.name+"', `slug`='"+moverslist.slug+"',`company_name`='"+moverslist.company_name+"', `company_desc`='"+moverslist.company_desc+"', `company_contact`='"+moverslist.company_contact+"', `company_address`='"+moverslist.company_address+"', `company_website`='"+moverslist.company_website+"', `company_email`='"+moverslist.company_email+"', `sort_order`='"+moverslist.sort_order+"', `status`='"+moverslist.status+"', `updated_by`='"+moverslist.updated_by+"', `ip`='"+moverslist.ip+"', `updated_on`=now() where `id` = '"+id+"'";
					console.log(sql);
					var tempMoverslist = db.executeSql.future(null,sql)
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					sql = "insert into moverslist (`name`, `slug`, `company_name`, `company_desc`, `company_contact`, `company_address`, `company_website`, `company_email`, `sort_order`, `status`, `inserted_on`, `inserted_by`, `ip`) values ('"+moverslist.name+"', '"+moverslist.slug+"', '"+moverslist.company_name+"', '"+moverslist.company_desc+"', '"+moverslist.company_contact+"', '"+moverslist.company_address+"', '"+moverslist.company_website+"', '"+moverslist.company_email+"', '"+moverslist.sort_order+"', '"+moverslist.status+"', now(), '"+moverslist.inserted_by+"', '"+moverslist.ip+"')";
					console.log(sql);
					var tempMoverslist = db.executeSql.future(null,sql);
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/moverslist/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempMoverslist = db.executeSql.future(null,"update moverslist set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/moverslist/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempMoverslist = db.executeSql.future(null,"update moverslist set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

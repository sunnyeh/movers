var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	// app.get('/testimony',authCheck.ensureAuthorized,function(req,res,next){
	// 	Sync(function(){
	// 		try{
	// 			var tempTestimony = db.executeSql.future(null,"select * from testimony where not status=-1 order by sort_order");
	// 			httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempTestimony.result})
	// 		} catch(e){
	// 			console.log(e);
	// 			httpMsg.show500(req,res,e,"JSON");
	// 		}
	// 	})
	// })
	app.get('/testimony',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var result = {};
				result.page = parseInt(commonFun.isset(req.query.page)?req.query.page:1,10);
				var SQLFilter = commonFun.isset(req.query.name)?(" and name like '%"+req.query.name+"%'"):'';
				result.limit = parseInt(commonFun.isset(req.query.limit)?req.query.limit:10,10);
				var skip = (result.page-1) * result.limit;

				// Here we compute the LIMIT parameter for MySQL query
				var SQLlimit = skip + ',' + result.limit;
				var sqlCount = "select count(id) as numRows from testimony where not status=-1"+SQLFilter;
				console.log("sqlCount : ",sqlCount);
				var tempCount = db.executeSql.future(null,sqlCount);
				console.log(tempCount.result[0].numRows);
				result.total=tempCount.result[0].numRows;
				result.pages=Math.ceil(tempCount.result[0].numRows / result.limit);
				var sqlList = "select * from testimony where not status = -1"+SQLFilter+" order by name limit "+SQLlimit;
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
	app.get('/testimony/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempTestimony = db.executeSql.future(null,"select * from testimony where id='"+id+"'");
				if(tempTestimony.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempTestimony.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/testimony',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var testimony={
					"name": commonFun.isset(req.body.name)?req.body.name:'',
			        "message": commonFun.isset(req.body.message)?req.body.message:'',
			        "company": commonFun.isset(req.body.company)?req.body.company:'',
			        "designation": commonFun.isset(req.body.designation)?req.body.designation:'',
			        "image": commonFun.isset(req.body.image)?req.body.image:'',
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(testimony.name=='' || testimony.message=='' || testimony.company=='' || testimony.designation=='' || testimony.image==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				if(id){
					var tempTestimony = db.executeSql.future(null,"update testimony set name='"+testimony.name+"', message='"+testimony.message+"', company='"+testimony.company+"', designation='"+testimony.designation+"', image='"+testimony.image+"',sort_order='"+testimony.sort_order+"', status='"+testimony.status+"', updated_by='"+testimony.updated_by+"', ip='"+testimony.ip+"', updated_on=now() where id = '"+id+"'")
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					var tempTestimony = db.executeSql.future(null,"insert into testimony (name, message, company, designation, image, sort_order, status, inserted_on, inserted_by, ip) values ('"+testimony.name+"', '"+testimony.message+"', '"+testimony.company+"', '"+testimony.designation+"', '"+testimony.image+"', '"+testimony.sort_order+"', '"+testimony.status+"', now(), '"+testimony.inserted_by+"', '"+testimony.ip+"')");
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/testimony/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempTestimony = db.executeSql.future(null,"update testimony set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/testimony/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempTestimony = db.executeSql.future(null,"update testimony set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

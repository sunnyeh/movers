var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	// app.get('/slider',authCheck.ensureAuthorized,function(req,res,next){
	// 	Sync(function(){
	// 		try{
	// 			var tempSlider = db.executeSql.future(null,"select * from slider where not status=-1 order by sort_order");
	// 			httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempSlider.result})
	// 		} catch(e){
	// 			console.log(e);
	// 			httpMsg.show500(req,res,e,"JSON");
	// 		}
	// 	})
	// })
	app.get('/slider',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var result = {};
				result.page = parseInt(commonFun.isset(req.query.page)?req.query.page:1,10);
				var SQLFilter = commonFun.isset(req.query.name)?(" and name like '%"+req.query.name+"%'"):'';
				result.limit = parseInt(commonFun.isset(req.query.limit)?req.query.limit:10,10);
				var skip = (result.page-1) * result.limit;

				// Here we compute the LIMIT parameter for MySQL query
				var SQLlimit = skip + ',' + result.limit;
				var sqlCount = "select count(id) as numRows from slider where not status=-1"+SQLFilter;
				console.log("sqlCount : ",sqlCount);
				var tempCount = db.executeSql.future(null,sqlCount);
				console.log(tempCount.result[0].numRows);
				result.total=tempCount.result[0].numRows;
				result.pages=Math.ceil(tempCount.result[0].numRows / result.limit);
				var sqlList = "select * from slider where not status = -1"+SQLFilter+" order by name limit "+SQLlimit;
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
	app.get('/slider/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSlider = db.executeSql.future(null,"select * from slider where id='"+id+"'");
				if(tempSlider.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempSlider.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/slider',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var slider={
					"name": commonFun.sqlstring(commonFun.isset(req.body.name)?req.body.name:''),
			        "list_image": commonFun.sqlstring(commonFun.isset(req.body.list_image)?req.body.list_image:''),
			        "cover_image": commonFun.sqlstring(commonFun.isset(req.body.cover_image)?req.body.cover_image:''),
			        "short_desc": commonFun.sqlstring(commonFun.isset(req.body.short_desc)?req.body.short_desc:''),
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "insert_by": req.userData.name,
			        "update_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(slider.name=='' || slider.image=='' || slider.short_desc==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				console.log(slider);
				var sql = "";
				if(id){
					sql = "update slider set `name`='"+slider.name+"', `list_image`='"+slider.list_image+"',`cover_image`='"+slider.cover_image+"', `short_desc`='"+slider.short_desc+"', `sort_order`='"+slider.sort_order+"', `status`='"+slider.status+"', `update_by`='"+slider.update_by+"', `ip`='"+slider.ip+"', `update_on`=now() where `id` = '"+id+"'";
					console.log(sql);
					var tempSlider = db.executeSql.future(null,sql)
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					sql = "insert into slider (`name`, `list_image`, `cover_image`, `short_desc`, `sort_order`, `status`, `insert_on`, `insert_by`, `ip`) values ('"+slider.name+"', '"+slider.list_image+"', '"+slider.cover_image+"', '"+slider.short_desc+"', '"+slider.sort_order+"', '"+slider.status+"', now(), '"+slider.insert_by+"', '"+slider.ip+"')";
					console.log(sql);
					var tempSlider = db.executeSql.future(null,sql);
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/slider/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSlider = db.executeSql.future(null,"update slider set status=-1, update_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/slider/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSlider = db.executeSql.future(null,"update slider set status='"+status+"', update_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

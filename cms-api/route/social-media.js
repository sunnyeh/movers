var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	// app.get('/social-media',authCheck.ensureAuthorized,function(req,res,next){
	// 	Sync(function(){
	// 		try{
	// 			var tempSocial = db.executeSql.future(null,"select * from socialmedia where not status=-1 order by sort_order");
	// 			httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempSocial.result})
	// 		} catch(e){
	// 			console.log(e);
	// 			httpMsg.show500(req,res,e,"JSON");
	// 		}
	// 	})
	// })
	
	app.get('/social-media',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var result = {};
				result.page = parseInt(commonFun.isset(req.query.page)?req.query.page:1,10);
				var SQLFilter = commonFun.isset(req.query.name)?(" and name like '%"+req.query.name+"%'"):'';
				result.limit = parseInt(commonFun.isset(req.query.limit)?req.query.limit:10,10);
				var skip = (result.page-1) * result.limit;

				// Here we compute the LIMIT parameter for MySQL query
				var SQLlimit = skip + ',' + result.limit;
				var sqlCount = "select count(id) as numRows from socialmedia where not status=-1"+SQLFilter;
				console.log("sqlCount : ",sqlCount);
				var tempCount = db.executeSql.future(null,sqlCount);
				console.log(tempCount.result[0].numRows);
				result.total=tempCount.result[0].numRows;
				result.pages=Math.ceil(tempCount.result[0].numRows / result.limit);
				var sqlList = "select * from socialmedia where not status = -1"+SQLFilter+" order by name limit "+SQLlimit;
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
	app.get('/social-media/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSocial = db.executeSql.future(null,"select * from socialmedia where id='"+id+"'");
				if(tempSocial.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempSocial.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/social-media',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var social={
					"name": commonFun.sqlstring(commonFun.isset(req.body.name)?req.body.name:''),
			        "icon": commonFun.sqlstring(commonFun.isset(req.body.icon)?req.body.icon:''),
			        "image": commonFun.sqlstring(commonFun.isset(req.body.image)?req.body.image:''),
			        "logo": commonFun.sqlstring(commonFun.isset(req.body.logo)?req.body.logo:''),
			        "link": commonFun.sqlstring(commonFun.isset(req.body.link)?req.body.link:''),
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(social.name=='' || social.link==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				if(id){
					var tempSocial = db.executeSql.future(null,"update socialmedia set name='"+social.name+"', icon='"+social.icon+"', image='"+social.image+"', link='"+social.link+"', sort_order='"+social.sort_order+"', status='"+social.status+"', updated_by='"+social.updated_by+"', ip='"+social.ip+"', updated_on=now() where id = '"+id+"'")
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					var tempSocial = db.executeSql.future(null,"insert into socialmedia (name, icon, image, link, sort_order, status, inserted_on, inserted_by, ip) values ('"+social.name+"', '"+social.icon+"', '"+social.image+"', '"+social.link+"', '"+social.sort_order+"', '"+social.status+"', now(), '"+social.inserted_by+"', '"+social.ip+"')");
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/social-media/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSocial = db.executeSql.future(null,"update socialmedia set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/social-media/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempSocial = db.executeSql.future(null,"update socialmedia set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

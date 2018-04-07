var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;


module.exports = function(app){
	app.get('/service',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempService = db.executeSql.future(null,"select * from service where not status=-1 order by sort_order");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempService.result})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/service/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempService = db.executeSql.future(null,"select * from service where id='"+id+"'");
				if(tempService.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempService.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/service',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var service={
					"name": commonFun.sqlstring(commonFun.isset(req.body.name)?req.body.name:''),
			        "short_desc": commonFun.sqlstring(commonFun.isset(req.body.short_desc)?req.body.short_desc:''),
			        "long_desc": commonFun.sqlstring(commonFun.isset(req.body.long_desc)?req.body.long_desc:''),
			        "icon": commonFun.sqlstring(commonFun.isset(req.body.icon)?req.body.icon:''),
			        "list_image": commonFun.sqlstring(commonFun.isset(req.body.list_image)?req.body.list_image:''),
			        "cover_img": commonFun.sqlstring(commonFun.isset(req.body.cover_img)?req.body.cover_img:''),
			        "slug": commonFun.sqlstring(commonFun.isset(req.body.slug)?req.body.slug:''),
			        "meta_title": commonFun.sqlstring(commonFun.isset(req.body.meta_title)?req.body.meta_title:''),
			        "meta_desc": commonFun.sqlstring(commonFun.isset(req.body.meta_desc)?req.body.meta_desc:''),
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(service.name=='' || service.slug=='' || service.cover_img==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				if(id){
					var tempService = db.executeSql.future(null,"update service set name='"+service.name+"', short_desc='"+service.short_desc+"', long_desc='"+service.long_desc+"', icon='"+service.icon+"',list_image='"+service.list_image+"', cover_img='"+service.cover_img+"', slug='"+service.slug+"', meta_title='"+service.meta_title+"', meta_desc='"+service.meta_desc+"', sort_order='"+service.sort_order+"', status='"+service.status+"', updated_by='"+service.updated_by+"', ip='"+service.ip+"', updated_on=now() where id = '"+id+"'")
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					var tempService = db.executeSql.future(null,"insert into service (name, short_desc, long_desc, icon,list_image, cover_img, slug, meta_title, meta_desc, sort_order, status, inserted_on, inserted_by, ip) values ('"+service.name+"', '"+service.short_desc+"', '"+service.long_desc+"', '"+service.icon+"', '"+service.list_image+"', '"+service.cover_img+"', '"+service.slug+"', '"+service.meta_title+"', '"+service.meta_desc+"', '"+service.sort_order+"', '"+service.status+"', now(), '"+service.inserted_by+"', '"+service.ip+"')");
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/service/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempService = db.executeSql.future(null,"update service set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/service/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempService = db.executeSql.future(null,"update service set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

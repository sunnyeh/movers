var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/figure',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempFigure = db.executeSql.future(null,"select * from figure where not status=-1 order by sort_order");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempFigure.result})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/figure/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempFigure = db.executeSql.future(null,"select * from figure where id='"+id+"'");
				if(tempFigure.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempFigure.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/figure',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var figure={
					"name": commonFun.sqlstring(commonFun.isset(req.body.name)?req.body.name:''),
			        "figures": commonFun.sqlstring(commonFun.isset(req.body.figures)?req.body.figures:''),
			        "symbol": commonFun.sqlstring(commonFun.isset(req.body.symbol)?req.body.symbol:''),
			        "icon": commonFun.sqlstring(commonFun.isset(req.body.icon)?req.body.icon:''),
			        "image": commonFun.sqlstring(commonFun.isset(req.body.image)?req.body.image:''),
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(figure.name=='' || figure.figures=='' || figure.icon=='' || figure.image==''|| figure.symbol==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				if(id){
					var tempFigure = db.executeSql.future(null,"update figure set name='"+figure.name+"', figures='"+figure.figures+"', symbol='"+figure.symbol+"', icon='"+figure.icon+"', image='"+figure.image+"', sort_order='"+figure.sort_order+"', status='"+figure.status+"', updated_by='"+figure.updated_by+"', ip='"+figure.ip+"', updated_on=now() where id = '"+id+"'")
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					var tempFigure = db.executeSql.future(null,"insert into figure (name, figures, symbol, icon, image, sort_order, status, inserted_on, inserted_by, ip) values ('"+figure.name+"', '"+figure.figures+"', '"+figure.symbol+"', '"+figure.icon+"', '"+figure.image+"', '"+figure.sort_order+"', '"+figure.status+"', now(), '"+figure.inserted_by+"', '"+figure.ip+"')");
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/figure/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempFigure = db.executeSql.future(null,"update figure set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/figure/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempFigure = db.executeSql.future(null,"update figure set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

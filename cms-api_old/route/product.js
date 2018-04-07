var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/product',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempProduct = db.executeSql.future(null,"select * from product where not status=-1 order by sort_order");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempProduct.result})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/product/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempProduct = db.executeSql.future(null,"select * from product where id='"+id+"'");
				if(tempProduct.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempProduct.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/product',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log("body",req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var product={
					"category_id": commonFun.isset(req.body.category_id)?req.body.category_id:'',
					"name": commonFun.isset(req.body.name)?req.body.name:'',
					"slug": commonFun.isset(req.body.slug)?req.body.slug:'',
					"short_desc": commonFun.isset(req.body.short_desc)?req.body.short_desc:'',
					"long_desc": commonFun.isset(req.body.long_desc)?req.body.long_desc:'',
					"list_image": commonFun.isset(req.body.list_image)?req.body.list_image:'',
					"cover_image": commonFun.isset(req.body.cover_image)?req.body.cover_image:'',
					"attr": commonFun.isset(req.body.attr)?req.body.attr:'',
					"meta_title": commonFun.isset(req.body.meta_title)?req.body.meta_title:'',
					"meta_desc": commonFun.isset(req.body.meta_desc)?req.body.meta_desc:'',
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(product.name=='' || product.short_desc=='' || product.list_image=='' || product.cover_image=='' || product.meta_title=='' || product.meta_desc=='')
				{
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				if(id){
					var tempProduct = db.executeSql.future(null,"update product set category_id='"+product.category_id+"',name='"+product.name+"',slug='"+product.slug+"',short_desc='"+product.short_desc+"',long_desc='"+product.long_desc+"',list_image='"+product.list_image+"',cover_image='"+product.cover_image+"',attr='"+product.attr+"',meta_title='"+product.meta_title+"',meta_desc='"+product.meta_desc+"',sort_order='"+product.sort_order+"', status='"+product.status+"', updated_by='"+product.updated_by+"', ip='"+product.ip+"', updated_on=now() where id = '"+id+"'")
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					var sqlquery = "insert into product ( category_id,name,slug,short_desc,long_desc,list_image,cover_image,attr,meta_title,meta_desc, sort_order, status, inserted_on, inserted_by, ip) values ('"+product.category_id+"','"+product.name+"','"+product.slug+"','"+product.short_desc+"','"+product.long_desc+"','"+product.list_image+"','"+product.cover_image+"','"+product.attr+"','"+product.meta_title+"','"+product.meta_desc+"' , '"+product.sort_order+"', '"+product.status+"', now(), '"+product.inserted_by+"', '"+product.ip+"')";
					console.log("sqlquery",sqlquery);
					var tempProduct = db.executeSql.future(null,sqlquery);
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/product/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempProduct = db.executeSql.future(null,"update product set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/product/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempProduct = db.executeSql.future(null,"update product set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

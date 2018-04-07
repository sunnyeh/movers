var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/category-dropdown',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var tempCategory = db.executeSql.future(null,"select id,name from category where not status=-1 order by sort_order");
				httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempCategory.result})
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	
	app.get('/category',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var result = {};
				result.page = parseInt(commonFun.isset(req.query.page)?req.query.page:1,10);
				var SQLFilter = commonFun.isset(req.query.name)?(" and name like '%"+req.query.name+"%'"):'';
				result.limit = parseInt(commonFun.isset(req.query.limit)?req.query.limit:10,10);
				var skip = (result.page-1) * result.limit;

				// Here we compute the LIMIT parameter for MySQL query
				var SQLlimit = skip + ',' + result.limit;
				var sqlCount = "select count(id) as numRows from category where not status=-1"+SQLFilter;
				console.log("sqlCount : ",sqlCount);
				var tempCount = db.executeSql.future(null,sqlCount);
				console.log(tempCount.result[0].numRows);
				result.total=tempCount.result[0].numRows;
				result.pages=Math.ceil(tempCount.result[0].numRows / result.limit);
				var sqlList = "select * from category where not status = -1"+SQLFilter+" order by name limit "+SQLlimit;
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
	app.get('/category/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempCategory = db.executeSql.future(null,"select * from category where id='"+id+"'");
				if(tempCategory.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempCategory.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/category',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log("body",req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var category={
					"name": commonFun.isset(req.body.name)?req.body.name:'',
					"slug": commonFun.isset(req.body.slug)?req.body.slug:'',
					"short_desc": commonFun.isset(req.body.short_desc)?req.body.short_desc:'',
					"list_image": commonFun.isset(req.body.list_image)?req.body.list_image:'',
					"cover_image": commonFun.isset(req.body.cover_image)?req.body.cover_image:'',
					"meta_title": commonFun.isset(req.body.meta_title)?req.body.meta_title:'',
					"meta_desc": commonFun.isset(req.body.meta_desc)?req.body.meta_desc:'',
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(category.name=='' || category.short_desc=='' || category.list_image=='' || category.cover_image=='' || category.meta_title=='' || category.meta_desc=='')
				{
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				if(id){
					var tempCategory = db.executeSql.future(null,"update category set name='"+category.name+"',slug='"+category.slug+"',short_desc='"+category.short_desc+"',list_image='"+category.list_image+"',cover_image='"+category.cover_image+"',meta_title='"+category.meta_title+"',meta_desc='"+category.meta_desc+"',sort_order='"+category.sort_order+"', status='"+category.status+"', updated_by='"+category.updated_by+"', ip='"+category.ip+"', updated_on=now() where id = '"+id+"'")
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					var sqlquery = "insert into category (name,slug,short_desc,list_image,cover_image,meta_title,meta_desc, sort_order, status, inserted_on, inserted_by, ip) values ('"+category.name+"','"+category.slug+"','"+category.short_desc+"','"+category.list_image+"','"+category.cover_image+"','"+category.meta_title+"','"+category.meta_desc+"' , '"+category.sort_order+"', '"+category.status+"', now(), '"+category.inserted_by+"', '"+category.ip+"')";
					console.log("sqlquery",sqlquery);
					var tempCategory = db.executeSql.future(null,sqlquery);
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/category/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempCategory = db.executeSql.future(null,"update category set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/category/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempCategory = db.executeSql.future(null,"update category set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

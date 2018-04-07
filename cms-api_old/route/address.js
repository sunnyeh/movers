var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/address',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var result = {};
				result.page = parseInt(commonFun.isset(req.query.page)?req.query.page:1,10);
				var SQLFilter = commonFun.isset(req.query.name)?(" and name like '%"+req.query.name+"%'"):'';
				result.limit = parseInt(commonFun.isset(req.query.limit)?req.query.limit:10,10);
				var skip = (result.page-1) * result.limit;

				// Here we compute the LIMIT parameter for MySQL query
				var SQLlimit = skip + ',' + result.limit;
				var sqlCount = "select count(id) as numRows from address where not status=-1"+SQLFilter;
				console.log("sqlCount : ",sqlCount);
				var tempCount = db.executeSql.future(null,sqlCount);
				console.log(tempCount.result[0].numRows);
				result.total=tempCount.result[0].numRows;
				result.pages=Math.ceil(tempCount.result[0].numRows / result.limit);
				var sqlList = "select * from address where not status = -1"+SQLFilter+" order by name limit "+SQLlimit;
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
	app.get('/address/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempAddress = db.executeSql.future(null,"select * from address where id='"+id+"'");
				if(tempAddress.result.length>0){
					httpMsg.sendJson(req,res,{status:true,message:"successfully display",data:tempAddress.result[0]})
				}else{
					httpMsg.sendJson(req,res,{status:false,message:"Data not found"})
				}
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.post('/address',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				console.log(req.body);
				var id = commonFun.isset(req.body.id)?req.body.id:'';
				var address={
					"name": commonFun.sqlstring(commonFun.isset(req.body.name)?req.body.name:''),
			        "address": commonFun.sqlstring(commonFun.isset(req.body.address)?req.body.address:''),
			        "city": commonFun.sqlstring(commonFun.isset(req.body.city)?req.body.city:''),
			        "state": commonFun.sqlstring(commonFun.isset(req.body.state)?req.body.state:''),
			        "country": commonFun.sqlstring(commonFun.isset(req.body.country)?req.body.country:''),
			        "phone_no": commonFun.sqlstring(commonFun.isset(req.body.phone_no)?req.body.phone_no:''),
			        "email": commonFun.sqlstring(commonFun.isset(req.body.email)?req.body.email:''),
			        "geo_long": commonFun.sqlstring(commonFun.isset(req.body.geo_long)?req.body.geo_long:''),
			        "geo_lat": commonFun.sqlstring(commonFun.isset(req.body.geo_lat)?req.body.geo_lat:''),
			        "sort_order": commonFun.isset(req.body.sort_order)?req.body.sort_order:'1',
			        "status": commonFun.isset(req.body.status)?req.body.status:'1',
			        "inserted_by": req.userData.name,
			        "updated_by": req.userData.name,
			        "ip": commonFun.getIp(req)
				}
				if(address.name=='' || address.address=='' || address.city=='' || address.state==''|| address.country=='' || address.phone_no==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				} 
				if(id){
					var tempAddress = db.executeSql.future(null,"update address set name='"+address.name+"', city='"+address.city+"', state='"+address.state+"', country='"+address.country+"', phone_no='"+address.phone_no+"', email='"+address.email+"', geo_long='"+address.geo_long+"', geo_lat='"+address.geo_lat+"', sort_order='"+address.sort_order+"', status='"+address.status+"', updated_by='"+address.updated_by+"', ip='"+address.ip+"', updated_on=now() where id = '"+id+"'")
					httpMsg.sendJson(req,res,{status:true,message:"successfully updated"})
				}else{
					var tempAddress = db.executeSql.future(null,"insert into address (name, city, state, country, phone_no, email, geo_long, geo_lat, sort_order, status, inserted_on, inserted_by, ip) values ('"+address.name+"', '"+address.city+"', '"+address.state+"', '"+address.country+"', '"+address.phone_no+"', '"+address.email+"', '"+address.geo_long+"', '"+address.geo_lat+"', '"+address.sort_order+"', '"+address.status+"', now(), '"+address.inserted_by+"', '"+address.ip+"')");
					httpMsg.sendJson(req,res,{status:true,message:"successfully inserted"});
				}
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.delete('/address/:id',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				if(id==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempAddress = db.executeSql.future(null,"update address set status=-1, updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully deleted"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
	app.get('/address/:id/status/:status',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
			try{
				var  id = commonFun.isset(req.params.id)?req.params.id:'';
				var  status = commonFun.isset(req.params.status)?req.params.status:'';
				if(id=='' || status==''){
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var tempAddress = db.executeSql.future(null,"update address set status='"+status+"', updated_on=now() where id='"+id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"successfully status changed"})
				
			} catch(e){
				console.log(e);
				httpMsg.show500(req,res,e,"JSON");
			}
		})
	})
}    

var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var db = require("./../../core/db");
var crypto = require('crypto');
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function (app){
	app.get('/logout',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
		    try {
		    	var tokens = req.userData.token.split(',');
		    	var updateTokens = tokens.filter(function(item){
							    		return item!=req.userData.token_id;
							    	});
		    	updateTokens = updateTokens.join(',');
		    	var tempUser = db.executeSql.future(null,"update user set token='"+updateTokens+"',updated_on=now() where id = '"+req.userData.id+"'");
		    	var tempDelToken = db.executeSql.future(null,"delete from token where id = '"+req.userData.token_id+"'");
		    	req.userData = null;
				httpMsg.sendJson(req,res,{status:true,message:"Successful Logout"});
			}catch (e) {
		       	console.error(e);
				httpMsg.show500(req,res,e,"JSON");
		   	}
		})
	});
	app.get('/profile',authCheck.ensureAuthorized,function(req,res,next){
		httpMsg.sendJson(req,res,{status:true,message:"Successful profile",data:req.userData});
	});
	app.get('/check-token',authCheck.ensureAuthorized,function(req,res,next){
		httpMsg.sendJson(req,res,{status:true,message:"valid token"});
	});

	app.post('/profile',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
		    try {
				var newData ={};
					newData.email = commonFun.isset(req.body.email)?req.body.email:req.userData.email;
					newData.name = commonFun.isset(req.body.name)?req.body.name:req.userData.name;
					newData.address = commonFun.isset(req.body.address)?req.body.address:req.userData.address;
					newData.phone = commonFun.isset(req.body.phone)?req.body.phone:req.userData.phone;
					newData.image = commonFun.isset(req.body.image)?req.body.image:req.userData.image;
				var tempUser = db.executeSql.future(null,"update user set name = '"+newData.name+"', email = '"+newData.email+"', address = '"+newData.address+"' ,phone = '"+newData.phone+"', image = '"+newData.image+"' where id ='"+req.userData.id+"'");
				httpMsg.sendJson(req,res,{status:true,message:"Successful Update"});
			}catch (e) {
		       	console.error(e);
				httpMsg.show500(req,res,e,"JSON");
		   	}
		});
	});

	app.post('/change-password',authCheck.ensureAuthorized,function(req,res,next){
		Sync(function(){
		    try {

				var curPass = commonFun.isset(req.body.password)?req.body.password:'';
				var newPass = commonFun.isset(req.body.new_password)?req.body.new_password:'';
				if(curPass == '' || newPass == '')
				{
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var curPassword = crypto.createHash('md5').update(req.body.curPass).digest('hex');
				var newPassword = crypto.createHash('md5').update(req.body.newPass).digest('hex');
				console.log(req.userData);
				if(curPass==req.userData.password)
				{
					var tempNewPass = db.executeSql.future(null,"update user set password = '"+newPass+"' where id ='"+req.userData.id+"'");
					httpMsg.sendJson(req,res,{status:true,message:"Successfully changed password"});
				}
				else
				{
					httpMsg.sendJson(req,res,{status:false,message:"The current password is incorrect"});
				}

			}catch (e) {
		       	console.error(e);
				httpMsg.show500(req,res,e,"JSON");
		   	}
		});
	});
}
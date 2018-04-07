var commonFun = require("./../../core/commonFun");
var httpMsg = require("./../../core/httpMsg");
var db = require("./../../core/db");
var crypto = require('crypto');
var randomstring = require("randomstring");
var Sync = require('sync');
var Future = Sync.Future;
module.exports = function (app){

	app.post('/auth/login',function(req,res,next){
		Sync(function(){
		    try {
				console.log(req.body);
				var email = commonFun.isset(req.body.email)? req.body.email : '';
				var password = commonFun.isset(req.body.password)? req.body.password : '';
				if(email=='' || password=='')
				{
					return httpMsg.show400(req,res,"Parameter is missing","JSON");
				}
				var pwd = crypto.createHash('md5').update(password).digest('hex');
			    var tempLogin = db.executeSql.future(null,"select id,name, email, password,image, token from user where email = '"+email+"'");
		    	if(tempLogin.result.length>0){
		    		if(tempLogin.result[0].password == pwd)
		    		{
		    			var data ={
		    				status:true,
		    				message:"Successful Login",
		    				data:{
		    					name:tempLogin.result[0].name,
		    					image:tempLogin.result[0].image,
		    					email:tempLogin.result[0].email,
		    					id:tempLogin.result[0].id
		    				},
		    				token:crypto.createHash('md5').update(randomstring.generate(3)+email).digest('hex')
		    			};
		    			var tempToken = db.executeSql.future(null,"insert into token (`user_id`,`token`,`browser`,`inserted_on`,`ip`) values('"+tempLogin.result[0].id+"','"+data.token+"','"+req.headers["user-agent"]+"',now(),'"+commonFun.getIp(req)+"')");
		    			var tokenId='';
		    			console.log(tempToken.result.insertId);
		    			if(commonFun.isset(tempLogin.result[0].token)){
		    				tokenId=tempLogin.result[0].token+','+tempToken.result.insertId;
		    			} else {
		    				tokenId = tempToken.result.insertId;
		    			}
		    			var tempUser = db.executeSql.future(null,"update user set token='"+tokenId+"' where id = '"+tempLogin.result[0].id+"'");
		    			console.log(req.session);
		    			httpMsg.sendJson(req,res,data);
		    		}
		    		else
		    		{
		    			httpMsg.sendJson(req,res,{status:false,message:"Password is incorrect"});
		    		}
		    	} else {
		    		httpMsg.sendJson(req,res,{status:false,message:"Email is not registered"});
		    	}
		    	

			}catch (e) {
		       	console.error(e);
				httpMsg.show500(req,res,e,"JSON");
		   	}
		})
	});


	app.get('/auth/checktoken',function(req,res,next){
		console.log(req.session);
		// res.send(req.session)
		httpMsg.sendJson(req,res,req.headers);
	})

}

var Config = require('../../../config');
var HttpMsg  = require('../../../core/httpMsg'); 
var CommonFun  = require('../../../core/commonFun');
var DB  = require('../../../core/db'); 
var Main  = require('../../main/global'); 
var Sync = require('sync'),
    Future = Sync.Future;    


exports.ContactController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
        	var TempMain = Main.globalControl.future(null);
        	result=TempMain.result;
			result.title = 'Service | '+result.store.name;
    		res.render("contact-us/views/contact.html", result);
        } catch(err){
        	HttpMsg.show500(req,res,err,"HTML");
        }
    })
    
};

exports.EnquiryController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
            // console.log(req.body)
			var enquery={
				"name": CommonFun.sqlstring(CommonFun.isset(req.body.name)?req.body.name:''),
			    "email": CommonFun.sqlstring(CommonFun.isset(req.body.email)?req.body.email:''),
			    "phone": CommonFun.sqlstring(CommonFun.isset(req.body.phone)?req.body.phone:''),
			    "message": CommonFun.sqlstring(CommonFun.isset(req.body.message)?req.body.message:''),
			    "enq_for": CommonFun.sqlstring(CommonFun.isset(req.body.for_e)?req.body.for_e:''),
			    "ip": CommonFun.getIp(req)
			}
			if(enquery.name=='' || enquery.email=='' || enquery.phone=='' || enquery.message==''){
				return httpMsg.show400(req,res,"Parameter is missing","JSON");
			}
			var tempEnquiry = DB.executeSql.future(null,"insert into contact (name, email, phone, message, enq_for, status, inserted_on, ip) values ('"+enquery.name+"', '"+enquery.email+"', '"+enquery.phone+"', '"+enquery.message+"', '"+enquery.enq_for+"', '0', now(), '"+enquery.ip+"')");
			if(tempEnquiry.result){
                HttpMsg.sendJson(req,res,{status:true,message:"<strong>Thank you!</strong> Your message has been successfully sent. We will contact you very soon!"});
            }
        } catch(err){
            console.log("hello : ",err)
        	HttpMsg.show500(req,res,err,"JSON");
        }
    })
    
};

exports.SubScriptController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
            // console.log(req.body)
            var subscript={
                "email": CommonFun.sqlstring(CommonFun.isset(req.body.email)?req.body.email:''),
                "ip": CommonFun.getIp(req)
            }
            if(subscript.email==''){
                return httpMsg.show400(req,res,"Parameter is missing","JSON");
            }
            var tempCheckEmail = DB.executeSql.future(null,"select email from subscribes where email = '"+subscript.email+"'" );
            if(CommonFun.isset(tempCheckEmail.result) && tempCheckEmail.result.length>0){
                return HttpMsg.sendJson(req,res,{status:false, message:'Your email id already subscribe'});
            }
            var tempEnquiry = DB.executeSql.future(null,"insert into subscribes (email, status, inserted_on, ip) values ('"+subscript.email+"', '0', now(), '"+subscript.ip+"')");
            if(tempEnquiry.result){
                HttpMsg.sendJson(req,res,{status:true,message:"<strong>Thank you!</strong> For Subscribing"});
            }
        } catch(err){
            console.log("hello : ",err)
            HttpMsg.show500(req,res,err,"JSON");
        }
    })
    
};


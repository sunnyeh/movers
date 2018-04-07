var httpMsg = require('./../core/httpMsg');
var commonFun = require("./../core/commonFun");
var db = require('./../core/db');
var Sync = require('sync');
var Future = Sync.Future;

module.exports={
    ensureAuthorized: function(req,res, next){
        Sync(function(){
            try {
                console.log("auth token : ",req.headers.authorization);
                var authorization=[];
                if(req.headers.authorization){
                    authorization = req.headers.authorization.split(" ");
                    // console.log(authorization[1]);
                    if(authorization[0] == 'bearer'){
                        var tempToken = db.executeSql.future(null,"select t.id as token_id, u.* from token as t inner join user as u on u.id = t.user_id  where t.token = '"+authorization[1]+"'");
                        if(tempToken.result.length>0){
                            req.userData = tempToken.result[0];
                            var tempUpdateToken = db.executeSql.future(null,"update token set updated_on =now(), browser='"+req.headers["user-agent"]+"', ip='"+commonFun.getIp(req)+"' where id = '"+req.userData.token_id+"'");
                            next();
                        } else {
                            return httpMsg.sendJson(req,res,{status:false, message: "Token is expire, please login again."});
                        }
                    } else {
                        httpMsg.sendJson(req,res,{status:false, message: "Token in wrong format."});
                    }
                } else {
                    httpMsg.sendJson(req,res,{status:false, message: "Token is compulsory."});
                }
            } catch(e){
                console.error(e);
            }
        })
    }

}
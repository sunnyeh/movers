var Config = require('../../../config');
var HttpMsg  = require('../../../core/httpMsg'); 
var CommonFun  = require('../../../core/commonFun'); 
var DB  = require('../../../core/db'); 
var Main  = require('../../main/global'); 
var Sync = require('sync'),
    Future = Sync.Future; 

exports.MoverslistController = function (req, res, next) {
    var result={
        title:"test",
        seo:{
            meta_title:"test meta",
            meta_desc:"test desc"
        }
    }
    Sync(function(){
        try {
        	var TempMain = Main.globalControl.future(null);
        	result=TempMain.result;

            var tempMoverslist = DB.executeSql.future(null,"select name,slug from moverslist");
            result.moverslist = tempMoverslist.result;

        	console.log(result);
    		res.render("moverslists/views/moverslists.html", result);
        } catch(err){
        	HttpMsg.show500(req,res,err,"HTML");
        }
    });
   
};
exports.MoverslistDtlController = function (req, res, next) {
    var result={}
    Sync(function(){
        try {
            var slug = '';
            if(CommonFun.isset(req.params.slug)){
                slug = req.params.slug
            } else {
                return HttpMsg.show404(req,res,"Page not found","HTML");
            }
            var TempMain = Main.globalControl.future(null);
            result=TempMain.result;
            var tempMovers = DB.executeSql.future(null,"select name,slug,company_name,company_desc,company_contact,company_address,company_website,company_email from moverslist where slug='"+slug+"'");
            result.moverslistDtl = tempMovers.result[0];
            result.title = result.moverslistDtl.name+' | '+result.store.name;
            result.seo.meta_title = result.moverslistDtl.meta_title;
            result.seo.meta_desc = result.moverslistDtl.meta_desc;
            console.log("result is ",result)
            res.render("moverslists/views/moverslist.html", result);
        } catch(err){
            console.log("error is ",err)
            HttpMsg.show500(req,res,err,"HTML");
        }
    })
};
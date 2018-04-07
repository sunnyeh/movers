var httpMsg = require('./../../core/httpMsg');
var commonFun = require('./../../core/commonFun');
var config = require('./../../config');
var authCheck = require('./../token-checking');
var Path = require("path");
var fs = require('fs');
var Sync = require('sync'),
    Future = Sync.Future;

module.exports = function(app){
	app.get('/image-manager',authCheck.ensureAuthorized, function(req,res){
        var path = ''
        if(commonFun.isset(req.query.folederPath)){
            path = Path.join(config.mediaFolder,req.query.folederPath);
        } else {
            path = config.mediaFolder;
        }
        console.log("path : ",path);
        var Data = getFiles(path);
        console.log("Data : ",Data);
        httpMsg.sendJson(req,res,{status:true, message:"Display All media file and folder.", data: Data});
    });

    app.post('/image-manager/make-directory',authCheck.ensureAuthorized, function(req,res){
        console.log(req.body)
        var path = (commonFun.isset(req.query.path))? req.query.path:'';
        if(!req.body.name) return httpMsg.sendJson(req,res,{status:false, message:"Directory name not define"});

        ensureExists(Path.join(config.mediaFolder , path,req.body.name),0777, function(err) {
            if (err){
                httpMsg.sendJson(req,res,{status:false, message:err});
            } // handle folder creation error
            else{

                var Data = getFiles(config.mediaFolder);
                httpMsg.sendJson(req,res,{status:true, message:"Create directory successfully.", data: Data});
            } // we're all good
        });
        
    });

    app.post('/image-manager/delete-file-directory',authCheck.ensureAuthorized, function(req,res){
        var deleteFiles=req.body.deleteFiles.split(',');
        console.log("deleteFiles : ",deleteFiles);
        console.log("path : ",req.query.path);
        for(i in deleteFiles){
            // console.log(deleteFiles[i]);
            if(commonFun.isset(deleteFiles[i])){
                if(fs.lstatSync(Path.join(config.mediaFolder,deleteFiles[i])).isDirectory()) { 
                    deleteFolderRecursive(Path.join(config.mediaFolder,deleteFiles[i]));
                } else {
                    fs.unlinkSync(Path.join(config.mediaFolder,deleteFiles[i]));
                }
            }
        }
        // console.log(deleteFiles);
        var Data = getFiles(config.mediaFolder);
        httpMsg.sendJson(req,res,{status:true, message:"deleted file and directory successfully.", data: Data});
        
    });


    app.post('/image-manager/upload-image',authCheck.ensureAuthorized, function(req,res){
        console.log("path:",req.query.path);
        var file = req.files.file;

        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
        var destPath = Path.join(config.mediaFolder,req.query.path, file.originalFilename);
        // Server side file type checker.
        console.log("destPath : ",destPath)
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
            req.files = {};
            fs.unlink(tmpPath);
            httpMsg.sendJson(req, res, { success:false, message:"image extension not allowed, please choose a jpeg or png file" });
        }
        else{
            fs.rename(tmpPath, destPath, function(err) {
                if (err) {
                    httpMsg.sendJson(req, res, { success:false, message:"Failed to Uploaded Image : "+err });
                }
                else{
                    var Data = getFiles(config.mediaFolder);
                    httpMsg.sendJson(req,res,{status:true, message:"Image upload successfully.", data: Data});
                }
            });
        }
        
    });

}

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    console.log("file : ",files)
    for (var i in files){
        var name = Path.join(dir , files[i]);
        name=name.replace(/\\/g,'/');
        console.log("name : ",name)
        var imageName= name.split('/media/');
        // var imageName= name.split("\\media\\");
        console.log("imageName : ",imageName)
        if (fs.statSync(name).isDirectory()){
            files_.push({name:imageName[1], directory: true});
            files_[files_.length-1].images = []
            getFiles(name,files_[files_.length-1].images);
        } else {
            files_.push({url:imageName[1], directory: false});
        }
    }
    console.log("arrange data",files_) ;
    return files_;
}

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST') cb(err); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
}

var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = Path.join(path , file);
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    } 
};
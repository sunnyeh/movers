var Main  = require('../clients/main/global'); 
exports.show500N404 = function(req,res,err,type){
	var result = {
		title : (err.status === 404)? "Page not found" : "Internal server error", 
      	hStatus : err.status || 500,
      	error: (err.status === 404)? "Oops, This Page Could Not Be Found!" : "Oops, There is server error",
      	message: err.message,
      	
	};
	console.log("show500N404 err : ", err, result)
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
			
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
}

exports.show404 = function(req,res,err,type){
	var result = {
		title : "Page not found", 
      	hStatus : 404,
      	error: "Oops, This Page Could Not Be Found!",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
}

exports.show400 = function(req,res,err,type){
	var result = {
		title : "Bad reques", 
      	hStatus : 400,
      	error: "Bad request. Invalid input parameters",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
}

exports.show401 = function(req,res,err,type){
	var result = {
		title : "Unauthorized", 
      	hStatus : 401,
      	error: "Unauthorized. API Token invalid or expired",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
}

exports.show403 = function(req,res,err,type){
	var result = {
		title : "Tampered URL", 
      	hStatus : 403,
      	error: "Forbidden. Tampered URL",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
}

exports.show410 = function(req,res,err,type){
	var result = {
		title : "URL expired", 
      	hStatus : 410,
      	error: "URL expired",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
}

exports.show500 = function(req, res, err,type){
	var result = {
		title : "Internal server error", 
      	hStatus : 500,
      	error: "Oops, There is server error",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
};

exports.show503 = function(req, res, err,type){
	var result = {
		title : "Service unavailable", 
      	hStatus : 503,
      	error: "Oops, There is server unavailable",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
};

exports.show599 = function(req, res, err,type){
	var result = {
		title : "Connection timed out", 
      	hStatus : 599,
      	error: "Connection timed out",
      	message: err,
	};
	if(type === "HTML"){
		Main.globalControl(function(err,Data){
			Data.title = result.title;
			Data.hStatus = result.hStatus;
			Data.error = result.error;
			Data.message = result.message;
			Data.seo={
	      		meta_title:result.title,
	            meta_desc:result.error
	      	}
			res.writeHead(result.hStatus, result.title, { "content-type": "text/html" });
			res.render("error/error.html", Data);
		});
	} else {
		res.writeHead(result.hStatus, result.title, { "content-type": "application/json" });
		res.write(JSON.stringify(result));
		res.end();
	}
};

exports.sendJson = function(req, res, data){
	data.hStatus=200;
	res.writeHead(200, { "content-type": "application/json" });
	if(data){
		res.write(JSON.stringify(data));
	}
	res.end();
};
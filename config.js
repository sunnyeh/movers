var path = require("path");
module.exports={
	PORT:3007,
	mysqldb_config:{
		host:'localhost',
		user:'root',
		password:'root',
		database:'movers_db'
	},
	// mysqldb_config:{
	// 	host:'localhost',
	// 	user:'root',
	// 	password:'DB@root123#',
	// 	database:'movers_db'
	// },
	mediaFolder:path.join(__dirname,'public/media')
}
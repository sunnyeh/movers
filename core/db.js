var mysql = require("mysql");
var config = require("./../config");

exports.executeSql = function (sql, callback) {
  // console.log(config.mysqldb_config)
  var conn = new mysql.createConnection(config.mysqldb_config);
  conn.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        conn.end();
        callback(err,null);
      } else {
      console.log('Connection established');
      conn.query(sql,function(err,recordset){
          conn.end();
          if(err)
          {
            console.log("query err: " + err);
            callback(err,null);
          } else {
            console.log('Data received from Db:\n');
            // if(JSON.stringify(recordset)!='[]'){
              callback(null,recordset);
            // }
            // else
            // {
            //   callback(null,null);
            // }
          }
          
      });
      }
      
  });
};
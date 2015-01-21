var fs = require('fs');
var csv2sql = require('./csv2sql-stream');
var outstream = process.stdout;

csv2sql.transform("DOGS",fs.createReadStream('./dogs.csv'))
.on('data',function(sql){
	console.log(sql);
})
.on('end',function(rows){
	console.log(rows);
})
.on('error', function(error){
	console.error(error);
})
var csv = require('csv');
var squel = require('squel');


module.exports.transform = function(tableName, instream){

	var delimiter = ','
	var header;

	return csv()
	.from.stream(instream, { delimiter: delimiter, escape: '"' })
	.transform( function(row){
	  
	    if (!header) { //first row assumed to be header
		    header=row;
		    return null;
		}

		//all other rows
	  	row.unshift(row.pop());

		var sqlInsert = squel.insert().into(tableName);
		for (var i = 0; i < row.length; i++){
			if (row[i] == undefined) row[i] = "";
			sqlInsert.set(header[i], esc(row[i]));
		}

	    return sqlInsert.toString() + ";";
	})
}

function esc(str){
	if (str.length == 0) return null;
	str = str.replace(/'/g, "''");
	return str;
}
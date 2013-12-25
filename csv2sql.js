var fs = require('fs');
var csv = require('csv');
var squel = require('squel');


if (process.argv.length < 4){
	console.log("Usage: node csv2sql.js [input file] [table name] (delimiter: tab, comma)")
	return;
}


//init input variables
var fileName = process.argv[2];
var outputFile = fileName.substring(0,
						Math.max(fileName.lastIndexOf("."),
							fileName.length)) + ".sql";
var tableName = process.argv[3];
var delimiter = ',';
var header;
var columns = [];


if (process.argv[4] != undefined){
	if (process.argv[4] == 'tab'){
		delimiter = '\t';
	}
	else if (process.argv[4] == 'comma'){
		delimiter = ',';
	}
	else{
		delimiter = process.argv[4];
	}
}

var count = 0;
csv()
.from.path(fileName, { delimiter: delimiter, escape: '"' })
.to.stream(fs.createWriteStream(outputFile))
.transform( function(row){
  
    if (!header) { //first row assumed to be header
	    header=row;
	    return null;
	}

	//all other rows
  	row.unshift(row.pop());

	var insert = squel.insert().into(tableName);
	for (var i = 0; i < row.length; i++){
		if (row[i] == undefined) row[i] = "";
		insert.set(header[i], esc(row[i]));
	}

    insert = insert.toString();

    return insert + ";\n";
})
.on('data', function(){
  count++;
})
.on('end', function(count){
  console.log('wrote ' + count + ' lines to ' + outputFile);
})
.on('error', function(error){
  console.log("error in line #" + count + ": " + error.message);
});

function esc(str){
	if (str.length == 0) return null;
	str = str.replace(/'/g, "''");
	return str;
}
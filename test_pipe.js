var fs = require('fs');
var csv2sql = require('./csv2sql');
var outstream = process.stdout;

csv2sql.transform("DOGS",fs.createReadStream('./dogs.csv')).pipe(process.stdout);
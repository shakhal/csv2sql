var fs = require('fs');
var csv2sql = require('./csv2sql');
var outstream = process.stdout;

csv2sql.read("DOGS",fs.createReadStream('./test.csv')).pipe(process.stdout);
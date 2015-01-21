csv2sql - Stream Transformer
=======

csv2sql is a Stream Transformer that lets you
transform a Stream of CSV data
to an SQL Writable Stream

Installation
------------
npm install csv2sql

Methods
-------
### transform(tablename, readstream)
  
#### Using pipe
```javascript
var csv2sql = require('csv2sql');
csv2sql.transform("DOGS", fs.createReadStream('./test.csv')).pipe(process.stdout);
```
#### outputs:
```sql
INSERT INTO DOGS (id, name, breed) VALUES ('Akita', '1', 'Bailey');
INSERT INTO DOGS (id, name, breed) VALUES ('Dalmatian', '2', 'Max');
INSERT INTO DOGS (id, name, breed) VALUES ('Great Dane', '3', 'Charlie');
INSERT INTO DOGS (id, name, breed) VALUES ('Maltese', '4', 'Lucy');
```

#### Using pipe
```javascript
var csv2sql = require('csv2sql');
csv2sql.transform("DOGS", fs.createReadStream('./dogs.csv')).pipe(process.stdout);
```

#### Using events
```javascript
var csv2sql = require('csv2sql');
csv2sql.transform("DOGS",fs.createReadStream('./dogs.csv'))
.on('data',function(sql){
	console.log(sql); //INSERT INTO DOGS ...
})
.on('end',function(rows){
	console.log(rows); // Num of rows handled, including header
})
.on('error', function(error){
	console.error(error); //Handle error
})
```

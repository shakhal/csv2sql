csv2sql-stream - Stream Transformer
=======

csv2sql-stream is a Stream Transformer that lets you
transform a Stream of CSV data
to an SQL Writable Stream

Installation
------------
npm install csv2sql-stream

Methods
-------
### transform(tablename, readstream)
  
#### Using pipe
```javascript
var csv2sql = require('csv2sql-stream');
csv2sql.transform("DOGS", fs.createReadStream('./dogs.csv')).pipe(process.stdout);
```
#### outputs:
```sql
INSERT INTO DOGS (id, name, breed) VALUES ('1', 'Bailey', 'Akita');
INSERT INTO DOGS (id, name, breed) VALUES ('2', 'Max', 'Dalmatian');
INSERT INTO DOGS (id, name, breed) VALUES ('3', 'Charlie', 'Great Dane');
INSERT INTO DOGS (id, name, breed) VALUES ('4', 'Lucy', 'Maltese');
```

#### Using events
```javascript
var csv2sql = require('csv2sql');
csv2sql.transform("DOGS",fs.createReadStream('./dogs.csv'))
.on('data',function(sql){
	console.log(sql); //INSERT INTO DOGS ...
})
.on('end',function(rows){
	console.log(rows); // 5 - Num of rows handled, including header
})
.on('error', function(error){
	console.error(error); //Handle error
})
```

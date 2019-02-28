var fs = require('fs');
var createInterface = require('readline').createInterface;
var createReadStream = fs.createReadStream;
var EOL = require('os').EOL;
var _ = require('lodash')

var files = [
  '',
  '',
  '',
  ''
];

var filename = 'in/' + files[0] + '.in'
var lineReader = createInterface({input: createReadStream(filename)});

var count = 0;
var desc = [];

_ints = (line) => line.split(' ').map( i => parseInt(i) );
zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))



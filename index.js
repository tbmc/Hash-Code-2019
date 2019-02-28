

var fs = require('fs');
var createInterface = require('readline').createInterface;
var createReadStream = fs.createReadStream;
var EOL = require('os').EOL;
var _ = require('lodash');

var parse = require('./parsor') 


var files = [
  'a_example',
  'b_lovely_landscapes',
  'c_memorable_moments',
  'd_pet_pictures',
  'e_shiny_selfies'
];

/*
[
{
  id: ,
  layout: '',
  tags: [ '', '' ]
}
]
*/



var filename = 'in/' + files[1] + '.txt'
// var lineReader = createInterface({input: createReadStream(filename)});
var photos = parse( filename )
/*
[
{
  id: 1,
  layout: 'H',
  tags: ['toto', 'titi']
}]
*/


var count = 0;
var desc = [];

_ints = (line) => line.split(' ').map( i => parseInt(i) );
zip = (...rows) => [...rows[0]].map((_,c) => rows.map(row => row[c]))


var solution = []


var allTags = {};

var available = {};
_.forEach(photos, function(photo, key) {
  available[photo.id] = photo
});


var findCandidate = (tag) => {
  console.log( tag )
  var i = _.findIndex( available, photo => _.findIndex(photo.tags, tag) >= 0 )
  return available[i]
}

function computeTagsOccurs() {
  _.forEach(photos, function(photo, key) {
    _.forEach( photo.tags, k => {
      if ( !allTags[k] ) allTags[k] = 0;
      allTags[k] += 1;
    });
  });
}

/*
_.forEach(allTags, function(tag, key) {
  console.log( key + " = " + tag )
});
*/

var solution = []

var current = _.drop( available )
solution.push( [ current.id ] )
delete( available[current.id] )


var next = findCandidate( current )
console.log ( next )


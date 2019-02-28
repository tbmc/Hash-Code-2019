const _ = require('lodash');
const {open} = require("./open");
const fs = require("fs");

// d_pet_pictures
// e_shiny_selfies

const currentFile = "e_shiny_selfies";

const openedData = open(`./inputs/${currentFile}.txt`);
const array = openedData.map((e, index) => {
    const args = e.split(" ");
    var type = args.shift();
    args.shift();
    var tags = args;
    return {
        index,
        tags,
        type  
    };
});

function joinByTwo(arrayToJoin)
{
    let result = [];
    for(var i = 0; i < arrayToJoin.length; i+=2)
    {
        result.push(`${arrayToJoin[i]} ${arrayToJoin[i+1]}`);
    }
    return result;
}

const horizontals = array.filter((e, index) => e.type == "H");
const verticals = array.filter((e, index) => e.type == "V");

const verticalsIndexes = verticals.map(e => e.index - 1);
const horizontalsIndexes = horizontals.map(e => e.index - 1);

const verticalsShuffledGrouped = joinByTwo(_.shuffle(verticalsIndexes));
const bigSol = [...verticalsShuffledGrouped, ...horizontalsIndexes];

let result = (bigSol.length) + "\n";
result += _.shuffle(bigSol).join("\n");

fs.writeFileSync(`./outputs/${currentFile[0]}.txt`, result, 'utf8', null);

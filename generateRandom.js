const _ = require("lodash");
const { open } = require("./open");
const fs = require("fs");
const parsor = require("./parsor");
const validator = require("./validator");
const { fork } = require("child_process");

const input = parsor("./in/e_shiny_selfies.txt");

// d_pet_pictures
// e_shiny_selfies

function generateBase() {
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

    function joinByTwo(arrayToJoin) {
        let result = [];
        for (var i = 0; i < arrayToJoin.length; i += 2) {
            result.push(`${arrayToJoin[i]} ${arrayToJoin[i + 1]}`);
        }
        return result;
    }

    const horizontals = array.filter((e, index) => e.type == "H");
    const verticals = array.filter((e, index) => e.type == "V");

    const verticalsIndexes = verticals.map(e => e.index - 1);
    const horizontalsIndexes = horizontals.map(e => e.index - 1);

    const verticalsShuffledGrouped = joinByTwo(_.shuffle(verticalsIndexes));
    const bigSol = [...verticalsShuffledGrouped, ...horizontalsIndexes];
    return bigSol;
}

function parseOutput(data) {
    return data.map(line => {
        return line.split(" ").map(l => parseInt(l));
    });
}

function testCompute(bigSol) {
    const shuffle = _.shuffle(bigSol);
    shuffle.unshift([bigSol.length]);
    // debugger;
    const score = validator(input, shuffle);
    return [score, shuffle];
}

function compute(bigSol) {
    const parsed = parseOutput(bigSol);
    testCompute(parsed);
}

module.exports = compute;

compute(generateBase());

const _ = require("lodash");
const { open } = require("./open");
const fs = require("fs");
const parsor = require("./parsor");
const validator = require("./validator");
const { fork } = require("child_process");

const fileToUse = "d_pet_pictures";

const input = parsor("./in/" + fileToUse + ".txt");

// d_pet_pictures
// e_shiny_selfies

function joinByTwo(arrayToJoin) {
    let result = [];
    for (var i = 0; i < arrayToJoin.length; i += 2) {
        result.push(`${arrayToJoin[i]} ${arrayToJoin[i + 1]}`);
    }
    return result;
}

function generateBase() {
    const currentFile = fileToUse;

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

    const horizontals = array.filter((e, index) => e.type == "H");
    const verticals = array.filter((e, index) => e.type == "V");

    const verticalsIndexes = verticals.map(e => e.index - 1);
    const horizontalsIndexes = horizontals.map(e => e.index - 1);

    return [verticalsIndexes, horizontalsIndexes];
}

function shuffleFnAndScore(verticalsIndexes, horizontalsIndexes) {
    const verticalsShuffledGrouped = joinByTwo(_.shuffle(verticalsIndexes));
    let bigSol = [...verticalsShuffledGrouped, ...horizontalsIndexes];
    // bigSol = _.shuffle(bigSol);
    bigSol.unshift([bigSol.length]);
    const parsed = parseOutput(bigSol);
    const score = validator(input, parsed);
    return [score, bigSol];
}

function parseOutput(data) {
    return data.map(line => {
        if (typeof line !== "string") return line;
        return line.split(" ").map(l => parseInt(l));
    });
}

function compute(v, h, saveFile = "submit") {
    let score = 0,
        shuffle = [];

    for (let i = 0; i < 100; i++) {
        const [s, str] = shuffleFnAndScore(v, h);
        if (s > score) {
            shuffle = str;
            score = s;
        }
    }

    const file = `./${fileToUse}_${saveFile}.${score}.txt`;
    fs.writeFileSync(file, shuffle.join("\n"));
}

module.exports = compute;

const [v, h] = generateBase();
compute(v, h);

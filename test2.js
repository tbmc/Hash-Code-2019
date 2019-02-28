const validate = require("./validator");
const parsor = require("./parsor");
const { open } = require("./open");

const input = parsor("./in/e_shiny_selfies.txt");

function parseOutput() {
    const data = open("./outputs/e.txt");
    return data.map(line => {
        return line.split(" ").map(l => parseInt(l));
    });
}

let submission = parseOutput();

// console.log(input);

const score = validate(input, submission);
console.log(score, 112279, score === 112279);

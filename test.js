const validate = require("./validator");
const parsor = require("./parsor");

const input = parsor("./in/a_example.txt");
const submission = [[3], [1, 2], [3], [0]];

console.log(input);

const score = validate(input, submission);
console.log(score);

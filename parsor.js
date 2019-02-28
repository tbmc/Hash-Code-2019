const { open } = require("./open");

function createFromLine(line) {
    const lineSplit = line.split(" ").filter(e => e.length !== 0);
    const tags = lineSplit.slice(2);
    return {
        tags,
        id: lineSplit[1],
        layout: lineSplit[0]
    };
}

function parse(inputFile) {
    const data = open(inputFile);
    const usefullData = data.slice(1);

    return usefullData.map(createFromLine);
}

module.exports = parse;

// const data = parse("in/a_example.txt");
// debugger;

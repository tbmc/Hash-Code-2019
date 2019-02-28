const fs = require("fs");

function open(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    const tab = data.replace(/\r/g, "").split("\n");
    return tab.filter(e => e.length !== 0);
}

module.exports = {
    open
};

const data = open(".gitignore");
debugger;

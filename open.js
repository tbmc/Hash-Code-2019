const fs = require("fs");

function open(filePath) {
    const data = fs.readFileSync(filePath, "utf-8");
    return data.replace(/\r/g, "").split("\n");
}

module.exports = {
    open
};

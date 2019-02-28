// [[]];

function generateMap(inputData) {
    const map = new Map();
    for (const photo of inputData) {
        const { id } = photo;
        map.set(id, photo);
    }
    return map;
}

function minimum(...args) {
    let min = 245327532;
    args.forEach(n => {
        if (n < min) {
            min = n;
        }
    });
    return min;
}

function parseLine(map, line) {
    for (let l in line) {
        if (typeof l === "string") {
            l = parseInt(l);
        }
        const image = map.get(l);
        if (image === undefined) {
            debugger;
            throw `Image ${l} doesn't exist`;
        }
    }
    let set = new Set();
    if (line.length > 1) {
        let [aa, bb] = line;
        let a = map.get(aa);
        let b = map.get(bb);
        if (!a || !b) {
            debugger;
        }
        if (a.layout !== "V" || b.layout !== "V") {
            debugger;
            throw `double image not vertical ${aa} ${bb}`;
        }
        a.tags.forEach(t => set.add(t));
        b.tags.forEach(t => set.add(t));
    } else {
        let a = map.get(line[0]);
        if (!a) {
            debugger;
        }
        a.tags.forEach(t => set.add(t));
    }
    return set;
}

function computeScoreBetweenLines(map, line1, line2) {
    let set1 = parseLine(map, line1);
    let set2 = parseLine(map, line2);

    let commons = 0,
        set1Has = 0,
        set2Has = 0;
    set1.forEach(t => {
        if (set2.has(t)) {
            commons++;
        } else {
            set1Has++;
        }
    });
    set2.forEach(t => {
        if (!set1.has(t)) {
            set2Has++;
        }
    });
    return minimum(commons, set1Has, set2Has);
}

function validate(inputData, submittedData) {
    const map = generateMap(inputData);

    const first = submittedData[0][0];
    if (first !== submittedData.length - 1) {
        debugger;
        throw "Erreur";
    }
    const data = submittedData.slice(1);
    let score = 0;
    let previous = null;
    for (const image of data) {
        if (previous === null) {
            previous = image;
            continue;
        }
        score += computeScoreBetweenLines(map, previous, image);
        previous = image;
    }
    return score;
}

module.exports = validate;

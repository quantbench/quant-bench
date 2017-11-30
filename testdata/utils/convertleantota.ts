import * as fs from "fs";
import * as readline from "readline";

let data = {
    "open": new Array<number>(),
    "high": new Array<number>(),
    "low": new Array<number>(),
    "close": new Array<number>(),
    "volume": new Array<number>(),
};

let lineReader = readline.createInterface({
    "input": fs.createReadStream("./test/sourcedata/cvx.csv"),
});

lineReader.on("line", (line: string) => {
    let parts = line.split(",");
    data.open.push(parseFloat(parts[1]) / 10000.0);
    data.high.push(parseFloat(parts[2]) / 10000.0);
    data.low.push(parseFloat(parts[3]) / 10000.0);
    data.close.push(parseFloat(parts[4]) / 10000.0);
    data.volume.push(parseFloat(parts[5]));
});

lineReader.on("close", () => {
    let stringData = JSON.stringify(data);
    fs.writeFile("./test/sourcedata/sourcedata2.json", stringData, "utf8", () => {
        console.log("done");
    });
});

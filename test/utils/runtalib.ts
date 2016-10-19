let yaml = require("yamljs");
let talib = require("talib");
import * as fs from "fs";

// Load market data
let marketContents = fs.readFileSync("./test/sourcedata/xom.json", "utf8");
let marketData = JSON.parse(marketContents);

let config = yaml.load("./test/genconfig.yml");

console.log("TALib Version: " + talib.version);

config.forEach((item: any) => {
    let parameters: any = {
        "endIdx": marketData.close.length - 1,
        "inReal": marketData.close,
        "startIdx": 0,
    };
    Object.keys(item).forEach((key: any) => {
        parameters[key] = item[key];
    });

    // execute SMA indicator function with time period 180
    talib.execute(parameters, (result: any) => {

        // write the results to a file
        console.log(result);

    });
});

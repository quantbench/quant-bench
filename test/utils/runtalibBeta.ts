let talib = require("talib");
import * as fs from "fs";

// Load market data
let marketContents = fs.readFileSync("./test/sourcedata/sourcedata.json", "utf8");
let marketContents2 = fs.readFileSync("./test/sourcedata/sourcedata2.json", "utf8");
let marketData = JSON.parse(marketContents);
let marketData2 = JSON.parse(marketContents2);

// execute the indicator function

try {
    talib.execute({
        "name": "BETA",
        "startIdx": 0,
        "endIdx": marketData.close.length - 1,
        "inReal0": marketData.close,
        "inReal1": marketData2.close,
        "optInTimePeriod": 5,
    }, (result: any) => {

        // write the results to a file
        let resultString = JSON.stringify(result);

        fs.writeFile("./test/talib-results/beta.json", resultString, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Done... " );
            process.exit(0);
        });
    });
} catch (error) {
    console.log("EXCEPTION");
    console.log(error);
}

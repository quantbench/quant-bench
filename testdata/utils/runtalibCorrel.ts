const talib = require("talib");
import * as fs from "fs";

// Load market data
const marketContents = fs.readFileSync("./test/sourcedata/sourcedata.json", "utf8");
const marketContents2 = fs.readFileSync("./testdata/sourcedata/sourcedata2.json", "utf8");
const marketData = JSON.parse(marketContents);
const marketData2 = JSON.parse(marketContents2);

// execute the indicator function

try {
    talib.execute({
        "name": "CORREL",
        "startIdx": 0,
        "endIdx": marketData.close.length - 1,
        "inReal0": marketData.close,
        "inReal1": marketData2.close,
        "optInTimePeriod": 30,
    }, (result: any) => {

        // write the results to a file
        const resultString = JSON.stringify(result);

        fs.writeFile("./testdata/talib-results/correl.json", resultString, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Done... ");
            process.exit(0);
        });
    });
} catch (error) {
    console.log("EXCEPTION");
    console.log(error);
}

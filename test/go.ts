import * as chai from "chai";
import * as path from "path";
import * as indicators from "../src/indicators/";
let jsonfile = require("jsonfile");

chai.should();

let sourceFile: string;
let taResultFile: string;
let sourceData: any;
let taResultData: any;
let indicator: indicators.LINEARREG;
let indicatorResults: number[];
let indicatorOnDataRasied: boolean = false;
let timePeriod = 14;

sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
taResultFile = path.resolve("./test/talib-results/linearreg.json");
sourceData = jsonfile.readFileSync(sourceFile);
taResultData = jsonfile.readFileSync(taResultFile);
indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);

indicator = new indicators.LINEARREG(timePeriod);
let idx = 0;
indicatorOnDataRasied = false;
indicator.on("data", () => {
    indicatorOnDataRasied = true;
});

for (let index = 0; index <= indicator.lookback; index++) {
    if (indicator.receiveData(sourceData.close[index])) {
        indicatorResults[idx] = indicator.currentValue;
        idx++;
    }
}

indicator.isReady.should.equal(true);

indicatorOnDataRasied.should.equal(true);

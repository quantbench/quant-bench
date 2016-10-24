import * as stddevIndicator from "../src/indicators/statisticfunctions/stddev";
import * as chai from "chai";
import * as path from "path";
let jsonfile = require("jsonfile");

chai.should();

let sourceFile: string;
let taResultFile: string;
let sourceData: any;
let taResultData: any;
let indicator: stddevIndicator.STDDEV;
let indicatorResults: number[];

sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
taResultFile = path.resolve("./test/talib-results/stddev.json");
sourceData = jsonfile.readFileSync(sourceFile);
taResultData = jsonfile.readFileSync(taResultFile);
indicator = new stddevIndicator.STDDEV(5);
indicatorResults = new Array<number>(sourceData.close.length - indicator.lookback);

let idx = 0;
sourceData.close.forEach((value: number) => {
    if (indicator.receiveData(value)) {
        indicatorResults[idx] = indicator.currentValue;
        idx++;
    }
});

for (let i = 0; i < taResultData.result.outReal.length; i++) {
    taResultData.result.outReal[i].should.be.closeTo(indicatorResults[i], 0.001);
}

taResultData.begIndex.should.equal(indicator.lookback);

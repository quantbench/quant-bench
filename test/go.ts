import * as chai from "chai";
import * as path from "path";
import * as indicators from "../src/indicators/";
let jsonfile = require("jsonfile");

chai.should();

let sourceFile: string;
let taResultFile: string;
let sourceData: any;
let taResultData: any;
let indicator: indicators.CDLDOJI;
let indicatorResults: number[];

sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
taResultFile = path.resolve("./test/talib-results/cdldoji.json");
sourceData = jsonfile.readFileSync(sourceFile);
taResultData = jsonfile.readFileSync(taResultFile);

indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);

indicator = new indicators.CDLDOJI();
let idx = 0;
sourceData.close.forEach((value: number, index: number) => {
    if (indicator.receiveData({
        "high": sourceData.high[index],
        "low": sourceData.low[index],
        "open": sourceData.open[index],
        "close": sourceData.close[index],
    })) {
        indicatorResults[idx] = indicator.currentValue;
        idx++;
    }
});

for (let i = 0; i < taResultData.result.outRealUpperBand.length; i++) {
    isNaN(indicatorResults[i]).should.be.false;
    taResultData.result.outInteger[i].should.be.closeTo(indicatorResults[i], 0.001);
}

import * as adIndicator from "../src/indicators/volumeindicators/ad";
import * as chai from "chai";
import * as path from "path";
let jsonfile = require("jsonfile");

chai.should();

let sourceFile: string;
let taResultFile: string;
let sourceData: any;
let taResultData: any;
let indicator: adIndicator.AD;
let indicatorResults: number[];

sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
taResultFile = path.resolve("./test/talib-results/ad.json");
sourceData = jsonfile.readFileSync(sourceFile);
taResultData = jsonfile.readFileSync(taResultFile);
indicator = new adIndicator.AD();
indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);

let idx = 0;
sourceData.close.forEach((value: number, index: number) => {
    if (indicator.receiveData({
        "high": sourceData.high[index],
        "low": sourceData.low[index],
        "open": sourceData.open[index],
        "close": sourceData.close[index],
        "volume": sourceData.volume[index],
    })) {
        indicatorResults[idx] = indicator.currentValue;
        idx++;
    }
});

for (let i = 0; i < taResultData.result.outReal.length; i++) {
    isNaN(indicatorResults[i]).should.be.false;
    taResultData.result.outReal[i].should.be.closeTo(indicatorResults[i], 0.001);
}

taResultData.begIndex.should.equal(indicator.lookback);

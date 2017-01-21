import * as chai from "chai";
import * as path from "path";
import * as indicators from "../src/indicators/";
import { TestDataFactory } from "../test/testData";
let jsonfile = require("jsonfile");

chai.should();

let sourceFile: string;
let taResultFile: string;
let sourceData: any;
let taResultData: any;
let indicator: indicators.CDLDOJISTAR;
let indicatorResults: number[];
let indicatorOnDataRasied: boolean = false;

sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
taResultFile = path.resolve("./test/talib-results/cdldojistar.json");
sourceData = TestDataFactory.getInstance().sourceData;
taResultData = jsonfile.readFileSync(taResultFile);

indicatorResults = new Array<number>(
    sourceData.close.length - taResultData.begIndex);

indicator = new indicators.CDLDOJISTAR();
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

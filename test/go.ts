import * as chai from "chai";
import * as path from "path";
import * as indicators from "../src/indicators/";
import { TestDataFactory } from "./testData";
let jsonfile = require("jsonfile");

chai.should();

let taResultFile: string;
let sourceData: any;
let taResultData: any;
let indicator: indicators.CDLHANGINGMAN;
let indicatorResults: number[];
let indicatorOnDataRasied: boolean = false;

taResultFile = path.resolve("./test/talib-results/cdlhangingman.json");
sourceData = TestDataFactory.getInstance().sourceData;
taResultData = jsonfile.readFileSync(taResultFile);

indicatorResults = new Array<number>(
    sourceData.close.length - taResultData.begIndex);

indicator = new indicators.CDLHANGINGMAN();
let idx = 0;
sourceData.close.forEach((value: number, index: number) => {

    if (taResultData.result.outInteger[idx] === -100) {
        console.log("g");
    }
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

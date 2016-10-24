import * as indicators from "../../../src/indicators/";
import * as accIndicator from "../../../src/indicators/overlapstudies/accbands";
import * as chai from "chai";
import * as path from "path";
let jsonfile = require("jsonfile");

chai.should();

describe("ACCBANDS Indicator", () => {
    let sourceFile: string;
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: accIndicator.ACCBANDS;
    let indicatorResults: indicators.TradingBand[];

    beforeEach(() => {
        sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
        taResultFile = path.resolve("./test/talib-results/accbands.json");
        sourceData = jsonfile.readFileSync(sourceFile);
        taResultData = jsonfile.readFileSync(taResultFile);
        indicator = new accIndicator.ACCBANDS(20);
        indicatorResults = new Array<indicators.TradingBand>(sourceData.close.length - indicator.lookback);
    });

    describe("when receiving tick data", () => {
        beforeEach(() => {
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
        });

        it("should match the talib upperband results", () => {
            for (let i = 0; i < taResultData.result.outRealUpperBand.length; i++) {
                taResultData.result.outRealUpperBand[i].should.be.closeTo(indicatorResults[i].upperBand, 0.001);
            }
        });

        it("should match the talib middleband results", () => {
            for (let i = 0; i < taResultData.result.outRealMiddleBand.length; i++) {
                taResultData.result.outRealMiddleBand[i].should.be.closeTo(indicatorResults[i].middleBand, 0.001);
            }
        });

        it("should match the talib lowerband results", () => {
            for (let i = 0; i < taResultData.result.outRealLowerBand.length; i++) {
                taResultData.result.outRealLowerBand[i].should.be.closeTo(indicatorResults[i].lowerBand, 0.001);
            }
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });
});

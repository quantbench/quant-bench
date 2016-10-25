import * as indicators from "../../../src/indicators/";
import * as macdIndicator from "../../../src/indicators/momentumindicators/macd";
import * as chai from "chai";
import * as path from "path";
let jsonfile = require("jsonfile");

chai.should();

describe("MACDBANDS Indicator", () => {
    let sourceFile: string;
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: macdIndicator.MACD;
    let indicatorResults: indicators.MACDResult[];

    beforeEach(() => {
        sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
        taResultFile = path.resolve("./test/talib-results/macd.json");
        sourceData = jsonfile.readFileSync(sourceFile);
        taResultData = jsonfile.readFileSync(taResultFile);
        indicator = new macdIndicator.MACD(26, 12, 9);
        indicatorResults = new Array<indicators.MACDResult>(sourceData.close.length - indicator.lookback);
    });

    describe("when receiving tick data", () => {
        beforeEach(() => {
            let idx = 0;
            sourceData.close.forEach((value: number, index: number) => {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = indicator.currentValue;
                    idx++;
                }
            });
        });

        it("should match the talib macd results", () => {
            for (let i = 0; i < taResultData.result.outMACD.length; i++) {
                isNaN(indicatorResults[i].macd).should.be.false;
                taResultData.result.outMACD[i].should.be.closeTo(indicatorResults[i].macd, 0.001);
            }
        });

        it("should match the talib signal results", () => {
            for (let i = 0; i < taResultData.result.outMACDSignal.length; i++) {
                isNaN(indicatorResults[i].signal).should.be.false;
                taResultData.result.outMACDSignal[i].should.be.closeTo(indicatorResults[i].signal, 0.001);
            }
        });

        it("should match the talib histogram results", () => {
            for (let i = 0; i < taResultData.result.outMACDHist.length; i++) {
                isNaN(indicatorResults[i].histogram).should.be.false;
                taResultData.result.outMACDHist[i].should.be.closeTo(indicatorResults[i].histogram, 0.001);
            }
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });
});

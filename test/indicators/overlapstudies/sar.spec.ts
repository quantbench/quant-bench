import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
let jsonfile = require("jsonfile");

chai.should();

describe("SAR Indicator", () => {
    let sourceFile: string;
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.SAR;
    let indicatorResults: number[];
    let indicatorOnDataRasied: boolean = false;
    let accelerationFactor = 0.02;
    let accelerationFactorMax = 0.2;

    beforeEach(() => {
        sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
        taResultFile = path.resolve("./test/talib-results/sar.json");
        sourceData = jsonfile.readFileSync(sourceFile);
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.SAR(accelerationFactor, accelerationFactorMax);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.SAR.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.SAR.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.SAR(accelerationFactor + 1, accelerationFactorMax + 1);
        });

        it("should set the accelerationFactor", () => {
            indicator.accelerationFactor.should.equal(accelerationFactor + 1);
        });

        it("should set the accelerationFactorMax", () => {
            indicator.accelerationFactorMax.should.equal(accelerationFactorMax + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.SAR();
        });

        it("should set the accelerationFactor", () => {
            indicator.accelerationFactor.should.equal(accelerationFactor);
        });

        it("should set the accelerationFactorMax", () => {
            indicator.accelerationFactorMax.should.equal(accelerationFactorMax);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.SAR(accelerationFactor, accelerationFactorMax);
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

        it("should match the talib results", () => {
            for (let i = 0; i < taResultData.result.outReal.length; i++) {
                isNaN(indicatorResults[i]).should.be.false;
                taResultData.result.outReal[i].should.be.closeTo(indicatorResults[i], 0.001);
            }
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when receiving less tick data than the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.SAR(accelerationFactor, accelerationFactorMax);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index < indicator.lookback; index++) {
                if (indicator.receiveData({
                    "high": sourceData.high[index],
                    "low": sourceData.low[index],
                    "open": sourceData.open[index],
                    "close": sourceData.close[index],
                })) {
                    indicatorResults[idx] = indicator.currentValue;
                    idx++;
                }
            }
        });

        it("the indicator should not indicate that it is ready to be consumed", () => {
            indicator.isReady.should.equal(false);
        });

        it("should not have raised the ondata event", () => {
            indicatorOnDataRasied.should.equal(false);
        });
    });

    describe("when receiving tick data equal to the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.SAR(accelerationFactor, accelerationFactorMax);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index <= indicator.lookback; index++) {
                if (indicator.receiveData({
                    "high": sourceData.high[index],
                    "low": sourceData.low[index],
                    "open": sourceData.open[index],
                    "close": sourceData.close[index],
                })) {
                    indicatorResults[idx] = indicator.currentValue;
                    idx++;
                }
            }
        });

        it("the indicator should indicate that it is ready to be consumed", () => {
            indicator.isReady.should.equal(true);
        });

        it("should have raised the ondata event", () => {
            indicatorOnDataRasied.should.equal(true);
        });
    });
});

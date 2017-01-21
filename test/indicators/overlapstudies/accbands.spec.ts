import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
let jsonfile = require("jsonfile");

chai.should();

describe("ACCBANDS Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.ACCBANDS;
    let indicatorResults: Array<{ upperBand: number, middleBand: number, lowerBand: number }>;
    let indicatorOnDataRasied: boolean = false;
    let timePeriod = 20;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/accbands.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);

        indicatorResults = new Array<{ upperBand: number, middleBand: number, lowerBand: number }>(
            sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.ACCBANDS(timePeriod);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.ACCBANDS.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.ACCBANDS.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.ACCBANDS(timePeriod + 1);
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(timePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.ACCBANDS();
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(indicators.ACCBANDS.TIMEPERIOD_DEFAULT);
        });
    });

    describe("when constructing with timePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.ACCBANDS(1);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            let message = indicators.generateMinTimePeriodError(indicator.name, indicators.ACCBANDS.TIMEPERIOD_MIN, 1);
            exception.message.should.equal(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.ACCBANDS(timePeriod);
            let idx = 0;
            sourceData.close.forEach((value: number, index: number) => {
                if (indicator.receiveData({
                    "high": sourceData.high[index],
                    "low": sourceData.low[index],
                    "open": sourceData.open[index],
                    "close": sourceData.close[index],
                })) {
                    indicatorResults[idx] = { "upperBand": 0, "middleBand": 0, "lowerBand": 0 };
                    indicatorResults[idx].upperBand = indicator.upperBand;
                    indicatorResults[idx].middleBand = indicator.middleBand;
                    indicatorResults[idx].lowerBand = indicator.lowerBand;
                    idx++;
                }
            });
        });

        it("should match the talib upperband results", () => {
            for (let i = 0; i < taResultData.result.outRealUpperBand.length; i++) {
                isNaN(indicatorResults[i].upperBand).should.be.false;
                taResultData.result.outRealUpperBand[i].should.be.closeTo(indicatorResults[i].upperBand, 0.001);
            }
        });

        it("should match the talib middleband results", () => {
            for (let i = 0; i < taResultData.result.outRealMiddleBand.length; i++) {
                isNaN(indicatorResults[i].middleBand).should.be.false;
                taResultData.result.outRealMiddleBand[i].should.be.closeTo(indicatorResults[i].middleBand, 0.001);
            }
        });

        it("should match the talib lowerband results", () => {
            for (let i = 0; i < taResultData.result.outRealLowerBand.length; i++) {
                isNaN(indicatorResults[i].lowerBand).should.be.false;
                taResultData.result.outRealLowerBand[i].should.be.closeTo(indicatorResults[i].lowerBand, 0.001);
            }
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when receiving less tick data than the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.ACCBANDS(timePeriod);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index < indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "upperBand": 0, "middleBand": 0, "lowerBand": 0 };
                    indicatorResults[idx].upperBand = indicator.upperBand;
                    indicatorResults[idx].middleBand = indicator.middleBand;
                    indicatorResults[idx].lowerBand = indicator.lowerBand;
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
            indicator = new indicators.ACCBANDS(timePeriod);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index <= indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "upperBand": 0, "middleBand": 0, "lowerBand": 0 };
                    indicatorResults[idx].upperBand = indicator.upperBand;
                    indicatorResults[idx].middleBand = indicator.middleBand;
                    indicatorResults[idx].lowerBand = indicator.lowerBand;
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

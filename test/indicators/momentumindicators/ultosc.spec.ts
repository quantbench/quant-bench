import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
const jsonfile = require("jsonfile");

chai.should();

describe("ULTOSC Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.ULTOSC;
    let indicatorResults: number[];
    let indicatorOnDataRasied: boolean = false;
    const timePeriod1 = 7;
    const timePeriod2 = 14;
    const timePeriod3 = 28;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/ultosc.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.ULTOSC(timePeriod1, timePeriod2, timePeriod3);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.ULTOSC.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.ULTOSC.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.ULTOSC(timePeriod1 + 1, timePeriod2 + 1, timePeriod3 + 1);
        });

        it("should set the timePeriod1", () => {
            indicator.timePeriod1.should.equal(timePeriod1 + 1);
        });

        it("should set the timePeriod2", () => {
            indicator.timePeriod2.should.equal(timePeriod2 + 1);
        });

        it("should set the timePeriod3", () => {
            indicator.timePeriod3.should.equal(timePeriod3 + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.ULTOSC();
        });

        it("should set the timePeriod1", () => {
            indicator.timePeriod1.should.equal(indicators.ULTOSC.TIMEPERIOD1_DEFAULT);
        });

        it("should set the timePeriod2", () => {
            indicator.timePeriod2.should.equal(indicators.ULTOSC.TIMEPERIOD2_DEFAULT);
        });

        it("should set the timePeriod3", () => {
            indicator.timePeriod3.should.equal(indicators.ULTOSC.TIMEPERIOD3_DEFAULT);
        });
    });

    describe("when constructing with timePeriod1 less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.ULTOSC(0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.ULTOSC.TIMEPERIOD1_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when constructing with timePeriod2 less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.ULTOSC(indicators.ULTOSC.TIMEPERIOD1_DEFAULT, 0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.ULTOSC.TIMEPERIOD2_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when constructing with timePeriod3 less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.ULTOSC(indicators.ULTOSC.TIMEPERIOD1_DEFAULT, indicators.ULTOSC.TIMEPERIOD2_DEFAULT, 0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.ULTOSC.TIMEPERIOD3_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.ULTOSC(timePeriod1, timePeriod2, timePeriod3);
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
            indicator = new indicators.ULTOSC(timePeriod1, timePeriod2, timePeriod3);
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
            indicator = new indicators.ULTOSC(timePeriod1, timePeriod2, timePeriod3);
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

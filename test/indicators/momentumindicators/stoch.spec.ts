import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
const jsonfile = require("jsonfile");

chai.should();

describe("STOCH Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.STOCH;
    let indicatorResults: Array<{ slowK: number, slowD: number }>;
    let indicatorOnDataRasied: boolean = false;
    const fastKTimePeriod: number = 5;
    const slowDMAType: indicators.MA_TYPE = indicators.MA_TYPE.SMA;
    const slowDTimePeriod: number = 3;
    const slowKMAType: indicators.MA_TYPE = indicators.MA_TYPE.SMA;
    const slowKTimePeriod: number = 3;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/stoch.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<{ slowK: number, slowD: number }>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.STOCH(fastKTimePeriod, slowKTimePeriod, slowKMAType, slowDTimePeriod, slowDMAType);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.STOCH.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.STOCH.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.STOCH(fastKTimePeriod + 1, slowKTimePeriod + 1,
                indicators.MA_TYPE.EMA, slowDTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the fastKTimePeriod", () => {
            indicator.fastKTimePeriod.should.equal(fastKTimePeriod + 1);
        });

        it("should set the slowKTimePeriod", () => {
            indicator.slowKTimePeriod.should.equal(slowKTimePeriod + 1);
        });

        it("should set the slowKMAType", () => {
            indicator.slowKMAType.should.equal(slowKMAType + 1);
        });

        it("should set the slowDTimePeriod", () => {
            indicator.slowDTimePeriod.should.equal(slowDTimePeriod + 1);
        });

        it("should set the slowDMAType", () => {
            indicator.slowDMAType.should.equal(slowDMAType + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.STOCH();
        });

        it("should set the fastKTimePeriod", () => {
            indicator.fastKTimePeriod.should.equal(indicators.STOCH.FASTKPERIOD_DEFAULT);
        });

        it("should set the slowKTimePeriod", () => {
            indicator.slowKTimePeriod.should.equal(indicators.STOCH.SLOWKPERIOD_DEFAULT);
        });

        it("should set the slowKMAType", () => {
            indicator.slowKMAType.should.equal(indicators.STOCH.SLOWKMATYPE_DEFAULT);
        });

        it("should set the slowDTimePeriod", () => {
            indicator.slowDTimePeriod.should.equal(indicators.STOCH.SLOWDPERIOD_DEFAULT);
        });

        it("should set the slowDMAType", () => {
            indicator.slowDMAType.should.equal(indicators.STOCH.SLOWDMATYPE_DEFAULT);
        });
    });

    describe("when constructing with fastKTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.STOCH(0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.STOCH.FASTKPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when constructing with slowKTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.STOCH(fastKTimePeriod, 0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.STOCH.SLOWKPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when constructing with slowDTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.STOCH(fastKTimePeriod, slowKTimePeriod, slowKMAType, 0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.STOCH.SLOWDPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.STOCH(fastKTimePeriod, slowKTimePeriod, slowKMAType, slowDTimePeriod, slowDMAType);
            let idx = 0;
            sourceData.close.forEach((value: number, index: number) => {
                if (indicator.receiveData({
                    "high": sourceData.high[index],
                    "low": sourceData.low[index],
                    "open": sourceData.open[index],
                    "close": sourceData.close[index],
                })) {
                    indicatorResults[idx] = { "slowK": 0, "slowD": 0 };
                    indicatorResults[idx].slowD = indicator.slowD;
                    indicatorResults[idx].slowK = indicator.slowK;
                    idx++;
                }
            });
        });

        it("should match the talib slowD results", () => {
            for (let i = 0; i < taResultData.result.outSlowD.length; i++) {
                isNaN(indicatorResults[i].slowD).should.be.false;
                taResultData.result.outSlowD[i].should.be.closeTo(indicatorResults[i].slowD, 0.001);
            }
        });

        it("should match the talib slowK results", () => {
            for (let i = 0; i < taResultData.result.outSlowK.length; i++) {
                isNaN(indicatorResults[i].slowK).should.be.false;
                taResultData.result.outSlowK[i].should.be.closeTo(indicatorResults[i].slowK, 0.001);
            }
        });
    });

    describe("when receiving less tick data than the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.STOCH(fastKTimePeriod, slowKTimePeriod, slowKMAType, slowDTimePeriod, slowDMAType);
            let idx = 0;
            for (let index = 0; index < indicator.lookback; index++) {
                if (indicator.receiveData({
                    "high": sourceData.high[index],
                    "low": sourceData.low[index],
                    "open": sourceData.open[index],
                    "close": sourceData.close[index],
                })) {
                    indicatorResults[idx] = { "slowK": 0, "slowD": 0 };
                    indicatorResults[idx].slowD = indicator.slowD;
                    indicatorResults[idx].slowK = indicator.slowK;
                    idx++;
                }
            };
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
            indicator = new indicators.STOCH(fastKTimePeriod, slowKTimePeriod, slowKMAType, slowDTimePeriod, slowDMAType);
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
                    indicatorResults[idx] = { "slowK": 0, "slowD": 0 };
                    indicatorResults[idx].slowD = indicator.slowD;
                    indicatorResults[idx].slowK = indicator.slowK;
                    idx++;
                }
            };
        });

        it("the indicator should indicate that it is ready to be consumed", () => {
            indicator.isReady.should.equal(true);
        });

        it("should have raised the ondata event", () => {
            indicatorOnDataRasied.should.equal(true);
        });
    });
});

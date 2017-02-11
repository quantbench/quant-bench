import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
const jsonfile = require("jsonfile");

chai.should();

describe("STOCHRSI Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.STOCHRSI;
    let indicatorResults: Array<{ fastK: number, fastD: number }>;
    let indicatorOnDataRasied: boolean = false;
    const timePeriod: number = 14;
    const fastKTimePeriod: number = 5;
    const fastDMAType: indicators.MA_TYPE = indicators.MA_TYPE.SMA;
    const fastDTimePeriod: number = 3;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/stochrsi.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<{ fastK: number, fastD: number }>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.STOCHRSI(timePeriod, fastKTimePeriod, fastDTimePeriod, fastDMAType);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.STOCHRSI.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.STOCHRSI.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.STOCHRSI(timePeriod + 1, fastKTimePeriod + 1, fastDTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(timePeriod + 1);
        });

        it("should set the fastKTimePeriod", () => {
            indicator.fastKTimePeriod.should.equal(fastKTimePeriod + 1);
        });

        it("should set the slowKTimePeriod", () => {
            indicator.fastDTimePeriod.should.equal(fastDTimePeriod + 1);
        });

        it("should set the fastDMAType", () => {
            indicator.fastDMAType.should.equal(indicators.MA_TYPE.EMA);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.STOCHRSI();
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(indicators.STOCHRSI.TIMEPERIOD_DEFAULT);
        });

        it("should set the fastKTimePeriod", () => {
            indicator.fastKTimePeriod.should.equal(indicators.STOCHRSI.FASTKPERIOD_DEFAULT);
        });

        it("should set the fastDTimePeriod", () => {
            indicator.fastDTimePeriod.should.equal(indicators.STOCHRSI.FASTDPERIOD_DEFAULT);
        });

        it("should set the fastDMAType", () => {
            indicator.fastDMAType.should.equal(indicators.STOCHRSI.FASTDMATYPE_DEFAULT);
        });
    });

    describe("when constructing with timePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.STOCHRSI(0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.STOCHRSI.TIMEPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when constructing with fastKTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.STOCHRSI(timePeriod, 0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.STOCHRSI.FASTKPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when constructing with fastDTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.STOCHRSI(timePeriod, fastKTimePeriod, 0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.STOCHRSI.FASTDPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.STOCHRSI(timePeriod, fastKTimePeriod, fastDTimePeriod, fastDMAType);
            let idx = 0;
            sourceData.close.forEach((value: number, index: number) => {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "fastK": 0, "fastD": 0 };
                    indicatorResults[idx].fastD = indicator.fastD;
                    indicatorResults[idx].fastK = indicator.fastK;
                    idx++;
                }
            });
        });

        it("should match the talib fastD results", () => {
            for (let i = 0; i < taResultData.result.outFastD.length; i++) {
                isNaN(indicatorResults[i].fastD).should.be.false;
                taResultData.result.outFastD[i].should.be.closeTo(indicatorResults[i].fastD, 0.001);
            }
        });

        it("should match the talib fastK results", () => {
            for (let i = 0; i < taResultData.result.outFastK.length; i++) {
                isNaN(indicatorResults[i].fastK).should.be.false;
                taResultData.result.outFastK[i].should.be.closeTo(indicatorResults[i].fastK, 0.001);
            }
        });
    });

    describe("when receiving less tick data than the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.STOCHRSI(timePeriod, fastKTimePeriod, fastDTimePeriod, fastDMAType);
            let idx = 0;
            for (let index = 0; index < indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "fastK": 0, "fastD": 0 };
                    indicatorResults[idx].fastD = indicator.fastD;
                    indicatorResults[idx].fastK = indicator.fastK;
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
            indicator = new indicators.STOCHRSI(timePeriod, fastKTimePeriod, fastDTimePeriod, fastDMAType);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index <= indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "fastK": 0, "fastD": 0 };
                    indicatorResults[idx].fastD = indicator.fastD;
                    indicatorResults[idx].fastK = indicator.fastK;
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

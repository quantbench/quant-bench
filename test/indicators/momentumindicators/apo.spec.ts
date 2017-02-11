import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
const jsonfile = require("jsonfile");

chai.should();

describe("APO Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.APO;
    let indicatorResults: number[];
    let indicatorOnDataRasied: boolean = false;
    const fastTimePeriod = 12;
    const slowTimePeriod = 26;
    const maType: indicators.MA_TYPE = indicators.MA_TYPE.SMA;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/apo.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod, slowTimePeriod, maType);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.APO.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.APO.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod + 1, slowTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the fastTimePeriod", () => {
            indicator.fastTimePeriod.should.equal(fastTimePeriod + 1);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod + 1, slowTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the slowTimePeriod", () => {
            indicator.slowTimePeriod.should.equal(slowTimePeriod + 1);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod + 1, slowTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the maType", () => {
            indicator.maType.should.equal(maType + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO();
        });

        it("should set the fastTimePeriod", () => {
            indicator.fastTimePeriod.should.equal(indicators.APO.FAST_TIMEPERIOD_DEFAULT);
        });

        it("should set the slowTimePeriod", () => {
            indicator.slowTimePeriod.should.equal(indicators.APO.SLOW_TIMEPERIOD_DEFAULT);
        });

        it("should set the maType", () => {
            indicator.maType.should.equal(indicators.APO.MATYPE_DEFAULT);
        });
    });

    describe("when constructing with fastTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.APO(1);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.APO.FAST_TIMEPERIOD_MIN, 1);
            exception.message.should.equal(message);
        });
    });

    describe("when constructing with slowTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.APO(indicators.APO.FAST_TIMEPERIOD_DEFAULT, 1);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.APO.SLOW_TIMEPERIOD_MIN, 1);
            exception.message.should.equal(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod, slowTimePeriod, maType);
            let idx = 0;
            sourceData.close.forEach((value: number) => {
                if (indicator.receiveData(value)) {
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
            indicator = new indicators.APO(fastTimePeriod, slowTimePeriod, maType);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index < indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
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
            indicator = new indicators.APO(fastTimePeriod, slowTimePeriod, maType);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index <= indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
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

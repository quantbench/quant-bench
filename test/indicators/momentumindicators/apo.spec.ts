
import * as jsonfile from "jsonfile";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";

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
            expect(indicator.name).toBe(indicators.APO.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            expect(indicator.description).toBe(indicators.APO.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod + 1, slowTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the fastTimePeriod", () => {
            expect(indicator.fastTimePeriod).toBe(fastTimePeriod + 1);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod + 1, slowTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the slowTimePeriod", () => {
            expect(indicator.slowTimePeriod).toBe(slowTimePeriod + 1);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO(fastTimePeriod + 1, slowTimePeriod + 1, indicators.MA_TYPE.EMA);
        });

        it("should set the maType", () => {
            expect(indicator.maType).toBe(maType + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.APO();
        });

        it("should set the fastTimePeriod", () => {
            expect(indicator.fastTimePeriod).toBe(indicators.APO.FAST_TIMEPERIOD_DEFAULT);
        });

        it("should set the slowTimePeriod", () => {
            expect(indicator.slowTimePeriod).toBe(indicators.APO.SLOW_TIMEPERIOD_DEFAULT);
        });

        it("should set the maType", () => {
            expect(indicator.maType).toBe(indicators.APO.MATYPE_DEFAULT);
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
            expect(exception.message).toBe(message);
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
            expect(exception.message).toBe(message);
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
                expect(isNaN(indicatorResults[i])).toBe(false);
                expect(taResultData.result.outReal[i]).toBeCloseTo(indicatorResults[i], 0.001);
            }
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
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
            expect(indicator.isReady).toBe(false);
        });

        it("should not have raised the ondata event", () => {
            expect(indicatorOnDataRasied).toBe(false);
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
            expect(indicator.isReady).toBe(true);
        });

        it("should have raised the ondata event", () => {
            expect(indicatorOnDataRasied).toBe(true);
        });
    });
});


import * as path from "path";
import * as indicators from "../";
import { TestDataFactory } from "../../../testdata/testData";
const jsonfile = require("jsonfile");

describe("MACD Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.MACD;
    let indicatorResults: Array<{ macd: number, signal: number, histogram: number }>;
    let indicatorOnDataRasied: boolean = false;
    const fastTimePeriod: number = 12;
    const slowTimePeriod: number = 26;
    const signalTimePeriod: number = 9;

    beforeEach(() => {
        taResultFile = path.resolve("./testdata/talib-results/macd.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<{ macd: number, signal: number, histogram: number }>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, signalTimePeriod);
        });

        it("should set the indicator name", () => {
            expect(indicator.name).toBe(indicators.MACD.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            expect(indicator.description).toBe(indicators.MACD.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MACD(fastTimePeriod + 1, slowTimePeriod + 1, signalTimePeriod + 1);
        });

        it("should set the fastTimePeriod", () => {
            expect(indicator.fastTimePeriod).toBe(fastTimePeriod + 1);
        });

        it("should set the slowTimePeriod", () => {
            expect(indicator.slowTimePeriod).toBe(slowTimePeriod + 1);
        });

        it("should set the signalTimePeriod", () => {
            expect(indicator.signalTimePeriod).toBe(signalTimePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MACD();
        });

        it("should set the fastTimePeriod", () => {
            expect(indicator.fastTimePeriod).toBe(indicators.MACD.FAST_TIMEPERIOD_DEFAULT);
        });

        it("should set the slowTimePeriod", () => {
            expect(indicator.slowTimePeriod).toBe(indicators.MACD.SLOW_TIMEPERIOD_DEFAULT);
        });

        it("should set the signalTimePeriod", () => {
            expect(indicator.signalTimePeriod).toBe(indicators.MACD.SIGNAL_TIMEPERIOD_DEFAULT);
        });
    });

    describe("when constructing with fastTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.MACD(1, slowTimePeriod, signalTimePeriod);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.MACD.FAST_TIMEPERIOD_MIN, 1);
            expect(exception.message).toBe(message);
        });
    });

    describe("when constructing with slowTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.MACD(fastTimePeriod, 1, signalTimePeriod);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.MACD.SLOW_TIMEPERIOD_MIN, 1);
            expect(exception.message).toBe(message);
        });
    });

    describe("when constructing with signalTimePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, 0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.MACD.SIGNAL_TIMEPERIOD_MIN, 0);
            expect(exception.message).toBe(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, signalTimePeriod);
            let idx = 0;
            sourceData.close.forEach((value: number, index: number) => {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "macd": 0, "signal": 0, "histogram": 0 };
                    indicatorResults[idx].macd = indicator.macd;
                    indicatorResults[idx].signal = indicator.signal;
                    indicatorResults[idx].histogram = indicator.histogram;
                    idx++;
                }
            });
        });

        it("should match the talib macd results", () => {
            for (let i = 0; i < taResultData.result.outMACD.length; i++) {
                expect(isNaN(indicatorResults[i].macd)).toBe(false);
                expect(taResultData.result.outMACD[i]).toBeCloseTo(indicatorResults[i].macd, 0.001);
            }
        });

        it("should match the talib signal results", () => {
            for (let i = 0; i < taResultData.result.outMACDSignal.length; i++) {
                expect(isNaN(indicatorResults[i].signal)).toBe(false);
                expect(taResultData.result.outMACDSignal[i]).toBeCloseTo(indicatorResults[i].signal, 0.001);
            }
        });

        it("should match the talib histogram results", () => {
            for (let i = 0; i < taResultData.result.outMACDHist.length; i++) {
                expect(isNaN(indicatorResults[i].histogram)).toBe(false);
                expect(taResultData.result.outMACDHist[i]).toBeCloseTo(indicatorResults[i].histogram, 0.001);
            }
        });
    });

    describe("when receiving less tick data than the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, signalTimePeriod);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index < indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "macd": 0, "signal": 0, "histogram": 0 };
                    indicatorResults[idx].macd = indicator.macd;
                    indicatorResults[idx].signal = indicator.signal;
                    indicatorResults[idx].histogram = indicator.histogram;
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
            indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, signalTimePeriod);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let index = 0; index <= indicator.lookback; index++) {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = { "macd": 0, "signal": 0, "histogram": 0 };
                    indicatorResults[idx].macd = indicator.macd;
                    indicatorResults[idx].signal = indicator.signal;
                    indicatorResults[idx].histogram = indicator.histogram;
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

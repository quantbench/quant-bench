
import * as jsonfile from "jsonfile";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";


describe("ACCBANDS Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.AccelerationBands;
    let indicatorResults: Array<{ upperBand: number, middleBand: number, lowerBand: number }>;
    let indicatorOnDataRasied: boolean = false;
    const timePeriod = 20;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/accbands.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);

        indicatorResults = new Array<{ upperBand: number, middleBand: number, lowerBand: number }>(
            sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.AccelerationBands(timePeriod);
        });

        it("should set the indicator name", () => {
            expect(indicator.name).toBe(indicators.AccelerationBands.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            expect(indicator.description).toBe(indicators.AccelerationBands.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.AccelerationBands(timePeriod + 1);
        });

        it("should set the timePeriod", () => {
            expect(indicator.timePeriod).toBe(timePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.AccelerationBands();
        });

        it("should set the timePeriod", () => {
            expect(indicator.timePeriod).toBe(indicators.AccelerationBands.TIMEPERIOD_DEFAULT);
        });
    });

    describe("when constructing with timePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.AccelerationBands(1);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.AccelerationBands.TIMEPERIOD_MIN, 1);
            expect(exception.message).toBe(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.AccelerationBands(timePeriod);
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
                expect(isNaN(indicatorResults[i].upperBand)).toBe(false);
                expect(taResultData.result.outRealUpperBand[i]).toBeCloseTo(indicatorResults[i].upperBand, 0.001);
            }
        });

        it("should match the talib middleband results", () => {
            for (let i = 0; i < taResultData.result.outRealMiddleBand.length; i++) {
                expect(isNaN(indicatorResults[i].middleBand)).toBe(false);
                expect(taResultData.result.outRealMiddleBand[i]).toBeCloseTo(indicatorResults[i].middleBand, 0.001);
            }
        });

        it("should match the talib lowerband results", () => {
            for (let i = 0; i < taResultData.result.outRealLowerBand.length; i++) {
                expect(isNaN(indicatorResults[i].lowerBand)).toBe(false);
                expect(taResultData.result.outRealLowerBand[i]).toBeCloseTo(indicatorResults[i].lowerBand, 0.001);
            }
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });

    describe("when receiving less tick data than the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.AccelerationBands(timePeriod);
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
            expect(indicator.isReady).toBe(false);
        });

        it("should not have raised the ondata event", () => {
            expect(indicatorOnDataRasied).toBe(false);
        });
    });

    describe("when receiving tick data equal to the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.AccelerationBands(timePeriod);
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
            expect(indicator.isReady).toBe(true);
        });

        it("should have raised the ondata event", () => {
            expect(indicatorOnDataRasied).toBe(true);
        });
    });
});

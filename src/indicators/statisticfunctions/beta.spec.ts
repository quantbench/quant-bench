
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../../testdata/testData";
const jsonfile = require("jsonfile");



describe("BETA Indicator", () => {
    let sourceFile2: string;
    let taResultFile: string;
    let sourceData: any;
    let sourceData2: any;
    let taResultData: any;
    let indicator: indicators.BETA;
    let indicatorResults: number[];
    let indicatorOnDataRasied: boolean = false;
    const timePeriod = 5;

    beforeEach(() => {
        sourceFile2 = path.resolve("./test/sourcedata/sourcedata2.json");
        taResultFile = path.resolve("./test/talib-results/beta.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        sourceData2 = jsonfile.readFileSync(sourceFile2);
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.BETA(timePeriod);
        });

        it("should set the indicator name", () => {
            expect(indicator.name).toBe(indicators.BETA.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            expect(indicator.description).toBe(indicators.BETA.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.BETA(timePeriod + 1);
        });

        it("should set the timePeriod", () => {
            expect(indicator.timePeriod).toBe(timePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.BETA();
        });

        it("should set the timePeriod", () => {
            expect(indicator.timePeriod).toBe(indicators.BETA.TIMEPERIOD_DEFAULT);
        });
    });

    describe("when constructing with timePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.BETA(0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.BETA.TIMEPERIOD_MIN, 0);
            expect(exception.message).toBe(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.BETA(timePeriod);
            let idx = 0;
            for (let i = 0; i < sourceData.close.length; i++) {
                const value1 = sourceData.close[i];
                const value2 = sourceData2.close[i];
                if (indicator.receiveData(value1, value2)) {
                    indicatorResults[idx] = indicator.currentValue;
                    idx++;
                }
            }
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
            indicator = new indicators.BETA(timePeriod);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let i = 0; i < indicator.lookback; i++) {
                const value1 = sourceData.close[i];
                const value2 = sourceData2.close[i];
                if (indicator.receiveData(value1, value2)) {
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
            indicator = new indicators.BETA(timePeriod);
            let idx = 0;
            indicatorOnDataRasied = false;
            indicator.on("data", () => {
                indicatorOnDataRasied = true;
            });

            for (let i = 0; i <= indicator.lookback; i++) {
                const value1 = sourceData.close[i];
                const value2 = sourceData2.close[i];
                if (indicator.receiveData(value1, value2)) {
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

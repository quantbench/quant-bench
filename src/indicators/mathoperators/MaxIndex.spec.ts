
import * as path from "path";
import * as indicators from "../";
import { TestDataFactory } from "../../../testdata/testData";
const jsonfile = require("jsonfile");

describe("MaxIndex Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.MaxIndex;
    let indicatorResults: number[];
    const timePeriod = 30;

    beforeEach(() => {
        taResultFile = path.resolve("./testdata/talib-results/maxindex.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.MaxIndex(timePeriod);
        });

        it("should set the indicator name", () => {
            expect(indicator.name).toBe(indicators.MaxIndex.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            expect(indicator.description).toBe(indicators.MaxIndex.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MaxIndex(timePeriod + 1);
        });

        it("should set the timePeriod", () => {
            expect(indicator.timePeriod).toBe(timePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MaxIndex();
        });

        it("should set the timePeriod", () => {
            expect(indicator.timePeriod).toBe(indicators.MaxIndex.TIMEPERIOD_DEFAULT);
        });
    });

    describe("when constructing with timePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.MaxIndex(1);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.MaxIndex.TIMEPERIOD_MIN, 1);
            expect(exception.message).toBe(message);
        });
    });
});

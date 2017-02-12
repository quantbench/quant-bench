import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
const jsonfile = require("jsonfile");

chai.should();

describe("MaxIndex Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.MaxIndex;
    let indicatorResults: number[];
    const timePeriod = 30;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/maxindex.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.MaxIndex(timePeriod);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.MaxIndex.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.MaxIndex.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MaxIndex(timePeriod + 1);
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(timePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MaxIndex();
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(indicators.MaxIndex.TIMEPERIOD_DEFAULT);
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
            exception.message.should.equal(message);
        });
    });
});

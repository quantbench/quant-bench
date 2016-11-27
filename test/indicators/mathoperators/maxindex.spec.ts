import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
let jsonfile = require("jsonfile");

chai.should();

describe("MAXINDEX Indicator", () => {
    let sourceFile: string;
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.MAXINDEX;
    let indicatorResults: number[];
    let timePeriod = 30;

    beforeEach(() => {
        sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
        taResultFile = path.resolve("./test/talib-results/maxindex.json");
        sourceData = jsonfile.readFileSync(sourceFile);
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.MAXINDEX(timePeriod);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.MAXINDEX.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.MAXINDEX.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MAXINDEX(timePeriod + 1);
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(timePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MAXINDEX();
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(indicators.MAXINDEX.TIMEPERIOD_DEFAULT);
        });
    });

    describe("when constructing with timePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.MAXINDEX(1);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            let message = indicators.generateMinTimePeriodError(indicator.name, indicators.MAXINDEX.TIMEPERIOD_MIN, 1);
            exception.message.should.equal(message);
        });
    });
});

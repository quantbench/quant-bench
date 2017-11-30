import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
const jsonfile = require("jsonfile");

chai.should();

describe("CORREL Indicator", () => {
    let sourceFile2: string;
    let taResultFile: string;
    let sourceData: any;
    let sourceData2: any;
    let taResultData: any;
    let indicator: indicators.CORREL;
    let indicatorResults: number[];
    let indicatorOnDataRasied: boolean = false;
    const timePeriod = 30;

    beforeEach(() => {
        sourceFile2 = path.resolve("./test/sourcedata/sourcedata2.json");
        taResultFile = path.resolve("./test/talib-results/correl.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        sourceData2 = jsonfile.readFileSync(sourceFile2);
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.CORREL(timePeriod);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.CORREL.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.CORREL.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.CORREL(timePeriod + 1);
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(timePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.CORREL();
        });

        it("should set the timePeriod", () => {
            indicator.timePeriod.should.equal(indicators.CORREL.TIMEPERIOD_DEFAULT);
        });
    });

    describe("when constructing with timePeriod less than the minimum", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                indicator = new indicators.CORREL(0);
            } catch (error) {
                exception = error;
            }
        });

        it("should return a correctly formatted error", () => {
            const message = indicators.generateMinTimePeriodError(indicator.name, indicators.CORREL.TIMEPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.CORREL(timePeriod);
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
            indicator = new indicators.CORREL(timePeriod);
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
            indicator.isReady.should.equal(false);
        });

        it("should not have raised the ondata event", () => {
            indicatorOnDataRasied.should.equal(false);
        });
    });

    describe("when receiving tick data equal to the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.CORREL(timePeriod);
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
            indicator.isReady.should.equal(true);
        });

        it("should have raised the ondata event", () => {
            indicatorOnDataRasied.should.equal(true);
        });
    });
});

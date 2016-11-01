import * as indicators from "../../../src/indicators/";
import * as chai from "chai";
import * as path from "path";
let jsonfile = require("jsonfile");

chai.should();

describe("MACDBANDS Indicator", () => {
    let sourceFile: string;
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.MACD;
    let indicatorResults: indicators.MACDResult[];
    let indicatorOnDataRasied: boolean = false;
    let fastTimePeriod: number = 12;
    let slowTimePeriod: number = 26;
    let signalTimePeriod: number = 9;

    beforeEach(() => {
        sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
        taResultFile = path.resolve("./test/talib-results/macd.json");
        sourceData = jsonfile.readFileSync(sourceFile);
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<indicators.MACDResult>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, signalTimePeriod);
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.MACD.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.MACD.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when constructing with explicit non default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MACD(fastTimePeriod + 1, slowTimePeriod + 1, signalTimePeriod + 1);
        });

        it("should set the fastTimePeriod", () => {
            indicator.fastTimePeriod.should.equal(fastTimePeriod + 1);
        });

        it("should set the slowTimePeriod", () => {
            indicator.slowTimePeriod.should.equal(slowTimePeriod + 1);
        });

        it("should set the signalTimePeriod", () => {
            indicator.signalTimePeriod.should.equal(signalTimePeriod + 1);
        });
    });

    describe("when constructing with default arguments", () => {
        beforeEach(() => {
            indicator = new indicators.MACD();
        });

        it("should set the fastTimePeriod", () => {
            indicator.fastTimePeriod.should.equal(indicators.MACD.FAST_TIMEPERIOD_DEFAULT);
        });

        it("should set the slowTimePeriod", () => {
            indicator.slowTimePeriod.should.equal(indicators.MACD.SLOW_TIMEPERIOD_DEFAULT);
        });

        it("should set the signalTimePeriod", () => {
            indicator.signalTimePeriod.should.equal(indicators.MACD.SIGNAL_TIMEPERIOD_DEFAULT);
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
            let message = indicators.generateMinTimePeriodError(indicator.name, indicators.MACD.FAST_TIMEPERIOD_MIN, 1);
            exception.message.should.equal(message);
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
            let message = indicators.generateMinTimePeriodError(indicator.name, indicators.MACD.SLOW_TIMEPERIOD_MIN, 1);
            exception.message.should.equal(message);
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
            let message = indicators.generateMinTimePeriodError(indicator.name, indicators.MACD.SIGNAL_TIMEPERIOD_MIN, 0);
            exception.message.should.equal(message);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, signalTimePeriod);
            let idx = 0;
            sourceData.close.forEach((value: number, index: number) => {
                if (indicator.receiveData(sourceData.close[index])) {
                    indicatorResults[idx] = indicator.currentValue;
                    idx++;
                }
            });
        });

        it("should match the talib macd results", () => {
            for (let i = 0; i < taResultData.result.outMACD.length; i++) {
                isNaN(indicatorResults[i].macd).should.be.false;
                taResultData.result.outMACD[i].should.be.closeTo(indicatorResults[i].macd, 0.001);
            }
        });

        it("should match the talib signal results", () => {
            for (let i = 0; i < taResultData.result.outMACDSignal.length; i++) {
                isNaN(indicatorResults[i].signal).should.be.false;
                taResultData.result.outMACDSignal[i].should.be.closeTo(indicatorResults[i].signal, 0.001);
            }
        });

        it("should match the talib histogram results", () => {
            for (let i = 0; i < taResultData.result.outMACDHist.length; i++) {
                isNaN(indicatorResults[i].histogram).should.be.false;
                taResultData.result.outMACDHist[i].should.be.closeTo(indicatorResults[i].histogram, 0.001);
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
            indicator = new indicators.MACD(fastTimePeriod, slowTimePeriod, signalTimePeriod);
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

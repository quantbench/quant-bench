import * as chai from "chai";
import * as path from "path";
import * as indicators from "../../../src/indicators/";
import { TestDataFactory } from "../../testData";
let jsonfile = require("jsonfile");

chai.should();

describe("CDLCONCEALBABYSWALL Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.CDLCONCEALBABYSWALL;
    let indicatorResults: number[];
    let indicatorOnDataRasied: boolean = false;

    beforeEach(() => {
        taResultFile = path.resolve("./test/talib-results/cdlconcealbabyswall.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);

        indicatorResults = new Array<number>(
            sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.CDLCONCEALBABYSWALL();
        });

        it("should set the indicator name", () => {
            indicator.name.should.equal(indicators.CDLCONCEALBABYSWALL.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            indicator.description.should.equal(indicators.CDLCONCEALBABYSWALL.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.CDLCONCEALBABYSWALL();
            let idx = 0;
            sourceData.close.forEach((value: number, index: number) => {
                if (indicator.receiveData({
                    "high": sourceData.high[index],
                    "low": sourceData.low[index],
                    "open": sourceData.open[index],
                    "close": sourceData.close[index],
                })) {
                    indicatorResults[idx] = indicator.currentValue;
                    idx++;
                }
            });
        });

        it("should match the talib results", () => {
            for (let i = 0; i < taResultData.result.outInteger.length; i++) {
                isNaN(indicatorResults[i]).should.be.false;
                taResultData.result.outInteger[i].should.be.closeTo(indicatorResults[i], 0.001);
            }
        });

        it("should match the talib lookback", () => {
            taResultData.begIndex.should.equal(indicator.lookback);
        });
    });

    describe("when receiving less tick data than the lookback period", () => {
        beforeEach(() => {
            indicator = new indicators.CDLCONCEALBABYSWALL();
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
            indicator = new indicators.CDLCONCEALBABYSWALL();
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

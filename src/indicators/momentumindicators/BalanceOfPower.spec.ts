
import * as path from "path";
import * as indicators from "../";
import { TestDataFactory } from "../../../testdata/testData";
const jsonfile = require("jsonfile");

describe("BOP Indicator", () => {
    let taResultFile: string;
    let sourceData: any;
    let taResultData: any;
    let indicator: indicators.BOP;
    let indicatorResults: number[];

    beforeEach(() => {
        taResultFile = path.resolve("./testdata/talib-results/bop.json");
        sourceData = TestDataFactory.getInstance().sourceData;
        taResultData = jsonfile.readFileSync(taResultFile);
        indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
    });

    describe("when constructing", () => {
        beforeEach(() => {
            indicator = new indicators.BOP();
        });

        it("should set the indicator name", () => {
            expect(indicator.name).toBe(indicators.BOP.INDICATOR_NAME);
        });

        it("should set the indicator description", () => {
            expect(indicator.description).toBe(indicators.BOP.INDICATOR_DESCR);
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });

    describe("when receiving all tick data", () => {
        beforeEach(() => {
            indicator = new indicators.BOP();
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
            for (let i = 0; i < taResultData.result.outReal.length; i++) {
                expect(isNaN(indicatorResults[i])).toBe(false);
                expect(taResultData.result.outReal[i]).toBeCloseTo(indicatorResults[i], 0.001);
            }
        });

        it("should match the talib lookback", () => {
            expect(taResultData.begIndex).toBe(indicator.lookback);
        });
    });
});

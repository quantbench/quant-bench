// import * as indicators from "../../../src/indicators/";
// import * as chai from "chai";
// import * as path from "path";
// let jsonfile = require("jsonfile");

// chai.should();

// describe("ACOS Indicator", () => {
//     let sourceFile: string;
//     let taResultFile: string;
//     let sourceData: any;
//     let taResultData: any;
//     let indicator: indicators.ACOS;
//     let indicatorResults: number[];

//     beforeEach(() => {
//         sourceFile = path.resolve("./test/talib-results/cos.json");
//         taResultFile = path.resolve("./test/talib-results/acos.json");
//         sourceData = jsonfile.readFileSync(sourceFile);
//         taResultData = jsonfile.readFileSync(taResultFile);
//         indicatorResults = new Array<number>(sourceData.close.length - taResultData.begIndex);
//     });

//     describe("when constructing", () => {
//         beforeEach(() => {
//             indicator = new indicators.ACOS();
//         });

//         it("should set the indicator name", () => {
//             indicator.name.should.equal(indicators.ACOS.INDICATOR_NAME);
//         });

//         it("should set the indicator description", () => {
//             indicator.description.should.equal(indicators.ACOS.INDICATOR_DESCR);
//         });

//         it("should match the talib lookback", () => {
//             taResultData.begIndex.should.equal(indicator.lookback);
//         });
//     });

//     describe("when receiving all tick data", () => {
//         beforeEach(() => {
//             indicator = new indicators.ACOS();
//             let idx = 0;
//             sourceData.close.forEach((value: number) => {
//                 if (indicator.receiveData(value)) {
//                     indicatorResults[idx] = indicator.currentValue;
//                     idx++;
//                 }
//             });
//         });

//         it("should match the talib results", () => {
//             for (let i = 0; i < taResultData.result.outReal.length; i++) {
//                 isNaN(indicatorResults[i]).should.be.false;
//                 taResultData.result.outReal[i].should.be.closeTo(indicatorResults[i], 0.001);
//             }
//         });

//         it("should match the talib lookback", () => {
//             taResultData.begIndex.should.equal(indicator.lookback);
//         });
//     });
// });

import * as smaIndicator from "../src/indicators/overlapstudies/sma";
import * as path from "path";
let jsonfile = require("jsonfile");

let sourceFile = path.resolve("./test/sourcedata/sourcedata.json");
let taResultFile = path.resolve("./test/talib-results/sma.json");
let sourceData = jsonfile.readFileSync(sourceFile);
let resultData = jsonfile.readFileSync(taResultFile);

this.test = {
    "sourceData": sourceData,
    "resultData": resultData,
    "sma": new smaIndicator.SMA(30),
    "results": new Array<number>(sourceData.close.length - (30 - 1)),
};

let idx = 0;
this.test.sourceData.close.forEach((value: number) => {
    if (this.test.sma.receiveData(value)) {
        this.test.results[idx] = this.test.sma.currentValue;
        idx++;
    }
});

for (let i = 0; i < this.test.resultData.result.outReal.length; i++) {
    console.log(this.test.resultData.result.outReal[i]);
    console.log(this.test.results[i]);
    // this.test.resultData[i].should.be.closeTo(this.test.results[i] + 5, 0.001);
}

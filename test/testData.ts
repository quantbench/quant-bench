import * as path from "path";
let jsonfile = require("jsonfile");

export interface ITestData {
    sourceData: any;
}

export abstract class TestDataFactory implements ITestData {
    private static instance: TestData;

    public abstract sourceData: any;

    public static getInstance(): TestDataFactory {
        if (TestDataFactory.instance == null) {
            TestDataFactory.instance = new TestData();
        }
        return TestDataFactory.instance;
    }
}

class TestData extends TestDataFactory {

    public sourceData: any;

    constructor() {
        super();

        let sourceFile: string = path.resolve("./test/sourcedata/sourcedata.json");
        this.sourceData = jsonfile.readFileSync(sourceFile);
    }
}

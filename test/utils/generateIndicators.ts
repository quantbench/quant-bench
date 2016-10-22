let yaml = require("yamljs");
let talib = require("talib");
import * as fs from "fs";
import * as nunjucks from "nunjucks";
import * as path from "path";

nunjucks.configure("./test/utils/templates", { "autoescape": false });

let functions = talib.functions;
let functionKeys = Object.keys(functions);

let excludes: string[] = ["IMI", "TA_AVGDEV"];
functionKeys.forEach((func: any) => {
    let funcExplain = talib.explain(functions[func].name);
    let groupName = functions[func].group;
    let fileName = funcExplain.name.toLowerCase() + ".ts";
    if (!excludes.indexOf(groupName)) {
        let filePath = path.join("./src/indicators/", fixGroupName(groupName), fileName);
        fs.writeFile(filePath, "test", (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});

function fixGroupName(groupName: string): string {
    return groupName.replace(" ", "").toLowerCase();
}

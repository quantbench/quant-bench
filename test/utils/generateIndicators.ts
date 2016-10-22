let talib = require("talib");
import * as fs from "fs";
import * as nunjucks from "nunjucks";
import * as path from "path";

nunjucks.configure("./test/utils/templates", { "autoescape": false });

let functions = talib.functions;
let functionKeys = Object.keys(functions);

let excludes: string[] = ["IMI", "TA_AVGDEV", "SMA"];
functionKeys.forEach((func: any) => {
    let funcExplain = talib.explain(functions[func].name);
    let groupName = fixGroupName(functions[func].group);
    if (groupName === "mathtransform") {
        groupName = "mathtransforms";
    }
    if (groupName === "pricetransform") {
        groupName = "pricetransforms";
    }
    let fileName = funcExplain.name.toLowerCase() + ".ts";
    if (excludes.indexOf(funcExplain.name) === -1) {
        let filePath = path.join("./src/indicators/", groupName, fileName);
        fs.writeFile(filePath, "// " + funcExplain.hint + "\n" , (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});

function fixGroupName(groupName: string): string {
    return groupName.replace(" ", "").toLowerCase();
}

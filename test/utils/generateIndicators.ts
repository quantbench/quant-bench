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
    if ((excludes.indexOf(funcExplain.name) === -1) && funcExplain.inputs.length === 1) {
        let filePath = path.join("./src/indicators/", groupName, fileName);

        let templateData: any = {
            "IND_CAPS_NAME": funcExplain.name.replace("_", ""),
            "IND_INPUT_DATATYPE": funcExplain.inputs[0].name === "price" ? "IPriceBar" : "number",
            "IND_OUTPUT_DATATYPE": "number",
        };

        fs.writeFileSync(filePath, nunjucks.render("indicator.njk", templateData));
    }
});

process.exit(0);

function fixGroupName(groupName: string): string {
    return groupName.replace(" ", "").toLowerCase();
}

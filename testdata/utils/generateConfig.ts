const yaml = require("yamljs");
const talib = require("talib");
import * as fs from "fs";

// let groups = ["Overlap Studies", "Volatility Indicators", "Momentum Indicators", "Cycle Indicators",
//     "Volume Indicators", "Statistic Functions", "Price Transform", "Math Operators", "Math Transform"];
const groups = ["Pattern Recognition"];
const functions = talib.functions;
const functionKeys = Object.keys(functions);

const configs: any[] = [];
const excludes: string[] = ["IMI", "TA_AVGDEV"];
functionKeys.forEach((func: any) => {
    const funcExplain = talib.explain(functions[func].name);

    if (groups.indexOf(functions[func].group) !== -1 && excludes.indexOf(functions[func].name) === -1) {
        const config = {
            "name": funcExplain.name,
            "data_inputs": new Array<string>(),
            "inputs": new Object(),
            "group": functions[func].group.toLowerCase().replace(" ", "-"),
        };
        funcExplain.inputs.forEach((input: any) => {
            if (input.type === "price") {
                for (const i in input.flags) {
                    if (input.flags[i]) {
                        const flag = input.flags[i];
                        config.data_inputs.push(flag);
                    }
                }
            } else {
                config.data_inputs.push(input.name);
            }
        });

        funcExplain.optInputs.forEach((input: any) => {
            if (input.type === "price") {
                // for (let i in input.flags) {
                //     if (input.flags[i]) {
                //         let flag = input.flags[i];
                //         config.inputs.push(flag);
                //     }
                // }
            } else {
                const val: any = input.defaultValue;
                const name: string = input.name;
                (config.inputs as any)[name] = val;
            }
        });

        if (excludes.indexOf(config.name) === -1) {
            configs.push(config);
        }
    }
});

const yamlString = yaml.stringify(configs, 4);

fs.writeFile("./test/genconfigCandleSticks.yml", yamlString, (err) => {
    if (err) {
        console.log(err);
    }
    process.exit(0);
});

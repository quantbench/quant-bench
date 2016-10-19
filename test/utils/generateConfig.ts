let yaml = require("yamljs");
let talib = require("talib");
import * as fs from "fs";

let groups = ["Overlap Studies", "Volatility Indicators", "Momentum Indicators", "Cycle Indicators",
    "Volume Indicators", "Statistic Functions", "Price Transform"];
let functions = talib.functions;
let functionKeys = Object.keys(functions);

let configs: any[] = [];
functionKeys.forEach((func: any) => {
    let funcExplain = talib.explain(functions[func].name);

    if (groups.indexOf(functions[func].group) !== -1) {
        let config = {
            "name": funcExplain.name,
            "data_inputs": new Array<string>(),
            "inputs": new Array<string>(),
            "group": functions[func].group.toLowerCase().replace(" ", "-"),
        };
        funcExplain.inputs.forEach((input: any) => {
            if (input.type === "price") {
                for (let i in input.flags) {
                    if (input.flags[i]) {
                        let flag = input.flags[i];
                        config.data_inputs.push(flag);
                    }
                }
            } else {
                config.data_inputs.push(input.name);
            }
        });

        funcExplain.optInputs.forEach((input: any) => {
            if (input.type === "price") {
                for (let i in input.flags) {
                    if (input.flags[i]) {
                        let flag = input.flags[i];
                        config.inputs.push(flag);
                    }
                }
            } else {
                let newInput: any = {};
                newInput[input.name] = input.defaultValue;
                config.inputs.push(newInput);
            }
        });

        configs.push(config);
    }
});

let yamlString = yaml.stringify(configs, 4);

fs.writeFile("./test/genconfig.yml", yamlString, (err) => {
    if (err) {
        console.log(err);
    }
    process.exit(0);
});

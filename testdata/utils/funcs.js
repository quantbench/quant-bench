var talib = require('talib');

var functions = talib.functions;
for (var i in functions) {
    console.dir(talib.explain(functions[i].name), {
        depth: 3
    });
    console.log("");
    console.log("**************************");
    console.log("");
}
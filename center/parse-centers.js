const csv = require('csvtojson')
const FileSystem = require("fs");

const argv = require('yargs')
    .scriptName("parse-centers")
    .usage('$0 <cmd> [args]')
    .command(['-i [centers.csv]'], 'Imports the input CSV file for SKY Locator. Output: sky-centers.json and sky-centers-by-country.json')
    .example('parse-centers -i centers.csv', 'Imports centers.csv file for SKY Locator')
    .help('h')
    .argv;

const filenameBase = argv['i'].split(".")[0];
if (!filenameBase)
    filenameBase = "centers.csv";

console.log("Importing " + filenameBase + ".csv to sky-centers.json and sky-centers-by-country.json");


// Invoking csv returns a promise
const converter = csv()
    .fromFile(filenameBase + '.csv')
    .then((json) => {
        //console.log(json);

        FileSystem.writeFile('sky-centers.json',
            JSON.stringify(json, null, 2),
            (err) => {
                if (err) throw err;
            }
        );

        var centersByCountry = processByCountry(json);

        FileSystem.writeFile('sky-centers-by-country.json',
            JSON.stringify(centersByCountry, null, 2),
            (err) => {
                if (err) throw err;
            }
        );
    });


function processByCountry(jsonArr) {
    var centersByCountry = {};
    for (var i = 0; i < jsonArr.length; i++) {
        var center = jsonArr[i];

        var centersArrayForCurrentCountry = centersByCountry[center.Country];
        if (!centersArrayForCurrentCountry) {
            centersArrayForCurrentCountry = [];
        }

        centersArrayForCurrentCountry.push(center);
        centersByCountry[center.Country] = centersArrayForCurrentCountry;
    }

    return centersByCountry;
}

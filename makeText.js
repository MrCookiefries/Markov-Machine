/** Command-line tool to generate Markov text. */

const fsp = require("fs").promises;
const axios = require("axios");

const {MarkovMachine} = require("./markov");

const type = String(process.argv[2]);
const destination = String(process.argv[3]);

if (type === "undefined") {
    console.error(`Missing argument "type" (file / url)`);
    process.exit(1);
}
if (destination === "undefined") {
    console.error(`Missing argument "destination" (path to file or url)`);
    process.exit(1);
}

let data;
(async function() {
    if (type === "file") {
        try {
            data = await fsp.readFile(destination, "utf-8");
        } catch (err) {
            console.error(`File ${destination} could not be read`, err.message);
            process.exit(1);
        }
    } else if (type === "url") {
        try {
            resp = await axios.get(destination);
            data = String(resp.data);
        } catch (err) {
            console.error(`URL ${destination} could not be fetched`, err.message);
            process.exit(1);
        }
    } else {
        console.error(`Argument "${type}" must be "file" or "url"`);
        process.exit(1);
    }
    console.log(new MarkovMachine(data).makeText());
})();

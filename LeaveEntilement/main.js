const fsPromises = require('fs').promises;
const convertToJson = require('./functions.js');
function main() {
  let fileToLoad = process.argv[2];

  fsPromises
    .readFile(fileToLoad, 'utf-8')
    .then((text) => {
        var array = convertToJson(text);

        // console.log(array);
        console.log(JSON.stringify(array));
    })
    .catch((err) => {
      console.error(`File error: ${err.message}`);
    });
}

main();
//command `node main.js file.csv`
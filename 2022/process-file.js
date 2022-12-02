const fs = require('node:fs');
const readline = require('node:readline');

const processLineByLine = async function(filename, cb) {
  const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    crlfDelay: Infinity,
  })
  
  let currentElfCaloriesCounter = 0
  for await (const line of rl) {
    cb(line);
  }
};

exports.processLineByLine = processLineByLine;
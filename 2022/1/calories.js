const fs = require('node:fs');
const readline = require('node:readline');

const elfCaloriesArray = [];

async function processLineByLine() {
  const rl = readline.createInterface({
    input: fs.createReadStream('calories.txt'),
    crlfDelay: Infinity,
  });

  let currentElfCaloriesCounter = 0;
  for await (const line of rl) {
    if (line === '') {
      elfCaloriesArray.push(currentElfCaloriesCounter);
      currentElfCaloriesCounter = 0;
    } else {
      currentElfCaloriesCounter += parseInt(line.trim());
    }
  }
  console.log(elfCaloriesArray.sort((a,b) => b-a).slice(0,3).reduce((sum,curr) => sum+curr));
}

processLineByLine();

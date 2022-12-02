const processFile = require('../process-file');

// A Rock     01   Y Paper       2
// B Paper    12   X Rock        1
// C Scissors 23   Z Scissors    3

const player1Options = ['A', 'B', 'C'];
const player1OptionsName = ['Rock    ', 'Paper   ', 'Scissors'];
const player2Options = ['X', 'Y', 'Z'];
const player2SuggestedOptions = ['Y', 'X', 'Z'];

const roundResultPart1 = (player1, player2) => {
    let player1Index = player1Options.indexOf(player1);
    let player2Index = player2Options.indexOf(player2);

    let player2Score = player2Index+1;

    if (player1Index == player2Index) {
        player2Score += 3;
    } else if (player2Index - 1 === player1Index || player2Index - 1 === player1Index -3) {
        player2Score += 6;
    }
    // console.log(`${player1Index} ${player2Index} = ${player2Score}`);
    return player2Score;
}

const roundResultPart2 = (player1, player2) => {
    let player1Index = player1Options.indexOf(player1);
    let player2OutcomeScore = 0;
    let expectedOutcome;
    let player2Shape;
    switch (player2) {
        case 'X':
            expectedOutcome = 'Lose';
            player2OutcomeScore += 0;
            player2Shape = player1Index === 0 ? 2 : player1Index - 1;
            break;
        case 'Y':
            expectedOutcome = 'Draw';
            player2OutcomeScore += 3;
            player2Shape = player1Index;
            break;
        case 'Z':
            expectedOutcome = 'Win ';
            player2OutcomeScore += 6;
            player2Shape = player1Index === 2 ? 0 : player1Index + 1;
            break;
    }
    let player2ShapeScore = player2Shape + 1;

    // console.log(`${player1} ${player1OptionsName[player1Index]} \t vs \t ${player2} ${expectedOutcome} with ${player1OptionsName[player2Shape]} \t = ${player2ShapeScore} + ${player2OutcomeScore}`);
    return player2ShapeScore + player2OutcomeScore;
}


const execute = async () => {
    let totalScorePart1 = 0;
    let totalScorePart2 = 0;
    await processFile.processLineByLine('input.txt', (line) => {
        let options = line.trim().split(' ');
        totalScorePart1 += roundResultPart1(options[0], options[1]);
        totalScorePart2 += roundResultPart2(options[0], options[1]);
    });
    
    console.log('Part 1: ' + totalScorePart1);
    console.log('Part 2: ' + totalScorePart2);
};

execute();

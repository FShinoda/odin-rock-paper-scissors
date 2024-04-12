// GLOBALS


function getComputerChoice(){
    const randomInt = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
    const computerChoice = (randomInt == 0) ? "ROCK" 
        : (randomInt == 1) ? "PAPER"
        : (randomInt == 2) ? "SCISSORS"
        : "SOMETHING WENT WRONG"

    return computerChoice;
}

function checkRoundWinner(playerSelection, computerSelection){
    if (playerSelection === computerSelection) return 2;

    const playerWins = (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
                      (playerSelection === "PAPER" && computerSelection === "ROCK") ||
                      (playerSelection === "SCISSORS" && computerSelection === "PAPER");

    return playerWins ? 1 : 0;
}

function playRound(playerSelection, computerSelection){
    const result = checkRoundWinner(playerSelection, computerSelection);

    console.log((result === 1) ? `You Won! ${playerSelection} beats ${computerSelection}.`
        : (result === 0) ? ` You Lose! ${computerSelection} beats ${playerSelection}.`
        : `Both Played ${playerSelection}. It's a Tie.`);

    return result;
}

function checkFinalWinner(countPlayerVictories, countComputerVictories){
    return (countPlayerVictories > countComputerVictories) ? "Player Won!"
        : (countComputerVictories > countPlayerVictories) ? "Computer Won."
        : "It's a Tie..."

}

function playGame(){
    let countPlayerVictories = 0
        , countComputerVictories = 0;

    for (let i=0; i < 5; i++){
        let playerSelection = prompt("Choose Rock, Paper or Scissors.").toUpperCase();

        while(playerSelection != "ROCK" && playerSelection != "PAPER" && playerSelection != "SCISSORS"){
            alert("Please insert a valid value.");
            playerSelection = prompt("Choose Rock, Paper or Scissors.").toUpperCase();
        }

        const computerSelection = getComputerChoice();

        let result = playRound(playerSelection, computerSelection);

        if (result === 1){
            countPlayerVictories++;
        } else if (result === 0) {
            countComputerVictories++;
        } else {
            countPlayerVictories++;
            countComputerVictories++;
        }
    }

    console.log(`FINAL GAME RESULT: ${checkFinalWinner(countPlayerVictories, countComputerVictories)}`)
}


playGame();

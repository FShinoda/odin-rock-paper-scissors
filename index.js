function getComputerChoice(){
    const randomInt = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
    const computerChoice = (randomInt == 0) ? "ROCK" 
        : (randomInt == 1) ? "PAPER"
        : (randomInt == 2) ? "SCISSORS"
        : "SOMETHING WENT WRONG"

    return computerChoice;
}

function checkRoundWinner(playerSelection, computerSelection){
    playerSelection = playerSelection.toUpperCase();

    if (playerSelection === computerSelection) return 2;

    const playerWins = (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
                      (playerSelection === "PAPER" && computerSelection === "ROCK") ||
                      (playerSelection === "SCISSORS" && computerSelection === "PAPER");

    return playerWins ? 1 : 0;
}

function playRound(playerSelection){
    const computerSelection = getComputerChoice();
    const result = checkRoundWinner(playerSelection, computerSelection);
    let resultLog;

    if(result === 1){
        const playerScore = document.querySelector("#playerScore");
        playerScore.textContent = +playerScore.textContent + 1;
        resultLog = `You Won! ${playerSelection} beats ${computerSelection}.`;
    } else if (result === 0){
        const computerScore = document.querySelector("#computerScore");
        computerScore.textContent = +computerScore.textContent + 1;
        resultLog = `You Lose! ${computerSelection} beats ${playerSelection}.`;
    } else {
        const playerScore = document.querySelector("#playerScore");
        playerScore.textContent = +playerScore.textContent + 1;
        const computerScore = document.querySelector("#computerScore");
        computerScore.textContent = +computerScore.textContent + 1;
        resultLog = `Both Played ${playerSelection}. It's a Tie.`;
    };

    const logResultsDiv = document.querySelector("#logResultsContainer");
    const logParagraph = document.createElement("p");
    logParagraph.textContent = resultLog;

    logResultsDiv.appendChild(logParagraph);

    if(+playerScore.textContent === 5 || +computerScore.textContent === 5){
        const logFinalResult = document.createElement("h2");
        logFinalResult.textContent = `FINAL GAME RESULT: ${checkFinalWinner(playerScore.textContent, computerScore.textContent)}`
        logResultsDiv.appendChild(logFinalResult);
        const buttons = [...document.querySelectorAll("#choiceContainer > button")];
        buttons.forEach(btn => {
            btn.disabled = true;
        });
    }

    return result;
}

function checkFinalWinner(countPlayerVictories, countComputerVictories){
    return (countPlayerVictories > countComputerVictories) ? "Player Won!"
        : (countComputerVictories > countPlayerVictories) ? "Computer Won."
        : "It's a Tie...";

}

function restartGame(){
    // Turn buttons on again, set score to 0x0, clear log
    const playerScore = document.querySelector("#playerScore");
    playerScore.textContent = 0;
    const computerScore = document.querySelector("#computerScore");
    computerScore.textContent = 0;
    const buttons = [...document.querySelectorAll("#choiceContainer > button")];
    buttons.forEach(btn => {
        btn.disabled = false;
    });
    const logResultsDiv = document.querySelector("#logResultsContainer");
    logResultsDiv.innerHTML = '';
}

// MAIN
const buttons = document.querySelector("#choiceContainer");
buttons.addEventListener("click", (event) => {
    playRound(event.target.innerText);
});

const resetDiv = document.querySelector("#resetGameContainer");
resetDiv.addEventListener("click", (event) => {
    restartGame();
});
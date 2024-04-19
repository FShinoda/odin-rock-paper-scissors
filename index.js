// GLOBALS
let playerScore = 0
    , computerScore = 0
    , gameFinished = false;

function getComputerChoice(){
    const randomInt = Math.floor(Math.random() * (2 - 0 + 1) ) + 0;
    const computerChoice = (randomInt == 0) ? "ROCK" 
        : (randomInt == 1) ? "PAPER"
        : (randomInt == 2) ? "SCISSORS"
        : "SOMETHING WENT WRONG"

    return computerChoice;
};

function checkRoundWinner(playerSelection, computerSelection){
    playerSelection = playerSelection.toUpperCase();

    if (playerSelection === computerSelection) return 2;

    const playerWins = (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
                      (playerSelection === "PAPER" && computerSelection === "ROCK") ||
                      (playerSelection === "SCISSORS" && computerSelection === "PAPER");

    return playerWins ? 1 : 0;
};

function checkPlayerInput(playerSelection){
    if (playerSelection !== "ROCK" && playerSelection !== "PAPER" && playerSelection !== "SCISSORS" && playerSelection !== "RESTART"){
        return true;
    }

    return false;
};

function playRound(playerSelection){
    playerSelection = playerSelection.toUpperCase();
    const terminalBody = document.querySelector("#windowBody");
    let logResultRound = document.createElement("p");
    logResultRound.style.marginTop = "0px";
    let logScore = document.createElement("p");
    logScore.style.marginTop = "0px";
    let spanRedTextLog = document.createElement('span');
    spanRedTextLog.classList.add("colorRed");
    
    if (checkPlayerInput(playerSelection)) {
        if(playerSelection === "") return;
        logResultRound.textContent = "INVALID INPUT: COMMAND NOT FOUND.";
        terminalBody.insertBefore(logResultRound, terminalBody.childNodes[0]);
        return;
    };
    if (gameFinished) {
        if (playerSelection === "RESTART"){
            restartGame();
            return;
        };
        logResultRound.textContent = "Cannot continue game. It has finished. Please type [Restart] to start a new game.";
        terminalBody.insertBefore(logResultRound, terminalBody.childNodes[0]);
        return;
    }
    
    const computerSelection = getComputerChoice();
    const result = checkRoundWinner(playerSelection, computerSelection);
    let resultLog;
    
    if(result === 1){
        playerScore++;
        resultLog = `You Won! ${playerSelection} beats ${computerSelection}.`;
        spanRedTextLog.textContent = `YOU ${playerScore}`; 
        logScore.appendChild(spanRedTextLog);
        logScore.appendChild(document.createTextNode( ` x ${computerScore} COMPUTER`));
    } else if (result === 0){
        computerScore++;
        resultLog = `You Lose! ${computerSelection} beats ${playerSelection}.`;
        logScore.appendChild(document.createTextNode( `YOU ${playerScore} x `));
        spanRedTextLog.textContent = `${computerScore} COMPUTER`; 
        logScore.appendChild(spanRedTextLog);
    } else {
        resultLog = `Both Played ${playerSelection}. It's a Tie.`;
        logScore.appendChild(document.createTextNode(`YOU ${playerScore} x ${computerScore} COMPUTER`));
    };
    


    logResultRound.textContent = resultLog;
    logResultRound.style.marginBottom = "0px";
    terminalBody.insertBefore(logResultRound, terminalBody.childNodes[0]);
    terminalBody.insertBefore(logScore, terminalBody.childNodes[0]);


    if(playerScore === 5 || computerScore === 5){
        const logFinalResult = document.createElement("h2");
        logFinalResult.textContent = `WINNER: ${checkFinalWinner()}`
        terminalBody.insertBefore(logFinalResult, terminalBody.childNodes[0]);
        gameFinished = true;
    };

    return result;
}

function checkFinalWinner(){
    return (playerScore > computerScore) ? "GUEST"
        : (computerScore > playerScore) ? "COMPUTER"
        : "TIE";

}

function restartGame(){
    location.reload();
}

// MAIN
/*const buttons = document.querySelector("#choiceContainer");
buttons.addEventListener("click", (event) => {
    playRound(event.target.innerText);
});

const resetDiv = document.querySelector("#resetGameContainer");
resetDiv.addEventListener("click", (event) => {
    restartGame();
});*/

const terminalInput = document.querySelector("#inputTerminal");

terminalInput.addEventListener('keyup', (e) => {
    var key = e.which || e.keyCode;
    if (key == 13) { 
    const terminalBody = document.querySelector("#windowBody");
    const fixedText = document.querySelector('#fixedText');
    const logInput = document.createElement("p");
    const inputedText = terminalInput.value;
    logInput.style.margin = "0px";
    logInput.textContent = fixedText.textContent + inputedText;
    
    terminalBody.insertBefore(logInput, terminalBody.childNodes[0]);

    playRound(inputedText);

    terminalInput.value = '';
    }
});
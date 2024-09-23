//-----------------MENU-----------------

//mode dropdown menu
const modeButton = document.querySelector('.mode');
const dropdownContent = document.querySelector('.dropdown-content')
const mode = document.querySelector('.mode')
const roundsSelection = document.querySelectorAll('.rounds')


modeButton.addEventListener('click', ()=>{
    const dropdownToggle = dropdownContent.getAttribute("style","display")

    if (dropdownToggle == 'display:block;') dropdownContent.setAttribute("style","display:none;")
    else dropdownContent.setAttribute("style","display:block;")
});

//selecting the mode
roundsSelection.forEach((item) =>{
    item.addEventListener('click', () =>{
        mode.textContent = 'Mode: ' + item.textContent
        dropdownContent.setAttribute("style","display:none;")
    })
});

//-----------------GAME-----------------

//play button
//switchig overlays

const playButton = document.querySelector('.play-button')
const menuContainer = document.querySelector('.menu-container')
const gameContainer = document.querySelector('.game-container')
const body = document.querySelector('body')

let rounds;
    console.log(rounds)
playButton.addEventListener('click', ()=>{
    rounds = parseInt(mode.textContent.at(-1))
    menuContainer.setAttribute('style', 'display:none;');
    gameContainer.setAttribute('style', 'display:flex;');
    body.setAttribute('style','backdrop-filter: blur(4px)');
})

//selecting computer weapon
getComputerChoice = (enemyHands) => enemyHands[Math.floor(Math.random()*3)];


//simulating round logic
playRound = (h,c) => {
    if ((h === "bow" && c === "sword") || (h === "shield" && c === "bow") || (h === "sword" && c === "shield")) return "win"
    else if (h === c) return "draw"
    else return "loss"
}


//game variables 
const playerHands = document.querySelectorAll('.player_');
const enemyHands = document.querySelectorAll('.enemy_');
const scoreDisplay = document.querySelector('.score-display');
const lastOutcome = document.querySelector('.last-outcome');
const endOfGame = document.querySelector('.end-of-game')

//game 
let isEnded = false;
let humanScore = 0;
let computerScore = 0;

playerHands.forEach((playerHand)=>{
    playerHand.addEventListener('click', function eventHandler(){
        if (isEnded==false){
            //getting the round output 
            let playerChoice = playerHand.firstChild.alt;
            let enemyHand = getComputerChoice(enemyHands);
            let machineChoice = enemyHand.firstChild.alt;
            let outcome = playRound(playerChoice, machineChoice);

            enemyHand.style.background = 'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(235,219,123,1) 41%, rgba(250,207,133,1) 100%)';

            if (outcome === 'win'){
                humanScore++
                playerHand.setAttribute('style', 'border:5px; border-style:solid; border-color: green; border-radius: 8px')
                enemyHand.style.border = '5px solid red';
                
            }
            else if (outcome === 'loss'){
                computerScore++
                playerHand.setAttribute('style', 'border:5px; border-style:solid; border-color: red; border-radius: 8px')
                enemyHand.style.border = '5px solid green';
            }
            else{
                playerHand.setAttribute('style', 'border:5px; border-style:solid; border-color: yellow; border-radius: 8px');
                enemyHand.style.border = '5px solid yellow';
            }

            //waiting 2 sec to turn back border to invisible
            setTimeout(function() {
                playerHand.setAttribute('style', 'border: trasparent')
                enemyHand.setAttribute('style', 'border: trasparent')
            }, 2000);

            //displaying score
            scoreDisplay.textContent = `${humanScore}:${computerScore}`;
            lastOutcome.textContent = outcome + '!'

        }
        
        //if game ends
        if (humanScore >= rounds || computerScore >= rounds){
            const h2 = endOfGame.querySelector('h2')
            const p = endOfGame.querySelector('p')
            if (humanScore > computerScore){
                h2.textContent = "Congratulations! You won"
                p.textContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit reprehenderit error eos!"
            }
            else{
                h2.textContent = "Machines are powerful nowadays..."
                p.textContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
            }
            endOfGame.setAttribute('style', 'display:flex;');
            lastOutcome.textContent = '';
            humanScore = 0;
            computerScore = 0;
            isEnded=true
        }
    })
})


//-----------------NAVIGATION AFTER THE MATCH-----------------

const playAgain = document.querySelector('.play-again');
const backToMain = document.querySelector('.back-to-main');

playAgain.addEventListener('click', ()=>{
    endOfGame.setAttribute('style', 'display:none;')
    scoreDisplay.textContent = '0:0';
    isEnded = false
})

backToMain.addEventListener('click', ()=>{
    endOfGame.setAttribute('style', 'display:none;')
    menuContainer.setAttribute('style', 'display:flex;');
    gameContainer.setAttribute('style', 'display:none;')
    body.setAttribute('style','backdrop-filter: 0');
    scoreDisplay.textContent = '0:0';
    isEnded = false
})
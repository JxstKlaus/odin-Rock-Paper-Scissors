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

//play button
//switchig overlays

const playButton = document.querySelector('.play-button')
const menuContainer = document.querySelector('.menu-container')
const gameContainer = document.querySelector('.game-container')

const rounds = parseInt(mode.textContent.at(-1))
playButton.addEventListener('click', ()=>{
    menuContainer.setAttribute('style', 'display:none;');
    gameContainer.setAttribute('style', 'display:flex;')
    
})

//selecting computer weapon
getComputerChoice = () => ["sword", "bow", "shield"][Math.floor(Math.random()*3)];


//simulating round logic
playRound = (h,c) => {
    if ((h === "bow" && c === "sword") || (h === "shield" && c === "bow") || (h === "sword" && c === "shield")) return "win"
    else if (h === c) return "draw"
    else return "loss"
}


//playig the game
const hands = document.querySelectorAll('.hands .player_');
const scoreDisplay = document.querySelector('.score-display');
const lastOutcome = document.querySelector('.last-outcome');

let playedRounds = 0;
let humanScore = 0;
let computerScore = 0;

hands.forEach((hand)=>{
    hand.addEventListener('click', ()=>{
        playerChoice = hand.firstChild.alt
        //hand.firstChild.setAttribute('style', 'border:1px; border-style:solid; border-color: green')

        let outcome = playRound(playerChoice, getComputerChoice());
        console.log(outcome)
        if (outcome === 'win') humanScore++
        else if (outcome === 'loss') computerScore++

        scoreDisplay.textContent = `${humanScore}:${computerScore}`;
        lastOutcome.textContent = outcome + '!'

        if (humanScore >= rounds || computerScore >= rounds){
            menuContainer.setAttribute('style', 'display:flex;');
            gameContainer.setAttribute('style', 'display:none;')
        }
    })
})
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

const rounds = parseInt(mode.textContent.at(-1))
playButton.addEventListener('click', ()=>{
    menuContainer.setAttribute('style', 'display:none;');
    gameContainer.setAttribute('style', 'display:flex;');
    body.setAttribute('style','backdrop-filter: blur(4px)');
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
const hands = document.querySelectorAll('.player_');
const scoreDisplay = document.querySelector('.score-display');
const lastOutcome = document.querySelector('.last-outcome');

hands.forEach((hand) => {
    hand.addEventListener('mouseenter', () => {
        hand.setAttribute('style', 'border:5px; border-style:solid; rgba(255, 255, 255, 1); border-radius: 8px')
    })
})

hands.forEach((hand) => {
    hand.addEventListener('mouseleave', () => {
        hand.setAttribute('style', 'border: trasparent')
    })
})

let playedRounds = 0;
let humanScore = 0;
let computerScore = 0;

hands.forEach((hand)=>{
    hand.addEventListener('click', ()=>{
        //getting the round output 
        playerChoice = hand.firstChild.alt
        let outcome = playRound(playerChoice, getComputerChoice());
        console.log(outcome)

        if (outcome === 'win'){
            humanScore++
            hand.setAttribute('style', 'border:5px; border-style:solid; border-color: green; border-radius: 8px')
        }
        else if (outcome === 'loss'){
            computerScore++
            hand.setAttribute('style', 'border:5px; border-style:solid; border-color: red; border-radius: 8px')
        }
        else hand.setAttribute('style', 'border:5px; border-style:solid; border-color: yellow; border-radius: 8px') 

        //waiting 0.5 sec to turn back border to invisible
        setTimeout(function() {
            hand.setAttribute('style', 'border:5px; border-style:solid; border-color: rgba(255, 255, 255, 0); border-radius: 8px;')
        }, 700);

        //displaying score
        scoreDisplay.textContent = `${humanScore}:${computerScore}`;
        lastOutcome.textContent = outcome + '!'

        //if game ends
        if (humanScore >= rounds || computerScore >= rounds){
            lastOutcome.textContent = '';
            playedRounds = 0;
            humanScore = 0;
            computerScore = 0;
            scoreDisplay.textContent = '0:0';
            menuContainer.setAttribute('style', 'display:flex;');
            gameContainer.setAttribute('style', 'display:none;')
        }
    })
})
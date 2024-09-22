getComputerChoice = () => ["rock", "paper", "scissors"][Math.floor(Math.random()*3)];

getPlayerChoice = () => {
    let choice = prompt("Choose one: rock, paper, scissors").toLowerCase();
    return choice === "rock" || choice === "paper" || choice === "scissors" ? choice : getPlayerChoice()
}

playRound = (h,c) => {
    if ((h === "paper" && c === "rock") || (h === "rock" && c === "scissors") || (h === "scissors" && c === "paper")) return "win"
    else if (h === c) return "draw"
    else return "loss"
}

playGame = (rounds) => {
    let humanScore = 0;
    let computerScore = 0;
    let h,c

    for (let i=0; i<rounds; i++){
        h = getPlayerChoice()
        c = getComputerChoice()
        let outcome = playRound(h,c)

        if (outcome === "win") {
            humanScore++
            alert(`You won ${h} beats ${c}`)
        } else if (outcome === "loss") {
            computerScore++
            alert(`You won ${h} beats ${c}`)
        } else alert("It's a draw")
    }
    
}


//playGame(5);


//mode dropdown menu

const modeButton = document.querySelector('.mode');
const dropdownContent = document.querySelector('.dropdown-content')
const mode = document.querySelector('.mode')
const rounds = document.querySelectorAll('.rounds')


modeButton.addEventListener('click', ()=>{
    const dropdownToggle = dropdownContent.getAttribute("style","display")

    if (dropdownToggle == 'display:block;') dropdownContent.setAttribute("style","display:none;")
    else dropdownContent.setAttribute("style","display:block;")
});

rounds.forEach((item) =>{
    item.addEventListener('click', () =>{
        mode.textContent = 'Mode: ' + item.textContent
        dropdownContent.setAttribute("style","display:none;")
    })
});
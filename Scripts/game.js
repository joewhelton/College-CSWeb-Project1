function game (){
    //Variables
    let player = {
        currentChoice: null,
        currentScore: 0,
        username: ''
    };
    let computer = {
        currentChoice: null,
        currentScore: 0,
    };

    let gameInProgress = null;

    const setPlayerChoice = (choice) => {
        player.currentChoice = (choice || null);
        $('#playerChoice').text(choice);
    }

    //event listeners
    const handleUserChoice = (e) =>{
        if(!gameInProgress) {
            gameInProgress = true;
            //console.log(e.currentTarget.id);
            setPlayerChoice(e.currentTarget.id);
        }
    }

    const makeComputerChoice = () => {
        const choices = ['rock', 'paper', 'scissors'];

    }

    //attach event listeners
    this.attachEventListeners = () => {
        $('.game-element').click(handleUserChoice);
    }

}

let gameInstance = new game();

$(document).ready(()=>{
    gameInstance.attachEventListeners();
})
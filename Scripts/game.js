function Game (){
    //Variables
    let player = {
        currentChoice: null,
        currentScore: 0,
        username: 'User'    //TODO set player name properly
    };
    let computer = {
        currentChoice: null,
        currentScore: 0,
        username: 'Computer'
    };

    let gameInProgress = null;

    const setPlayerChoice = (choice) => {
        player.currentChoice = (choice || null);
        $('#playerChoice').text(choice);
    }

    const incrementPlayerScore = () => {
        $('#playerScore').text(++player.currentScore);
    }

    const incrementComputerScore = () => {
        $('#computerScore').text(++computer.currentScore);
    }

    const setComputerChoice = (choice) => {
        computer.currentChoice = (choice || null);
        $('#computerChoice').text(choice);
    }

    //event listeners
    const handleUserChoice = (e) =>{
        if(!gameInProgress) {
            gameInProgress = true;
            //console.log(e.currentTarget.id);
            setPlayerChoice(e.currentTarget.id);
            makeComputerChoice();
        }
    }

    const makeComputerChoice = () => {
        const choices = ['rock', 'paper', 'scissors'];
        setComputerChoice(
            choices[
                Math.floor(Math.random() * choices.length)
            ]
        );
        calculateResult();
    }

    const calculateResult = () => {
        let result = compareChoices(player.currentChoice, computer.currentChoice);
        if (result === 0){
            $('#gameResult').text('Draw!');
        } else if (result === 1){
            $('#gameResult').text(`${player.username}!`);
            incrementPlayerScore();
        } else {
            $('#gameResult').text(`${computer.username}!`);
            incrementComputerScore();
        }
        gameInProgress = false;
    }

    const compareChoices = (player1, player2) => {
        //Returns 1 of Player 1 beats Player 2, -1 if Player 2 beats Player 1, and 0 for a draw
        if(player1 === player2){
            return 0;
        }
        switch(player1){
            case 'rock':
                return (player2 === 'scissors' ? 1 : -1);
            case 'paper':
                return (player2 === 'rock' ? 1 : -1);
            case 'scissors' :
                return (player2 === 'paper' ? 1 : -1);
        }
    }

    //attach event listeners
    this.attachEventListeners = () => {
        $('.game-element').click(handleUserChoice);
    }

}

let gameInstance = new Game();

$(document).ready(()=>{
    gameInstance.attachEventListeners();
})
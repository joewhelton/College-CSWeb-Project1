function Game (username){
    //Variables
    let player = {
        currentChoice: null,
        currentScore: 0,
        username: username || 'User'
    };
    let computer = {
        currentChoice: null,
        currentScore: 0,
        username: 'Computer'
    };

    let roundInProgress = null; //Flag to stop user clicking again while computer is "thinking" etc
    let gamesToWin = 3;
    let gameOver = false;
    let round = 1;

    const setPlayerChoice = (choice) => {
        player.currentChoice = (choice || null);
        $(`div.card-${choice}`).addClass('player-selected');
        $('#playerChoice').text(choice);
    }

    const setComputerChoice = (choice) => {
        $('div.card.computer-selected').removeClass('computer-selected');
        computer.currentChoice = (choice || null);
        $(`div.card-${choice}`).addClass('computer-selected');
        $('#computerChoice').text(choice);
    }

    const incrementPlayerScore = () => {
        $('#playerScore').text(++player.currentScore);
        if(player.currentScore === gamesToWin){
            gameOver = true;
            $('#modalTitle').text(`${player.username} Wins!`);
            $('.winner-image').hide();
            $('#winnerPlayerImage').show();
            $('#winningModal').modal('show');
        }
    }

    const incrementComputerScore = () => {
        $('#computerScore').text(++computer.currentScore);
        if(computer.currentScore === gamesToWin){
            gameOver = true;
            $('#modalTitle').text(`${computer.username} Wins!`);
            $('.winner-image').hide();
            $('#winnerComputerImage').show();
            $('#winningModal').modal('show');
        }
    }

    //event listeners
    const handleUserChoice = (e) =>{
        $('.game-element').css('cursor', 'not-allowed').prop('title', 'Round already in progress');
        if(!roundInProgress) {
            roundInProgress = true;
            //console.log(e.currentTarget.id);
            setPlayerChoice(e.currentTarget.id);
            makeComputerChoice();
        }
    }

    const makeComputerChoice = () => {
        $('#computerChoice').text("Thinking...");
        const choices = ['rock', 'paper', 'scissors'];
        let choiceIndex = 0;
        let thinkingInterval = setInterval(() => {
            $('div.card.computer-selected').removeClass('computer-selected');
            $(`div.card-${choices[choiceIndex++ % choices.length]}`).addClass('computer-selected');
        }, 200);

        setTimeout(()=> {
            clearInterval(thinkingInterval)
            setComputerChoice(
                choices[
                    Math.floor(Math.random() * choices.length)
                    ]
            );
            calculateResult();
        }, 2000)
    }

    const calculateResult = () => {
        let result = compareChoices(player.currentChoice, computer.currentChoice);
        if (result === 0){
            $('#gameResult').removeClass().addClass('combined-color').text('Draw!');
        } else if (result === 1){
            setTimeout(()=>{
                $('#gameResult').removeClass().addClass('player-color').text(`${player.username}!`);
                $(`#winning-animation-${computer.currentChoice}`)
                    .html(`<img src='Assets/${player.currentChoice}.svg' alt='Winning animation image'>`)
                    .fadeIn(1000, () => {
                        incrementPlayerScore();
                    });
            }, 1000)
        } else {
            setTimeout(()=> {
                $('#gameResult').removeClass().addClass('computer-color').text(`${computer.username}!`);
                $(`#winning-animation-${player.currentChoice}`)
                    .html(`<img src='Assets/${computer.currentChoice}.svg' alt='Winning animation image'>`)
                    .fadeIn(1000, ()=>{
                        incrementComputerScore();
                    });
            }, 1000);
        }
        setTimeout(()=>{
            if(!gameOver) {
                resetGameElements();
            }
        }, 3000);
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

    const resetGameElements = () => {
        $('#roundNumber').text(++round);
        $('div.card').removeClass('computer-selected player-selected');
        $('.winning-animation').html('').hide();
        $('#playerChoice, #computerChoice, #gameResult').text('');
        roundInProgress = false;
        $('.game-element').css('cursor', 'pointer');
    }

    this.newGame = () => {
        gameOver = false;
        player.currentScore = 0;
        computer.currentScore = 0;
        round = 0;
        $('#scorePanel span').text('0');
        resetGameElements();
    }

    //attach event listeners
    this.attachEventListeners = () => {
        $('.game-element').click(handleUserChoice);
    }
}

const logout = () => {
    localStorage.setItem('username', '');
    window.location.href = './index.html';
}

let gameInstance;

$(document).ready(()=>{
    const username = localStorage.getItem('username');
    if(!username){
        window.location.href = './index.html';
    } else {
        gameInstance= new Game(username);
        gameInstance.attachEventListeners();
    }
})
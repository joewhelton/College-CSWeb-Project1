$(document).ready(()=>{
    const username = localStorage.getItem('username');
    if(username){
        window.location.href = './game.html';
    }
    $('#registrationForm').submit(handleSubmit);
});

const handleSubmit = (e) => {
    e.preventDefault();
    const username = $('#txtUsername').val()
    if(username){
        localStorage.setItem('username', username);
        window.location.href = './game.html';
    }
}
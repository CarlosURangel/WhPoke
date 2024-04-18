function cerrarSeccion(selector) {
    const seccion = document.querySelector(selector);
    if (seccion) {
        seccion.classList.remove('clase-para-mostrar');
    }
}

const openModalInfo = document.querySelector('.info-button');
const modalInfo = document.querySelector('.modal-info');
const closeModalInfo = document.querySelector('.modal-info-close');

openModalInfo.addEventListener('click', (e)=>{
    e.preventDefault();
    modalInfo.classList.add('modal-info-show');
});

closeModalInfo.addEventListener('click', (e)=>{
    e.preventDefault();
    modalInfo.classList.remove('modal-info-show');
});

const openModalMenu = document.querySelector('.menu-button');
const modalMenu = document.querySelector('.modal-menu');
const closeModalMenu = document.querySelector('.modal-menu-close');

openModalMenu.addEventListener('click', (e)=>{
    e.preventDefault();
    modalMenu.classList.add('modal-menu-show');
})

closeModalMenu.addEventListener('click', (e)=>{
    e.preventDefault();
    modalMenu.classList.remove('modal-menu-show');
});

const openGuesspokemon = document.querySelector('.pokemon-a');
const GuessThePokemon = document.querySelector('.guessThePokemon');

openGuesspokemon.addEventListener('click', (e) => {
    e.preventDefault();
    GuessThePokemon.classList.add('guessThePokemon-show');
});

openGuesspokemon.addEventListener('click', (e)=>{
    e.preventDefault();
    modalMenu.classList.remove('modal-menu-show');
});

openGuesspokemon.addEventListener('click', (e) => {
    e.preventDefault();
    TicTacToe.classList.remove('modal-tic-tac-toe-show'); 

});


const openTicTac = document.querySelector('.tic-tac-toe-a');
const TicTacToe = document.querySelector('.modal-tic-tac-toe');

openTicTac.addEventListener('click', (e) => {
    e.preventDefault();
    TicTacToe.classList.add('modal-tic-tac-toe-show'); 
});

openTicTac.addEventListener('click', (e)=>{
    e.preventDefault();
    modalMenu.classList.remove('modal-menu-show');
});

openTicTac.addEventListener('click', (e)=>{
    e.preventDefault();
    GuessThePokemon.classList.remove('guessThePokemon-show');
});
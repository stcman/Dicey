
let scInp = prompt('Please enter a score limit');
let scLimit = scInp && !isNaN(scInp) ? parseInt(scInp) : 50; //if not number or nothing set default score
let dice;
let Rsc1 = 0;
let Rsc2 = 0;
let Gsc1 = 0;
let Gsc2 = 0;

document.querySelector('.dice').style.display = 'none';

function updSc1() { //updated player 1 score
    dice = Math.floor((Math.random() * 6) + 1);
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = `dice-${dice}.png`;

    if(dice === 1){
        Rsc1 = 0;
        nextTurn();
    }else{
        Rsc1 = Rsc1 + dice;
    }
        document.querySelector('#current-0').innerHTML = Rsc1;
}

function updSc2(){ //updated player 2 score
    dice = Math.floor((Math.random() * 6) + 1);
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = `dice-${dice}.png`;

    if(dice === 1){
        Rsc2 = 0;
        nextTurn();
    }else{
        Rsc2 = Rsc2 + dice;
    }

    document.querySelector('#current-1').innerHTML = Rsc2;
}

function player1(){
    document.querySelector('.btn-roll').addEventListener('click', updSc1);
}

function player2(){
    document.querySelector('.btn-roll').addEventListener('click', updSc2);
}


function nextTurn (){
    if($(".player-0-panel").hasClass("active") === true){
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.btn-roll').removeEventListener('click', updSc1);
        Gsc1 = Gsc1 + Rsc1; // Add round score to global score
        Rsc1 = 0;
        document.querySelector('#current-0').innerHTML = 0;
        document.querySelector('#score-0').innerHTML = Gsc1;
        player2();
    }else{
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.btn-roll').removeEventListener('click', updSc2);
        Gsc2 = Gsc2 + Rsc2;
        Rsc2 = 0;
        document.querySelector('#current-1').innerHTML = 0;
        document.querySelector('#score-1').innerHTML = Gsc2;
        document.querySelector('.btn-roll').removeEventListener('click', updSc2);
        player1();
    }

    if(Gsc1 > scLimit){ //player 1 wins
        document.querySelector('#name-0').innerHTML = `Winner!`;
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('winner');
        document.querySelector('.btn-roll').removeEventListener('click', updSc1);
        document.querySelector('.btn-roll').removeEventListener('click', updSc2);
        document.querySelector('.btn-hold').removeEventListener('click', nextTurn);
    }else if(Gsc2 > scLimit){ //playser 2 wins
        document.querySelector('#name-1').innerHTML = `Winner!`;
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('winner');
        document.querySelector('.btn-roll').removeEventListener('click', updSc1);
        document.querySelector('.btn-roll').removeEventListener('click', updSc2);
        document.querySelector('.btn-hold').removeEventListener('click', nextTurn);
    }
}


document.querySelector('.btn-new').addEventListener('click', () => { //reset all variables and styles

    Rsc1 = 0;
    Rsc2 = 0;
    Gsc1 = 0;
    Gsc2 = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#current-0').innerHTML = Rsc1;
    document.querySelector('#current-1').innerHTML = Rsc2;
    document.querySelector('#score-0').innerHTML = Gsc1;
    document.querySelector('#score-1').innerHTML = Gsc2;
    document.querySelector('#name-0').innerHTML = `Player 1`;
    document.querySelector('#name-1').innerHTML = `Player 2`;

        if($(".player-0-panel").hasClass("active") === true){
            player1();
        }else{
            player2();
        }
        
        document.querySelector('.btn-hold').addEventListener('click', nextTurn);
        
});





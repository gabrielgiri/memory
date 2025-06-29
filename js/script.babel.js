'use strict';

var cardsArray = [{
  'name': 'shell',
  'img': 'img/blueshell.png'
}, {
  'name': 'star',
  'img': 'img/star.png'
}, {
  'name': 'bobomb',
  'img': 'img/bobomb.png'
}, {
  'name': 'nina',
  'img': 'img/nina.png'
}, {
  'name': 'luigi',
  'img': 'img/luigi.png'
}, {
  'name': 'peach',
  'img': 'img/peach.png'
}, {
  'name': '1up',
  'img': 'img/1up.png'
}, {
  'name': 'mushroom',
  'img': 'img/mushroom.png'
}, {
  'name': 'thwomp',
  'img': 'img/thwomp.png'
}, {
  'name': 'bulletbill',
  'img': 'img/bulletbill.png'
}, {
  'name': 'coin',
  'img': 'img/coin.png'
}, {
  'name': 'goomba',
  'img': 'img/goomba.png'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});


// Crear la barra de progreso
var timerWrapper = document.createElement('div');
timerWrapper.style.width = '100%';
timerWrapper.style.height = '25px';
timerWrapper.style.backgroundColor = '#ccc';
timerWrapper.style.borderRadius = '4px';
timerWrapper.style.overflow = 'hidden';
timerWrapper.style.margin = '20px 0';

var timerBar = document.createElement('div');
timerBar.style.height = '100%';
timerBar.style.width = '100%'; // Comienza llena
timerBar.style.backgroundColor = '#4caf50'; // Verde
timerBar.style.transition = 'width 1s linear';

timerWrapper.appendChild(timerBar);
game.insertBefore(timerWrapper, grid);

// Iniciar temporizador
var totalTime = 120;
var timeLeft = totalTime;

var timerInterval = setInterval(function () {
  timeLeft--;

  var percent = (timeLeft / totalTime) * 100;
  timerBar.style.width = percent + '%';

  // Cambiar color visualmente según urgencia
  if (timeLeft <= 10) {
    timerBar.style.backgroundColor = 'red';
  } else if (timeLeft <= 30) {
    timerBar.style.backgroundColor = 'orange';
  }

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    timerBar.style.width = '0%';
    grid.style.pointerEvents = 'none';
    alert('¡Se acabó el tiempo!');
  }
}, 1000);
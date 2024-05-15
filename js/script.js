let secretNumber;
let attempts;
let isGameOver;

function newGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  isGameOver = false;
  updateAttempts();
  setMessage('Estou pensando em um número entre 1 e 100. Você consegue adivinhar qual é?');
  updateHint(); 
}

function updateHint() {
  const midpoint = Math.floor((1 + 100) / 2);
  const hint = secretNumber < midpoint ? 'O número é menor que ' + midpoint : 'O número é maior que ' + midpoint;
  document.getElementById('hint').innerText = hint;
}

function checkGuess() {
  if (isGameOver) {
    setMessage('O jogo acabou. Clique em "Jogar Novamente" para começar um novo jogo.');
    return;
  }

  const guess = parseInt(document.getElementById('guessField').value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    setMessage('Por favor, digite um número válido entre 1 e 100.');
    return;
  }

  attempts--;
  updateAttempts();

  if (guess === secretNumber) {
    gameOver(true);
  } else if (attempts === 0) {
    gameOver(false);
  } else {
    const message = guess < secretNumber ? 'Tente um número maior.' : 'Tente um número menor.';
    setMessage(message);
  }
}

function updateAttempts() {
  document.getElementById('attempts').innerText = `Tentativas restantes: ${attempts}`;
}

function setMessage(message) {
  document.getElementById('guessMessage').innerText = message;
}

function gameOver(isWin) {
  isGameOver = true;
  const message = isWin ? 'Parabéns! Você acertou o número.' : `Game over. O número correto era ${secretNumber}.`;
  setMessage(message);
}

function resetGame() {
  newGame();
}

newGame();

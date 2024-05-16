let secretNumber;
let attempts;
let isGameOver;

function newGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  isGameOver = false;
  updateAttempts();
  setMessage('Estou pensando em um número entre 1 e 100. Você consegue adivinhar qual é?');
  updateHint(); // Adiciona a chamada para atualizar a dica
}

function updateHint() {
  let hint = '';
  // Dica de par ou ímpar
  hint += secretNumber % 2 === 0 ? 'O número é par. ' : 'O número é ímpar. ';
  
  // Dica de intervalo
  if (secretNumber <= 25) {
    hint += 'O número está entre 1 e 25.';
  } else if (secretNumber <= 50) {
    hint += 'O número está entre 26 e 50.';
  } else if (secretNumber <= 75) {
    hint += 'O número está entre 51 e 75.';
  } else {
    hint += 'O número está entre 76 e 100.';
  }

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

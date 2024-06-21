const words = ['HANGMAN', 'COMPUTER', 'JAVASCRIPT', 'DEVELOPER', 'PROGRAMMING'];
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let incorrectGuesses = 0;
let gameStatus = 'ongoing';

const renderWord = () => {
  const wordElement = document.getElementById('word');
  wordElement.innerHTML = '';
  word.split('').forEach(letter => {
    if (guessedLetters.includes(letter)) {
      wordElement.innerHTML += `${letter} `;
    } else {
      wordElement.innerHTML += '_ ';
    }
  });
};

const renderLetters = () => {
  const lettersElement = document.getElementById('letters');
  lettersElement.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    lettersElement.innerHTML += `<button onclick="handleGuess('${letter}')">${letter}</button>`;
  }
};

const renderHangman = () => {
  const hangmanElement = document.getElementById('hangman');
  hangmanElement.textContent = `Incorrect Guesses: ${incorrectGuesses}/6`;
};

const checkGameStatus = () => {
  if (gameStatus === 'ongoing' && incorrectGuesses >= 6) {
    gameStatus = 'lost';
  }
  if (gameStatus === 'ongoing' && word.split('').every(letter => guessedLetters.includes(letter))) {
    gameStatus = 'won';
  }
};

const renderStatus = () => {
  const statusElement = document.getElementById('status');
  statusElement.textContent = '';
  if (gameStatus === 'won') {
    statusElement.textContent = 'You won!';
  } else if (gameStatus === 'lost') {
    statusElement.textContent = 'You lost!';
  }
};

const resetGame = () => {
  word = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectGuesses = 0;
  gameStatus = 'ongoing';
  renderWord();
  renderLetters();
  renderHangman();
  renderStatus();
};

const handleGuess = (letter) => {
  if (gameStatus === 'ongoing' && !guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!word.includes(letter)) {
      incorrectGuesses++;
    }
    checkGameStatus();
    renderWord();
    renderHangman();
    renderStatus();
  }
};

document.getElementById('play-again').addEventListener('click', resetGame);

resetGame();

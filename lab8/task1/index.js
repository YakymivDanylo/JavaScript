// Game state
const state = {
    cards: [],
    flippedCards: [],
    matchedCards: [],
    moves: 0,
    timeLeft: 180,
    timer: null,
    gameStarted: false,
    currentPlayer: 0,
    playerNames: ['Гравець 1', 'Гравець 2'],
    currentRound: 1,
    totalRounds: 1,
    gameResults: [],
    difficulty: 'easy',
    rows: 4,
    cols: 4
};

// DOM elements
const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer');
const movesDisplay = document.getElementById('moves');
const currentPlayerDisplay = document.getElementById('current-player');
const currentRoundDisplay = document.getElementById('current-round');
const startBtn = document.getElementById('start-game-btn');
const restartBtn = document.getElementById('restart-btn');
const resetSettingsBtn = document.getElementById('reset-settings-btn');
const difficultySelect = document.getElementById('difficulty');
const playersCountSelect = document.getElementById('players-count');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player2InputContainer = document.getElementById('player2-input');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const roundsInput = document.getElementById('rounds');
const statsPanel = document.getElementById('stats');
const resultsPanel = document.getElementById('results');
const winnerDisplay = document.getElementById('winner');
const resultsBody = document.getElementById('results-body');
const playerInputsContainer = document.getElementById('player-inputs-container');

// Card images (emoji for simplicity, can be replaced with actual images)
const cardImages = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];

// Initialize game
function initGame() {
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', resetGame);
    resetSettingsBtn.addEventListener('click', resetSettings);
    playersCountSelect.addEventListener('change', updatePlayerInputs);

    updatePlayerInputs();
}

// Update player inputs visibility based on players count
function updatePlayerInputs() {
    const playersCount = parseInt(playersCountSelect.value);
    player2InputContainer.style.display = playersCount === 2 ? 'block' : 'none';
}

// Reset settings to default
function resetSettings() {
    difficultySelect.value = 'easy';
    playersCountSelect.value = '1';
    player1Input.value = 'Гравець 1';
    player2Input.value = 'Гравець 2';
    rowsInput.value = '4';
    colsInput.value = '4';
    roundsInput.value = '1';
    updatePlayerInputs();
}

// Start new game
function startGame() {
    // Get settings
    state.difficulty = difficultySelect.value;
    state.rows = parseInt(rowsInput.value);
    state.cols = parseInt(colsInput.value);
    state.totalRounds = parseInt(roundsInput.value);
    state.currentRound = 1;
    state.gameResults = [];

    // Validate grid size (minimum 4 cards, at least 2x2)
    if (state.rows * state.cols < 4 || state.rows < 2 || state.cols < 2) {
        alert('Мінімальний розмір поля - 2x2 (4 карти)');
        return;
    }

    // Check if we have enough card images
    const pairsNeeded = Math.floor(state.rows * state.cols / 2);
    if (pairsNeeded > cardImages.length) {
        alert('Недостатньо унікальних карток для обраного розміру поля');
        return;
    }

    // Set player names
    state.playerNames = [player1Input.value || 'Гравець 1'];
    if (parseInt(playersCountSelect.value) === 2) {
        state.playerNames.push(player2Input.value || 'Гравець 2');
    }

    // Hide settings, show stats
    document.querySelector('.settings-panel').style.display = 'none';
    statsPanel.style.display = 'block';
    resultsPanel.style.display = 'none';

    startRound();
}

// Start a new round
function startRound() {
    // Clear previous round
    if (state.timer) clearInterval(state.timer);

    // Set game parameters based on difficulty
    state.timeLeft = {
        easy: 180,
        normal: 120,
        hard: 60
    }[state.difficulty];

    state.moves = 0;
    state.flippedCards = [];
    state.matchedCards = [];
    state.currentPlayer = 0;
    state.gameStarted = true;

    // Generate cards (pairs)
    const pairsNeeded = Math.floor(state.rows * state.cols / 2);
    const usedImages = cardImages.slice(0, pairsNeeded);
    const cardValues = [...usedImages, ...usedImages].sort(() => Math.random() - 0.5);

    state.cards = cardValues;

    // Render game board
    renderBoard();
    updateStats();

    // Enable restart button
    restartBtn.disabled = false;

    // Start timer
    state.timer = setInterval(updateTimer, 1000);
}

// Render game board
function renderBoard() {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${state.cols}, 1fr)`;

    state.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        if (state.flippedCards.includes(index) || state.matchedCards.includes(index)) {
            cardElement.textContent = card;
            cardElement.classList.add('flipped');
        }

        if (state.matchedCards.includes(index)) {
            cardElement.classList.add('matched');
        }

        cardElement.addEventListener('click', () => handleCardClick(index));
        gameBoard.appendChild(cardElement);
    });
}

// Handle card click
function handleCardClick(index) {
    if (!state.gameStarted ||
        state.matchedCards.includes(index) ||
        state.flippedCards.includes(index) ||
        state.flippedCards.length >= 2) {
        return;
    }

    // Flip the card
    state.flippedCards.push(index);
    renderBoard();

    // Check for match if two cards are flipped
    if (state.flippedCards.length === 2) {
        state.moves++;

        if (state.cards[state.flippedCards[0]] === state.cards[state.flippedCards[1]]) {
            // Match found
            state.matchedCards.push(...state.flippedCards);
            state.flippedCards = [];

            // Check if round is over
            if (state.matchedCards.length === state.cards.length) {
                endRound();
            } else if (state.playerNames.length > 1) {
                // Switch player in multiplayer mode
                state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
            }
        } else {
            // No match, flip back after delay
            setTimeout(() => {
                state.flippedCards = [];
                renderBoard();

                if (state.playerNames.length > 1) {
                    state.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
                }
            }, 1000);
        }

        updateStats();
    }
}

// Update timer
function updateTimer() {
    state.timeLeft--;
    updateStats();

    if (state.timeLeft <= 0) {
        endRound();
    }
}

// Update stats display
function updateStats() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    timerDisplay.textContent = `Час: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    movesDisplay.textContent = `Ходи: ${state.moves}`;
    currentRoundDisplay.textContent = `Раунд: ${state.currentRound} з ${state.totalRounds}`;

    if (state.playerNames.length > 1) {
        currentPlayerDisplay.textContent = `Поточний гравець: ${state.playerNames[state.currentPlayer]}`;
        currentPlayerDisplay.style.display = 'block';
    } else {
        currentPlayerDisplay.style.display = 'none';
    }
}

// End current round
function endRound() {
    clearInterval(state.timer);
    state.gameStarted = false;

    // Calculate round result
    const roundResult = {
        round: state.currentRound,
        moves: state.moves,
        time: state.timeLeft,
        winner: null
    };

    // Determine winner for this round
    if (state.playerNames.length === 1) {
        roundResult.winner = state.playerNames[0];
    } else {
        // In multiplayer, the current player when the round ended wins
        roundResult.winner = state.playerNames[state.currentPlayer];
    }

    state.gameResults.push(roundResult);

    // Check if all rounds are completed
    if (state.currentRound >= state.totalRounds) {
        endGame();
    } else {
        // Start next round
        state.currentRound++;
        setTimeout(startRound, 2000);
    }
}

// End the entire game
function endGame() {
    // Show results panel
    statsPanel.style.display = 'none';
    resultsPanel.style.display = 'block';

    // Determine overall winner
    if (state.playerNames.length === 1) {
        winnerDisplay.textContent = `Гру завершено! Ваш результат: ${state.gameResults[0].moves} ходів.`;
    } else {
        // Count wins for each player
        const wins = {};
        state.playerNames.forEach(name => wins[name] = 0);

        state.gameResults.forEach(result => {
            wins[result.winner]++;
        });

        // Find player with most wins
        let maxWins = 0;
        let overallWinner = '';

        for (const [name, count] of Object.entries(wins)) {
            if (count > maxWins) {
                maxWins = count;
                overallWinner = name;
            }
        }

        winnerDisplay.textContent = `Переможець: ${overallWinner} (${maxWins} з ${state.totalRounds} раундів)`;
    }

    // Fill results table
    resultsBody.innerHTML = '';
    state.gameResults.forEach(result => {
        const row = document.createElement('tr');

        const timeMinutes = Math.floor(({
            easy: 180,
            normal: 120,
            hard: 60
        }[state.difficulty] - result.time) / 60);
        const timeSeconds = ({
            easy: 180,
            normal: 120,
            hard: 60
        }[state.difficulty] - result.time) % 60;
        const timeStr = `${timeMinutes.toString().padStart(2, '0')}:${timeSeconds.toString().padStart(2, '0')}`;

        row.innerHTML = `
                <td>${result.round}</td>
                <td>${result.winner}</td>
                <td>${result.moves}</td>
                <td>${timeStr}</td>
            `;

        resultsBody.appendChild(row);
    });

    // Show settings panel again
    document.querySelector('.settings-panel').style.display = 'block';
}

// Reset current game
function resetGame() {
    if (confirm('Скинути поточну гру та почати спочатку?')) {
        if (state.timer) clearInterval(state.timer);
        startRound();
    }
}

// Initialize the game when page loads
window.onload = initGame;
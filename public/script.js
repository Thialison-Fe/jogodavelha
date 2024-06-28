const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

async function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] === null) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            setTimeout(() => alert(`Jogador ${currentPlayer} venceu!`), 100);
            await updateScore(currentPlayer);
            resetGame();
        } else if (board.every(cell => cell !== null)) {
            setTimeout(() => alert('Empate!'), 100);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

async function updateScore(player) {
    try {
        await fetch('http://localhost:3000/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ player })
        });
    } catch (error) {
        console.error('Error updating score:', error);
    }
}

async function fetchScores() {
    try {
        const response = await fetch('http://localhost:3000/scores');
        const data = await response.json();
        console.log('Scores:', data);
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}

fetchScores();

let player1, player2, currentPlayer;
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;
let aiMode = false;

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function startGame() {
  player1 = document.getElementById('player1').value || "Player 1";
  player2 = document.getElementById('player2').value || "Player 2";
  aiMode = player2.toLowerCase() === "computer";

  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  currentPlayer = "X";
  updateTurnDisplay();
  drawBoard();
}

function drawBoard() {
  const boardElem = document.getElementById("board");
  boardElem.innerHTML = "";
  board.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.textContent = val;
    cell.addEventListener("click", () => handleClick(i));
    boardElem.appendChild(cell);
  });
}

function handleClick(index) {
  if (board[index] || isGameOver) return;

  board[index] = currentPlayer;
  drawBoard();

  if (checkWinner()) {
    document.getElementById("turnDisplay").textContent = `${getCurrentPlayerName()} wins!`;
    isGameOver = true;
    return;
  }

  if (!board.includes("")) {
    document.getElementById("turnDisplay").textContent = "It's a draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnDisplay();

  if (aiMode && currentPlayer === "O") {
    setTimeout(makeAIMove, 500);
  }
}

function makeAIMove() {
  let emptyIndices = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  let bestMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleClick(bestMove);
}

function checkWinner() {
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function getCurrentPlayerName() {
  return currentPlayer === "X" ? player1 : player2;
}

function updateTurnDisplay() {
  document.getElementById("turnDisplay").textContent = `${getCurrentPlayerName()}'s turn (${currentPlayer})`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameOver = false;
  currentPlayer = "X";
  updateTurnDisplay();
  drawBoard();
}

document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const restartButton = document.getElementById("restart-btn");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return gameBoard[a];
      }
    }

    if (gameBoard.every(cell => cell !== "")) {
      return "tie";
    }

    return null;
  };

  const handleClick = (index) => {
    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;

      const winner = checkWinner();
      if (winner) {
        if (winner === "tie") {
          alert("It's a tie!");
        } else {
          alert(`Player ${winner} wins!`);
        }
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
  });

  restartButton.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    cells.forEach(cell => {
      cell.textContent = "";
    });
  });
});

# Tetris Move

**Problem description**

Have the function `TetrisMove(strArr)` take the array of strings `strArr`.

The **first element**, `strArr[0]`, will be a capital letter representing one of the 7 standard Tetris pieces: "I", "J", "L", "O", "S", "T", or "Z".

The **following 12 elements**, `strArr[1]` through `strArr[12]`, will be strings representing the current fill height of the 12 columns of the game board (from left to right, columns 0-11).

## 🎯 Your Goal

Your goal is to find the best possible move to clear the maximum number of horizontal lines. A "move" consists of three steps:

1.  **Rotate:** You can choose any valid orientation of the given piece.
2.  **Position:** You can move the piece horizontally to any valid starting column.
3.  **Drop:** The piece is dropped straight down from the top until it lands.

---

## 📝 Task

You must simulate every possible rotation at every possible horizontal position. For each valid drop, calculate the resulting score (the new minimum board height).

Your function must return the **single highest score** (maximum number of completed lines) achievable from all possible valid moves.

- If no valid drop is possible for the given piece and board, your function should return **0**.
- For the example case `["L", "3", "4", "4", "5", "6", "2", "0", "6", "5", "3", "6", "6"]`, a specific rotation of the "L" piece *can* be dropped to perfectly fill the hole at column 6. This move is valid and since this is the best possible outcome, the function should return **3**.

## Solution
[tetris-move.js](tetris-move.js)

**Note:** The script is self-tested. Tests are included at the bottom of the script file, so you can run the script directly with Node.js to see example outputs.

How to run:
```bash
node tetris-move.js
```

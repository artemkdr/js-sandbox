function TetrisMove(strArr) {
  // 1. Define all piece rotations using [row, col] offsets
  const SHAPES = {
    "I": [
      [[0, 0], [1, 0], [2, 0], [3, 0]], // Vertical
      [[0, 0], [0, 1], [0, 2], [0, 3]]  // Horizontal
    ],
    "J": [
      [[0, 0], [0, 1], [0, 2], [-1, 2]],
      [[0, 0], [0, 1], [1, 1], [2, 1]],
      [[0, 0], [-1, 0], [-1, 1], [-1, 2]],
      [[0, 0], [1, 0], [2, 0], [2, 1]]
    ],
    "L": [
      [[0, 0], [1, 0], [1, 1], [1, 2]],
      [[0, 0], [0, 1], [-1, 1], [-2, 1]],
      [[0, 0], [0, 1], [0, 2], [1, 2]],
      [[0, 0], [-1, 0], [-2, 0], [-2, 1]]
    ],
    "O": [
      [[0, 0], [0, 1], [1, 0], [1, 1]]
    ],
    "S": [
      [[0, 0], [0, 1], [1, 1], [1, 2]],
      [[0, 0], [-1, 0], [-1, 1], [-2, 1]]
    ],
    "T": [
      [[0, 0], [0, 1], [0, 2], [-1, 1]],
      [[0, 0], [0, 1], [1, 1], [-1, 1]],
      [[0, 0], [0, 1], [0, 2], [1, 1]],
      [[0, 0], [-1, 0], [-2, 0], [-1, 1]]
    ],
    "Z": [
      [[0, 0], [0, 1], [-1, 1], [-1, 2]],
      [[0, 0], [1, 0], [1, 1], [2, 1]]
    ]
  };

  // 2. Parse input
  const pieceType = strArr[0];
  const boardHeights = strArr.slice(1).map(Number);
  const rotations = SHAPES[pieceType];
  let maxLinesCleared = 0;

  // create grid representation of the board
  const boardGrid = [];
  const maxHeight = Math.max(...boardHeights);

  for (let row = 0; row < maxHeight; row++) {
    const gridRow = [];
    for (let col = 0; col < boardHeights.length; col++) {
      gridRow.push(boardHeights[col] > row ? 1 : 0);
    }
    boardGrid.push(gridRow);
  }
  // output the board grid for debugging in reverse order (top to bottom)
  //console.log(boardGrid.map(r => r.join("")).reverse().join("\n"));

  // 3. Loop through each rotation
  for (const rotation of rotations) {
    // Find piece width to determine valid drop positions
    let minCol = 0;
    let maxCol = 0;
    for (const [_, col] of rotation) {
      minCol = Math.min(minCol, col);
      maxCol = Math.max(maxCol, col);
    }

    // 4. Loop through each valid horizontal position (column anchor)
    // (from -minCol to 11 - maxCol to keep piece on board)
    for (let colAnchor = - minCol; colAnchor <= boardHeights.length - 1 - maxCol; colAnchor++) {      
      // 5A. Find Landing Row (rowAnchor)
      // The piece stops when any of its blocks hits the floor
      // for its column. The 'rowAnchor' is the highest row
      // any block will settle at.
      let rowAnchor = - Infinity;
      for (const [row, col] of rotation) {
        const finalCol = colAnchor + col;
        // update rowAnchor to be the highest row index
        // that allows the block to land on the current board
        rowAnchor = Math.max(rowAnchor, boardHeights[finalCol] - row);
      }

      // 5B. Create new board grid state
      const newBoard = boardGrid.map(row => [...row]);

      // 5C. Place the piece on the new board
      for (const [row, col] of rotation) {
        const finalCol = colAnchor + col;
        const blockFinalRow = rowAnchor + row;
        while (newBoard.length <= blockFinalRow) {
          // add new row if needed filled with 0s
          newBoard.push([...(new Array(boardHeights.length).fill(0))]);
        }
        newBoard[blockFinalRow][finalCol] = 1;
      }

      // 5D. Calculate cleared lines:
      // it must be the lines with all columns filled
      let linesCleared = 0;
      for (let row = 0; row < newBoard.length; row++) {
        if (newBoard[row].every(cell => cell === 1)) {
          linesCleared++;
        }
      }

      // console.log(newBoard.map(r => r.join("")).reverse().join("\n"));
      // console.log("\n-----------------\n")

      
      // 5E. Update max score
      maxLinesCleared = Math.max(maxLinesCleared, linesCleared);
    }
  }

  // 6. Return the best score found
  // The examples show a number, so we return a number.
  return maxLinesCleared;
}

function assert(input, expected) {
    const result = TetrisMove(input);
    if (result !== expected) {
        console.error(`❌ Assertion failed for input ${input}. Expected ${expected}, got ${result}`);
    } else {
        console.log(`✅ Assertion passed for input ${input}.`);
    }
}

// must be 3
assert(["L", "3", "4", "4", "5", "6", "2", "0", "6", "5", "3", "6", "6"], 3);

// must be 2
assert(["I", "2", "4", "3", "4", "5", "2", "0", "2", "2", "3", "3", "3"], 2);

// must be 0
assert(["O", "4", "3", "2", "3", "5", "1", "0", "1", "2", "4", "3", "4"], 0);

// must be 1
assert(["T", "1", "1", "0", "1", "1", "2", "3", "1", "4", "1", "1", "2"], 1);

// must be 1
assert(["S", "2", "1", "0", "3", "2", "1", "1", "1", "1", "5", "3", "2"], 1);

assert(["Z", "4", "3", "3", "2", "2", "4", "5", "3", "5", "6", "7", "6"], 3);

assert(["J", "3", "0", "4", "2", "3", "4", "4", "2", "3", "5", "5", "3"], 0);

# JavaScript Sandbox
Used for experimenting with JavaScript code snippets and algorithms.

## Tetris Move
**Problem description**

Here is the problem description for the **Tetris Move** challenge.

### 🧱 Problem Description

Have the function `TetrisMove(strArr)` take the array of strings `strArr`.

The **first element**, `strArr[0]`, will be a capital letter representing one of the 7 standard Tetris pieces: "I", "J", "L", "O", "S", "T", or "Z".



The **following 12 elements**, `strArr[1]` through `strArr[12]`, will be strings representing the current fill height of the 12 columns of the game board (from left to right, columns 0-11).

### 🎯 Your Goal

Your goal is to find the best possible move to clear the maximum number of horizontal lines. A "move" consists of three steps:

1.  **Rotate:** You can choose any valid orientation of the given piece.
2.  **Position:** You can move the piece horizontally to any valid starting column.
3.  **Drop:** The piece is dropped straight down from the top until it lands.

---

### 📝 Task

You must simulate every possible rotation at every possible horizontal position. For each valid drop, calculate the resulting score (the new minimum board height).

Your function must return the **single highest score** (maximum number of completed lines) achievable from all possible valid moves.

* If no valid drop is possible for the given piece and board, your function should return **0**.
* For the example case `["L", "3", "4", "4", "5", "6", "2", "0", "6", "5", "3", "6", "6"]`, a specific rotation of the "L" piece *can* be dropped to perfectly fill the hole at column 6. This move is valid and since this is the best possible outcome, the function should return **3**.

## Solution
[tetris-move.js](tetris-move.js)
How to run:
```bash
node tetris-move.js
```


## City Traffic
**Problem description**
Here is the problem description for the **City Traffic** challenge, based on the logic from your solution.

### 🏙️ Problem Description

You are given an undirected graph representing a set of cities. The graph is guaranteed to be a **tree**, meaning there are no cycles, and every city is connected. In this graph, each city is represented by a unique positive integer, and **a city's ID is also its population**.

Your goal is to analyze the traffic flow for *every city* in the graph.

### 🚦 How Traffic is Calculated

For any `targetCity`, consider all the roads connected to it. Each road leads to a `neighbor` city, which is the start of a "branch" or **subtree** (since the graph is a tree).

* The **traffic on a single road** is the **total population of all cities** in the subtree on the other side of that road.
* The **maximum traffic** for the `targetCity` is the **largest** traffic value from any of its connecting roads.

**Example:**
Consider the graph `1 - 2 - 3`.
* Populations are: `P(1)=1`, `P(2)=2`, `P(3)=3`.

1.  **For City 1:**
    * It has one road, to City 2.
    * The subtree at City 2 contains cities {2, 3}.
    * Traffic on this road = P(2) + P(3) = 2 + 3 = 5.
    * **Max Traffic for 1 is 5.**

2.  **For City 2:**
    * It has two roads: one to City 1, one to City 3.
    * Traffic from road to 1: Subtree is {1}. Traffic = P(1) = 1.
    * Traffic from road to 3: Subtree is {3}. Traffic = P(3) = 3.
    * **Max Traffic for 2 is 3** (the max of 1 and 3).

3.  **For City 3:**
    * It has one road, to City 2.
    * The subtree at City 2 contains cities {1, 2}.
    * Traffic on this road = P(1) + P(2) = 1 + 2 = 3.
    * **Max Traffic for 3 is 3.**

### 📝 Task

Write a function `CityTraffic(strArr)` that takes an array of strings `strArr` describing the graph.

**Input Format:**
The input `strArr` is an array of strings, where each string describes a city and its neighbors.
* **Format:** `"cityID:[neighborID1,neighborID2,...]"`
* **Example:** `["1:[2]", "2:[1,3]", "3:[2]"]`

**Output Format:**
Return a single string containing the max traffic for every city, with each result formatted as `"cityID:max_traffic"`.
* The results must be **sorted by city ID** (ascending).
* The results must be **joined by a comma**.
* **Example Output:** `"1:5,2:3,3:3"`

## Solution
[city-traffic.js](city-traffic.js)

It uses optimized methods to handle large trees without exceeding call stack limits in JavaScript, so no recursion used here.
It uses 2 passes in order to optimize the calculations:
1. Post-order traversal to compute subtree populations.
2. Pre-order traversal to compute max traffic for each city.


How to run:
```bash
node city-traffic.js
```




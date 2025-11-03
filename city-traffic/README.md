# City Traffic

**Problem description**

You are given an undirected graph representing a set of cities. The graph is guaranteed to be a **tree**, meaning there are no cycles, and every city is connected. In this graph, each city is represented by a unique positive integer, and **a city's ID is also its population**.

Your goal is to analyze the traffic flow for *every city* in the graph.

## 🚦 How Traffic is Calculated

For any `targetCity`, consider all the roads connected to it. Each road leads to a `neighbor` city, which is the start of a "branch" or **subtree** (since the graph is a tree).

- The **traffic on a single road** is the **total population of all cities** in the subtree on the other side of that road.
- The **maximum traffic** for the `targetCity` is the **largest** traffic value from any of its connecting roads.

### Example
Consider the graph `1 - 2 - 3`.
- Populations are: `P(1)=1`, `P(2)=2`, `P(3)=3`.

1. **For City 1:**
   - It has one road, to City 2.
   - The subtree at City 2 contains cities {2, 3}.
   - Traffic on this road = P(2) + P(3) = 2 + 3 = 5.
   - **Max Traffic for 1 is 5.**
2. **For City 2:**
   - It has two roads: one to City 1, one to City 3.
   - Traffic from road to 1: Subtree is {1}. Traffic = P(1) = 1.
   - Traffic from road to 3: Subtree is {3}. Traffic = P(3) = 3.
   - **Max Traffic for 2 is 3** (the max of 1 and 3).
3. **For City 3:**
   - It has one road, to City 2.
   - The subtree at City 2 contains cities {1, 2}.
   - Traffic on this road = P(1) + P(2) = 1 + 2 = 3.
   - **Max Traffic for 3 is 3.**

## 📝 Task

Write a function `CityTraffic(strArr)` that takes an array of strings `strArr` describing the graph.

**Input Format:**
The input `strArr` is an array of strings, where each string describes a city and its neighbors.
- **Format:** `"cityID:[neighborID1,neighborID2,...]"`
- **Example:** `["1:[2]", "2:[1,3]", "3:[2]"]`

**Output Format:**
Return a single string containing the max traffic for every city, with each result formatted as `"cityID:max_traffic"`.
- The results must be **sorted by city ID** (ascending).
- The results must be **joined by a comma**.
- **Example Output:** `"1:5,2:3,3:3"`


## Solution
[city-traffic.js](city-traffic.js)

### Optimization Approach

The solution is optimized using a two-pass algorithm over the tree:

1. **First Pass (Post-order Traversal):**
   - This pass computes the population of each subtree using a depth-first search (DFS) approach.
   - DFS is an algorithm for traversing or searching tree or graph data structures. It starts at the root and explores as far as possible along each branch before backtracking.
   - In this context, DFS is used to visit all children of a node before processing the node itself (post-order), which allows us to sum up the populations of all descendant nodes efficiently.

2. **Second Pass (Pre-order Traversal):**
   - This pass computes the maximum traffic for each city by considering the populations calculated in the first pass.
   - Pre-order traversal means processing the node before its children, which is useful for propagating information from parent to child.

### Why No Recursion?

JavaScript has a relatively low maximum call stack size, which means deep recursion (as in very deep or wide trees) can easily cause a "Maximum call stack size exceeded" error. To avoid this, the solution uses explicit stacks or iterative methods instead of recursion, ensuring it works efficiently even for very large trees.

This approach guarantees both correctness and performance for any valid input size.

**Note:** The script is self-tested. Tests are included at the bottom of the script file, so you can run the script directly with Node.js to see example outputs.

### 🧪 Self-Creating Tests

There are two built-in tests that generate large trees dynamically:

- **Deep Tree Test:**
   - Creates a tree where each node has exactly one child (a straight line).
   - You can set the number of nodes to test performance and correctness for deep recursion/memoization.

- **Star Tree Test:**
   - Creates a tree where one central node is connected to all other nodes (a star shape).
   - The number of nodes can be set dynamically to test wide branching.

You can adjust the node count in these tests to experiment with different tree sizes and structures.

How to run:
```bash
node city-traffic.js
```

function CityTrafficRecursion(strArr) {
  const adjacencyMap = {};
  const cities = [];
  
  // Maps to store our DP calculations
  const subtreeSum = {}; // Stores result of Pass 1
  const maxTraffic = {}; // Stores the final answer

  // 1. Parse the input (same as before)
  for (const str of strArr) {
    const [cityPopulation, neighborsPopulations] = str.trim().split(":");
    const city = parseInt(cityPopulation.trim());
    const neighbors = neighborsPopulations.replace(/[\[\]]+/g, "").split(",");
    
    adjacencyMap[city] = neighbors[0] === "" ? [] : neighbors.map(Number);
    cities.push(city);
  }

  // Sort cities for final output
  cities.sort((a, b) => a - b);
  const root = cities[0]; // Pick an arbitrary root
  
  // --- PASS 1: Bottom-Up DFS ---
  // Calculates subtreeSum[node] for all nodes
  function dfsSubtree(node, parent) {
    // A city's population is its ID
    let total = node; 
    
    const neighbors = adjacencyMap[node] || [];
    for (const neighbor of neighbors) {
      if (neighbor !== parent) {
        total += dfsSubtree(neighbor, node);
      }
    }
    subtreeSum[node] = total; // Store the result
    return total;
  }

  // Start Pass 1
  const totalGraphSum = dfsSubtree(root, null);

  
  // --- PASS 2: Top-Down DFS ---
  // Calculates maxTraffic[node] for all nodes
  function dfsReroot(node, parent) {
    const neighbors = adjacencyMap[node] || [];
    let traffics = []; // List of traffic values on all roads
    
    // Calculate traffic from all child branches
    for (const neighbor of neighbors) {
      if (neighbor !== parent) {
        traffics.push(subtreeSum[neighbor]);
      }
    }
    
    // Calculate traffic from the parent branch
    if (parent !== null) {
      const trafficFromParent = totalGraphSum - subtreeSum[node];
      traffics.push(trafficFromParent);
    }
    
    // The max traffic is the max of all surrounding branches
    maxTraffic[node] = traffics.length > 0 ? Math.max(...traffics) : 0;
    
    // Recurse to children
    for (const neighbor of neighbors) {
      if (neighbor !== parent) {
        dfsReroot(neighbor, node);
      }
    }
  }
  
  // Start Pass 2
  dfsReroot(root, null);

  
  // --- 4. Format the results ---
  const results = [];
  for (const city of cities) {
    results.push(`${city}:${maxTraffic[city]}`);
  }
  
  return results.join(",");
}

function CityTraffic(strArr) {
  const adjacencyMap = {};
  const cities = [];
  
  // Maps to store our DP calculations
  const subtreeSum = {}; // Stores result of Pass 1
  const maxTraffic = {}; // Stores the final answer
  const parentMap = {};  // Stores parent of each node from Pass 1

  // 1. Parse the input (same as before)
  for (const str of strArr) {
    const [cityPopulation, neighborsPopulations] = str.trim().split(":");
    const city = parseInt(cityPopulation.trim());
    const neighbors = neighborsPopulations.replace(/[\[\]]+/g, "").split(",");
    
    adjacencyMap[city] = neighbors[0] === "" ? [] : neighbors.map(Number);
    cities.push(city);
  }

  // Sort cities for final output
  cities.sort((a, b) => a - b);
  if (cities.length === 0) {
    return "";
  }
  const root = cities[0]; // Pick an arbitrary root
  
  
  // --- PASS 1: Iterative Bottom-Up DFS ---
  // Calculates subtreeSum[node] for all nodes
  
  const postOrder = []; // To store nodes in post-order
  let stack = [[root, null]]; // [node, parent]
  let visited = new Set();

  while (stack.length > 0) {
    const [node, parent] = stack.pop();

    if (visited.has(node)) {
      continue;
    }
    visited.add(node);
    
    parentMap[node] = parent;
    postOrder.push(node); // Add to post-order list
    
    const neighbors = adjacencyMap[node] || [];
    for (const neighbor of neighbors) {
      if (neighbor !== parent) {
        stack.push([neighbor, node]);
      }
    }
  }

  // We now have nodes in reverse post-order. Reverse it to get true post-order.
  postOrder.reverse();

  // Now, calculate sums in bottom-up order
  for (const node of postOrder) {
    // A city's population is its ID
    let total = node; 
    const neighbors = adjacencyMap[node] || [];
    for (const neighbor of neighbors) {
      if (neighbor !== parentMap[node]) {
        // Child's sum is already computed
        total += subtreeSum[neighbor]; 
      }
    }
    subtreeSum[node] = total;
  }
  
  const totalGraphSum = subtreeSum[root];
  
  // --- PASS 2: Iterative Top-Down DFS ---
  // Calculates maxTraffic[node] for all nodes

  stack = [[root, null]]; // [node, parent]
  visited = new Set(); // Reset visited set for second pass

  while (stack.length > 0) {
    const [node, parent] = stack.pop();
    
    if (visited.has(node)) {
      continue;
    }
    visited.add(node);

    // --- Process Node (Pre-order) ---
    const neighbors = adjacencyMap[node] || [];
    let traffics = []; // List of traffic values on all roads
    
    // Calculate traffic from all child branches
    for (const neighbor of neighbors) {
      if (neighbor !== parent) {
        traffics.push(subtreeSum[neighbor]);
      }
    }
    
    // Calculate traffic from the parent branch
    if (parent !== null) {
      const trafficFromParent = totalGraphSum - subtreeSum[node];
      traffics.push(trafficFromParent);
    }
    
    maxTraffic[node] = traffics.length > 0 ? callStackSafeMax(traffics) : 0;
    // --- End Processing ---

    // Add children to stack
    for (const neighbor of neighbors) {
      if (neighbor !== parent) {
        stack.push([neighbor, node]);
      }
    }
  }
  
  // --- 4. Format the results ---
  const results = [];
  for (const city of cities) {
    results.push(`${city}:${maxTraffic[city]}`);
  }
  
  return results.join(",");
}

function callStackSafeMax(array) {
  if (array.length === 0) {
    return -Infinity;
  }
  if (array.length > 1000) {
    // Use a loop to avoid call stack overflow
    let maxVal = -Infinity;
    for (const val of array) {
      if (val > maxVal) {
        maxVal = val;
      }
    }
    return maxVal;
  }
  return Math.max(...array);
}

function assert(input, expected) {
    const result = CityTraffic(input);
    if (result !== expected) {
        console.error(`❌ Assertion failed for input ${input}. Expected ${expected}, got ${result}`);
    } else {
        console.log(`✅ Assertion passed for input ${input}.`);
    }
}

const startTime = Date.now();
assert(["3:[4,5]", "4:[3]", "5:[3,6]", "6:[5]"], "3:11,4:14,5:7,6:12");
assert(["1:[5]", "2:[5]", "3:[5]", "4:[5]", "5:[1,2,3,4]"], "1:14,2:13,3:12,4:11,5:4");
assert(["1:[2]", "2:[1,3]", "3:[2]"], "1:5,2:3,3:3");
assert(["1:[5]", "2:[5,18]", "3:[5,12]", "4:[5]", "5:[1,2,3,4]", "18:[2]","12:[3]"], "1:44,2:25,3:30,4:41,5:20,12:33,18:27");
assert(["1:[2]", "2:[1]"], "1:2,2:1");
assert(["10:[20]", "20:[10,30]", "30:[20,40]", "40:[30,50]", "50:[40]"], "10:140,20:120,30:90,40:60,50:100");
assert(["1:[2,5]", "2:[1,3]", "3:[2,4]", "4:[3]", "5:[1,6,7]", "6:[5]", "7:[5]"], "1:18,2:19,3:21,4:24,5:10,6:22,7:21");
assert(["100:[50,30,40,200]", "50:[100,75]", "75:[50]", "30:[100]", "40:[100,80]", "80:[40]", "200:[100,10]", "10:[200,5]", "5:[10]"], "5:585,10:575,30:560,40:470,50:465,75:515,80:510,100:215,200:375");

const endTime = Date.now();
console.log(`All assertions done in ${endTime - startTime} ms.`);


/**
 * Test the performance of the star graph structure of large n.
 * @param {*} n 
 */
function testStarGraph(n = 1500) {
  console.log(`Starting: Behemoth Star Graph (N=${n})...`);

  const N = n;
  const input = [];
  const expectedOutput = [];

  // --- Generate Input ---
  const centralNeighbors = [];
  for (let i = 2; i <= N; i++) {
    centralNeighbors.push(i);
    // Add leaf nodes
    input.push(`${i}:[1]`);
  }
  // Add central node
  input.unshift(`1:[${centralNeighbors.join(",")}]`);

  // --- Calculate Expected Output ---
  // Total sum = 1 + 2 + ... + N
  const totalSum = (N * (N + 1)) / 2;

  // For central node "1"
  // Max traffic is the largest leaf, which is N
  expectedOutput.push(`1:${N}`);

  // For all leaf nodes "i"
  for (let i = 2; i <= N; i++) {
    // Traffic is the sum of the entire rest of the graph
    const traffic = totalSum - i;
    expectedOutput.push(`${i}:${traffic}`);
  }

  const expectedString = expectedOutput.join(",");

  // --- Run and Time the Test ---
  console.time("Star Graph Execution Time");
  const result = CityTraffic(input);
  console.timeEnd("Star Graph Execution Time");

  // --- Validate Result ---
  if (result === expectedString) {
    console.log("Result: ✅ PASS");
  } else {
    console.log("Result: ❌ FAIL");
    console.log("\nExpected (snippet):", expectedString.substring(0, 200) + "...");
    console.log("Got (snippet):     ", result.substring(0, 200) + "...");
  }
}


/**
 * Test the performance of a deep chain structure of large n.
 */
function testDeepChain(n = 1500) {
  console.log(`\nStarting: Deep Chain (N=${n})...`);

  const N = n;
  const input = [];
  const expectedOutput = [];

  // --- Generate Input ---
  // Node 1 (leaf)
  input.push("1:[2]");
  // Nodes 2 to N-1 (middle)
  for (let i = 2; i < N; i++) {
    input.push(`${i}:[${i - 1},${i + 1}]`);
  }
  // Node N (leaf)
  input.push(`${N}:[${N - 1}]`);

  // --- Calculate Expected Output ---
  const totalSum = (N * (N + 1)) / 2;
  
  // Pre-calculate sums from left and right
  const sumFromLeft = new Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    sumFromLeft[i] = sumFromLeft[i - 1] + i;
  }

  const getSum = (start, end) => sumFromLeft[end] - sumFromLeft[start - 1];

  for (let i = 1; i <= N; i++) {
    let maxTraffic = 0;
    
    // Traffic from left (neighbor i-1)
    if (i > 1) {
      const trafficLeft = getSum(1, i - 1);
      maxTraffic = Math.max(maxTraffic, trafficLeft);
    }
    
    // Traffic from right (neighbor i+1)
    if (i < N) {
      const trafficRight = getSum(i + 1, N);
      maxTraffic = Math.max(maxTraffic, trafficRight);
    }
    
    expectedOutput.push(`${i}:${maxTraffic}`);
  }

  const expectedString = expectedOutput.join(",");

  // --- Run and Time the Test ---
  console.time("Deep Chain Execution Time");
  const result = CityTraffic(input);
  console.timeEnd("Deep Chain Execution Time");

  // --- Validate Result ---
  if (result === expectedString) {
    console.log("Result: ✅ PASS");
  } else {
    console.log("Result: ❌ FAIL");
    console.log("\nExpected (snippet):", expectedString.substring(0, 200) + "...");
    console.log("Got (snippet):     ", result.substring(0, 200) + "...");
  }
}

testStarGraph(1500000);
testDeepChain(1500000);
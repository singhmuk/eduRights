import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const evalRPN = `
function policeNotation(tokens) {
  const stack = [];
  for (const tok of tokens) {
    if (!isNaN(tok)) {
      stack.push(parseInt(tok));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (tok) {
        case "+":
          stack.push(a + b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "/":
          stack.push(a / b);
          break;
      }
    }
  }
  return stack.pop();
}

console.log(policeNotation(["2", "1", "+", "3", "*"]));
`.trim();

const convertToTitle = `
//Iterative
function fun(){
  const arr=["flower","flow","flight"];
  let result = arr[0];

  for(let i=0;i<arr.length;i++){
    while(arr[i].indexOf(result) !==0){
      result = result.substring(0, result.length-1)
    }
  }
  return console.log(result)
}

fun()


//Recursion
function fun(arr, index=0, result=arr[0]) {
  if (index === arr.length) {
    console.log(result);
    return;
  }

  while (arr[index].indexOf(result) !== 0) {
    result = result.substring(0, result.length - 1);
  }

  fun(arr, index + 1, result);
}

fun(["flower", "flow", "flight"]);


//Stack
function fun(arr) {
  if (arr.length === 0) {
    return "";
  }

  const stack = [...arr[0]];

  for (let i = 1; i < arr.length; i++) {
    while (arr[i].indexOf(stack.join("")) !== 0) {
      stack.pop();
    }
  }

  console.log(stack.join(""));
}

fun(["flower", "flow", "flight"]);
`.trim();

const combinationSum3 = `
function fun(){
  const arr=[-1,2,1,-4];
  let sum=0;

  for(let i=0;i<arr.length;i++){
    sum +=arr[i];
  }
  console.log(sum)
}

fun()


//Recursion
function fun(arr, index = 0) {
  if (arr.length==index) return 0; 
  return arr[index] + fun(arr, index + 1); 
}

console.log(fun([-1, 2, 1, -4]));


//Stack
function fun(arr) {
  let stack = 0;

  while (arr.length > 0) {
    stack += arr.pop();
  }

  console.log(stack);
}

fun([-1, 2, 1, -4]);


//Queue
function fun(arr) {
  let stack = 0;

  while (arr.length > 0) {
    stack += arr.shift();
  }

  console.log(stack);
}

fun([-1, 2, 1, -4]);
`.trim();

const closed3 = `
function fun() {
  const nums = [-1, 3, 2, 5, 10, 4, -2];
  const target = 1;
  let closestSum = 0;
  let closestTriplet = [];

  nums.sort((a,b)=>a-b)
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const currentSum = nums[i] + nums[j] + nums[k];
        
        if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
          closestSum = currentSum;
          closestTriplet = [nums[i], nums[j], nums[k]];
        }
      }
    }
  }

  console.log(closestTriplet);
}

fun();


// 2 pointer approach
function fun() {
  const nums = [-1, 3, 2, 5, 10, 4, -2];
  const target = 1;

  nums.sort((a, b) => a - b);
  let closestSum = 0;
  let closestTriplet = [];

  for (let i = 0; i < nums.length-2; i++) {
    let left = i + 1;
    let right = nums.length-1;

    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right];

      if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
        closestTriplet = [nums[i], nums[left], nums[right]];
      }

      if (currentSum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  console.log(closestTriplet);
}


fun();
`.trim();

const maxSlidingWindow = `
function fun() {
  const arr = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  };

  let digits = '23';
  let result = [];

  let newDigits = digits.split('');
  let one = newDigits[0];
  let two = newDigits[1];

  let arrOne = arr[one];
  let arrTwo = arr[two];

  if (arrOne && arrTwo) {
    for (let i = 0; i < arrOne.length; i++) {
      for (let j = 0; j < arrTwo.length; j++) {
        result.push(arrOne[i] + arrTwo[j]);
      }
    }
  }

  console.log(result);
}

fun();


//Hash table
function fun(digits) {
  const arr = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  };
  const result = [];

  function insert(combination, nextDigits, result) {
    if (nextDigits.length === 0) {
      return result.push(combination);
    }

    const currentLetters = arr[nextDigits[0]];

    for (let i = 0; i < currentLetters.length; i++) {
      insert(combination + currentLetters[i], nextDigits.slice(1), result);
    }
  }

  insert('', digits, result);
  console.log(result);
}

fun('23');
`.trim();

const parenthesis = `
function fun(){
  let left='(';
  let right=')';
  const result=[];

  for(let i=0; i<4; i++){
    if (i % 2 === 0) {
      result.push(left);
    } else {
      result.push(right);
    }
  }

  console.log(result.join('')); 
}

fun();

`.trim();

const generate = `
function fun(n) {
  const result = [];
  const stack = [['', 0, 0]];

  while (stack.length > 0) {
    const [current, open, close] = stack.pop();

    if (current.length === 2 * n) {
      result.push(current);
    } else {
      if (open < n) {
        stack.push([current + '(', open + 1, close]);
      }

      if (close < open) {
        stack.push([current + ')', open, close + 1]);
      }
    }
  }

  return console.log(result);
}

fun(3);
`.trim();

class TopTech extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h2>1. Iterative: </h2>
              Iterative algorithms are algorithms that use loops to 
              repeatedly execute a set of instructions until a specific condition is met.
              <br/>
                
                <ul>
                <b>Advantages:</b>
                <br/>
                  <li><b>Efficiency: </b>Iterative algorithms can be more efficient than recursive algorithms in terms of both time 
              and space complexity. They often require less memory because they don't create 
              a new function call stack for each iteration.</li>
                  <li><b>Predictable Memory Usage: </b>Iterative algorithms usually have a fixed memory footprint, making them more 
                            predictable and less prone to stack overflow errors compared to recursion.</li>
                  <li><b>Faster Execution: </b>In many cases, iterative algorithms can execute faster than their recursive 
                    counterparts.</li>
                  <br/>
                  <b>Disadvantages:</b>
                  <li><b>State Management: </b>In iterative algorithms, you often need to manage and update the state explicitly.</li>
                  <li><b>Inefficient Loops: </b>Inefficient loop structures or suboptimal loop conditions can lead to performance 
                      issues.</li>
                <br/>
                </ul>
                <br/>

                <h3>2. Recursion</h3>
                Is a programming technique where a function calls itself to solve a problem. 
                <ul>
                <b>Advantages:</b>
                <br/>
                  <li><b>Simplicity and Clarity: </b></li>
                  <li><b>Divide and Conquer: </b>Recursive algorithms naturally follow the "divide and conquer" strategy, 
                      breaking a problem into smaller, more manageable parts. This can lead to efficient 
                      solutions for problems like sorting and searching.</li>
                  <li><b>Natural Fit for Certain Problems: </b>Include tree traversal, backtracking, and problems involving nested 
                                    structures.</li>
                  <li><b>Dynamic Programming: </b>Recursion is often used in dynamic programming, a technique for solving complex 
                        problems by breaking them into smaller overlapping subproblems. Recursive 
                        functions can help memoize (store and reuse) the results of subproblems, 
                        leading to optimized solutions.</li>
                  <br/>
                  <b>Disadvantages:</b>
                  <li><b>Performance Overhead: </b>Recursive function calls come with a performance overhead. Each function call 
                        requires additional memory on the call stack, and excessive recursion can lead to 
                        stack overflow errors or slow performance.</li>
                  <li><b>Memory Consumption: </b>Recursive algorithms can consume a significant amount of memory because each 
                      function call adds a new stack frame to the call stack. This can be a problem 
                      for deep or unoptimized recursion.</li>
                <br/>
                </ul>
                <br/>

                <h3>3. Stack</h3>
                <ul>
                <b>Advantages:</b>
                <br/>
                  <li><b>Memory Efficiency: </b>Stacks typically use a small, fixed amount of memory for each item pushed onto the 
                      stack, making them memory-efficient.</li>
                  <li><b>Predictable Behavior: </b>Stack-based algorithms are often more predictable and easier to reason about than 
                        more complex data structures.</li>
                  <li><b>Undo/Redo Functionality: </b>Stacks are useful for implementing undo and redo functionality in applications 
                            where users can perform a series of actions and then reverse or redo them one
                            at a time.</li>
                  <br/>
                  <b>Disadvantages:</b>
                  <br/>
                  <li><b>Limited Data Access: </b>Stacks have limited access patterns; you can only access the top element. This 
                        limitation can be a drawback for problems that require random access to data.</li>
                  <li><b>Additional Memory Overhead: </b>Stacks consume memory for each element pushed onto the stack. In situations 
                              with a large number of stack operations, this can result in additional 
                              memory overhead.</li>
                <br/>
                </ul>
                <br/>

                <h3>4. Queue</h3>
                <ul>
                <b>Advantages:</b>
                <br/>
                  <li><b>Synchronization: </b>In multithreading and multiprocessing environments, queues are often used to safely 
                    synchronize and exchange data between threads or processes. They help avoid race 
                    conditions and ensure orderly communication.</li>
                  <li><b>Buffering: </b>Queues can be used as buffers to manage the flow of data between producers and consumers.</li>
                  <br/>
                  <b>Disadvantages:</b>
                  <li><b>Limited Random Access: </b></li>
                <br/>
                </ul>
                <br/>

                <h3>5. Linked list</h3>
                <ul>
                <b>Advantages:</b>
                <br/>
                  <li><b>Dynamic Memory Allocation: </b></li>
                  <li><b>Insertion and Deletion: </b>Linked lists excel at inserting and deleting elements in constant time (O(1)) 
                          if you have a reference to the node where the operation should take place. This 
                          is in contrast to arrays, where inserting or deleting elements in the middle 
                          can be costly (O(n)).</li>
                  <li><b>Memory Management: </b>Linked lists allocate memory for each node individually. This can lead to more 
                      efficient memory usage compared to arrays.</li>
                  <br/>
                  <b>Disadvantages:</b>
                  <li><b>Not Random Access: </b></li>
                  <li><b>Memory Overhead: </b>Each node in a linked list requires extra memory to store the data and a reference 
                    (pointer) to the next node. </li>
                  <li><b>Reversing Order: </b>Reversing a linked list or iterating in reverse order is not as straightforward as 
                   with arrays, especially in singly linked lists. It may require additional data 
                   structures or modifications to the list.</li>
                <br/>
                </ul>
                <br/>

                <h3>6. Hash table </h3>
                Store key-value pairs.
                <br/>
                <ul>
                <b>Advantages:</b>
                <br/>
                  <li><b>Fast Retrieval: </b>Hash tables provide fast retrieval of values based on their keys. The hashing function 
                  allows for constant-time (O(1)) average-case access, making them ideal for scenarios 
                  where quick data retrieval is required.</li>
                  <li><b>Efficient Insertions and Deletions: </b></li>
                  <li><b>Flexible Key Types: </b>Hash tables can be used with a wide range of key types, including numbers, strings, 
                      objects, and more. </li>
                  <li><b>Data Caching: </b>Hash tables are commonly used for caching data to speed up access to frequently used 
                information. They can quickly determine whether a value is cached or not.</li>
                  <li><b>Implementation in Standard Libraries: </b></li>
                  <br/>
                  <b>Disadvantages:</b>
                  <li>Collisions: Hash collisions occur when two different keys hash to the same location in the table.</li>
                <br/>
                </ul>
                <br/>

                <h3>7. String</h3>
                <ul>
                  <li><b>slice(start, end): </b>end index is exclude.</li>
                  <ul>
                    <li>If you omit the second parameter, the method will slice out the rest of the string.</li>
                    <li>If a parameter is negative, the position is counted from the end of the string.</li>
                  </ul>
                  <br/>
                  <li><b>substring(start, end): </b>The difference is that start and end values less than 0 are treated as 0.</li>
                  <br/>
                  <li><b>replace(searchValue, replaceValue): </b>
                  <ul>
                    <li><b>str.replace(/i/g,'p'): </b>replace aii 'i'.</li>
                  </ul>
                  </li>
                  <br/>
                  <li><b>toUpperCase(): </b></li>
                  <li><b>toUpperCase(): </b></li>
                  <li><b>concat(): </b></li>
                  <li><b>str.charAt(0): </b></li>
                  <li><b>str.charCodeAt(0): </b></li>
                  <li><b>split(): </b>A string can be converted to an array.</li>
                  <li><b>indexOf(): </b>Returns the index (position) the first occurrence of a string in a string.
                  <ul>
                    <li><b>indexOf('i',4): </b>Start search from index 4.</li>
                  </ul>
                  </li>
                  <li><b>lastIndexOf(): </b>Both indexOf(), and lastIndexOf() return -1 if the text is not found.</li>
                  <li><b>search(): </b>Searches a string for a string.</li>
                  <li><b>match(): </b>Returns an array containing the results of matching a string.</li>
                  <li><b>includes(): </b>Returns true if a string contains a specified value.
                  <ul>
                    <li><b>includes('i',4): </b>Start from index 4.</li>
                  </ul>
                  </li>
                  <li><b>startsWith('s'): </b>Returns true if a string begins with a specified value.</li>
                </ul>
                <br/>

                <h3>8. Number</h3>
                <ul>
                  <li><b>num.toString(): </b>Returns a number as a string.</li>
                  <li><b>num.toFixed(2): </b></li>
                  <li><b>num.toPrecision(2): </b>Returns a string, with a number written with a specified length.</li>
                  <li><b>parseInt(): </b></li>
                  <li><b>parseFloat(): </b></li>
                </ul>

                <h3>9. Array</h3>
                <ul>
                  <li><b>join(): </b>Joins all array elements into a string.</li>
                  <ul>
                    <li>toString() converts an array to a string.</li>
                  </ul>
                  <li><b>shift(): </b>Removes the first array element.</li>
                  <li><b>unshift(): </b>Adds a new element to an array (at the beginning).</li>
                  <li><b>concat(): </b>Does not change the existing arrays. It always returns a new array.</li>
                  <li><b>flat(): </b>Creates a new array with sub-array elements concatenated to a specified depth.</li>
                  <li><b>splice(): </b>Adds new items to an array.
                  <ul>
                    <li><b>arr.splice(2,1): </b>Remove 2 index element.</li>
                    <li><b>arr.splice(2,1,7): </b>replace 2 index element with 7.</li>
                  </ul>
                  </li>
                  <br/>
                  <li><b>slice(): </b>Slices out a piece of an array.</li>
                  <li><b>reverse(): </b></li>
                  <li><b>sort(): </b></li>
                  <li><b>Math.max(...arr): </b></li>
                  <li><b>Math.min(...arr): </b></li>
                </ul>
                <br/>

                <h3>10. Math Object</h3>
                <ul>
                  <li><b>Math.round(4.6): </b></li>
                  <li><b>Math.ceil(4.9): </b></li>
                  <li><b>Math.floor(4.9): </b></li>
                  <li><b>Math.sign(-4): </b>Returns negative, null or positive on the basis of number.</li>
                  <li><b>Math.pow(8, 2): </b></li>
                  <li><b>Math.sqrt(64): </b></li>
                  <li><b>Math.abs(x): </b>Returns the absolute (positive) value.</li>
                  <li><b>Math.max(0, 150, 30, 20, -8, -200): </b></li>
                  <li><b>Math.random(): </b>Math.floor(Math.random() * 10)</li>
                </ul>
                <br/>

                <h3>11. Date Objects</h3>
                <ul>
                  <li><b>const d = new Date(): </b></li>
                  <li><b>new Date("2022-03-25"): </b></li>
                  <li><b>new Date("October 13, 2014 11:13:00"): </b></li>
                </ul>
                <br/>

              <h3>1. Find the longest common prefix string amongst an array of strings.</h3>
              <div style={titles}>
                <PrismCode
                  code={convertToTitle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Evaluate Reverse Polish Notation</h3>
              <b>Input: </b>["2", "1", "+", "3", "*"]
              <br />
              <b>Output: </b>9<br />
              <b>Explanation: </b>((2 + 1) * 3) = 9
              <div style={titles}>
                <PrismCode
                  code={evalRPN}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Find Sum of an array.</h3>
              
              <div style={titles}>
                <PrismCode
                  code={combinationSum3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              
              <h3>3. Close 3 sum equal to 1.</h3>
              <div style={titles}>
                <PrismCode
                  code={closed3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Letter Combinations of a Phone Number.</h3>
              <div style={titles}>
                <PrismCode
                  code={maxSlidingWindow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Valid Parentheses.</h3>
              <div style={titles}>
                <PrismCode
                  code={parenthesis}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <br />
              <h3>7. Generate Parentheses.</h3>
              Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
              <div style={titles}>
                <PrismCode
                  code={generate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TopTech);

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

const starSig = `
newLine = \n

// *
// **
// ***
function star(){
  var start="";
  for(let i=0; i<3; i++){
    for(let j=1; j<=(i+1); j++){
      start += "*"
    }
    start +="newLine";
  }
  console.log(start);
}
star();

//   *
//  **
// ***
function star(){
  let n = 3;
  let str = "";
  for (let i = 1; i <= n; i++){
    for (let j=0; j<(n-i); j++){
      str += " ";
    }
    for (let k=0; k<i; k++){
      str += "*";
    }
    str += "newLine";
  }
console.log(str);
}
star();

// ***
// **
// *
function star(){
  var start="";
  for(let i=3; i>0; i--){
    for(let j=(i+1); j>1; j--){
      start += "*"
    }
    start +="newLine";
  }
  console.log(start);
}
star();

// ***
//  **
//   *
function star(){
  let n = 3;
  let str = "";
  for (let i = n; i >= 1; i--){
    for (let j=0; j<(n-i); j++){
      str += " ";
    }
    for (let k=0; k<i; k++){
      str += "*";
    }
    str += "newLine";
  }
console.log(str);
}
star();
`.trim();

const Pyramid = ` 
// Upside pyramid.
function pyraminds() {
  let i, j, k, str = "";

  for (i=0; i<5; i++) {
    for (j=1; j<(5 - i); j++) {
      str += " ";
    }
    for (k=1; k<=(2 * i +1); k++) {
      str += "*";
    }

    str += 'newLine';
  }
  console.log(str)
}

pyraminds();


// downside pyramid.
for (i=1; i<5; i++) {
  for (j=0; j<i; j++) {
    str += " ";
  }
  for (k=(5 - i)*2; k>1; k--) {
    str += "*";
  }

  str += 'newLine';
}
console.log(str)
 `.trim();

const insersonSort = `
const arr = [3, 5, 1, 9, 6, 2, 1];
arr.sort();
console.log(arr);


//2
Time complexity: O(n^2)
Space complexity: O(n)

function minCoin() {
  const arr = [3, 5, 1, 9, 6, 2, 1, -1];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    result.push(arr[i]);
  }
  console.log(result);
}

minCoin();
`.trim();

const mergSort = `
function mergeSort(arr){
    if(arr.length < 2) return arr;
    var middle = Math.floor(arr.length/2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
 }
 
 function merge(left, right){
  var result = [];
    while(left.length && right.length){
      if(left[0] == right[0]){
        result.push(left.shift());
      }
  else{
    result.push(right.shift());}
  }
  
  while(left.length) result.push(left.shift());
  while(right.length) result.push(right.shift());
  console.log(result)
  return result;
 }
 mergeSort([3,2,1])`.trim();

const quicksort = `
function QuickSort(arr){
    if(arr.length <= 1) return arr;
        var pivot = arr[arr.length -1];
        var left = [];
        var right = [];
        for(var i=0;i<arr.length-1;i++){
        if(arr[i] < pivot){
        left.push(arr[i])
      }
    else right.push(arr[i])
    }
    return [...QuickSort(left), pivot, ...QuickSort(right)]
 }
 console.log(QuickSort([5,4,2,7,9]))
 `.trim();

const selectionSort = `function selectionSort(arr){
  var minIdx, temp,
  len = arr.length;
    for(var i = 0; i < len; i++){
    minIdx = i;
      for(var j = i+1; j<len; j++){
        if(arr[j]<arr[minIdx]){
        minIdx = j;
      }
    }
    
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
   }
 
 console.log(arr)
 return arr;
 }
 
 selectionSort([7,5,2,4,3,9]);`.trim();

const Permutations = `
Time complexity:	O(n^3)
Space complexity:	O(n^2)

function arm(str){
  let currentChar = [];
  let remaingChar = [];
  let result = [];

  if(str.length === 0) return "";
  if(str.length === 1) return str;

  for(let i=0; i<str.length; i++){
    currentChar = str[i];
    remaingChar = str.slice(0,i) + str.slice(i+1);
    for(let j=0; j<remaingChar.length; j++){
      result.push(currentChar + arm(remaingChar)[j]);
    }
  }
  return result;
}

console.log(arm('abc'));
  `.trim();

const Pattern = `
let i,j, str="";                                                                    //Square pattern.
for(i=1; i<=5; i++){
  for(j=0; j<5; j++){
    str += "*";
  }
  str += "newLine";
}

console.log(str);


let i, j, str = "";                                                               //Right pascal star pattern.
for (i=1; i<=5; i++) {
  for (j=0; j<i; j++) {
    str += "*";
  }
  str += "newLine";
}

for (i=1; i<=(5-1); i++) {
  for (j=0; j<(5-i); j++) {
    str += "*";
  }
  str += "newLine";
}

console.log(str);
`.trim();

const amount = `
Time complexity: O(ks)
Space complexity:	O(s)

function minCoin(amount, coins) {
  let count = 0;
  for (let i = 0; i < coins.length; i++) {
    while (coins[i] <= amount) {
      amount -= coins[i];
      count++;
    }
  }
  return console.log(count);
}

minCoin(87, [25, 10, 5, 1]);`.trim();

const armstrong = `
  function arm() {
    const num = prompt('Enter a three-digit positive integer: ');
    let sum=0,  remainder=0;
    let temp=num;
  
    while(temp>0){
      remainder = temp%10;
      sum += remainder*remainder*remainder;
      temp = parseInt(temp/10)
    }
  
    if(sum == num){
      console.log('Armstrong', num);
    }
    else{
      console.log('Not an Armstrong', num);
    }
  }
  
  arm()`.trim(); 

const satisfy = `
function isEven(num) {
  return num % 2 === 0;
}

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Function to loop through an array and check if n elements satisfy the condition function
function some(array, n, isCheck) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (isCheck(array[i])) {
      count++;
    }
    if (count === n) {
      return true;
    }
  }
  return false;
}

console.log(some([2, 4, 6], 3, isEven)); // true
console.log(some([2, 3, 4], 3, isEven)); // false
console.log(some([2, 3, 11], 4, isPrime)); // false
console.log(some([2, 3, 5, 9], 3, isPrime)); // true`.trim();

const generates = `
function fibbo() {
  let a = 0;
  let b = 1;

  return function() {
    const result = a;
    const next = a + b;
    a = b;
    b = next;
    return result;
  };
}

let obj = fibbo();
console.log(obj()); // 0
console.log(obj()); // 1
console.log(obj()); // 1
console.log(obj()); // 2
console.log(obj()); // 3
console.log(obj()); // 5
console.log(obj()); // 8
`.trim();

class Logic extends Component {
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
              <h3>1. Star</h3>
              <b>Time Complexity: </b><br/>
              <ul>
                <li>The inner loop runs 1 time for the first iteration of the outer loop, 2 times for the second iteration, and 3 times for the third iteration.</li><br/>
                <li>The number of iterations in the inner loop is 1 + 2 + 3 = 6.</li><br/>
                <li>Therefore, the total number of iterations in the nested loops is 3 (outer loop) * 6 (inner loop) = 18.</li><br/>
                <li>The function would be O(n^2) if the inner for loop iterated n+1 times, and the outer for loop iterated n times. In this case, the total number of iterations would be n * (n+1) = n^2 + n. This is also a quadratic time complexity.</li><br/>
                <li>So, the function is similar to O(n^2), but it is not strictly O(n^2). The difference is that the function's runtime is dependent on the constant 3, instead of the input size n. However, for most practical purposes, the difference is negligible.</li><br/>
              </ul>
              <br/>
              <b>Space Complexity: </b><br/>
              <ul>
                <li>The number of characters stored in the start variable is equal to the number of stars and newlines produced by the nested loops.</li><br/>
                <li>For each iteration of the inner loop, we add one star character to the start variable.</li><br/>
                <li>For each iteration of the outer loop, we add a newline character to the start variable.</li><br/>
                <li>Therefore, the space complexity is directly proportional to the number of stars and newlines produced, which is 3 lines with 1, 2, and 3 stars, respectively. So the space complexity of the star() function can be considered as O(1) or constant space complexity.</li><br/>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={starSig}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Pyramind</h3>
              <div style={titles}>
                <PrismCode
                  code={Pyramid}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Pattern</h3>
              <div style={titles}>
                <PrismCode
                  code={Pattern}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>4. Armstrong Number</h3>
              <ul>
                <li>The time complexity of the arm() function is O(n), where n is the number of digits in the input number. This is because the while loop iterates n times, and each iteration takes constant time.</li><br/>
                <li>The space complexity of the arm() function is O(1), because it only uses a constant amount of memory to store the variables num, sum, remainder, and temp.</li><br/>
                <li>In simple words, the arm() function takes a linear amount of time to run, and it uses a constant amount of space.</li><br/>
                <li>The time complexity is O(n) because the while loop iterates n times. This is the worst-case scenario, where the input number is a three-digit number with all the digits equal to 9.</li><br/>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={armstrong}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Permutations</h3>
              <ul>
                <li>The time complexity of the arm() function is O(n^3), where n is the length of the input string. This is because the for loop iterates n times, and the arm() function is called recursively n times. The recursive call of the arm() function takes O(n^2) time, so the total time complexity is O(n^3).</li><br/>
                <li>The space complexity of the arm() function is O(n^2), because the result array can contain up to n^2 elements.</li><br/>
                <li>In simple words, the arm() function takes a cubic amount of time to run, and it uses a quadratic amount of space.</li><br/>
                <li>The space complexity is O(n^2) because the result array can contain up to n^2 elements. However, the actual space complexity is likely to be lower, because the result array will only contain unique strings.</li><br/>
                <li>The function could be made more efficient by using a memoization technique to store the results of the recursive calls. This would reduce the time complexity to O(n^2).</li><br/>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={Permutations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>
                6. Given an amount of money, return the minimum number of coins
                needed to make that change.
              </b><br/>
              <ul>
                <li>The time complexity of the minCoin() function is O(ks), where k is the amount of money and s is the number of coins. This is because the while loop iterates at most k times, and each iteration takes constant time.</li><br/>
                <li>The space complexity of the minCoin() function is O(s), because it only uses a constant amount of memory to store the variables amount, coins, and count.

</li><br/>
                <li>In simple words, the minCoin() function takes a linear amount of time to run, and it uses a constant amount of space.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={amount}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>7. Sort an Array</h3>
              <b>1: </b><br/>
              <ul>
                <li>The time complexity of the arr.sort() method in JavaScript is O(n log n), where n is the length of the array. This is because the arr.sort() method uses the Timsort algorithm, which is a hybrid of merge sort and insertion sort. Merge sort has a time complexity of O(n log n), and insertion sort has a time complexity of O(n^2). The Timsort algorithm uses merge sort for large arrays, and insertion sort for small arrays.</li><br/>
                <li>The space complexity of the arr.sort() method is O(n), where n is the length of the array. This is because the arr.sort() method sorts the array in place, which means that it does not create a new array.</li><br/>
                <li>In simple words, the arr.sort() method takes a logarithmic amount of time to run, and it uses a linear amount of space.</li><br/>
              </ul>
              <br/>
              <br/>
              <b>2: </b>
              <br/>
              <ul>
                <li>The time complexity of the minCoin() function is O(n^2), where n is the length of the array. This is because the for loop iterates n times, and the inner for loop iterates n times. The total number of iterations is therefore n * n = n^2.</li><br/>
                <li>The space complexity of the minCoin() function is O(n), because it only uses a linear amount of memory to store the variables arr, result, temp, and i, and j.</li><br/>
                <li>In simple words, the minCoin() function takes a quadratic amount of time to run, and it uses a linear amount of space.</li><br/>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={insersonSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>8. Merg Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={mergSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>9. Quick Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={quicksort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>10. Selection Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={selectionSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br/>

              <b>11. Write a function which loops through an array and checks if n of the elements
                of the array satisfy the condition function that is passed</b>
                <br/>
                <br/>
                <i>Write the some function and isEven and isPrime functions</i>
                <br/>
                <br/>
                <ul>
                  <li>console.log(some([2,4,6], 3, isEven)) // should print true</li>
                  <li>console.log(some([2,3,4], 3, isEven)) // should print false</li>
                  <li>console.log(some([2,3,11], 4, isPrime)) // should print false</li>
                  <li>console.log(some([2,3,5,9], 3, isPrime)) // should print true</li>
                </ul>
              <div style={titles}>
                <PrismCode
                  code={satisfy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>12. Write a function whch returns a function that generates fibonacci numbers.
Don't use generators.</h3>
              <div style={titles}>
                <PrismCode
                  code={generates}
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

export default withStyles(styles)(Logic);

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


const insersonSort = `
function fun() {
  const arr = [3, 5, 1, 9, 6, 2, 1, -1];
  const hashSet = new Set(arr);
  const result = [...hashSet].sort((a, b) => a - b);
  console.log(result);
}

fun();
`.trim();

const mergSort = `
function removeDup() {
  const arr = [1, 2, 3, 4, 3,2,1];
  const hash = {};
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (hash[arr[i]]) {
      hash[arr[i]]++;
    } else {
      hash[arr[i]] = 1;
    }
  }
  
  for (let i = 0; i < arr.length; i++) {
    if (hash[arr[i]] === 1) {
      result.push(arr[i]);
    }
  }
  
  console.log(result);
}

removeDup();
`.trim();

const quicksort = `
function uniqueWords(arr) {
  if (arr.length === 0) {
    return [];
  }

  const currentWord = arr[0];
  const remainingWords = arr.slice(1);
  const uniqueRemainingWords = uniqueWords(remainingWords);

  if (!uniqueRemainingWords.includes(currentWord)) {
    return [currentWord, ...uniqueRemainingWords];
  }

  return uniqueRemainingWords;
}

function removeDup() {
  const arr = [1, 2, 3, 4, 3, 2, 1, 0];
  const uniqueArr = uniqueWords(arr);

  console.log(uniqueArr);
}

removeDup();
`.trim();

const selectionSort = `
function sorts(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(Math.random() * arr.length)];
  const left = [], equal = [], right = [];

  for (let num of arr) {
    if (num < pivot) {
      left.push(num);
    } else if (num === pivot) {
      equal.push(num);
    } else {
      right.push(num);
    }
  }

  return [...sorts(left), ...equal, ...sorts(right)];
}

const arr = [0, 9, 8, 7, 6];
console.log(sorts(arr));
`.trim();

const Permutations = `
Time complexity: O(n^2)
Space complexity: O(n)


function combiSum(arr, num) {
  const result = [];
  const sum = new Set();

  for (let i = 0; i < arr.length; i++) {
    const ele = num - arr[i];
    if (sum.has(ele)) {
      result.push([arr[i], ele]);
    }
    sum.add(arr[i]);
  }

  console.log(result);
}

combiSum([2, 1, 4, 3, 5], 7);
`.trim();

const amount = `
Time complexity: O(n)
Space complexity: O(n)

function getCount() {
  var str = 'appleo';
  var hash = {};

  for (var i = 0; i < str.length; i++) {
    var char = str[i].toLowerCase();
    if ('aeiou'.includes(char)) {
      if (hash[char]) {
        hash[char]++;
      } else {
        hash[char] = 1;
      }
    }
  }

  var obj = new Map(Object.entries(hash));
  console.log(obj);
}

getCount();
`.trim();

const armstrong = `
Time complexity: O(n)
Space complexity: O(n)

function fun(num) {
  const newnum = num.toString().split('');
  const hash = newnum.reduce((sum, digit) => {
    const cube = Math.pow(parseInt(digit), newnum.length);
    return sum + cube;
  }, 0);

  if (hash === num) {
    return { type: 'Armstrong', hash: hash };
  } else {
    return { type: 'Not Armstrong', hash: hash };
  }
}

const hash = fun(153);
console.log(hash); `.trim(); 

const satisfy = `
`.trim();

const generates = `
`.trim();

class Logic2 extends Component {
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
              <h3>1. Armstrong Number</h3>
              <ul>
                <li>The time complexity of the fun() function is O(n), where n is the number of digits in the input number. This is because the reduce() function iterates n times, and each iteration takes constant time.</li><br/>
                <li>The space complexity of the fun() function is O(n), because it only uses a linear amount of memory to store the variables newnum, hash, sum, digit, and cube.</li><br/>
                <li>In simple words, the fun() function takes a linear amount of time to run, and it uses a linear amount of space.</li><br/>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={armstrong}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>5. Combination Sum.</h3>
              <ul>
                <li>The time complexity of the combiSum() function is O(n^2), where n is the length of the array. This is because the for loop iterates n times, and the inner for loop iterates n times. The total number of iterations is therefore n * n = n^2.</li><br/>
                <li>The space complexity of the combiSum() function is O(n), because it only uses a linear amount of memory to store the variables arr, result, sum, and ele.</li><br/>
                <li>In simple words, the combiSum() function takes a quadratic amount of time to run, and it uses a linear amount of space.</li><br/>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={Permutations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Occurence of vowel.</h3>
              <ul>
                <li>The time complexity of the getCount() function is O(n), where n is the length of the string. This is because the for loop iterates n times, and each iteration takes constant time.</li><br/>
                <li>The space complexity of the getCount() function is O(n), because it uses a hash table to store the characters and their corresponding counts. The hash table can grow to a maximum size of n, but it will typically be much smaller than that.</li><br/>
                <li>In simple words, the getCount() function takes a linear amount of time to run, and it uses a linear amount of space.</li>
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
              <ul>
                <li><b>Time complexity: </b>O(n), where n is the length of the array arr. This is because the new Set() method iterates over the array arr once, and the sort() method iterates over the array hashSet once.</li><br/>
                <li><b>Space complexity: </b>O(n), where n is the length of the array arr. This is because the new Set() method creates a new set that can store up to n elements, and the sort() method sorts the array hashSet, which can also store up to n elements.</li><br/>
                <li></li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={insersonSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>8. Unique Character</h3>
              <ul>
                <li><b>Time complexity: </b>O(n), where n is the length of the array arr. This is because the for loop iterates over the array arr twice, and each iteration takes constant time.</li><br/>
                <li><b>Space complexity: </b>O(n), where n is the length of the array arr. This is because the hash object can store up to n elements.</li><br/>
                <li>In simple words, the removeDup() function takes a linear amount of time to run, and it uses a linear amount of space.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={mergSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>9. Remove Duplicate words Recursion</h3>
              <ul>
                <li><b>Time complexity: </b>O(n), where n is the length of the array arr. This is because the uniqueWords() function recursively calls itself n times, and each recursive call takes constant time.</li><br/>
                <li><b>Space complexity: </b>O(n), where n is the length of the array arr. This is because the uniqueWords() function stores the results of the recursive calls in a stack, which can grow to a maximum size of n.</li><br/>
                <li>In simple words, the uniqueWords() function takes a linear amount of time to run, and it uses a linear amount of space.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={quicksort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>10. Sort Recursion</h3>
              <ul>
                <li><b>Time complexity: </b>O(n log n), where n is the length of the array arr. This is because the sorts() function recursively sorts the array, and the recursive calls take a logarithmic amount of time.</li><br/>
                <li><b>Space complexity: </b>O(n), where n is the length of the array arr. This is because the sorts() function stores the results of the recursive calls in a stack, which can grow to a maximum size of n.</li><br/>
                <li>In simple words, the sorts() function takes a logarithmic amount of time to run, and it uses a linear amount of space.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={selectionSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11.</h3>
              <div style={titles}>
                <PrismCode
                  code={satisfy}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. </h3>
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

export default withStyles(styles)(Logic2);

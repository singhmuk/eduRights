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
function fun(arr) {
  if(!arr || arr.length === 0) return "";
  let prefix=arr[0];

  for(let i=0;i<arr.length;i++){
    while(arr[i].indexOf(prefix) !==0){
      prefix = prefix.substring(0,prefix.length-1);
    }
  }
  return console.log(prefix);
}


fun(["flower","flow","flight"])
`.trim();

const combinationSum3 = `
function fun() {
  const arr=[-1,2,1,-4];
  let sum=0;

  for(let i=0;i<arr.length;i++){
    if(arr.includes(1)){
      sum = arr.reduce((a,b) => a+b, 0);
    }
  }
console.log(sum)
}

fun()
`.trim();

const closed3 = `
function fun() {
  const nums = [-1, 2, 10, 1, -4];
  const target = 1;
  let closed = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        const sum = nums[i]+nums[j]+nums[k];
        if (Math.abs(sum - target) < Math.abs(closed - target)) {
          closed = sum;
        }
      }
    }
  }

  console.log(closed);
}

fun();
`.trim();

const countDigitOne = `
function countOnes(n) {
  let count = 0;
  for (let i = 0; i <= n; i++) {
    count += i.toString().split("1").length - 1;
  }
  return console.log(count);
}

countOnes(16);

`.trim();

const maxSlidingWindow = `
function fun(num) {
  if (!num || num.length === 0) return [];

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
  const result = [''];

  for (let i = 0; i < num.length; i++) {
    const digit = num[i];
    const letters = arr[digit];
    const newResult = [];

    for (let j = 0; j < result.length; j++) {
      for (let k = 0; k < letters.length; k++) {
        newResult.push(result[j] + letters[k]);
      }
    }

    result.splice(0, result.length, ...newResult);
  }

  return result;
}

console.log(fun("23"));
`.trim();

const parenthesis = `
function fun(s) {
  const stack = [];
  const brackets = {
    '(': ')',
    '{': '}',
    '[': ']',
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (brackets[char]) {
      stack.push(char);
    } 
    else {
      const lastOpeningBracket = stack.pop();
      // If there's no matching opening bracket or if the closing bracket doesn't match.
      if ((!lastOpeningBracket || brackets[lastOpeningBracket]) !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(fun("()[]{}"))
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
              
              <h3>3. Close 3 sum.</h3>
              <div style={titles}>
                <PrismCode
                  code={closed3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Number of Digit One.</h3>
              Given an integer n, count the total number of digit 1 appearing in
              all non-negative integers less than or equal to n.
              <br/>
              <ul>
                <li><b>Time complexity: </b>O(n), where n is the input number. This is because the countOnes() function iterates over the numbers from 0 to n, and each iteration takes constant time.</li><br/>
                <li><b>Space complexity: </b>O(1), where n is the input number. This is because the countOnes() function only uses a constant amount of memory to store the variables count, i, and str.</li><br/>
                <li>In simple words, the countOnes() function takes a linear amount of time to run, and it uses a constant amount of space.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={countDigitOne}
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

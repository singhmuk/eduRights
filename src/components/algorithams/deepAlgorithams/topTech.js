import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = {backgroundColor:'#F0F8FF', padding:'1px', fontSize:'16px'}

const styles = theme => ({
  paper: {
      margin: theme.spacing(1),
      padding: theme.spacing(1)
  },
  smMargin: {
      margin: theme.spacing(1)
  },
  actionDiv: {
      textAlign: "center"
  }
})


const evalRPN = `
function evalRPN(tokens) {
  const stack = []
  const isOperator = token => token === '+' || token === '-' || token === '*' || token === '/';

  for (const token of tokens) {
    if (isOperator(token)) {
          const b = stack.pop()
          const a = stack.pop()
      let result = 0
      
      switch (token) {
        case '+':
          result = a + b
          break
        case '-':
          result = a - b
          break
        case '/':
          result = a / b
          result = result < 0 ? Math.ceil(result) : Math.floor(a / b) 
          break
        default:
          result = a * b
      }
      stack.push(result)
    } else {
      stack.push(parseInt(token, 10))
    }
  }
  return stack[0]
}
console.log(evalRPN(["4", "13", "5", "/", "+"]))
`.trim();

const convertToTitle = `
function convertToTitle(n) {
  var A = "A".charCodeAt(0);
  var str = "";
  
  while(n > 0) {
      n--;
      str = String.fromCharCode(A+n%26) + str;
      n =parseInt(n/26);
  }
  
  return str;
};

console.log(convertToTitle(701))
`.trim();

const combinationSum3 = `
function combinationSum3(k, n) {
  const result = []

  const aux = (start, current, sum) => {
    if (current.length > k) {
      return
    }
    if (current.length === k) {
      if (sum === n) {
        result.push([...current])
        return
      }
      return
    }

    for (let i = start; i <= 9; i++) {
      current.push(i)
      aux(i + 1, current, sum + i)
      current.pop(i)
    }
  }
  for (let i = 1; i <= 9; i++) {
    aux(i + 1, [i], i)
  }
  return result
}

console.log(combinationSum3(3,7))`.trim();

const countDigitOne = `
function countDigitOne(n) {
  const memo = {}
  const aux = (number) => {
    if (memo[number] !== undefined) {
      return memo[number]
    }
    if (number <= 0) return 0;

    const str = number.toString()
    const first = parseInt(str[0], 10)
    const base = Math.pow(10, str.length - 1)
    const reminder = number - first * base

    if (first === 1) {
      memo[number] = aux(base - 1) + reminder + 1 + aux(reminder)
    } 
    else {
      memo[number] = first * aux(base - 1) + base + aux(reminder)
    }
    return memo[number]
  }
  return aux(n)
}

console.log(countDigitOne(16))
`.trim();

const maxSlidingWindow = `
function maxSlidingWindow (nums = [], k){
  if (!nums.length) return [];

  const result = []
  const queue = []

  for (let i = 0; i < k; i++) {
    while (nums[i] > nums[queue[queue.length - 1]]) {
      queue.pop()
    }
    queue.push(i)
  }
  result.push(nums[queue[0]])

  for (let i = 1; i < nums.length - k + 1; i++) {
    if (queue[0] < i) {
      queue.shift()
    }
    while (nums[i + k - 1] > nums[queue[queue.length - 1]]) {
      queue.pop()
    }
    queue.push(i + k - 1)
    result.push(nums[queue[0]])
  }
  return result
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))
`.trim();


class TopTech extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
            <Grid item xs={2}>
                <Paper className={classes.paper}>
                    <h4><Sidebar /></h4>
                </Paper>
            </Grid>
            <Grid item xs={10}>
            <Paper className={classes.paper}>
            <List>
            <h3>1. Excel Sheet Column Title.</h3>
              Given a positive integer, return its corresponding column title as appear in an Excel sheet.
              <div style={titles}>
                <PrismCode
                  code={convertToTitle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Evaluate Reverse Polish Notation</h3>
              <b>Input: </b>["2", "1", "+", "3", "*"]<br/>
              <b>Output: </b>9<br/>
              <b>Explanation: </b>((2 + 1) * 3) = 9
              <div style={titles}>
                <PrismCode
                  code={evalRPN}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              
             
              <h3>3. Combination Sum.</h3>
              Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.
              <br/>

              <b>Note: </b>
              <ul>
                <li>All numbers will be positive integers.</li>
                <li>The solution set must not contain duplicate combinations.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={combinationSum3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              
              <h3>4. Number of Digit One.</h3>
              Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.
              <div style={titles}>
                <PrismCode
                  code={countDigitOne}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
           
              <h3>5. Sliding Window Maximum.</h3>
              Given an array nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.
              <br/>
              <br/>
              Could you solve it in linear time?
              <div style={titles}>
                <PrismCode
                  code={maxSlidingWindow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(TopTech));

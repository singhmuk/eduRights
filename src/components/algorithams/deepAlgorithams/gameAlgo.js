import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import Stcksval from '../../../assets/stcks.png';

const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 200,
  width: 500
}

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


const rob = `
function rob(nums = []){
  const memo = {};

  function aux(index = 0){
    if (memo[index] !== undefined) return memo[index];
    if (index >= nums.length) return 0;

    memo[index] = Math.max(aux(index + 2) + nums[index], aux(index + 1))
    return memo[index]
  }
  return aux()
}

console.log(rob([2,7,9,3,1]))
`.trim();


const maxArea = `
function maxArea(height = []){
  let max = 0;
  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    max = Math.max(max, Math.min(height[left], height[right]) * (right - left));
    
    if (height[left] <= height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }
  return max
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))
`.trim();

const isValidSudoku = `
function isValidSudoku(board = []){
  const rows = [];
  const columns = [];
  const boxes = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const content = board[i][j];
      
      if (content !== '.') {
        if (!rows[i]) {
          rows[i] = {};
        }
        if (rows[i][content]) return false;
        rows[i][content] = 1;

        if (!columns[j]) {
          columns[j] = {};
        }
        if (columns[j][content]) return false;

        columns[j][content] = 1;
        const boxNum = Math.floor(i / 3) * 3 + Math.floor(j / 3);

        if (!boxes[boxNum]) {
          boxes[boxNum] = {};
        }

        if (boxes[boxNum][content]) return false;
        boxes[boxNum][content] = 1;
      }
    }
  }
  return true;
}

console.log(isValidSudoku([
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]))
`.trim();

const jump = `
function jump(nums = []){
  let steps = 0;
  let currentJumpIndex = 0;
  let nextJumpIndex = 0;

  for (let i = 0; i < nums.length - 1; i++) {
      nextJumpIndex = Math.max(i + nums[i], nextJumpIndex)
    if (i === currentJumpIndex) {
      steps += 1;
      currentJumpIndex = nextJumpIndex;
    }
  }
  return steps;
}

console.log(jump([2,3,1,1,4]))
`.trim();

const climbStairs = `
function climbStairs(n){
  const memo = {};

  function aux(count = 0){
    if (memo[count] !== undefined) return memo[count];
    if (count === n) return 1;
    if (count > n) return 0;

    memo[count] = aux(count + 1) + aux(count + 2);
    return memo[count];
  }
  return aux();
}

console.log(climbStairs(3))
`.trim();

const judgePoint24 = `
function judgePoint24(nums) {
  const isValid = x => Math.abs(x - 24) < 0.0000001;
  const aux = (arr = []) => {
    if (arr.length === 1) return isValid(arr[0]);
    let valid = false;

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const nextArr = arr.filter((x, index) => index !== i && index !== j);
        valid = valid || aux([...nextArr, arr[i] + arr[j]])
          || aux([...nextArr, arr[i] - arr[j]])
          || aux([...nextArr, arr[j] - arr[i]])
          || aux([...nextArr, arr[i] * arr[j]])
          || aux([...nextArr, arr[i] / arr[j]])
          || aux([...nextArr, arr[j] / arr[i]])
      }
    }
    return valid;
  }

  return aux(nums);
}

console.log(judgePoint24([4, 1, 8, 7]))
`.trim();

const numTimesAllBlue = `
function numTimesAllBlue(light) {
  let moment = 0;
  let max = -1;

  for (let i = 0; i < light.length; i++) {
    max = Math.max(max, light[i]);
      if (i + 1 === max) {
          moment += 1;
      }
  }
  return moment;
}

console.log(numTimesAllBlue([3,2,4,1,5]))
`.trim();

const destCity = `
function destCity(paths) {
  let result = '';

  const map = paths.reduce((acc, [a, b]) => {
    acc[a] = 1;
    acc[b] = (acc[b] || 0)
    if (acc[b] === 0) {
      result = b;
    }
    return acc;
  }, {})
  return Object.keys(map).filter(x => map[x] === 0)[0];
}

console.log(destCity([["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]))
`.trim();

const maxScore = `
function maxScore(nums, k) {
  const size = nums.length - k;
  let currentSum = nums.slice(0, size).reduce((acc, num) => acc + num, 0);
  let min = currentSum;

  for (let i = size; i < nums.length; i++) {
    currentSum = currentSum + nums[i] - nums[i - size];
    min = Math.min(min, currentSum);
  }
  return nums.reduce((acc, num) => acc + num, 0) - min;
}

console.log(maxScore([1,79,80,1,1,1,200,1], 3))
`.trim();

const getHint = `
function getHint(secret, guess) {
  const secretMap = {};

  for(let c of secret) {
      secretMap[c] = secretMap[c] || 0
      secretMap[c] += 1
  }

  let bulls = 0;
  let cows = 0;
  let used = {};

  for(let i = 0; i< guess.length; i++) {
      if(guess[i] === secret[i] && secretMap[guess[i]] > 0) {
          bulls += 1;
          secretMap[guess[i]]--;
      }  
  }

  for(let i = 0; i< guess.length; i++) { 
      if(guess[i] !== secret[i] && secretMap[guess[i]] > 0) {
          cows += 1;
          secretMap[guess[i]]--;
      }
  }
  return bulls + "A" + cows + "B";
};

console.log(getHint("1123", "0111"))
`.trim();

const graph = ``.trim();


class DSLogic5 extends Component {
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
              <h3>1. House Robber.</h3>
              You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
              <br/><br/>
              Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
              <br/><br/>
              <b>Input: </b>nums = [1,2,3,1]<br/>
              <b>Output: </b>4<br/>
              <b>Explanation: </b>Rob house 1 (money = 1) and then rob house 3 (money = 3).<br/>
             Total amount you can rob = 1 + 3 = 4.
              <div style={titles}>
                <PrismCode
                  code={rob}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Container With Most Water</h3>
              Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.
              <br/><br/>
              <b>Note: </b>You may not slant the container and n is at least 2.
              <br/><br/>
              <b>Example: </b>

              <b>Input: </b>[1,8,6,2,5,4,8,3,7]<br/>
              <b>Output: </b>49
              <div style={titles}>
                <PrismCode
                  code={maxArea}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>3. Valid Sudoku.</h3>
              Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
              <br/>
              <ul>
                <li>Each row must contain the digits 1-9 without repetition.</li>
                <li>Each column must contain the digits 1-9 without repetition.</li>
                <li>Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.</li>
              </ul>
              <br/>
         
              <b>Note: </b>
              <ul>
                <li>A Sudoku board (partially filled) could be valid but is not necessarily solvable.</li>
                <li>Only the filled cells need to be validated according to the mentioned rules.</li>
                <li>The given board contain only digits 1-9 and the character '.'.</li>
                <li> The given board size is always 9x9.</li>
              </ul>
              <br/>
              <div style={titles}>
                <PrismCode
                  code={isValidSudoku}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Jump Game</h3>
              Given an array of non-negative integers, you are initially positioned at the first index of the array.
              <br/>
              Each element in the array represents your maximum jump length at that position.<br/>

              Your goal is to reach the last index in the minimum number of jumps.<br/><br/>
              <b>Input: </b>[2,3,1,1,4]<br/>
              <b>Output: </b>2<br/>
              <b>Explanation: </b>The minimum number of jumps to reach the last index is 2.
              Jump 1 step from index 0 to 1, then 3 steps to the last index.<br/><br/>
              <b>N: </b>You can assume that you can always reach the last index.
              <div style={titles}>
                <PrismCode
                  code={jump}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Climbing Stairs.</h3>
              You are climbing a stair case. It takes n steps to reach to the top.<br/>
              Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?<br/>

              <b>Example 1: </b>

              <b>Input: </b>2<br/>
              <b>Output: </b>2<br/>
              <b>Explanation: </b>There are two ways to climb to the top.<br/>
              1. 1 step + 1 step<br/>
              2. 2 steps<br/><br/>
              <b>Example 2: </b>

              <b>Input: </b>3<br/>
              <b>Output: </b>3<br/>
              <b>Explanation: </b>There are three ways to climb to the top.<br/>
              1. 1 step + 1 step + 1 step<br/>
              2. 1 step + 2 steps<br/>
              3. 2 steps + 1 step
              <div style={titles}>
                <PrismCode
                  code={climbStairs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

             <h3>6. 24 Game.</h3>
              You have 4 cards each containing a number from 1 to 9. You need to judge whether they could operated through *, /, +, -, (, ) to get the value of 24.
              <br/>
              <br/>
              <b>Input: </b>[4, 1, 8, 7]<br/>
              <b>Output: </b>True<br/>
              <b>Explanation: </b>(8-4) * (7-1) = 24
              <div style={titles}>
                <PrismCode
                  code={judgePoint24}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/> 

              <h3>7. Bulb Switcher.</h3>
              There is a room with n bulbs, numbered from 1 to n, arranged in a row from left to right. Initially, all the bulbs are turned off.
              <br/>
              At moment k (for k from 0 to n - 1), we turn on the light[k] bulb. A bulb change color to blue only if it is on and all the previous bulbs (to the left) are turned on too.
              <br/>
              Return the number of moments in which all turned on bulbs are blue.
              <br/><br/>
              <b>Input: </b>light = [2,1,3,5,4]<br/>
              <b>Output: </b>3<br/>
              <b>Explanation: </b>All bulbs turned on, are blue at the moment 1, 2 and 4.
              <div style={titles}>
                <PrismCode
                  code={numTimesAllBlue}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>8. Destination City.</h3>
              You are given the array paths, where paths[i] = [cityAi, cityBi] means there exists a direct path going from cityAi to cityBi. Return the destination city, that is, the city without any path outgoing to another city.
              <br/>
              It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.
              <br/>
              <b>Input: </b>paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
              <b>Output: </b>"Sao Paulo" 
              <b>Explanation: </b>Starting at "London" city you will reach "Sao Paulo" city which is the destination city. Your trip consist of: "London" - "New York" - "Lima" - "Sao Paulo".

              <div style={titles}>
                <PrismCode
                  code={destCity}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>9. Maximum Points You Can Obtain from Cards.</h3>
              There are several cards arranged in a row, and each card has an associated number of points The points are given in the integer array cardPoints.
              <br/>
              In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.
              <br/>
              Your score is the sum of the points of the cards you have taken.
              <br/>
              Given the integer array cardPoints and the integer k, return the maximum score you can obtain.
              <div style={titles}>
                <PrismCode
                  code={maxScore}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>10. Bulls and Cows.</h3>
              You are playing the following Bulls and Cows game with your friend: You write down a number and ask your friend to guess what the number is. Each time your friend makes a guess, you provide a hint that indicates how many digits in said guess match your secret number exactly in both digit and position (called "bulls") and how many digits match the secret number but locate in the wrong position (called "cows"). Your friend will use successive guesses and hints to eventually derive the secret number.
              <br/>
              Write a function to return a hint according to the secret number and friend's guess, use A to indicate the bulls and B to indicate the cows. 
              <br/>
              Please note that both secret number and friend's guess may contain duplicate digits.
              <br/>

              <b>nput: </b>Isecret = "1807", guess = "7810" <br/>
              <b>Output: </b>I"1A3B" <br/>
              <b>Explanation: </b>I1 bull and 3 cows. The bull is 8, the cows are 0, 1 and 7.
              <div style={titles}>
                <PrismCode
                  code={getHint}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(DSLogic5));

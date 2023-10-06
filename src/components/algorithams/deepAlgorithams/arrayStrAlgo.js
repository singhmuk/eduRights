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


const combine = `
function fun(){
  let a=2,b=4;
  const result=[];

  for(let i=1;i<=a;i++){
    for(let j=1;j<=b;j++){
      if(i !==j){
        result.push([i,j])
      }
    }
  }
  console.log(result)
}

fun()
`.trim();

const maxProfit = `
function fun(){
  const arr = [7,1,5,3,6,4];
  let minVal=Math.min(...arr);
  let maxVal=0;
  let maxProfit=0;

  let index=arr.indexOf(minVal)

  for(let i=0;i<arr.length;i++){
    if(i>index && maxVal< arr[i]){
      maxVal=arr[i]
    }
  }

  maxProfit = (maxVal - minVal)

  console.log(maxProfit)
}

fun()
`.trim();

const longestCommonPrefix = `
function fun() {
  let candies = 10;
  const child = 3;
  let result = [];
  
  const candiesPerChild = Math.floor(candies / child);
  const remainingCandies = candies % child;
  
  for (let i = 0; i < child; i++) {
    result.push(candiesPerChild + (i < remainingCandies ? 1 : 0));
  }

  return console.log(result);
}

fun(); 
`.trim();

const dictionary = `
function fun() {
  const words = ["hello", "leetcode"];
  const order = "hlabcdefgijkmnopqrstuvwxyz";

  for (let i = 1; i < words.length; i++) {
    const prevWord = words[i - 1];
    const currentWord = words[i];

    let j = 0;
    while (j < prevWord.length && j < currentWord.length) {
      const prevCharIndex = order.indexOf(prevWord[j]);
      const currentCharIndex = order.indexOf(currentWord[j]);

      if (prevCharIndex < currentCharIndex) {
        break;                    // Correct order, move to the next pair of words
      } else if (prevCharIndex > currentCharIndex) {
        console.log('False');     // Incorrect order
        return;
      } else {
        j++;                      // Characters are equal, move to the next character
      }
    }

    if (j === currentWord.length && j < prevWord.length) {
      console.log('False');       // Incorrect order
      return;
    }
  }

  console.log('True'); // All pairs are in correct order
}

fun();
`.trim();

const pointsMax = `
function fun() {
  const points = [[1,1],[2,2],[3,3],[4,2]];
  let max = 0;

  for (let i = 0; i < points.length; i++) {
      if(points[i][0] == points[i][1]){
        max +=1;
      }
  }

  console.log(max);
}

fun();
`.trim();

const isValidSudoku = `
function isValidSudoku(board) {
  const seen = new Set();

  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          const num = board[i][j];

          if (num !== '.') {
              const rowKey = row'$'{i}-'$'{num};
              const colKey = col'$'{j}-'$'{num};
              const subgridKey = subgrid'$'{Math.floor(i / 3)}-'$'{Math.floor(j / 3)}-'$'{num};

              if (seen.has(rowKey) || seen.has(colKey) || seen.has(subgridKey)) {
                  return false; // Duplicate number found
              }

              seen.add(rowKey);
              seen.add(colKey);
              seen.add(subgridKey);
          }
      }
  }

  return true; 
}

const sudokuBoard = [
  ['5','3','.','.','7','.','.','.','.'],
  ['6','.','.','1','9','5','.','.','.'],
  ['.','9','8','.','.','.','.','6','.'],
  ['8','.','.','.','6','.','.','.','3'],
  ['4','.','.','8','.','3','.','.','1'],
  ['7','.','.','.','2','.','.','.','6'],
  ['.','6','.','.','.','.','2','8','.'],
  ['.','.','.','4','1','9','.','.','5'],
  ['.','.','.','.','8','.','.','7','9']
];
const result = isValidSudoku(sudokuBoard);
console.log(result);  // Output: true

`.trim();

const islandPerimeter = `
function islandPerimeter(grid) {
  let perimeter = 0;
  
  for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
          if (grid[row][col] === 1) {
              perimeter += 4;
              
              if (row > 0 && grid[row - 1][col] === 1) {
                  perimeter -= 2;               // Subtract for adjacent land on top
              }
              
              if (col > 0 && grid[row][col - 1] === 1) {
                  perimeter -= 2;               // Subtract for adjacent land on left
              }
          }
      }
  }
  
  return perimeter;
}

const grid = [
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0]
];
const result = islandPerimeter(grid);
console.log(result);  // Output: 16

`.trim();

const rotate = `
function fun() {
  const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  for (let i=0; i<matrix.length; i++) {
    for (let j =i+1; j<matrix.length; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  console.log(matrix);
}

fun();
`.trim();

class DSLogic6 extends Component {
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
              <h3>1. Combinations</h3>
              Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.
              <br/>
              You may return the answer in any order.<br/><br/>
              <b>Example 1: </b>

              <b>Input: </b>a = 2, b = 4<br/>
              <b>Output: </b>
              [<br/>
                [1,2],<br/>
                [1,3],<br/>
                [1,4],<br/>
                [2,1],<br/>
                [2,3],<br/>
                [2,4],<br/>
              ]<br/><br/>
              <b>Example 2: </b>

              <b>Input: </b>n = 1, k = 1<br/>
              <b>Output: </b>[[1]]
              <div style={titles}>
                <PrismCode
                  code={combine}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Best Time to Buy and Sell Stock.</h3>
              Say you have an array for which the ith element is the price of a given stock on day i.
              <br/>
              If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
              <br/>
              Note that you cannot sell a stock before you buy one.<br/><br/>
              <b>nput: </b>I[7,1,5,3,6,4]<br/>
              <b>Output: </b>I5<br/>
              <b>Explanation: </b>IBuy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.<br/>
             Not 7-1 = 6, as selling price needs to be larger than buying price.
              <div style={titles}>
                <PrismCode
                  code={maxProfit}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Stuff Them Candies</h3>
              Distribute candies 
              to a list of children such that each child receives a specific number of candies, and you have a limited 
              number of candies available. 
              <div style={titles}>
                <PrismCode
                  code={longestCommonPrefix}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Max Points On a Line</h3>
              Finding the maximum number of points that lie on the same line in a given set of points on a 2D plane. 
              <div style={titles}>
                <PrismCode
                  code={pointsMax}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Rotate Image.</h3>
              You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
              <br/>
              You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
              <br/><br/><b>Input: </b>matrix = [[1,2,3],[4,5,6],[7,8,9]]<br/>
              <b>Output: </b>[[7,4,1],[8,5,2],[9,6,3]]
              <div style={titles}>
                <PrismCode
                  code={rotate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Verify the Alien Dictionary</h3>
              Given a list of words in an alien language and 
              the order of characters in that language. You need to determine if the given list of words is sorted 
              lexicographically according to the given alien dictionary. 
              <div style={titles}>
                <PrismCode
                  code={dictionary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Valid Sudoku</h3>
              given a 9x9 Sudoku board, and you need to determine if the board is valid according to Sudoku rules. The 
              rules state that each row, each column, and each of the nine 3x3 sub-grids that compose the board must 
              contain distinct digits from 1 to 9.
              <div style={titles}>
                <PrismCode
                  code={isValidSudoku}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>7. Island Perimeter</h3>
              finding the perimeter of an island represented as a grid, where '1's represent land and '0's represent 
              water. The goal is to determine the total perimeter of the island.
              <div style={titles}>
                <PrismCode
                  code={islandPerimeter}
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

export default (withStyles(styles)(DSLogic6));

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


const rotate = `
function rotate (matrix = []){
  const n = matrix.length

  for (let i = 0; i < Math.floor(n / 2); i++) {
    const temp = matrix[i]
    matrix[i] = matrix[n - 1 - i]
    matrix[n - 1 - i] = temp
  }
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
  return matrix
}

console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]))
`.trim();

const groupAnagrams = `
function groupAnagrams(strs) {
  const sortStr = str => str.split('').sort((a, b) => a.localeCompare(b)).join('')

  const sortedMap = strs.map(sortStr).reduce((map, current, index) => {
      if (map[current]) {
        map[current].push(strs[index])
      } 
      else {
        map[current] = [strs[index]]
      }
      return map
    },
    {},
  )

  return Object.keys(sortedMap).map(key => sortedMap[key])
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
`.trim();

const binaryMatrix = `
function shorPath(grid) {
  let n = grid.length - 1;
  let q = [0]
  
  if (grid[0][0] || grid[n][n]) return -1
  
  grid[0][0] = 1
  while (q.length) {
      let curr = q.shift();
      let i = curr & (1 << 7) - 1;
      let j = curr >> 7;
      
      if (i === n && j === n) return grid[n][n]
      for (let a = Math.max(i-1,0); a <= Math.min(i+1,n); a++){
          for (let b = Math.max(j-1,0); b <= Math.min(j+1,n); b++){
              if (grid[a][b] === 0){
                  grid[a][b] = grid[i][j] + 1, q.push(a + (b << 7))
                  }
                }
              }
            }
            return -1
          };
  
  console.log(shorPath([[0,0,0],[1,1,0],[1,1,0]]));`.trim();

const spiralOrder = `
function spiralOrder(matrix) {
  let result = []
  if(!matrix.length) return result;
  
  let rowMin = 0
  let rowMax = matrix.length -1
  let columnMin = 0
  let columnMax = matrix[0].length - 1
  
  let i = 0
  let j = 0
  let direction = "right"

  while(result.length < matrix.length * matrix[0].length) {
    result.push(matrix[i][j])
      if(direction === "right") {
          if(j === columnMax) {
              rowMin += 1
              i = rowMin
              direction = "down"
          } else {
              j++
          }
      } else if(direction === "down") {
          if(i === rowMax) {
              direction = "left"
              columnMax -= 1
              j = columnMax
          } else {
              i++
          }
      } else if(direction === "left") {

          if(j === columnMin) {
              direction = "up"
              rowMax -= 1
               i = rowMax
          } else {
              j--
          }
      } else {
          if(i === rowMin) {
              direction = "right"
              columnMin += 1
               j = columnMin
          } else {
              i--
          }
      }
  }

  return result 
};


console.log(spiralOrder([
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
 ]))
`.trim();

const uniquePaths = `
function uniquePaths(m, n){
  const memo = {}

  function aux(rowIndex, columnIndex){
    if (memo[rowIndex] !== undefined && memo[rowIndex][columnIndex] !== undefined) {
      return memo[rowIndex][columnIndex]
    }

    if (rowIndex >= m || columnIndex >= n) return 0
    if (rowIndex === m - 1 && columnIndex === n - 1) return 1

    memo[rowIndex] = memo[rowIndex] || {}
    memo[rowIndex][columnIndex] = aux(rowIndex + 1, columnIndex) + aux(rowIndex, columnIndex + 1)
    return memo[rowIndex][columnIndex]
  }
  
  return aux(0, 0)
}

console.log(uniquePaths(7,3))
`.trim();



const addBinary = `
function addBinary(a, b) {
  const reverse = x => x.split('').reverse()
  
  const { shorter, longer } = a.length > b.length
                              ? { shorter: reverse(b), longer: reverse(a) }
                              : { shorter: reverse(a), longer: reverse(b) }

  let reminder = 0
  const digits = longer.map((num1, index) => {
    let res = parseInt(num1, 10) + reminder + (parseInt(shorter[index], 10) ? parseInt(shorter[index], 10) : 0)
    if (res >= 2) {
      res -= 2
      reminder = 1
    } else {
      reminder = 0
    }
    return res
  })
  
  if (reminder === 1) {
    digits.push(reminder)
  }
  return digits.reverse().join('')
}

console.log(addBinary("1010", "1011"))
`.trim();


class DSLogic3 extends Component {
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
              <h3>1. Rotate Image.</h3>
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

              <h3>2. Group Anagrams.</h3>
              Given an array of strings strs, group the anagrams together. You can return the answer in any order.
              <br/>
              An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.
              <br/> <br/>
              <b>Input: </b>strs = ["eat","tea","tan","ate","nat","bat"]<br/>
              <b>Output: </b>[["bat"],["nat","tan"],["ate","eat","tea"]]
              <div style={titles}>
                <PrismCode
                  code={groupAnagrams}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Shortest Path in Binary Matrix</h3>
              <ul>
                <li>In an N by N square grid, each cell is either empty (0) or blocked (1).</li>
                <li>A clear path from top-left to bottom-right has length k if and only if it is composed of cells C_1, C_2, ..., C_k such that:</li>
                1.Adjacent cells C_i and C_i+1 are connected 8-directionally (ie., they are different and share an edge or corner)
                <br />
                2.C_1 is at location (0, 0) (ie. has value grid[0][0])<br />
                3.C_k is at location (N-1, N-1) (ie. has value grid[N-1][N-1])<br />
                4.If C_i is located at (r, c), then grid[r][c] is empty (ie. grid[r][c] == 0).
                <li>Return the length of the shortest such clear path from top-left to bottom-right. If such a path does not exist, return -1.</li>
              </ul>
              <b>Input: </b>[[0,1],[1,0]], [[0,0,0],[1,1,0],[1,1,0]]
              <br />
              <b>Output: </b>2, 4
              <div style={titles}>
                <PrismCode
                  code={binaryMatrix}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />              

              <h3>4. Spiral Matrix.</h3>
              <b>Input: </b>
                [
                [ 1, 2, 3 ],<br/>
                [ 4, 5, 6 ],<br/>
                [ 7, 8, 9 ]
                ]<br/><br/>
                <b>Output: </b>[1,2,3,6,9,8,7,4,5]
              <div style={titles}>
                <PrismCode
                  code={spiralOrder}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Unique Paths.</h3>
              A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
              <br/>
              The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
              <br/>
              How many possible unique paths are there? <br/> <br/>
              <b>Input: </b>m = 7, n = 3<br/>
              <b>Output: </b>28
              <div style={titles}>
                <PrismCode
                  code={uniquePaths}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Add Binary</h3>
              Given two binary strings, return their sum (also a binary string).
              <br/>
              The input strings are both non-empty and contains only characters 1 or 0.<br/>
              <b>Input: </b>a = "1010", b = "1011"<br/>
              <b>Output: </b>"10101"
              <div style={titles}>
                <PrismCode
                  code={addBinary}
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

export default (withStyles(styles)(DSLogic3));

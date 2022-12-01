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


const isValid = `
function isValid(s){
  const stack = [];
  const pair = {
    '[': ']',
    '{': '}',
    '(': ')',
  };
  const isPaired = (a, b) => pair[a] === b;

  for (c of s) {
    if (isPaired(stack[stack.length - 1], c)) {
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  return stack.length === 0;
}

console.log(isValid("()"))
`.trim();

const generateParenthesis = `
function generateParenthesis(n) {
  const result = [];

  function aux(current, left, right){
    if (left === n && right === n) {
      result.push(current)
      return
    }
    if (left < right || left > n || right > n) return;

    aux('$'{current}(', left + 1, right)
    aux('$'current})', left, right + 1)
  }
  aux('', 0, 0)
  return result;
}

console.log(generateParenthesis(3))
`.trim();

const largestPerimeter = `
function largestPerimeter(A = []) {
  A.sort((a, b) => b - a);
  for (let i = 0; i < A.length - 2; i++) {
    if (A[i] < A[i + 1] + A[i + 2]) {
      return A[i] + A[i + 1] + A[i + 2];
    }
  }
  return 0;
}

console.log(largestPerimeter([2,1,2]))
`.trim();

const generate = `
function generate(numRows){
  const result = [];

  for (let i = 0; i < numRows; i++) {
    const current = [];
    for (let j = 0; j <= i; j++) {
      if (result[i - 1] && result[i - 1][j] && result[i - 1][j - 1]) {
        current.push(result[i - 1][j] + result[i - 1][j - 1]);
      } else {
        current.push(1);
      }
    }
    result.push(current);
  }
  return result;
}

console.log(generate(5))
`.trim();

const computeArea = `
function computeArea(A, B, C, D, E, F, G, H){
  const area = (pointA, pointB) => (pointB[0] - pointA[0]) * (pointB[1] - pointA[1]);
  const totalArea = area([A, B], [C, D]) + area([E, F], [G, H]);

  if (E >= C || G <= A || F >= D || H <= B) return totalArea;

  const pointA = [Math.max(A, E), Math.max(B, F)];
  const pointB = [Math.min(C, G), Math.min(D, H)];
  const overlapping = (pointB[0] - pointA[0]) * (pointB[1] - pointA[1]);

  return totalArea - overlapping;
}

console.log(computeArea(-3, 0, 3, 4, 0, -1, 9, 2))
`.trim();

const graph = ``.trim();


class DSLogic8 extends Component {
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
            <h3>1. Valid Parentheses</h3>
              Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
              <br/>
              An input string is valid if:<br/>
              <ul>
                <li>Open brackets must be closed by the same type of brackets.</li>
                <li>Open brackets must be closed in the correct order.</li>
              </ul>
              <br/>

              <b>Example 1: </b>

              <b>Input: </b>s = "()"<br/>
              <b>Output: </b>true<br/><br/>
              <b>Example 2: </b>

              <b>Input: </b>s = "()[]{}"<br/>
              <b>Output: </b>true<br/><br/>
              <b>Example 3: </b>

              <b>Input: </b>s = "(]"<br/>
              <b>Output: </b>false
              <div style={titles}>
                <PrismCode
                  code={isValid}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. Generate Parentheses.</h3>
              Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
              <br/>
              <b>Ex. </b> given n = 3, a solution set is: <br/>

              [<br/>
                "((()))", <br/>
                "(()())", <br/>
                "(())()", <br/>
                "()(())", <br/>
                "()()()" <br/>
              ]
              <div style={titles}>
                <PrismCode
                  code={generateParenthesis}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Largest Perimeter Triangle.</h3>
              Given an array A of positive lengths, return the largest perimeter of a triangle with non-zero area, formed from 3 of these lengths.
              <br/>
              If it is impossible to form any triangle of non-zero area, return 0.
              <div style={titles}>
                <PrismCode
                  code={largestPerimeter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Pascal's Triangle</h3>
              Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.
              <br/>
              In Pascal's triangle, each number is the sum of the two numbers directly above it.
              <div style={titles}>
                <PrismCode
                  code={generate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Rectangle Area.</h3>
              Find the total area covered by two rectilinear rectangles in a 2D plane.
              <br/>
              Each rectangle is defined by its bottom left corner and top right corner.
              <div style={titles}>
                <PrismCode
                  code={computeArea}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3></h3>

              <div style={titles}>
                <PrismCode
                  code={graph}
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

export default (withStyles(styles)(DSLogic8));

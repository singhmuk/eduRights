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
function combine(n, k) {
  const result = [];
  
  function aux(index = 1, current = []){
    if (current.length === k) {
      result.push(current);
      return;
    }
    if (index > n) return;

    aux(index + 1, [...current, index]);
    aux(index + 1, current);
  }
  aux();
  return result;
}

console.log(combine(4,2))
`.trim();

const maxProfit = `
function maxProfit(prices) {
  let max = 0;
  let minPrice = Infinity;

  for (const price of prices) {
    minPrice = Math.min(price, minPrice);
    max = Math.max(max, price - minPrice);
  }
  return max;
}

console.log(maxProfit([7,1,5,3,6,4]))
`.trim();

const maxProduct = `
function maxProduct(nums = []){
  if (nums.length === 0) return 0;

  let prevMax = nums[0];
  let prevMin = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const currentMax = Math.max(nums[i], prevMax * nums[i], prevMin * nums[i]);
    const currentMin = Math.min(nums[i], prevMax * nums[i], prevMin * nums[i]);
    prevMax = currentMax;
    prevMin = currentMin;

    if (prevMax > max) {
      max = prevMax;
    }
  }
  return max;
}

console.log(maxProduct([2,3,-2,4]))
`.trim();

const longestCommonPrefix = `
function longestCommonPrefix(strs = []){
  let prefix = '';

  let minLength = strs.reduce((acc, str) => (acc < str.length ? acc : str.length), Infinity);
  minLength = minLength === Infinity ? 0 : minLength;

  for (let i = 0; i < minLength; i++) {
    const current = strs[0][i];
    const isSame = strs.every(str => str[i] === current);

    if (isSame) {
      prefix += current;
    } else {
      return prefix;
    }
  }
  return prefix;
}

console.log(longestCommonPrefix(["flower","flow","flight"]))
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

              <b>Input: </b>n = 4, k = 2<br/>
              <b>Output: </b>
              [<br/>
                [2,4],<br/>
                [3,4],<br/>
                [2,3],<br/>
                [1,2],<br/>
                [1,3],<br/>
                [1,4],<br/>
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

              <h3>3. Maximum Product Subarray.</h3>
              Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
              <br/>
              <b>Input: </b>[2,3,-2,4]<br/>
              <b>Output: </b>6
              <div style={titles}>
                <PrismCode
                  code={maxProduct}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Longest Common Prefix</h3>
              Write a function to find the longest common prefix string amongst an array of strings.
              <br/>
              If there is no common prefix, return an empty string "".
              <br/><br/>
              <b>Example 1: </b>

              <b>Input: </b>["flower","flow","flight"]<br/>
              <b>Output: </b>"fl"<br/><br/>
              <b>Example 2: </b>

              <b>Input: </b>["dog","racecar","car"]<br/>
              <b>Output: </b>""<br/>
              <b>Explanation: </b>There is no common prefix among the input strings.<br/><br/>
              <b>N: </b>All given inputs are in lowercase letters a-z.
              <div style={titles}>
                <PrismCode
                  code={longestCommonPrefix}
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

export default (withStyles(styles)(DSLogic6));

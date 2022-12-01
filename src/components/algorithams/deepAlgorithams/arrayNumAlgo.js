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




const threeSumClosest = `
function threeSumClosest(nums, target) {
  let diff = Infinity;
  let result = 0;
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      const currentDiff = sum - target;

      if (currentDiff > 0) {
        right -= 1;
      } else {
        left += 1;
      }
      if (Math.abs(currentDiff) < diff) {
        result = sum;
      }
      diff = Math.min(Math.abs(currentDiff), diff);
    }
  }
  return result;
}

console.log(threeSumClosest([-1,2,1,-4]))
`.trim();

const firstMissingPositive = `
function firstMissingPositive(nums = []){
  function swap(a, b){
    const temp = nums[a]
    nums[a] = nums[b]
    nums[b] = temp
  }

  let index = 0
  while (index < nums.length) {
    if (nums[index] !== nums[nums[index] - 1] && nums[index] > 0 && nums[index] <= nums.length){
          swap(index, nums[index] - 1)
      } else {
          index += 1
      }
   }

  for (let i=0; i<nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return nums.length + 1
}

console.log(firstMissingPositive([3,4,-1,1]))
`.trim();

const largestNumber = `
function largestNumber(nums = []) {
  nums.sort((a, b) => {
    const digitsA = a.toString(10) + b.toString(10);
    const digitsB = b.toString(10) + a.toString(10);

    for (let i = 0; i < digitsA.length; i++) {
      const digitB = parseInt(digitsB[i], 10);
      const digitA = parseInt(digitsA[i], 10);

      if (digitB > digitA || digitB < digitA) return digitB - digitA;
    }
    return 0
  })
  
  const result = nums.join('')
  return result[0] === '0' ? '0' : result
}

console.log(largestNumber([10,2]))
`.trim();

const maxSubArray = `
function maxSubArray(nums){
  let max = -Infinity;
  let currentMax = -Infinity;

  for (let i=0; i<nums.length; i++) {
    currentMax = Math.max(
      currentMax + nums[i],
      nums[i],
    )
    max = Math.max(max, currentMax)
  }
  return max
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
`.trim();

const searchInsert = `
function searchInsert(nums, target){
  function aux(low, high){
    if (low > high) return low;

    const middle = Math.floor((low + high) / 2)
    
    if (target === nums[middle]) {
      return middle
    } if (target > nums[middle]) {
      return aux(middle + 1, high)
    }
    return aux(low, middle - 1)
  }
  return aux(0, nums.length - 1)
}

console.log(searchInsert([1,3,5,6], 5))
`.trim();

const maximumGap = `
function maximumGap(nums = []) {
  const maxValue = Math.max(...nums)

  function countingSort(place){
    const count = []
    nums.forEach((num) => {
      const index = Math.floor(num / place) % 10
      count[index] = count[index] || []
      count[index].push(num)
    })
    return count.reduce((acc, v) => {
      if (v !== undefined) {
        acc = acc.concat(v)
      }
      return acc
    }, [])
  }

  let place = 1
  while (Math.floor(maxValue / place) > 0) {
    nums = countingSort(place)
    place *= 10
  }
  let max = 0
  for (let i = 1; i < nums.length; i++) {
    max = Math.max(max, nums[i] - nums[i - 1])
  }
  return max
}

console.log(maximumGap([3,6,9,1]))
`.trim();

const getFactors = `
function getFactors(n){
  const result = [];

  function aux(remain, start = 2, current = []){
    if (remain === 1) {
      if (current.length > 1) {
        result.push([...current])
      }
      return
    }
    
    for (let i = start; i <= remain; i++) {
      if (remain % i === 0) {
        current.push(i)
        aux(remain / i, i, current)
        current.pop()
      }
    }
  }
  aux(n)
  return result
}

console.log(getFactors(345))
`.trim();

const addTwoNumbers = `
function ListNode(val) {
  this.val = val
  this.next = null
}

const addTwoNumbers = (l1, l2) => {
  let h1 = l1
  let h2 = l2
  let digit = 0
  let head = null
  let current = null
  while (h1 || h2) {
    const num1 = h1 ? h1.val : 0
    const num2 = h2 ? h2.val : 0
    let value = num1 + num2 + digit
    if (value >= 10) {
      value -= 10
      digit = 1
    } else {
      digit = 0
    }
    h1 = h1 ? h1.next : null
    h2 = h2 ? h2.next : null
    const node = new ListNode(value)
    if (!head) {
      head = node
      current = node
    } else {
      current.next = node
      current = node
    }
  }
  if (digit === 1) {
    current.next = new ListNode(1)
  }
  return head
}

console.log(addTwoNumbers())`.trim();


class DSLogic7 extends Component {
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
              <h3>1. 3 Sum Closest</h3>
              Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.
              <br/>
              <br/>
              <b>Ex. </b>
              <b>Input: </b>nums = [-1,2,1,-4], target = 1<br/>
              <b>Output: </b>2<br/>
              <b>Explanation: </b>The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
              <div style={titles}>
                <PrismCode
                  code={threeSumClosest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. First Missing Positive.</h3>
              <b>Input: </b>[3,4,-1,1]<br/>
              <b>Output: </b>2
              <div style={titles}>
                <PrismCode
                  code={firstMissingPositive}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Largest Number.</h3>
              Given a list of non negative integers, arrange them such that they form the largest number.
              <div style={titles}>
                <PrismCode
                  code={largestNumber}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>4. Maximum Subarray.</h3>
              <b>Input: </b>nums = [-2,1,-3,4,-1,2,1,-5,4]<br/>
              <b>Output: </b>6<br/>
              <b>Explanation: </b>[4,-1,2,1] has the largest sum = 6.
              <div style={titles}>
                <PrismCode
                  code={maxSubArray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Search Insert Position.</h3>
              Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
              <br/>
              <b>Input: </b>[1,3,5,6], 5<br/>
              <b>Output: </b>2<br/><br/>
              <b>Example 2:</b><br/>

              <b>Input: </b>[1,3,5,6], 2<br/>
              <b>Output: </b>1
              <div style={titles}>
                <PrismCode
                  code={searchInsert}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Maximum Gap.</h3>
              <div style={titles}>
                <PrismCode
                  code={maximumGap}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>7. Factor Combinations.</h3>
              <div style={titles}>
                <PrismCode
                  code={getFactors}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>8. Add Two Numbers.</h3>
              You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
              <br/>
              You may assume the two numbers do not contain any leading zero, except the number 0 itself.
              <br/>
              <b>Example: </b>
              <b>Input: </b>(2  4  3) + (5  6  4)<br/>
              <b>Output: </b>7  0  8<br/>
              <b>Explanation: </b>342 + 465 = 807.
              <div style={titles}>
                <PrismCode
                  code={addTwoNumbers}
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

export default (withStyles(styles)(DSLogic7));

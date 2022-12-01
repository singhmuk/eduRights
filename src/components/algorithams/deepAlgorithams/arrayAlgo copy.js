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


const strArray = `
    var strArray = "StackOverflow".split("");
    console.log(strArray.join(""));
`.trim();

const Sort = `
let i, j, arr=[0,9,8,7,6];
var max=0;

for(i=0; i<arr.length; i++){
  for(j=i; j<arr.length; j++){
    if(arr[i]>arr[j]){
      var temp=arr[i];
      arr[i]=arr[j];
      arr[j]=temp;
    }
  }
}

console.log(arr);


//Greatest Product Of 3
max = arr[arr.length-1] * arr[arr.length-2] * arr[arr.length-3]
console.log(max);
`.trim()

const duplicates = `
function removeDup(){
  const array = [1,2,3,4,3,0,9,0,1];
  const result=[];
  
  for(let i=0; i<array.length;i++){
      let count=0;
      for(let j=0;j<result.length;j++){
          if(array[i]==result[j]) count +=1;
      }
      if(count==0){
          result.push(array[i]);
      }  
  }
  
  console.log(result)
}

removeDup();
`.trim()

const compare_array = `
function compare(){
  const arr=[1,2,3,4,5,6];
  const arr2=[5,6,7,8,9,0];
  const result=[];
  
  for(let i=0; i<arr.length; i++){
    if(arr2.indexOf(arr[i]) !== -1){
      result.push(arr[i]);
    }
  }
  console.log(result)
}

compare();


//Unique name
function getUnique(){
  var names = ["John", "Peter", "Clark", "Harry", "John", "Alice"];
  var newName = [];
  
  for(i=0; i < names.length; i++){
      if(newName.indexOf(names[i]) === -1) {
          newName.push(names[i]);
      }
  }
  console.log(newName);
}

getUnique();
`.trim();

const findMedianSortedArrays = `
function findMedianSortedArrays(nums1, nums2){
  function merge(xs1, xs2){
    if (!xs1 || !xs1.length) return xs2;
    if (!xs2 || !xs2.length) return xs1;

    const [hd1, ...rest1] = xs1
    const [hd2, ...rest2] = xs2
    return hd1 <= hd2 ? [hd1, ...merge(rest1, xs2)] : [hd2, ...merge(xs1, rest2)]
  }
  const nums = merge(nums1, nums2)
  const middle = Math.floor((nums.length-1) / 2)

  return (middle * 2 === (nums.length-1)) ?  nums[middle] : ((nums[middle] + nums[middle + 1]) / 2) 
}

console.log(findMedianSortedArrays([1,2],[3,4]))
`.trim();

const maxSubArray = `
function maxSubArray(nums){
  let max = -Infinity;
  let currentMax = -Infinity;

  for (let i = 0; i < nums.length; i++) {
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

const plusOne = `
function plusOne(digits = []){
  if (digits.length === 0) return digits;

  if (digits[digits.length - 1] < 9) {
    digits[digits.length - 1] += 1
    return digits
  }

  let index = digits.length - 1
  let current = 1

  while (index >= 0) {
    const sum = current + digits[index]
    if (sum > 9) {
      digits[index] = sum - 10
      current = 1
      index -= 1
    } 
    else {
      digits[index] = sum
      current = 0
      index -= 1
      return digits
    }
  }
  return current === 1 ? [1, ...digits] : digits
}

console.log(plusOne([1,2,3]))
`.trim();

const arrayCounter = `
function arrCounter(arr){
  var counter = 0;
  var maxCount = 0;

    function inner(n){
      if(!Array.isArray(n)){
        maxCount = Math.max(maxCount, counter);
     counter = 0;
     return
   }
   
   n.forEach(num => {
   counter ++;
   inner(num);
   })
 }
 
 inner(arr);
 console.log(maxCount)
 return maxCount;
}

arrCounter([[3]])
arrCounter([[[[[[[9]]]]]]])
arrCounter([])
`.trim()

const countElements = `
function arrCounts(){
  const arr = [1,2,3,4,5];
  var result = 0;

  while(arr[result]!==undefined){
    result++;
  }
  console.log(result);
}

arrCounts();  
`.trim();

const find132pattern = `
function find132pattern(nums) {
  let max = -Infinity
  const stack = []; 

  for (let i = nums.length - 1; i >= 0; i--) {
    while (nums[i] > stack[stack.length - 1]) {
      max = stack.pop()
    }
    if (nums[i] < max) return true;
    stack.push(nums[i])
  }
  
  return false
}

console.log(find132pattern([3,1,4,2]))
`.trim();

const numIdenticalPairs = `
function numIdenticalPairs(nums) {
  let count = 0
  
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        count += 1
      }
    }
  }
  return count
}

console.log(numIdenticalPairs([1,2,3,1,1,3]))
`.trim();

const removeElement = `
function removeElement(nums, val) {
  let left = 0

  const swap = (a, b) => {
    const temp = nums[a]
    nums[a] = nums[b]
    nums[b] = temp
  }

  while (left <= nums.length - 1) {
    while (nums[nums.length - 1] === val) {
      nums.pop()
    }
    
    while (nums[left] !== val && left <= nums.length - 1) {
      left += 1
    }

    if (left < nums.length - 1) {
      swap(left, nums.length - 1)
      left += 1
      nums.pop()
    }
  }
  return nums.length
}

console.log(removeElement([0,1,2,2,3,0,4,2],1))
`.trim();

const searchRange = `
function searchRange(nums = [], target){
  function binarySearch(left, right, position = 'middle'){
    let pivot = -1
    
    while (left <= right) {
      const middle = Math.floor((left + right) / 2)
      if (nums[middle] === target) {
        if (position === 'middle') {
          pivot = middle
          break
        } else if (position === 'left') {
          pivot = middle
          right = middle - 1
        } else if (position === 'right') {
          pivot = middle
          left = middle + 1
        }
      } else if (nums[middle] < target) {
        left = middle + 1
      } else {
        right = middle - 1
      }
    }
    return pivot
  }


  const pivot = binarySearch(0, nums.length - 1, 'middle')
  return [
    binarySearch(0, pivot, 'left'),
    binarySearch(pivot, nums.length - 1, 'right'),
  ]
}

console.log(searchRange([5,7,7,8,8,10],6))
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

const combinationSum = `
function combinationSum(candidates, target) {
  const result = []

  function aux(start,current=[], sum = 0){
      if(sum > target) return;

      if(sum === target) {
          result.push(current)
          return
      }
      for(let i = start; i < candidates.length; i++) {
          aux(i, [...current, candidates[i]], sum+candidates[i])
      }
  }
  for(let i = 0; i <  candidates.length; i++) {
      aux(i, [candidates[i]], candidates[i])
  }
  return result
};

console.log(combinationSum([2,3,5],8))
`.trim();

const missing_number = `
function missNum() {
  let i, arr=[0,1,2,4,5], exactsum=0, result=0;
  exactsum = arr.reduce((a, b) => a + b);

  for (i=0; i<=arr.length; i++) {
    result += i
  }
  
  result -= exactsum;
  console.log('Missing Number', result)
}

missNum();
 `.trim()

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

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return nums.length + 1
}

console.log(firstMissingPositive([3,4,-1,1]))
`.trim();

const findMissingRanges = `
function findMissingRanges(nums, lower, upper) {
  const result = [];
  const count = (lo, hi) => hi - lo - 1;

  function set(lo, hi){
    if (count(lo, hi) === 1) {
      result.push('$'{lo + 1}')
    } 
    else if (count(lo, hi) > 1) {
      result.push('$'{lo + 1}->'$'{hi - 1}')
    }
  }
  
  for (let i = 0; i <= nums.length; i++) {
    set(
      i === 0 ? lower - 1 : nums[i - 1],
      i === nums.length ? upper + 1 : nums[i],
    )
  }
  return result
}

console.log(findMissingRanges([1,2,3,-2,4]))
`.trim();

const permute = `
function permute(nums = []){
  const result = [];

  function aux(list = [], current = []){
    if (list.length === 0) {
      result.push(current)
    }

    list.forEach((number, index) => {
      aux(list.filter((v, index2) => index2 !== index), [...current, number])
    })
  }
  
  aux(nums)
  return result
}

console.log(permute([1,2,3]))
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

const containsDuplicate = `
function containsDuplicate(nums){
  const map = {}
  
  for (num of nums) {
    if (map[num]) {
      return true
    }
    map[num] = 1
  }
  return false
}

console.log(containsDuplicate([1,2,3,1]))
`.trim();

const summaryRanges = `
function summaryRanges(nums) {
  let start = null
  const result = []

  for (let i = 0; i < nums.length; i++) {
    if (start === null) {
      start = nums[i]
    }
    if (nums[i] === nums[i + 1] - 1) continue;

    if (nums[i] === start) {
      result.push(nums[i].toString())
      start = null
    } 
    else {
      result.push('$'{start}->'$'{nums[i]}')
      start = null
    }
  }
  
  return result
}

console.log(summaryRanges([1,2,3,4,6,7,9]))
`.trim();

const productExceptSelf = `
function productExceptSelf(nums = []){
  if(!nums.length) return nums;

  const product = [nums[0]]
  for(let i = 1; i < nums.length; i++) {
      product[i] = nums[i] * product[i-1]
  }

  let suffixProduct = 1;
  for(let i = nums.length -1; i >= 1; i--) {
      product[i] = product[i-1] * suffixProduct
      suffixProduct *= nums[i]
  }
  
  product[0] = suffixProduct
  return product
}

console.log(productExceptSelf([1,2,3,4]))
`.trim();

const countSmaller = `
function countSmaller(nums) {
  const result = nums.map(() => 0);

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        result[i] += 1
      }
    }
  }
  
  return result
}

console.log(countSmaller([5,2,6,1]))
`.trim();

const coinChange = `
function coinChange(coins = [], amount){
  const memo = {}

  function aux(remainAmount, coinIndex){
    if (memo[remainAmount] !== undefined && memo[remainAmount][coinIndex] !== undefined){
      return memo[remainAmount][coinIndex]
    }

    if (remainAmount < 0) return Infinity;
    if (remainAmount === 0) return 0;
    if (coinIndex < 0 && remainAmount > 0) return Infinity;

    memo[remainAmount] = memo[remainAmount] || {}
    memo[remainAmount][coinIndex] = Math.min(aux(remainAmount - coins[coinIndex], coinIndex) + 1, 
                                             aux(remainAmount, coinIndex - 1))
    return memo[remainAmount][coinIndex]
  }

  const result = aux(amount, coins.length - 1);
  return result === Infinity ? -1 : result
}

console.log(coinChange([1, 2, 5], 11))
`.trim();


class DSLogic2 extends Component {
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
            <h3>1. Convert a string to an array</h3>
              <div style={titles}>
                <PrismCode
                  code={strArray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={Sort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Remove Duplicates</h3>
              <div style={titles}>
                <PrismCode
                  code={duplicates}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Compare Array</h3>
              <div style={titles}>
                <PrismCode
                  code={compare_array}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Array Counter</h3>
              <div style={titles}>
                <PrismCode
                  code={arrayCounter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Counting Elements.</h3>
              <div style={titles}>
                <PrismCode
                  code={countElements}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>8. 132 Pattern.</h3>
              <b>Input: </b>nums = [1,2,3,4]<br/>
              <b>Output: </b>false<br/>
              <b>Explanation: </b>There is no 132 pattern in the sequence.
              <div style={titles}>
                <PrismCode
                  code={find132pattern}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>9. Missing Number</h3>
              <div style={titles}>
                <PrismCode
                  code={missing_number}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Missing Ranges.</h3>
              <div style={titles}>
                <PrismCode
                  code={findMissingRanges}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>11. First Missing Positive.</h3>
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

              <h3>12. Summary Ranges.</h3>
              Given a sorted integer array without duplicates, return the summary of its ranges.
              <div style={titles}>
                <PrismCode
                  code={summaryRanges}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>13. Contains Duplicate.</h3>
              Given an array of integers, find if the array contains any duplicates.
              <br/>
              Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
              <div style={titles}>
                <PrismCode
                  code={containsDuplicate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>14. Permutations.</h3>
              Given a collection of distinct integers, return all possible permutations.
              <div style={titles}>
                <PrismCode
                  code={permute}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>15. Number of Good Pairs.</h3>
              <b>Input: </b>nums = [1,2,3,1,1,3] <br/>
              <b>Output: </b>4 <br/>
              <b>Explanation: </b>There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
              <div style={titles}>
                <PrismCode
                  code={numIdenticalPairs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>16. Largest Number.</h3>
              Given a list of non negative integers, arrange them such that they form the largest number.
              <div style={titles}>
                <PrismCode
                  code={largestNumber}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>17. Maximum Subarray.</h3>
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

              <h3>18. Search Insert Position.</h3>
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

              <h3>19. Combination Sum</h3>
              <b>Input: </b>candidates = [2,3,6,7], target = 7,<br/>
              <b>A solution set is: </b>
              [
                [7],<br/>
                [2,2,3]<br/>
              ]
              <div style={titles}>
                <PrismCode
                  code={combinationSum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>20. Product of Array Except Self.</h3>
              <div style={titles}>
                <PrismCode
                  code={productExceptSelf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>21. Find First and Last Position of Element in Sorted Array</h3>
              Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
              <br/>
              Your algorithm's runtime complexity must be in the order of O(log n).<br/>

              If the target is not found in the array, return [-1, -1].<br/>

              <b>Example 1:</b>
              <b>Input: </b>nums = [5,7,7,8,8,10], target = 8<br/>
              <b>Output: </b>[3,4]<br/><br/>
              <b>Example 2</b>:<br/>

              <b>Input: </b>nums = [5,7,7,8,8,10], target = 6<br/>
              <b>Output: </b>[-1,-1]
              <div style={titles}>
                <PrismCode
                  code={searchRange}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>22. Maximum Gap.</h3>
              <div style={titles}>
                <PrismCode
                  code={maximumGap}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>23. Count of Smaller Numbers After Self.</h3>
              You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].
              <br/>
              <b>Input: </b>nums = [5,2,6,1]<br/>
              <b>Output: </b>[2,1,1,0]<br/>
              <b>Explanation: </b>
              <ul>
                <li>To the right of 5 there are 2 smaller elements (2 and 1).</li>
                <li>To the right of 2 there is only 1 smaller element (1).</li>
                <li>To the right of 6 there is 1 smaller element (1).</li>
                <li>To the right of 1 there is 0 smaller element.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={countSmaller}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>24. Plus One.</h3>
              <b>Input: </b>digits = [1,2,3]<br/>
              <b>Output: </b>[1,2,4]
              <br/><br/>
              <b>Example 2:</b><br/>
              <b>Input: </b>digits = [4,3,2,1]<br/>
              <b>Output: </b>[4,3,2,2]
              <div style={titles}>
                <PrismCode
                  code={plusOne}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>25. Remove Element</h3>
              Given an array nums and a value val, remove all instances of that value in-place and return the new length.
              <br/>
              Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
              <br/>
              The order of elements can be changed. It doesn't matter what you leave beyond the new length.
              <br/><br/>
              <b>Example 1:</b><br/>

              Given nums = [3,2,2,3], val = 3,<br/>
              Your function should return length = 2, with the first two elements of nums being 2.<br/>
              It doesn't matter what you leave beyond the returned length.
              <div style={titles}>
                <PrismCode
                  code={removeElement}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>26. Median of Two Sorted Arrays.</h3>
              Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
              <br/>
              <b>Follow up: </b>The overall run time complexity should be O(log (m+n)).
              <br/>
              

              <b>Example 1:</b>
              <br/>
              <b>Input: </b>nums1 = [1,3], nums2 = [2]<br/>
              <b>Output: </b>2.00000<br/>
              <b>Explanation: </b>merged array = [1,2,3] and median is 2.<br/><br/>
              <b>Example 2: </b><br/>

              <b>Input: </b>nums1 = [1,2], nums2 = [3,4]<br/>
              <b>Output: </b>2.50000<br/>
              <b>Explanation: </b>merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
              <div style={titles}>
                <PrismCode
                  code={findMedianSortedArrays}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>27. Coin Change.</h3>
              <b>Input: </b>coins = [1, 2, 5], amount = 11<br/>
              <b>Output: </b>3 <br/>
              <b>Explanation: </b>11 = 5 + 5 + 1
              <div style={titles}>
                <PrismCode
                  code={coinChange}
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

export default (withStyles(styles)(DSLogic2));

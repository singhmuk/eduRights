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
  const arr = [1,2,3,4,3,0,9,0,1];
  const result=[];
  
  for(let i=0; i<arr.length;i++){
      let count=0;
     // for(let j=0;j<result.length;j++){
        for(let j=0;j<arr.length;j++){                                     //Remove Duplicates
       // if(arr[i]==result[j]) count +=1;                                 //Unique Character
          if(arr[i]==arr[j]) count +=1;
      }
      if(count==1){                                                      //RD
   // if(count==0){                                                      //UC
          result.push(arr[i]);
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
const median = () => {
  const arr = [1,12,15,26,38];
  const arr2 = [4,3,1];
  let arrMedian=[];

  const result = [...arr, ...arr2].sort((a, b) => a - b);
  const half = result.length / 2 | 0;
  
  if (result.length % 2){
      arrMedian=result[half];
  }
  else{
      arrMedian=((result[half] + result[half-1])/2);
  }
  return console.log(arrMedian);
}

median()
`.trim();

const plusOne = `
function plusOne(){
  const arr=[1,2,3];
  let result=[], result2=[];

  for(let i=0; i<arr.length; i++){
    result.push(arr[i]);
    result2 = arr[arr.length-1]+1
  }

  result.pop();
  result.push(result2);
  console.log(result)
}

plusOne();
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
function pattern123() {
  const arr=[1,2,3,4];
  const number = 132;
  const result=[];

  const target = number.toString();
  [target]

  for(let i=0; i<arr.length; i++){
    if(target.indexOf(arr[i]) !== -1){
      result.push(arr[i]);
    }
  }
  console.log(result)
}

pattern123();
`.trim();

const numIdenticalPairs = `
function numIdenticalPairs(nums) {
  let count = 0
  
  for (let i=0; i<nums.length; i++) {
    for (let j=(i+1); j<nums.length; j++) {
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
function removeEle(){
  const arr=[1,2,3,5,4];
  let ele=3;
  let removeEle=[];
  
  while(ele>0){ 
      removeEle +=arr.pop(ele)
      ele--;
  }

  console.log(removeEle)
  console.log("Remain elements", arr)
}

removeEle();
`.trim();

const shuffle = `
function shuffle() {
  const arr = [7,8,9,10];
  const n=3;

  for (let i=arr.length-1; i>0; i--) {
    let j = Math.floor(Math.random() *(i+n));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  console.log(arr);
}

shuffle()
`.trim();

const searchRange = `
function positionEle(){
  const arr = [5,7,7,8,8,10], target = 8;
  let result=[];
  let i;

  for(i=0; i<arr.length; i++){
    if(arr[i]==target){
      result.push(arr.indexOf(target));
    }
  }
  console.log(result);
}

positionEle();
`.trim();

const combinationSum = `
function combinationSum(){
  const arr=[1,2,3,6,4,5];
  const target = 7;
  let result=[];

  for(let i=0; i<arr.length; i++){
    for(let j=i; j<arr.length; j++){
      if(arr[i]+arr[j]==target){
        result.push(arr[i],arr[j])
      }
    }
  }  
  console.log(result);
}

combinationSum();
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

const findMissingRanges = `
const arr = [1,2,4,8];
const missing = [];
var count = 1;

for (let i=0; i<arr.length; i++) {
  if (arr[i] !== count) {
    missing.push(count);
    i--;
  }
  count++;
}

console.log(missing);


//2
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

  for (let i=0; i<nums.length; i++) {
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
function arrProducts(){
  const arr = [1,2,3,4];
  const result = [];
  let product, i, j;

  for(i=0; i<arr.length; i++){
    product = 1;
    for(j=0; j<arr.length; j++){
       if(i !==j) product *= arr[j];
    }
    result.push(product);
  }
  console.log(result);
}

arrProducts();
`.trim();

const countSmaller = `
function countSmaller(nums) {
  const result = nums.map(() => 0);

  for (let i=0; i<nums.length; i++) {
    for (let j=(i+ 1); j<nums.length; j++) {
      if (nums[j]<nums[i]) {
        result[i] += 1
      }
    }
  }
  
  return result
}

console.log(countSmaller([5,2,6,1]))
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

              <h3>4. Contains Duplicate.</h3>
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

              <h3>5. Compare Array</h3>
              <div style={titles}>
                <PrismCode
                  code={compare_array}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Counting Elements.</h3>
              <div style={titles}>
                <PrismCode
                  code={countElements}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>7. 132 Pattern.</h3>
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

              <h3>8. Combination Sum</h3>
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

              <h3>9. Remove Element</h3>
              <div style={titles}>
                <PrismCode
                  code={removeElement}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>10. Shuffle the Array.</h3>
              <div style={titles}>
                <PrismCode
                  code={shuffle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>11. Median of Two Sorted Arrays.</h3>
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

              <h3>12. Plus One.</h3>
              <b>Input: </b>digits = [1,2,3]<br/>
              <b>Output: </b>[1,2,4]
              <div style={titles}>
                <PrismCode
                  code={plusOne}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>13. Missing Number</h3>
              <div style={titles}>
                <PrismCode
                  code={missing_number}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. Missing Ranges.</h3>
              <div style={titles}>
                <PrismCode
                  code={findMissingRanges}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>15. Find First and Last Position of Element in Sorted Array</h3>
              Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
              <br/>
              Your algorithm's runtime complexity must be in the order of O(log n).<br/>

              If the target is not found in the array, return [-1, -1].<br/>

              <b>Example 1:</b>
              <b>Input: </b>nums = [5,7,7,8,8,10], target = 8<br/>
              <b>Output: </b>[3,4]<br/><br/>
              <div style={titles}>
                <PrismCode
                  code={searchRange}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>16. Permutations.</h3>
              Given a collection of distinct integers, return all possible permutations.
              <div style={titles}>
                <PrismCode
                  code={permute}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>17. Number of Good Pairs.</h3>
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

              <h3>18. Product of Array Except Self.</h3>
              <div style={titles}>
                <PrismCode
                  code={productExceptSelf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>19. Count of Smaller Numbers After Self.</h3>
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

              <h3>20. Array Counter</h3>
              <div style={titles}>
                <PrismCode
                  code={arrayCounter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. Summary Ranges.</h3>
              Given a sorted integer array without duplicates, return the summary of its ranges.
              <div style={titles}>
                <PrismCode
                  code={summaryRanges}
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

export default (withStyles(styles)(DSLogic2));

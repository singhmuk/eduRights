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
function fun() {
  const arr = [1, 5, 10, 20, 40, 80];
  const arr2 = [6, 7, 20, 80, 100];
  const arr3 = [3, 4, 15, 20, 30, 70, 80, 120];
  let result = [];

  for(let i=0;i<arr.length;i++){
    if(arr2.includes(arr[i]) && (arr3.includes(arr[i]))){
      result.push(arr[i])
    }
  }
  

  console.log(result);  
}

fun()


// Linked List
function createList(data) {
  let head = { value: data, next: null };
  let tail = head;

  function append(item) {
    const newNode = { value: item, next: null };
    tail.next = newNode;
    tail = newNode;
  }

  function print() {
    let currentNode = head;
    let output = '';
    while (currentNode) {
      output += currentNode.value + " ";
      currentNode = currentNode.next;
    }
    console.log(output);
  }

  return { append, print };
}

function fun(list1, list2, list3) {
  let currentNode1 = list1.head;
  console.log("Common Digit:", list1.head);
  while (currentNode1) {
    const digit = currentNode1.value;
    
    if (list2.includes(digit) && list3.includes(digit)) {
      console.log("Common Digit:", digit);
    }

    currentNode1 = currentNode1.next;
  }
}

const list = createList(1);
list.append(6);
list.append(2);

const list2 = createList(2);
list2.append(7);
list2.append(6);

const list3 = createList(3);
list3.append(2);
list3.append(8);

console.log("List 1:");
list.print();

console.log("List 2:");
list2.print();

console.log("List 3:");
list3.print();

fun(list, list2, list3);
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


//optimsed
const arr = [0, 9, 8, 7, 6];
arr.sort((a, b) => a - b);

console.log(arr);


// 2. Linked List
function createList(data){
  const head={value:data, next:null};
  let tail=null;

  function append(item){
    let newnode={value:item, next:null};

    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function traversing(){
    let mapnode=head;
    while(mapnode){
      console.log(mapnode.value)
      mapnode = mapnode.next
    }
  }

  function sorts(){
    let current=head;
    let temp;

    while(current.next){
      if(current.value>current.next.value){
        temp=current.value;
        current.value=current.next.value;
        current.next.value=temp;
      }
      current=current.next;
    }
  }

  return {append, traversing, sorts}
}

const obj=new createList(3);
obj.append(1)
obj.append(2)
obj.append(6)
obj.append(4)
obj.traversing()
obj.sorts()
obj.traversing()
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


// 2. Linked List
function createList(data){
  const head={value:data, next:null};
  let tail=null;

  function append(item){
    let newnode={value:item, next:null};

    if(tail==null){
      head.next=newnode;
      tail=newnode;
    }else{
      tail.next=newnode;
      tail=newnode;
    }
  }

  function traversing(){
    let mapnode=head;
    while(mapnode){
      console.log(mapnode.value)
      mapnode = mapnode.next
    }
  }

  function unique(){
    let current=head;

    while(current.next !== null){
      if(current.value === current.next.value){
        current.next = current.next.next;
      }else{
        current=current.next;
      }
    }
  }

  return {append, traversing, unique}
}

const obj=new createList(3);
obj.append(1)
obj.append(2)
obj.append(2)
obj.append(6)
obj.append(4)
obj.traversing()
obj.unique()
obj.traversing()
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

const bulb = `function fun() {
  let n = 4;
  let result = [];

  for (let i = 0; i <= n; i++) {
      let roundOnCount = 0;

      for (let j = 1; j <= i; j++) {
          if (i % j === 0) {
              roundOnCount++;
          }
      }

      result[i] = roundOnCount % 2 === 1;
  }

  let count = 0;
  for (const bulb of result) {
      if (bulb) {
          count++;
      }
  }

  return count;
}

console.log(fun());  
`.trim();

const rotateArray = `
function rotateArray(arr, k) {
  const n = arr.length;
  k %= n; 

  for (let i = 0; i < n; i++) {
      if (i >= k) {
          const temp = arr[i - k];
          arr[i - k] = arr[i];
          arr[i] = temp;
      }
  }

  return arr;
}

const arr = [1, 2, 3, 4, 5];
const k = 2;
rotateArray(arr, k);
console.log(arr); // Output: [4, 5, 1, 2, 3]
`.trim();

const countInversions = `

function countInversions(arr) {
  const n = arr.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
          if (arr[i] > arr[j]) {
              count++;
          }
      }
  }

  return count;
}

const arr = [4, 3, 1, 2];
const result = countInversions(arr);
console.log(result);  // Output: 5`.trim();

const cyclicShiftLeft = `
function cyclicShiftLeft(arr, k) {
  const n = arr.length;
  k %= n;                                     // In case k is larger than array length

  for (let i = 0; i < n; i++) {
      const newIndex = (i + n - k) % n;
      console.log(arr[newIndex]);
  }
}

const arr = [1, 2, 3, 4, 5];
const k = 2;
cyclicShiftLeft(arr, k);
`.trim();

const unluckyNo = `
function fun() {
  const n = 1000;
  const arr = [];

  // Fill the arr array with random numbers between 0 and 99
  for (let i = 0; i < n; i++) {
      arr.push(Math.floor(Math.random() * 100));
  }

  let count = 0;
  
  for (let i = 0; i < n; i++) {
      if (arr[i] !== 13) {
          count++;
      }
  }
  
  console.log(count);
}

fun();
`.trim();

const countNiceStrings = `
function countNiceStrings(strings) {
  const n = strings.length;
  let count = 0;

  for (let i = 0; i < n; i++) {
      let isNice = true;

      for (let j = i + 1; j < n; j++) {
          if (strings[i] >= strings[j]) {
              isNice = false;
              break;
          }
      }

      if (isNice) {
          count++;
      }
  }

  return count;
}

const strings = ["a", "b", "ab", "ba"];
const result = countNiceStrings(strings);
console.log(result);  // Output: 3
`.trim();

const arrayCounter = `
function fun(arr) {
  let maxDepth = 0;
  let stack = arr.map(element => ({ nestedArr: element, depth: 1 }));

  while (stack.length > 0) {
    const { nestedArr, depth } = stack.pop();

    if (!Array.isArray(nestedArr)) {
      maxDepth = Math.max(maxDepth, depth); // If it's not an array, it's the end of a branch
    } else {
      for (const element of nestedArr) { //push its elements to the stack with increased depth
        stack.push({ nestedArr: element, depth: depth + 1 });
      }
    }
  }

  console.log(maxDepth);
}

fun([[3]]);
fun([[[[[[[9]]]]]]]); 
fun([]); 
`.trim()

const countElements = `
function fun() {
  const arr = [-7, -3, 2, 3, 11];
  const result=[];
  
  for(let i=0;i<arr.length;i++){
    result.push(arr[i]*arr[i])
  }

  for(let i=0; i<result.length;i++){
    for(let j=i; j<result.length;j++){
      if(result[i]>result[j]){
        let temp=result[i];
        result[i]=result[j];
        result[j]=temp;
      }
    }
  }
  
  console.log(result)
}

fun()
`.trim();

const occurings = `
function fun() {
  const arr = [1, 2, 3, 4, 5, 6, 1, 2, 1, 3];
  const hash = {};

  for (let i = 0; i < arr.length; i++) {
    if (hash[arr[i]]) {
      hash[arr[i]] += 1;
    } else {
      hash[arr[i]] = 1;
    }
  }

console.log(hash);
}

fun();`.trim();

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
function fun(){
  const arr=[1,2,3,1,1,3];
  const result=[];
  let count=0;

  for(let i=0; i<arr.length; i++){
    for(let j=i+1; j<arr.length; j++){
      if(arr[i]==arr[j]){
        result.push([arr[i], arr[j]]);
        count++;
      }
    }
  }
  console.log(result)
  console.log(count)
}

fun();
`.trim();

const removeElement = `
function fun(){
  const arr=[1,2,3,5,4];
  const num=5;

  const index = arr.indexOf(num);
  arr.splice(index,1)
  console.log(arr)
}

fun();


// 2 Linked List
function createList(data) {
  let head = { value: data, next: null };
  let tail = head;

  function append(item) {
    const newNode = { value: item, next: null };
    tail.next = newNode;
    tail = newNode;
  }

  function print() {
    let currentNode = head;
    let output = '';
    while (currentNode) {
      output += currentNode.value + " ";
      currentNode = currentNode.next;
    }
    console.log(output);
  }

  function fun(target) {
    while (head !== null && head.value === target) {
      head = head.next;
    }

    let current = head;
    let prev = null;

    while (current !== null) {
      if (current.value === target) {
        prev.next = current.next;
      } else {
        prev = current;
      }
      current = current.next;
    }
  }

  return { append, print, fun };
}

const list = createList(6);
list.append(-7);
list.append(2);
list.append(1);
list.append(3);

list.print();

list.fun(2); 
list.print();
`.trim();

const shuffle = `
function fun(){
  const arr = [7,8,9,10];

  for(let i=0;i<arr.length;i++){
    const j = Math.floor(Math.random() * (i + 1));
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  console.log(arr);
}

fun();
`.trim();

const searchRange = `
function fun() {
  const nums = [5, 7, 7, 8, 8, 10];
  const target = 8;
  const result = [];
  
  for (let i = 0; i < nums.length; i++) {                  // Find the first occurrence
      if (nums[i] === target) {
          result[0] = i;
          break;
      }
  }
 
  for (let i = nums.length - 1; i >= 0; i--) {             // Find the last occurrence
      if (nums[i] === target) {
          result[1] = i;
          break;
      }
  }
  
  return result;
}

console.log(fun());  
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


// 2 Linked List
function createList(data) {
  let head = { value: data, next: null };
  let tail = head;

  function append(item) {
    const newNode = { value: item, next: null };
    tail.next = newNode;
    tail = newNode;
  }

  function print() {
    let currentNode = head;
    let output = '';
    while (currentNode) {
      output += currentNode.value + " ";
      currentNode = currentNode.next;
    }
    console.log(output);
  }

  function fun() {
    let current1 = head;

    while (current1) {
      let current2 = current1.next;

      while (current2) {
        if (current1.value + current2.value === 7) {
          console.log('('$'{current1.value},'$'{current2.value})');
        }
        current2 = current2.next;
      }
      current1 = current1.next;
    }
  }

  return { append, print, fun };
}

const list = createList(6);
list.append(-7);
list.append(-3);
list.append(2);
list.append(3);
list.append(1);
list.append(3);
list.print();

list.fun();
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
`.trim();

const sortname = `
var objs = [ 
  { first: 'Mukesh', last: 'Jamf' },
  { first: 'Rakesh', last: 'Bodine' },
  { first: 'Bicky', last: 'Prentice' }
];

function fun(){
  for(let i=0;i<objs.length;i++){
    for(let j=i;j<objs.length;j++){
      if(objs[i].first>objs[j].first){
        let temp=objs[i];
        objs[i]=objs[j];
        objs[j]=temp;
      }
    }
    console.log(objs[i])
  }
}

fun()

//2
function compare(a, b) {
  if (a.first < b.first){
    return -1;
  }
  if (a.first > b.first){
    return 1;
  }
  return 0;
}

const obj = objs.sort(compare);
console.log(obj)
`.trim();

const concatarr = `
const arr1 =[{id:1,name:"sai"}, {id:2,name: "King"}];
const arr2 = [{id:1,age:23},{id:2,age:24}];

function fun(){
   const result = arr1[0].name.concat(arr2[1].age);
   console.log(result)
}

fun();
`.trim();

const permute = `
function fun() {
  const arr = [2, 3, 1, 4];
  let maxReach=0;

  for(let i=0;i<arr.length;i++){
    maxReach = Math.max(maxReach, arr[i])
    if(i>maxReach){
      console.log('false')
    }
    else if(maxReach>arr.length-1){
      console.log('true')
    }
  }
}

fun()
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
function fun() {
  const arr = [1, 2, 3, 4];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    let prod = 1;
    for (let j = 0; j < arr.length; j++) {
      if (arr[i]!==arr[j]) {
        prod *= arr[j];
      }
    }
    result.push(prod); 
    console.log(prod);
  }
}

fun();
`.trim();

const countSmaller = `
function fun(){
  const arr = [5,2,6,1];
  const result = arr.map(() => 0);

  for(let i=0;i<arr.length;i++){
    for(let j=(i+1);j<arr.length;j++){
      if(arr[i]>arr[j]){
        result[i] +=1;
      }
    }
  }
  console.log(result)
}

fun()
`.trim();

const subarray = `
function fun(){
  const arr = [1,3,-1,6,2,2,0,3,2,1];
  let result=0;
  let sum=0;

  for(let i=0;i<arr.length;i++){
    if(arr[i]<=0){
      sum=0
    }else{
      sum +=arr[i];
      result=Math.max(result,sum)
    }
  }
  console.log(result)
}

fun()
`.trim();

const submularray = `
function fun(){
  const arr = [1,3,-1,6,2,2,0,3,2,1];
  let result=1;
  let sum=1;

  for(let i=0;i<arr.length;i++){
    if(arr[i]<=0){
      sum=1
    }else{
      sum *=arr[i];
      result=Math.max(result,sum)
    }
  }
  console.log(result)
}

fun()
`.trim();

const replaceNum = `
function fun(){
  const arr=[1,2,3,5,4];
  const num=5;
  const newnum=6;

  const index=arr.indexOf(num)
  arr.splice(index,1,newnum)

  console.log(arr)
}

fun();
`.trim();

const occurence = `
function fun() {
  const arr = [1, 2, 3, 4, 5, 6];
  const target = 6;
  const hash = {};
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (hash[target - num] !== undefined) {
      result.push(hash[target - num], num);
    }

    hash[num] = num;
  }

  return console.log(result);
}

fun();



// 2 Linked List
function createList(data) {
  let head = { value: data, next: null };
  let tail = head;

  function append(item) {
    const newNode = { value: item, next: null };
    tail.next = newNode;
    tail = newNode;
  }

  function print() {
    let currentNode = head;
    let output = '';
    while (currentNode) {
      output += currentNode.value + " ";
      currentNode = currentNode.next;
    }
    console.log(output);
  }

  function remove(target) {
    while (head !== null && head.value === target) {
      head = head.next;
    }

    let current = head;
    let prev = null;

    while (current !== null) {
      if (current.value === target) {
        prev.next = current.next;
      } else {
        prev = current;
      }
      current = current.next;
    }
  }

  return { append, print, remove };
}

const list = createList(6);
list.append(-7);
list.append(-3);
list.append(2);
list.append(3);
list.append(1);
list.append(3);
list.print();

list.remove(1); 
list.print();
`.trim();

const flateArr = `
// arr = [10,'h',2,'k',['e','z','y','g'],[44,67,'b','c','a'],[25,100,101,'m','l'],'f',60,55,'x']
// output [a,b,c,..., 1,2,3....]

const newArr = [];
for (let i = 0; i < arr.length; i++) {
  if (Array.isArray(arr[i])) {
    newArr.push(...arr[i]);
  } else {
    newArr.push(arr[i]);
  }
}

const result = [];
for (let i = 0; i < newArr.length; i++) {
  for (let j = i; j < newArr.length; j++) {
    if (newArr[i] > newArr[j]) {
      let temp = newArr[i];
      newArr[i] = newArr[j];
      newArr[j] = temp;
    }
  }
  result.push(newArr[i]);
}

console.log(result);


// 2. Separate number and string.
const arr=[
  2,   'a', 10,  'b', 'c', 'e',
  'f', 'g', 25,  44,  'h', 'k',
  'l', 55,  60,  67,  'm', 'x',
  'y', 100, 101, 'z'
]
const str=[], num=[];

for(let i=0; i<arr.length; i++){
    if(typeof arr[i]==='number'){
        num.push(arr[i])
    }else if(typeof arr[i]==='string'){
        str.push(arr[i])
    }
}

console.log(num);
console.log(str);
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
            <h3>1. Intersection of 3 Sorted Arrays</h3>
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
              <ul>
                <li><b>Time: </b>O(n^2), where n is the length of the array arr. This is because the for loop iterates over the array arr twice, and the inner for loop iterates over the array arr once.</li><br/>
                <li><b>Space: </b>O(1), where n is the length of the array arr. This is because the algorithm only uses the variables i, j, temp, and arr.</li><br/>
                <li>In simple words, the code takes a quadratic amount of time to run, and it uses a constant amount of space.</li>
              </ul>
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
              <ul>
                <li><b>Time: </b>O(n), where n is the length of the array nums. This is because the for loop iterates over the array nums once, and the map[num] lookup takes constant time.</li><br/>
                <li><b>Space: </b>O(n), where n is the length of the array nums. This is because the map object can store up to n keys.</li><br/>
                <li>In simple words, the containsDuplicate() function takes a linear amount of time to run, and it uses a linear amount of space.</li>
              </ul>
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

              <h3>6. Sort Those Squares.</h3>
              "Sort Those Squares" is a problem where you're given an array of integers, some of which could be 
              negative, and you're asked to sort the squares of those integers in ascending order. 
              <div style={titles}>
                <PrismCode
                  code={countElements}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Occurence of Elements.</h3>
              <div style={titles}>
                <PrismCode
                  code={occurings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <ul>
                <li><b>Time: </b>O(n), where n is the length of the array arr. This is because the for loop iterates over the array arr once, and the hash[arr[i]] lookup takes constant time.</li><br/>
                <li><b>Space: </b>O(n), where n is the length of the array arr. This is because the hash object can store up to n keys.</li><br/>
                <li>In simple words, the function fun() takes a linear amount of time to run, and it uses a linear amount of space.</li>
              </ul>
              <br/>

              <h3>6. Target Elements.</h3>
              <div style={titles}>
                <PrismCode
                  code={occurence}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>6. Flat Arr.</h3>
              <div style={titles}>
                <PrismCode
                  code={flateArr}
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

              <h3>10. Replace Element</h3>
              <div style={titles}>
                <PrismCode
                  code={replaceNum}
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

              <h3>15. Sort name.</h3>
              <div style={titles}>
                <PrismCode
                  code={sortname}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>16. Concat 2 array on the basis of id</h3>
              <div style={titles}>
                <PrismCode
                  code={concatarr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>17. Find First and Last Position of Element in Sorted Array</h3>
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

              <h3>18. Jump Game.</h3>
              Given an array of non-negative integers representing the maximum jump length from each position. The goal 
              is to determine if you can reach the last index of the array starting from the first position.
              <div style={titles}>
                <PrismCode
                  code={permute}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>19. Number of Good Pairs.</h3>
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

              <h3>20. Product of Array Except Self.</h3>
              <div style={titles}>
                <PrismCode
                  code={productExceptSelf}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>21. Count of Smaller Numbers After Self.</h3>
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

              <h3>21. Subarray max sum</h3>
              <div style={titles}>
                <PrismCode
                  code={subarray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>21. Maximum Product Subarray.</h3>
              <div style={titles}>
                <PrismCode
                  code={submularray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>22. Bulb swicher</h3>
              Involves toggling the states of light bulbs based on a specific pattern. You start with a row of n bulbs, 
              and you toggle every i-th bulb (i=1 to n) during the i-th round. The goal is to find how many bulbs are 
              on after n rounds.
              <div style={titles}>
                <PrismCode
                  code={bulb}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. involves rotating elements in an array by a given number of positions.</h3>
              <div style={titles}>
                <PrismCode
                  code={rotateArray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Count Inversions</h3>
              involves counting the number of inversions in an array. An inversion occurs when two elements at 
                {/* positions i and j (where i < j) satisfy the condition arr[i] > arr[j]. */}
              <div style={titles}>
                <PrismCode
                  code={countInversions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Cyclic ShiftLeft</h3>
              "Cyclic Shift" typically refers to rotating the elements of an array to the left or right by a certain 
              number of positions while maintaining the order of the elements.
              <div style={titles}>
                <PrismCode
                  code={cyclicShiftLeft}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. UnluckyNo 13</h3>
              "Unlucky 13" typically refers to a problem where you need to count the number of elements in an array 
              that are not equal to 13.
              <div style={titles}>
                <PrismCode
                  code={unluckyNo}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Count Nice Strings</h3>
              involves counting the number of strings that are "nice" among a given list of strings. A string is 
              considered "nice" if it is lexicographically smaller than all the strings appearing after it in the 
              list.
              <div style={titles}>
                <PrismCode
                  code={countNiceStrings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Array Counter</h3>
              <div style={titles}>
                <PrismCode
                  code={arrayCounter}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>23. Summary Ranges.</h3>
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

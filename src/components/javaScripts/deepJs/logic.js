import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';


const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

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


const starSig = `
// *
// **
// ***
function star(){
  var start="";
  for(let i=0; i<3; i++){
    for(let j=1; j<=(i+1); j++){
      start += "*"
    }
    start +="newLine";
  }
  console.log(start);
}
star();

//   *
//  **
// ***
function star(){
  let n = 3;
  let str = "";
  for (let i = 1; i <= n; i++){
    for (let j=0; j<(n-i); j++){
      str += " ";
    }
    for (let k=0; k<i; k++){
      str += "*";
    }
    str += "newLine";
  }
console.log(str);
}
star();

// ***
// **
// *
function star(){
  var start="";
  for(let i=3; i>0; i--){
    for(let j=(i+1); j>1; j--){
      start += "*"
    }
    start +="newLine";
  }
  console.log(start);
}
star();

// ***
//  **
//   *
function star(){
  let n = 3;
  let str = "";
  for (let i = n; i >= 1; i--){
    for (let j=0; j<(n-i); j++){
      str += " ";
    }
    for (let k=0; k<i; k++){
      str += "*";
    }
    str += "newLine";
  }
console.log(str);
}
star();
`.trim();

const Pyramid = ` 
// Upside pyramid.
function pyraminds() {
  let i, j, k, str = "";

  for (i=0; i<5; i++) {
    for (j=1; j<(5 - i); j++) {
      str += " ";
    }
    for (k=1; k<=(2 * i +1); k++) {
      str += "*";
    }

    str += 'newLine';
  }
  console.log(str)
}

pyraminds();


// downside pyramid.
for (i=1; i<5; i++) {
  for (j=0; j<i; j++) {
    str += " ";
  }
  for (k=(5 - i)*2; k>1; k--) {
    str += "*";
  }

  str += 'newLine';
}
console.log(str)
 `.trim()

const insersonSort = `
var insersionSort = function(array){
  for(var i =1; i< array.length; i++){
    for(var j=0;j<i;j++){
      if(array[i] < array[j]){
        var temp = array.splice(i, 1);
        array.splice(j,0,temp[0]);
      }
    }
  }
  
console.log(array)
return array;
}

insersionSort([3,5,1,9,6,2,1])
`.trim()

const mergSort = `
function mergeSort(arr){
    if(arr.length < 2) return arr;
    var middle = Math.floor(arr.length/2);
    var left = arr.slice(0, middle);
    var right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
 }
 
 function merge(left, right){
  var result = [];
    while(left.length && right.length){
      if(left[0] == right[0]){
        result.push(left.shift());
      }
  else{
    result.push(right.shift());}
  }
  
  while(left.length) result.push(left.shift());
  while(right.length) result.push(right.shift());
  console.log(result)
  return result;
 }
 mergeSort([3,2,1])`.trim()

const quicksort = `
function QuickSort(arr){
    if(arr.length <= 1) return arr;
        var pivot = arr[arr.length -1];
        var left = [];
        var right = [];
        for(var i=0;i<arr.length-1;i++){
        if(arr[i] < pivot){
        left.push(arr[i])
      }
    else right.push(arr[i])
    }
    return [...QuickSort(left), pivot, ...QuickSort(right)]
 }
 console.log(QuickSort([5,4,2,7,9]))
 `.trim()

const selectionSort = `function selectionSort(arr){
  var minIdx, temp,
  len = arr.length;
    for(var i = 0; i < len; i++){
    minIdx = i;
      for(var j = i+1; j<len; j++){
        if(arr[j]<arr[minIdx]){
        minIdx = j;
      }
    }
    
    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
   }
 
 console.log(arr)
 return arr;
 }
 
 selectionSort([7,5,2,4,3,9]);`.trim()



const Permutations = `
function arm(str){
  let currentChar = [];
  let remaingChar = [];
  let result = [];

  if(str.length === 0) return "";
  if(str.length === 1) return str;

  for(let i=0; i<str.length; i++){
    currentChar = str[i];
    remaingChar = str.slice(0,i) + str.slice(i+1);
    for(let j=0; j<remaingChar.length; j++){
      result.push(currentChar + arm(remaingChar)[j]);
    }
  }
  return result;
}

console.log(arm('abc'));
  `.trim()

const Pattern = `
let i,j, str="";                                                                    //Square pattern.
for(i=1; i<=5; i++){
  for(j=0; j<5; j++){
    str += "*";
  }
  str += "newLine";
}

console.log(str);


let i, j, str = "";                                                               //Right pascal star pattern.
for (i=1; i<=5; i++) {
  for (j=0; j<i; j++) {
    str += "*";
  }
  str += "newLine";
}

for (i=1; i<=(5-1); i++) {
  for (j=0; j<(5-i); j++) {
    str += "*";
  }
  str += "newLine";
}

console.log(str);
`.trim();

const amount = `
function minCoinChange(coins, amount) {
  const minCoins = new Array(amount + 1).fill(Infinity); 
  minCoins[0] = 0;                            // there are 0 ways to make amount 0 with positive coin values
 
  for(let coin of coins) {                    // look at one coin at a time
    for(let i = 0; i <= amount; i += 1) {
     
      if((i - coin) >= 0) minCoins[i] = Math.min(minCoins[i], minCoins[i - coin] + 1);
    }
  }
  
                        // if the value remains Infinity, it means that no coin combination can make that amount
  return minCoins[amount] !== Infinity ? minCoins[amount] : -1;
}

console.log(minCoinChange([1,2,3],13));`.trim();

  const armstrong = `
  function arm() {
    const num = prompt('Enter a three-digit positive integer: ');
    let sum=0,  remainder=0;
    let temp=num;
  
    while(temp>0){
      remainder = temp%10;
      sum += remainder*remainder*remainder;
      temp = parseInt(temp/10)
    }
  
    if(sum == num){
      console.log('Armstrong', num);
    }
    else{
      console.log('Not an Armstrong', num);
    }
  }
  
  arm()`.trim();

class Logic extends Component {
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
              <h3>1. Star</h3>
              newLine = \n
              <div style={titles}>
                <PrismCode
                  code={starSig}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Pyramind</h3>
              <div style={titles}>
                <PrismCode
                  code={Pyramid}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
             
              <h3>3. Pattern</h3>
              <div style={titles}>
                <PrismCode
                  code={Pattern}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Armstrong Number</h3>
              <div style={titles}>
                <PrismCode
                  code={armstrong}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Permutations</h3>
              <div style={titles}>
                <PrismCode
                  code={Permutations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>6. Given an amount of money, return the minimum number of coins needed to make that change.</b>
              <div style={titles}>
                <PrismCode
                  code={amount}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Insersion Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={insersonSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Merg Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={mergSort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Quick Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={quicksort}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Selection Sort</h3>
              <div style={titles}>
                <PrismCode
                  code={selectionSort}
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

export default (withStyles(styles)(Logic));

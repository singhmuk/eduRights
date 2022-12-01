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


const forNum=`
const PrintNumbers = (start, end)=> {
  console.log(start);
  if (start < end) {
      PrintNumbers((start + 1), end);
  }
}

PrintNumbers(1, 10);
`.trim();

const factorial = `
function factorial(n){
  if(n === 1) return 1;
  return n * factorial(n-1)
 }
 
console.log(factorial(4));
 `.trim()

const prime = `
function primes(){
  const num=100;
  const result=[];
  let i,j;

  for(i=0; i<num; i++){
      let count=0;
      for(j=2; j<i; j++){
          if(i%j==0) count +=1;
      }
   
      if(count==0){
          result.push(i);
      }
  }
  console.log(result);
}

primes()


//
function countPrimes(n){
  const map = []

  for (let i = 2; i < n; i++) {
    map[i] = true
  }
  
  for (let i = 2; i * i < n; i++) {
    if (map[i]) {
      for (let j = i * i; j < n; j += i) {
        map[j] = false
      }
    }
  }
  return map.filter(num => num === true).length
}

console.log(countPrimes(10))
`.trim()

const magicNumber = `
 function magicNum(){
   const random = Math.random(0,1)
   return random;
 }
 
 function main(){
   const result = Math.random(0, magicNum);
   console.log(result);
 }
 
 main();
 `.trim();

const possible = `
function isInt(value) {
  var x;
  if (isNaN(value)) {
    return false;
  }
  x = parseFloat(value);
  return (x | 0) === x;
}

console.log(isInt(0));`.trim();

const common_divisor = `
function numbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
      return false;
      x = Math.abs(x);
      y = Math.abs(y);
        while(y) {
          var i = y;
          y = x % y;
          x = i;
        }
  return x;
  }
 
  console.log(numbers(12, 4));
  console.log(numbers(9, 3));`.trim()

const reverse = `
function reverse(num){
  let result='';
  const target = num.toString();
  
  for(let i=target.length; i>=0; i--){
      result += target.charAt(i);
  }
  
  result = Number(result)
  console.log(result);
}

reverse(123)
`.trim();

const isPowerOfTwo = `
function isPowerOfTwo(x){
  if (x <= 0) return false;
  return (x & (x - 1)) === 0
}

console.log(isPowerOfTwo(16))
`.trim();

const addDigits = `
function addDigits(){
  const num = 2568;
  let numArr=0;
  let sum=0;

    numArr = num.toString().split('').map(Number)
    sum=numArr.reduce((a,b)=>a+b);
  
  console.log(sum);
};

addDigits()
`.trim();

const isUgly = `
function isUgly(){
  const num=15;
  const memo = [];

  function aux(n){
    if (memo[n] !== undefined) return memo[n];
    if (n===1 || n===2 || n===3 || n===5 || n===4) return true;
    if (n<5) return false;

    memo[n] = aux(n/ 2) || aux(n/ 3) || aux(n/ 5);
    return memo[n]
  }
  console.log(aux(num));
}

isUgly();
`.trim();

const getSum = `
function getSum(a, b) {
  let carry = 0;
  
  while (b !== 0) {
    carry = a & b
    a ^= b
    b = carry << 1
  }
  return a
}

console.log(getSum(5, 1))
`.trim();

const numSquares = `
function squareroot() {
  var nums=64;
  for (let i=nums; i>=1; i--) {
      if(i*i === nums){
          nums =i;
          break;
     }
 }
 console.log(nums);
}

squareroot();
`.trim();

const brokenCalc = `
function brokenCalc(){
  let X=5, Y=8;
  let result = 0;

  while(Y>X){
    if(Y%2 === 0) {
      Y /=2
    } 
    else {
      Y +=1
    }
    result +=1
  }
  console.log(result + X - Y);
}

brokenCalc()
`.trim();

const addStrings = `
function multiply() {
  let num="2";
  let num2="3";
  let product =0;

  num=Number(num)
  num2=Number(num2)
  
  product = num*num2;
  console.log(product)
}

multiply();


//
function multiply() {
  const num="2";
  const num2="3";
  const product = Array(num.length + num2.length).fill(0);

  for (let i = num.length; i--;) {
      let carry = 0;
      for (let j = num2.length; j--;) {
          product[1+i+j] += carry + num[i]*num2[j];
          carry = Math.floor(product[1+i+j] / 10);
          product[1+i+j] = product[1+i+j] % 10;
      }
      product[i] += carry;
  }
  console.log(product.join("").replace(/^0*(\d)/, "$1"));
}

multiply();
`.trim();

const myPow = `
function myPow(x, n){
  if (n === 0) return 1;

  const temp = myPow(x, Math.floor(Math.abs(n /2)))
  const result = n%2 ===0 ?temp *temp :x *temp *temp;
  return n<0 ? 1/ result :result;
}

console.log(myPow(2.00000, 10))
`.trim();

const letterCombinations = `
function letterCombinations(digits = ''){
  const map = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }

  if (!digits.length) return [];

  let result = [''];
  let index = 0;

  while (index < digits.length) {
    const next = map[digits[index]];
    const nextResult = [];

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < next.length; j++) {
        nextResult.push(result[i] + next[j])
      }
    }
    result = nextResult;
    index++;
  }
  return result;
}

console.log(letterCombinations("23"))
`.trim();

const remString = `
const greeting = 'Hello Marcus, welcome in 2020';
const withoutNumbers = greeting.replace(/[0-9]/g, '')
 console.log(withoutNumbers)


//
function removeFive(){
  let number = 915765;
  const target=5;

  let numberStr = number.toString();

  let numberArr = number.toString().split('').map(Number);
  let index = numberArr.indexOf(target); 
 
  const res = numberStr.replace(numberStr[index], '');
  console.log(res);
}

removeFive();
`.trim();


const removePart = `
function remove(){
  let str=1437000;
  str=str.toString();
  str = str.slice(0, -3);
  console.log(str)
}

remove();


//Remove a particular digit from numbers;
function addNum(){
  let number = 789051234;
  const target=5;
  let indexNum = [];
  var result=[];

  let arr = number.toString().split("");
  for(let i=0; i<arr.length; i++){
    if(arr[i]==target){
      indexNum.push(i)
    }
  }

  splitArr = arr.splice(0, indexNum)
  splitArr2 = arr.splice(1, arr.length)

  result = splitArr + ','+ splitArr2;
  // result = parseInt(splitArr.join(splitArr2))                                       //sum

  console.log(result)
}

addNum();
`.trim();


class DSLogic4 extends Component {
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
            <h3>1. Print num without loop.</h3>
              <div style={titles}>
                <PrismCode
                  code={forNum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

            <h3>2. Factorial</h3>
              <div style={titles}>
                <PrismCode
                  code={factorial}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Prime</h3>
              <div style={titles}>
                <PrismCode
                  code={prime}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Add Digits.</h3>
              <div style={titles}>
                <PrismCode
                  code={addDigits}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Remove number from number.</h3>
              <div style={titles}>
                <PrismCode
                  code={remString}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Remove last 3 characters of string or number in javascript.</h3>
              <div style={titles}>
                <PrismCode
                  code={removePart}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>7. Given a function magicNumber() that returns a random integer 1 or 0, write a new function that will generate a random number that uses this magicNumber() function.</b>
              <div style={titles}>
                <PrismCode
                  code={magicNumber}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>8. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={possible}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Common Divisor</h3>
              <div style={titles}>
                <PrismCode
                  code={common_divisor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Reverse Integer.</h3>
              <div style={titles}>
                <PrismCode
                  code={reverse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>


              <h3>11. Multiply Strings</h3>
              <b>Input: </b>num1 = "2", num2 = "3" <br/>
              <b>Output: </b>"6"
              <div style={titles}>
                <PrismCode
                  code={addStrings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/> 

              <h3>12. Perfect Squares.</h3>
              Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.
              <div style={titles}>
                <PrismCode
                  code={numSquares}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>13. Power of Two.</h3>
              Given an integer, write a function to determine if it is a power of two.
              <div style={titles}>
                <PrismCode
                  code={isPowerOfTwo}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>14. Pow(x, n).</h3>
              <b>Input: </b>x = 2.00000, n = 10<br/>
              <b>Output: </b>1024.00000
              <div style={titles}>
                <PrismCode
                  code={myPow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>15. Broken Calculator.</h3>
              On a broken calculator that has a number showing on its display, we can perform two operations:
              <br/>
              <ul>
                <li><b>Double: </b>Multiply the number on the display by 2, or;</li>
                <li><b>Decrement: </b>Subtract 1 from the number on the display.</li>
              </ul>
              Initially, the calculator is displaying the number X.
              <br/>
              Return the minimum number of operations needed to display the number Y.
              <div style={titles}>
                <PrismCode
                  code={brokenCalc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>
              
              <h3>16. Letter Combinations of a Phone Number.</h3>
              Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
              <br/><br/>
            A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.<br/><br/>
            <b>Example: </b>

            <b>Input: </b>"23"<br/>
            <b>Output: </b>["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
              <div style={titles}>
                <PrismCode
                  code={letterCombinations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>17. Ugly Number.</h3>
              Write a program to check whether a given number is an ugly number.
              <br/>
              Ugly numbers are positive numbers whose prime factors only include 2, 3, 5.
              <div style={titles}>
                <PrismCode
                  code={isUgly}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>18. Sum of Two Integers.</h3>
              Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.
              <div style={titles}>
                <PrismCode
                  code={getSum}
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

export default (withStyles(styles)(DSLogic4));

import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../prismCode';


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

const operators = `
function solve(meal_cost, tip_percent, tax_percent) {

  let total_cost;
  total_cost =  meal_cost + meal_cost * tip_percent/100 + meal_cost * tax_percent/100;
  console.log(Math.round(total_cost));
}

function main() {
  const meal_cost = parseFloat(10.20);

  const tip_percent = parseInt(10, 10);

  const tax_percent = parseInt(10, 10);

  solve(meal_cost, tip_percent, tax_percent);
}
main();`.trim();

const Review = `
function processData(input) {
  var myArray = input.split("\n");                                    //Splitting string between each newline into myArray values.
                                                                      //input is: "2\nHacker\nRank". myArray = [[2], ["Hacker"], ["Rank"]], [[0], [1], [2]]
  var evenChar = "";
  var oddChar = "";

  for (var i = 1; i= myArray; i++){                                   //Starting from 1 (Hacker) to length of array.
      for (var j = 0; j -myArray[i]; j++) {
          if (j%2 == 0) {
              evenChar += myArray[i][j];                              //Therefore, add value to evenChar string.
          } else {
              oddChar += myArray[i][j];                               //If odd, add value to oddChar string.
          }
      }
      console.log(evenChar + " " + oddChar);
      evenChar = "";
      oddChar = "";
  }
}

processData('Hacker Rank')`.trim();

const arrays = `
function main() {
  const n = parseInt(readLine(), 10);

  const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

  console.log(arr.reverse().join(' '));
}

main();


//2
function main2() {
  const n = parseInt(readLine(), 10);

  const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const reverseArray = (array) => {
      let temp = null;
      const length = array.length;
      
      for (let i = 0; i < length / 2; i++){
          temp = array[i];
          array[i] = array[length - 1 - i];
          array[length - 1 - i] = temp;
      }

      return array;
  }
  console.log(reverseArray(arr).join(' '));
}


main2();`.trim();

const Dictionaries = `
function main() {
  var n = parseInt(10);

  pbookname = [];
  pbooknums = [];
  query = [];
  
  for (i=0; i<n; i++) {
       pbook = [];
       pbook = 'readLine'.split(' ');
       pbookname.push(pbook[0])
       pbooknums.push(pbook[1]);  
  }
  
  for (j=i; j<n*2; j++) {
      if ('readLine' != "") {
          query = 'readLine'; 
          pos = pbookname.indexOf(query);
          if (pos < 0) {
              console.log("Not found");
          } else {
              console.log(query +"="+ pbooknums[pos]);
          }
      } else {
          break;
      }
  }
  
  /*
  console.log("Names " + pbookname);
  console.log("Numbers " + pbooknums);
  console.log("Queries " + query);
  */
}
main();`.trim();

const Recursions = `
function factorial(n) {
  return (!+n) ? 1 : n * factorial(n - 1);
}

factorial(4);


//2
let memoization = [0, 1];

const factorial2 = (n) => {
  (typeof memoization[n] !== 'number') && (
      memoization[n] = (n - 1) > 0 ? n * factorial(n - 1) : 1 
  );

  return memoization[n];
}


factorial2(4);`.trim();

const Binary = `
function main() {
  let n = parseInt(10, 10);
  let values = [];

  while (+n != 0) {
      values.push(n % 2);

      n = Math.floor(n / 2);
  }

  let { result } = values.reduce((target, item, index) => {
      item
          ? target['accumulator']++
          : (target['accumulator'] = 0);

      target['accumulator'] > target['result'] && (target['result'] = target['accumulator']);

      return target;
  }, { accumulator: 0, result: 0 });

  console.log(result);
}

main();


//2
function main2() {
  const n = parseInt(10, 10);
  let result = 0;

  const temp = n.toString(2).split('').reduce((target, num) => {
      let value = Number(num) > 0 ? Number(target) + Number(num) : (
          result = target > result ? target : result,
          0
      );

      return value;

  }, 0);

  console.log(result - temp > 0 ? result : temp)
}

main2();


//3
function main3() {
  const n = parseInt(10, 10);
  const array = n.toString(2).split('');
  let max = 0;
  let cur = 0;

  for (let i = 0, itotal = array.length; i < itotal; i++) {
      if (array[i] == 1) {
          cur++;
      } else if (array[i] == 0) {
          if (cur > max) {
              max = cur;
          }
          cur = 0;
      }
  }

  if (cur > max) {
      max = cur;
  }
  
  console.log(max);
}

main3();`.trim();

const tdArrays = `
function main() {
  let arr = Array(6);

  for (let i = 0; i < 6; i++) {
    arr[i] = 'readLine'
      .split(" ")
      .map((arrTemp) => parseInt(arrTemp, 10));
  }

  let sumArr = [];
  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = 0; j < arr[i].length - 2; j++) {
      let sum = 0;
      sum = arr[i][j] + arr[i][j + 1] + arr[i][j + 2] 
            + arr[i + 1][j + 1] 
            + arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];
      sumArr.push(sum);
    }
  }
  console.log(Math.max(...sumArr));
  return;
}

main();


//2
function main2() {
  let arr = [];
  for(arr_i = 0; arr_i < 6; arr_i++){
     arr[arr_i] = 'readLine'.split(' ');
     arr[arr_i] = arr[arr_i].map(Number);
  }

  //totalSum initializes at -63 because that is lowest possible outcome for any hourglass.
  //-9 -9 -9
  //   -9
  //-9 -9 -9 = -63    
  let totalSum = -63;
  for (let i=0; i < arr.length-2; i++) {
      for (let j=0, curSum = 0; j < arr[i].length-2; j++) {
          //                  //i=0; j=0     i=0; j=1    i=0; j=2    i=0; j=3
          curSum = arr[i][j] +     //arr[0][0]    arr[0][1]   arr[0][2]   arr[0][3]
                   arr[i][j+1] +   //arr[0][1]    arr[0][2]   arr[0][3]   arr[0][4]
                   arr[i][j+2] +   //arr[0][2]    arr[0][3]   arr[0][4]   arr[0][5]
                   arr[i+1][j+1] + //arr[1][1]    arr[1][2]   arr[1][3]   arr[1][4]
                   arr[i+2][j] +   //arr[2][0]    arr[2][1]   arr[2][2]   arr[2][3]
                   arr[i+2][j+1] + //arr[2][1]    arr[2][2]   arr[2][3]   arr[2][4]
                   arr[i+2][j+2];  //arr[2][2]    arr[2][3]   arr[2][4]   arr[2][5]
          if (curSum > totalSum) { //We're checking for MAX hourglass value, so if curSum is greater, set that one.
              totalSum = curSum;
          }
      }
  }
  console.log(totalSum);
}

main2();`.trim();

const Inheritance = `
console.clear();
class Person{
  constructor(firstName, lastName, id) {
    this.firstName = firstName;
		this.lastName = lastName;
		this.id = id;
  }
	printPerson() {
    console.log('Name: '$'{this.firstName} '$'{this.lastName}, ID: '$'{this.id}');
  }
}

class Student extends Person{
  constructor(firstName, lastName, id, scores){
    super(firstName, lastName, id);
    this.grade = this.calcGrade(scores)
  }
  printPerson() {
    super.printPerson();
    console.log('Grade: '$'{this.grade}');
  }
  calcGrade(scores) {
    let avg = scores.reduce((prev, curr, i, arr)=>{
      return ( (prev + curr) /arr.length )
    }, 0);
    if(avg>=40 &&  avg<55) return 'D';
    else if(avg>=55 &&  avg<70) return 'P';
    else if(avg>=70 &&  avg<80) return 'A';
    else if(avg>=80 &&  avg<90) return 'E';
    else if(avg>=90 &&  avg<=100) return 'O';
  }
}

let ivan = new Student('Ivan', 'Ivanov', '222', [80, 90, 100]);
ivan.printPerson();`.trim();

const Abstract = `
// class Book{
//     constructor(title, author, price) {
//       this.title = title;
//           this.author = author;
//           this.price = price;
//     }
//     display() {
//       console.log('Name: '$'{this.title} '$'{this.author}, ID: '$'{this.price}');
//     }
//   }

class MyBook extends Book {
    constructor(title, author, price) {
        super(title, author);

        this.price = price;
    }

    display() {
        console.log('Title: '$'{this.title}\nAuthor: '$'{this.author}\nPrice: '$'{this.price}');
    }
}
`.trim();

const Scope = `
let input = "3\n1 2 5";
const difference = () => {
  const result = input.split('\n')[1].split(' ').reduce(
    (target, el) => {
      let { min, max } = target;

      target["min"] = el > min ? el : min;
      target["max"] = el < max ? el : max;

      return target;
    },
    { min: -999, max: 999 }
  );

  console.log(Math.abs(result["max"] - result["min"]));
};

difference();


//2
let input = "3\n1 2 5";

function difference2(input) {
  const split = input.split("\n");
  const length = +split[0];
  const array = split[1].split(" ");
  console.log(array, length);
  let maximum = 0;
  let result = 0;
  
  array.forEach(value1 => {
    array.forEach(value2 =>{
      result = Math.abs(value1-value2);
      if(result > maximum) {
        maximum = result;
      }
    })
  });
  console.log(maximum);
}

console.log(input);

difference2(input);`.trim();

const Linked = `
function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}



LinkedList.prototype.addToHead = function(value) {
  var newNode = new Node(value, this.head, null);
  
  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;

  this.head = newNode;
};

LinkedList.prototype.addToTail = function(value) {
  var newNode = new Node(value, null, this.tail);
  
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  
  this.tail = newNode;
};

LinkedList.prototype.removeFromHead = function() {
  if (!this.head) return null;                                                    // empty list, return null

  var value = this.head.value;
  this.head = this.head.next;                                                     // update head pointer to new head
  
  if (this.head) this.head.prev = null;
  else this.tail = null;                                                          // linked list is empty

  return value;
};

LinkedList.prototype.removeFromTail = function() {
  if (!this.tail) return null;
  
  var value = this.tail.value;
  
  this.tail = this.tail.prev;
  
  if (this.tail) this.tail.next = null;
  else this.head = null;
  
  return value;
}

LinkedList.prototype.search = function(searchValue) {
  var currentNode = this.head;
  
  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode;
    currentNode = currentNode.next;
  }
  return null;
}

LinkedList.prototype.indexOf = function(searchValue) {
  var currentNode = this.head;
  var currentIndex = 0;
  var indexes = [];
  
  while (currentNode) {
    if (currentNode.value === searchValue) indexes.push(currentIndex);
    currentNode = currentNode.next;
    currentIndex++;
  }
  return indexes;
}


var ll = new LinkedList();

ll.addToHead(10);
ll.addToTail(15);
ll.addToTail(99);
ll.addToTail(105);
ll.addToTail(40);
ll.addToTail(20);
ll.removeFromTail();

console.log('LOG: linked list object');
console.log(ll);                                                              // should show head 10 and tail as node 40
console.log('LOG: search for node with 99');
console.log(ll.search(99));                                                   // should show node object with value 99
console.log('LOG: find indexOf node with 99');
console.log(ll.indexOf(99));                                                  // should log [2]
`.trim();

const Interfaces = `
class AdvancedArithmetic {
  divisor(n) {
    return n || 0;
  };
}

class Calculator extends AdvancedArithmetic {
  constructor(props) {
    super(props);

    this.divisor = this.divisorSum.bind(this);
  }

  divisorSum(n) {
    return Array(n).fill(0).reduce((target, item, index) => {
      !(n % (index + 1)) && (target += (index + 1)) ;

      return target;
    }, 0);
  }
}

function Solution () {
  const n = 6;

  const myCalculator = new Calculator();

  let sum = myCalculator.divisor(n);

  console.log("I implemented: AdvancedArithmetic\n" + sum); 
}

Solution();`.trim();

const Generics = ``.trim();



class HackeRank extends Component {
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
              <h3>1. Operators</h3>
              <div style={titles}>
                <PrismCode
                  code={operators}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Let's Review</h3>
              Ie: "Hacker" and  "Rank" becomes:<br />
              "Hce akr" even values - odd values [H, a, c, k, e, r] equals [0, 1, 2, 3, 4, 5]<br />
              "Rn ak" even values - odd values [R, a, n, k] equals [0, 1, 2, 3]<br /><br />
              <div style={titles}>
                <PrismCode
                  code={Review}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Arrays</h3>
              <div style={titles}>
                <PrismCode
                  code={arrays}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Dictionaries and Maps</h3>
              <div style={titles}>
                <PrismCode
                  code={Dictionaries}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Recursion</h3>
              <div style={titles}>
                <PrismCode
                  code={Recursions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Binary Numbers</h3>
              <div style={titles}>
                <PrismCode
                  code={Binary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. 2D Arrays</h3>
              <div style={titles}>
                <PrismCode
                  code={tdArrays}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Inheritance</h3>
              <div style={titles}>
                <PrismCode
                  code={Inheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Abstract Classes</h3>
              <div style={titles}>
                <PrismCode
                  code={Abstract}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Scope</h3>
              <div style={titles}>
                <PrismCode
                  code={Scope}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Linked List</h3>
              <div style={titles}>
                <PrismCode
                  code={Linked}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Interfaces</h3>
              <div style={titles}>
                <PrismCode
                  code={Interfaces}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Generics</h3>
              <div style={titles}>
                <PrismCode
                  code={Generics}
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

export default (withStyles(styles)(HackeRank));

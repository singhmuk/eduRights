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

const data_types = `
function performOperation(secondInteger, secondDecimal, secondString) {
  const firstInteger = 4;
  const firstDecimal = 4.0;
  const firstString = "HackerRank ";

  console.log(firstInteger + Number(secondInteger));

  const firstNum = Number(firstDecimal).toFixed(2);
  const secondNum = Number(secondDecimal).toFixed(2);
  const answer = Number(firstNum) + Number(secondNum);

  console.log(answer);
  console.log(firstString + secondString);
}

performOperation(10, 1.2, 'str');`.trim();

const getArea = `
function arithmatic(length, width){
  let area = length * width;
this.getArea = function(){
  return console.log('getArea',area)
}

this.getPerimeter = function(){
  let sumPerimeter = 2 * (length + width);
  return console.log('getPerimeter', sumPerimeter);
}
}

const newArithmatic = new arithmatic(3, 4.5);
newArithmatic.getArea();
newArithmatic.getPerimeter();`.trim();


const declared = `
function main(){
  const PI = Math.PI;
  const r=2.6;
  const getArea = PI * r * r;
  
  this.area=function(){
    return console.log('getArea', getArea);
  }
  
  const getPerimeter = 2 * PI * r;
  this.perimeter = function(){
    return console.log('getPerimeter', getPerimeter)
  }
}

const obj= new main();
obj.area();
obj.perimeter();
`.trim();

const scoe_grade = `
function getGrade(score) {
  if (score > 25) {
    return "A";
  } else if (score > 20) {
    return "B";
  } else if (score > 20) {
    return "B";
  } else if (score > 15) {
    return "C";
  } else if (score > 10) {
    return "D";
  } else if (score > 5) {
    return "E";
  } else {
    return "F";
  }
}

console.log(getGrade(11));`.trim();

const character = `
//1
function getLetter(s) {
  let letter;
  switch (true) {
    case "aeiou".includes(s[0]):
      letter = "A";
      break;
    case "bcdefg".includes(s[0]):
      letter = "B";
      break;
    case "hijklm".includes(s[0]):
      letter = "C";
      break;
    case "nopqrstuvwxyz".includes(s[0]):
      letter = "D";
      break;
  }
  return letter;
}

console.log(getLetter('adfgt'));


//2
function letter(){
  let str = 'aeiou';
  let str2 = 'bcdefg';
  let str3 = 'hijklm';
  
  let result = str.toUpperCase();
  let result2 = str2.toUpperCase();
  let result3 = str3.toUpperCase();
  
  switch(true){
    case str.includes(str[0]):
      console.log(result.charAt(0));
      break;
     
    case str2.includes(str2[0]):
      console.log(result2.charAt(0));
      break;
      
    case str3.includes(str3[0]):
      console.log(result3.charAt(0));
      break;
  }
}

letter();
`.trim();

const vowelsAndConsonants = `function vowelsAndConsonants(s) {
  const vowels = ["a", "e", "i", "o", "u"];
  const string = s.split("");
  let vowelArr = [];
  let consonantArr = [];
  for (let i = 0; i < string.length; i++) {
    vowels.includes(string[i])
      ? vowelArr.push(string[i])
      : consonantArr.push(string[i]);
  }
  for (let i = 0; i < vowelArr.length; i++) {
    console.log(vowelArr[i]);
  }
  for (let i = 0; i < consonantArr.length; i++) {
    console.log(consonantArr[i]);
  }
}

vowelsAndConsonants('javascriptloops');
`.trim();

const getSecondLargest = `
function getSecondLargest(nums) {
  let firstLargestNum = 0;
  let secondLargestNum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > firstLargestNum) {
      secondLargestNum = firstLargestNum;
      firstLargestNum = nums[i];
    }
    if (nums[i] > secondLargestNum && nums[i] < firstLargestNum) {
      secondLargestNum = nums[i];
    }
  }
  return secondLargestNum;
}

console.log(getSecondLargest([5, 2, 3, 6, 6, 5]));
`.trim();

const isPositive = `function isPositive(a) {
  if (a === 0) {
    throw Error("Zero Error");
  }
  if (a < 0) {
    throw Error("Negative Error");
  }
  return "YES";
}

console.log(isPositive(6))`.trim();

const getCount = `
function getCount(objects) {
  let pairCount = 0;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].x === objects[i].y) {
      pairCount++;
    }
  }
  return console.log(pairCount);
}

getCount([2,3])`.trim();

const Polygon = `
//Explanation:
There are n= 5 objects in the objects array:
objects0 = {x:1, y:1}
objects1 = {x:2, y:3}
objects2 = {x:3, y:3}
objects3 = {x:3, y:4}
objects4 = {x:4, y:5}
Because we have two objects o that satisfy o.x (i.e., objects0 and objects1), we return 2 as 
our answer.


class Polygon {
  constructor(args) {
      this.values = args;
  }

  perimeter() {
      return (this.values || []).reduce((target, item) => target + item);
  }
}

// Create a polygon with side lengths 3, 4, and 5
let triangle = new Polygon([3, 4, 5]);

// Print the perimeter
console.log(triangle.perimeter());`.trim();


const processData = `
class Rectangle {
  constructor(w, h) {
      this.w = w;
      this.h = h;
  }
}
//  Write code that adds an 'area' method to the Rectangle class' prototype


// Create a Square class that inherits from Rectangle and implement its class constructor
Rectangle.prototype.area = function() {
      return(this.w*this.h);
  };

// Create a Square class that inherits from Rectangle and implement its class constructor

 
  class Square extends Rectangle {
      constructor(s) {
          super(s);
          this.h = s;
          this.w = s;
      }
  };


if (JSON.stringify(Object.getOwnPropertyNames(Square.prototype)) === JSON.stringify([ 'constructor' ])) {
  const rec = new Rectangle(3, 4);
  const sqr = new Square(3);
  
  console.log(rec.area());
  console.log(sqr.area());
} else {
  console.log(-1);
  console.log(-1);
}`.trim();

const getMaxLessThanK = `
//We define S to be a sequence of distinct sequential integers from 1  to n; in other words, 
S = {1, 2, 3, ..., n}. We want to know the maximum bitwise AND value of any two integers, a 
and b (where a < b), in sequence S that is also less than a given integer, k.


function getMaxLessThanK(n, k) {
  let max = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      (i & j) > max && (i & j) < k ? (max = i & j) : max;
    }
  }
  return max;
}

console.log(getMaxLessThanK(8, 5));
`.trim();

const getDayName = `
function getDayName(dateString) {
  let dayName;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  dayName = days[new Date(dateString).getUTCDay()];
  return dayName;
}

console.log(getDayName(10/11/2009));`.trim();

const regexVar = `
function regexVar() {
  // It must match a string that starts and ends with the same vowel (i.e., {a, e, i, o, u})
  var re = RegExp(/^([aeiou])/);
 
  let str = 'aca';
  var res = re.exec(str);
  console.log(res);
}

regexVar();`.trim();

const regexVars = `
function regexVar() {
  // Declare a RegExp object variable named 're'
  // It must match a string that starts with 'Mr.', 'Mrs.', 'Ms.', 'Dr.', or 'Er.',
  // followed by one or more letters.
  let re = RegExp(/^(Mr|Mrs|Ms|Dr|Er)(\.)([a-zA-Z])+$/);
  let str = 'Mr.X';
  var res = re.exec(str);
  console.log(res);
}

regexVar();`.trim();

const regexVares = `
//Receive a string of s length of s ≥ 3
  s is a string that contains numbers and letters


function regexVar() {
  var re = RegExp('\\d+', 'g');
  
  let str = 4.5;
  var res = re.exec(str);
  console.log(res);
}

regexVar();`.trim();

class HackerRank1 extends Component {
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
              <p>Variables named firstInteger, firstDecimal, and firstString are declared for you in the
                editor below. You must use the + operator to perform the following sequence of operations:
              </p>
              <ul>
                <li>Convert secondInteger to an integer (Number type), then sum it with firstInteger and print
                  the result on a new line using console.log.</li>
                <li>Convert secondDecimal to a floating-point number (Number type), then sum it with
                  firstDecimal and print the result on a new line using console.log.</li>
                <li>Print the concatenation of firstString and secondString on a new line using console.log.
                  Note that firstString must be printed first.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={data_types}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Arithmetic Operators</b>
              <ul>
                <li>getArea(length, width): Calculate and return the area of a rectangle having sides length and
                  width.</li>
                <li>getPerimeter(length, width): Calculate and return the perimeter of a rectangle having sides
                  length and width.</li>
                <li>Input: 3, 4.5</li>
                <li>Output: 13.5, 15</li>
                <br />

                <b>Explanation:</b>
                <br />
                <li>The area of the rectangle is length * width =3*4.5=13.5.</li>
                <li>The perimeter of the rectangle is (length * width) =2*(3+4.5)=15.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={getArea}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <p>Let and Const</p>
              <ul>
                <li>Declare a constant variable, PI, and assign it the value Math.PI. You will not pass this
                  challenge unless the variable is declared as a constant and named PI (uppercase).</li>
                <li>Read a number, r, denoting the radius of a circle from stdin.</li>
                <li>Use PI  and r to calculate the area and perimeter of a circle having radius r .</li>
                <li>Print area as the first line of output and print perimeter as the second line of output.</li>
                <br />
                <b>Input:</b>
                <li>A single integer, , r denoting the radius of a circle.</li>
                <br />
                <b>Output:</b>
                Print the following two lines:
                <li>On the first line, print the area of the circle having radius .</li>
                <li>On the second line, print the perimeter of the circle having radius .</li>
                <br />
                <b>Input:</b>0, 2.6
                <br />
                <b>Output:</b>21.237166338267002, 16.336281798666924
              </ul>
              <br />
              <b>Explanation:</b>
              <br />
              Given the radius r=2.0, we calculate the following:
              area = PI.r pow(2) = 21.2371
              perimeter = 2*PI*r = 16.336281
              We then print  as our first line of output and  as our second line of output.
              <div style={titles}>
                <PrismCode
                  code={declared}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>If-Else</h3>
              <p>Complete the getGrade(score) function in the editor. It has one parameter: an integer, score ,
                denoting the number of points Julia earned on an exam. It must return the letter corresponding
                to her grade according to the following rules:</p>
              {/* 
  If 25 < score <= 30, then grade = A
  If 20 < score <= 25, then grade = B
  If 15 < score <= 20, then grade = C
  If 10 < score <= 15, then grade = D
  If 5 < score <= 10, then grade = E
  If 0 < score <= 5, then grade = F 
*/}

              <b>Input:</b> 11
              <br />
              <b>Output:</b> D
              <div style={titles}>
                <PrismCode
                  code={scoe_grade}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Switch</b>
              <p>
                It has one parameter: a string, s,
                consisting of lowercase English alphabetic letters (i.e., a through z). It must return A, B,
                C, or D depending on the following criteria:
              </p>
              {/* <ul>
                <li>If the first character in string s is in the set {a, e, i, o, u}, then return A.</li>
                <li>If the first character in string s is in the set {b, c, d, f, g}, then return B.</li>
                <li>If the first character in string s is in the set {h, j, k, l, m}, then return C.</li>
                <li>If the first character in string s is in the set {n, p, q, r, s, t, v, w, x, y, z}, then 
  return D.</li>
              </ul> */}
              <b>Input:</b>adfgt
              <br />
              <b>Output:</b> A
              <br />
              <br />
              <b>Explanation</b>
              <br />
              The first character of string s= adfgt is a. Because the given criteria
              stipulate that we print A any time the first character is in a,e,i,o,u , we return A as our
              answer.
              <div style={titles}>
                <PrismCode
                  code={character}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>Loops</h3>
              <p>Function has one parameter, a string,
                s, consisting of lowercase English alphabetic letters (i.e., a through z). The function must
                do the following:</p>
              <ul>
                <li>First, print each vowel in s on a new line. The English vowels are a, e, i, o, and u, and
                  each vowel must be printed in the same order as it appeared in s.</li>
                <li>Second, print each consonant (i.e., non-vowel) in s on a new line in the same order as it
                  appeared in s.</li>
                <br />
                <b>Input:</b>
                Locked stub code in the editor reads string s from stdin and passes it to the function.
                <br />
                javascriptloops
                <br />
                <br />
                <b>Output:</b>
                First, print each vowel in s on a new line (in the same order as they appeared in s). Second,
                print each consonant (i.e., non-vowel) in s on a new line (in the same order as they appeared
                in s).
                <br />
                a a i o o j v s c r p t l p s
              </ul>
              <br />
              <br />
              Observe the following:
              <div style={titles}>
                <PrismCode
                  code={vowelsAndConsonants}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <p>Arrays</p>
              Function has one parameter: an array,
              nums, of n numbers. The function must find and return the second largest number in nums.
              <br />
              <br />
              <b>Input:</b>
              Reads the following input from stdin and passes it to the function:
              <ul>
                <li>The first line contains an integer, n, denoting the size of the nums array.</li>
                <li>The second line contains n space-separated numbers describing the elements in nums.</li>
              </ul>
              2 3 6 6 5
              <br />
              <b>Output:</b> 5
              <br />
              <br />
              <b>Explanation:</b>
              <br />
              Given the array nums=[2,3,6,6,5], we see that the largest value in the array is 6 and the
              second largest value is 5. Thus, we return 5 as our answer.
              <div style={titles}>
                <PrismCode
                  code={getSecondLargest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <p>Try, Catch, and Finally</p>
              Function has one parameter, s. You must perform the following actions:
              <ul>
                <li>Try to reverse string s using the split, reverse, and join methods.</li>
                <li>If an exception is thrown, catch it and print the contents of the exception's message on a
                  new line.</li>
                <li>Print s on a new line. If no exception was thrown, then this should be the reversed string;
                  if an exception was thrown, this should be the original string.</li>
              </ul>
              <b>Input:</b>"1234"
              <br />
              <br />
              <b>Output:</b>
              You must write two print statements using console.log():
              <ul>
                <li>Print the contents of a caught exception's message on a new line. If no exception was
                  thrown, this line should not be printed.</li>
                <li>Print s on a new line. If no exception was thrown, then this should be the reversed string;
                  if an exception was thrown, this should be the original string.</li>
              </ul>
              Output: 4321
              <br />
              <br />
              <b>Explanation:</b>
              s="1234" is a string type, so it can be reversed without throwing an exception. Thus, we
              print the reversed value, 4321, as our answer.
              <div style={titles}>
                <PrismCode
                  code={data_types}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <p>Throw</p>
              Function has one integer parameter, a . If the value of a
              is positive, it must return the string YES. Otherwise, it must throw an Error according to
              the following rules:
              <ul>
                <li>If a is 0, throw an Error with message = Zero Error.</li>
                <li>If a is negative, throw an Error with message = Negative Error.</li>
              </ul>
              <b>Input:</b>
              <ul>
                <li>The first line is an integer, n, denoting the number of times the function will be called
                  with some a.</li>
                <li>Each line i of the n subsequent lines contains an integer denoting some a.</li>
              </ul>
              e.g: 3
              2
              0
              6
              <br />
              <br />
              <b>Output:</b>
              If the value of a is positive, the function must return the string YES. Otherwise, it must
              throw an Error according to the following rules:
              <ul>
                <li>If a is 0, throw an Error with message = Zero Error.</li>
                <li>If a is negative, throw an Error with message = Negative Error.</li>
              </ul>
              e.g:YES
              Zero Error
              YES
              <br />
              <br />
              <b>Explanation:</b>
              Makes the following three calls to the isPositive function:
              <ul>
                <li>isPositive(2): This returns YES because 2 is positive.</li>
                <li>isPositive(0): Because a = 0, we throw an Error with message =  Zero Error. This is caught by
                  the locked stub code and the value of its message is printed.</li>
                <li>isPositive(6): This returns YES because 6 is positive.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={isPositive}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>Count Objects</p>
              <br />
              <p>Function has one parameter: an array, a, of objects. Each
                object in the array has two integer properties denoted by x and y. The function must return a
                count of all such objects o in array a that satisfy o.x == o.y .</p>
              <b>Input:</b>
              1 1<br />
              2 3<br />
              3 3<br />
              3 4<br />
              4 5
              <br />
              <br />
              <b>Output:</b> 2
              <div style={titles}>
                <PrismCode
                  code={getCount}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <p>Classes</p>
              Create a Polygon class that has the following properties:
              <ul>
                <li>A constructor that takes an array of integer values describing the lengths of the polygon's
                  sides.</li>
                <li>A perimeter() method that returns the polygon's perimeter.</li>
              </ul>
              <b>Output:</b>
              The perimeter method must return the polygon's perimeter using the side length array passed
              to the constructor.
              <br />
              <div style={titles}>
                <PrismCode
                  code={Polygon}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <p>Inheritance</p>
              Perform the following tasks:
              1. Add an area method to Rectangle's prototype.
              <br />
              2. Create a Square class that satisfies the following:
              <ul>
                <li>It is a subclass of Rectangle.</li>
                <li>It contains a constructor and no other methods.</li>
                <li>It can use the Rectangle class' area method to print the area of a Square object.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={processData}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>Bitwise Operators</p>
              <b>Input:</b>
              3<br />
              5 2<br />
              8 5<br />
              2 2<br />
              <br />
              <b>Output:</b><br />
              1<br />
              4<br />
              0
              <div style={titles}>
                <PrismCode
                  code={getMaxLessThanK}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>JavaScript Dates</p>
              <p>
                Given a date string, dateString , in the format MM/DD/YYYY, find and return the day name for
                that date. Each day name must be one of the following strings: Sunday, Monday, Tuesday,
                Wednesday, Thursday, Friday, or Saturday. For example, the day name for the date 12/07/2016
                is Wednesday.
              </p>
              <b>Input:</b>
              10/11/2009<br />
              11/10/2010
              <br />
              <br />
              <b>Output</b>
              <br />
              Sunday<br />
              Wednesday
              <br />
              <br />
              <b>Explanation:</b>
              The function is called for the following d = 2 dates:
              <br />
              <br />
              The date 10/11/2009 was a Sunday, so we return Sunday.<br />
              The date 11/10/2010 was a Wednesday, so we return Wednesday.
              <br />
              <br />
              getUTCDay() method returns the day of the week in the specified date according to universal
              time, where 0 represents Sunday.
              <br />
              <div style={titles}>
                <PrismCode
                  code={getDayName}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <p>Regular Expressions I</p>
              Function returning a RegExp object, re, that matches any
              string s that begins and ends with the same vowel. Recall that the English vowels are a, e, i,
              o, and u.
              <br />
              <br />
              <b>Input:</b>bcd
              <br />
              <br />
              <b>Output:</b>false
              <br />
              <br />
              <b>Explanation:</b>
              This string starts with (and ends in) a consonant, so it cannot start and end with the same
              vowel.
              <ul>
                <li>Receive a string of s which is greater than or equal to the length of 3</li>
                <li>Write a regular expression that validates the string</li>
                <li>The string must be in all lowercase with characters from a-z</li>
                <li>The string must start and end with a vowel</li>
                <li>Return a boolean of true or false if the string meets the requirements</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={regexVar}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>Receive a string of s which is greater than or equal to the length of 3</p>
              <br />
              <ul>
                <li>Write a regular expression that validates the string</li>
                <li>String starts with either (Mr., Mrs., Ms., Dr., or Er.)</li>
                <li>String doesn’t contain any spaces</li>
                <li>String contains on the letters a-z or A-Z</li>
                <li>Return a boolean of true or false if the string meets the requirements</li>
              </ul>
              <b>Input:</b>Mr.X
              <br />
              <b>Output:</b>true
              <div style={titles}>
                <PrismCode
                  code={regexVars}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <p>Write a regular expression that validates the string, The expression must only output integer numbers</p>
              <br />
              <b>Input:</b>102, 1948948 and 1.3 and 4.5
              <br />
              <b>Output:</b>102, 1948948, 1, 3, 4, 5
              <br />
              <br />
              <b>Explanation:</b>
              When we call match on string  and pass the correct RegExp as our argument, it returns the
              following array of results: [ '102', '1948948', '1', '3', '4', '5' ].
              <div style={titles}>
                <PrismCode
                  code={regexVares}
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

export default (withStyles(styles)(HackerRank1));

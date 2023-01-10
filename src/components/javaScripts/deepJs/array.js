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

const nonInteger = `
let arr = []
arr[3.4] = 'Oranges'

arr.length                                                      // 0
arr.hasOwnProperty(3.4)                                         // true

arr.property = "value";                                         //Using arrays to store other properties
console.log(arr);    
`.trim();

const copyWithin = `
function copyWith(){
  var arr = [];
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(mockdata => {
        mockdata.map(val => {
          arr.push(val.name);
      })
      
    console.log('copyArr',copyArr(arr))
    });
  }
    
  const copyArr = (arr) => {
    var result=arr.copyWithin(0,1,3);
    return result;
  }
  
  copyWith();`.trim()

const iters = `
arr.filter(val => 3 > val)

arr.find(val => 3 > val)

arr.findIndex(val => 3 > val)

arr.reduce((a, b) => a + b)

arr.some((a) => a > 4)

arr.toLocaleString('en', { timeZone: "UTC" })
`.trim();

const entries = `
const entriesArr = (arr) => {
  var itr = arr.entries();
  for (var e of itr) {
    console.log(e);
  }
}

entriesArr(['a', 'b', 'c']);`.trim()

const multiArray = `
//1
let a = new Array(4)
for (var i = 0; i < 4; i++) {
  a[i] = new Array(4)
  for (var j = 0; j < 4; j++) {
    a[i][j] = [ + i + ', ' + j ];
    console.log(a[i][j]);
  }
}


//2
let myNestedArray = [
  ['unshift', false, 1, 2, 3, 'complex', 'nested'],
  [['loop'], ['deep'], ['shift', 6, 7, 1000, 'method']],
  [[['concat'], ['deeper'], [false, true, 'spread', 'array']],
  [[['mutate', 1327.98], ['deepest', 'splice', 'slice', 'push']]
  ]]
];

console.log(myNestedArray)`.trim();

const combined = `
function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence = ['learning', ...fragment, 'is', 'fun']; 
  return sentence;
}

console.log(spreadOut());`.trim();

const spreadOp = `
function copyMachine(arr, num) {
  let newArr = [];
  while (num >= 1) {
    newArr = [[...arr], ...newArr];
    num--;
  }
  return newArr;
}

console.log(copyMachine([true, false, true], 2));`.trim();

const modifyArr = `
let user = {
  name: 'Kenneth',
  age: 28,
  data: {
    username:'kennethCodesAllDay',
    joinDate:'March 26, 2016',
    organization:'freeCodeCamp',
    friends: ['Sam', 'Kira', 'Tomo'],
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA'
    }
  }
};

function addFriend(userObj, friend) {
  userObj.data.friends.push(friend);
  return userObj;
};

console.log(addFriend(user, 'Pete'));
`.trim();

const jsNum = `
ex. (123).toString()

x = Number(true)                                     //1
x = Number(false)                                    //0
x = Number(new Date())                               //1615382431900
x = Number("999")                                    //999
x = Number("999 888")                                //NaN


// parseFloat
x = parseFloat("10")                                 //10
x = parseFloat("10.00")                              //10
x = parseFloat("10.33")                              //10.33
x = parseFloat("34 45 66")                           //34
x = parseFloat("   60   ")                           //60
x = parseFloat("40 years")                           //40
x = parseFloat("He was 40")                          //NaN


//isFinite
x = isFinite(123)                                    //true
x = isFinite(-1.23)                                  //true
x = isFinite("123")                                  //true
x = isFinite("Hello")                                //false
x = isFinite("2005/12/12")                           //false


//isNaN
x = isNaN(123)                                       //false
x = isNaN(-1.23)                                     //false
x = isNaN("123")                                     //false
x = isNaN("Hello")                                   //true
x = isNaN(" ")                                       //false
x = isNaN(true)                                      //false
x = isNaN(undefined)                                 //true
x = isNaN(NaN)                                       //true
x = isNaN(0 / 0)                                     //true
x = isNaN(null)                                      //false

console.log(x)
`.trim();

const dataTypes = `
var x = Math.abs(-7.25)                                             //7.25
var x = Math.abs(7.25)                                              //7.25


var x = Math.ceil(-7.25)                                            //-7
var x = Math.ceil(7.25)                                             //8


var x = Math.floor(-7.25)                                           //-8
var x = Math.floor(7.25)                                            //7


var x = Math.fround(-7.25)                                          //-7.25
var x = Math.fround(7.25)                                           //7.25
var x = Math.fround(2.60)                                           //2.5999999046325684
var x = Math.fround(2.50)                                           //2.5

Math.max(-7.25, 7.25)                                               //7.25
Math.min(-7.25, 7.25)                                               //-7.25
//Sign
var x = Math.sign(7.25)                                                                //1
var x = Math.sign(-7.25)                                                               //-1
var x = Math.sign(0)                                                                   //0
var x = Math.sqrt(-7.25)                                                               //NaN
var x = Math.sqrt(9) 

console.log(x)


//Math.PI
console.log(Math.PI);                                               //3.14
`.trim();


const decimal = `
var num = 123.4567
var mockData = [1, 6, 7, 8, 9, 0, 8, 2, 3, 4, 5]

var x = num.toFixed(2)
x = num.toPrecision(6)
x = mockData.sort()
x = mockData[0] = "cars"
x = delete mockData[0];
x = mockData.splice(2, 0, "Lemon", "Kiwi");
x = mockData.slice(1);

console.log(x)
`.trim();

const random = `
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
 }
 
 getRndInteger(2,7)
 


//2 Random Function
function randomObj() {
  let a, b, c, d, e, f, g, h, i, j
     a = Math.floor(Math.random() * 10);                           //returns a random integer from 0 to 9.
     b = Math.floor(Math.random() * 10) + 1;  
     
     return [a,"-", b]
}

randomObj()
`.trim();


const decimalToBinary = `function decimalToBinary(num) {
  var bin = [];
  while (num > 0) {
    bin.unshift(num % 2);
    num >>= 1;
  }
  console.log(bin.join(''));
 }
 
 decimalToBinary(2);
`.trim();


const DecimalToOctal = `function decimalToOctal(num) {
  var oct = 0,c=0;
  while (num > 0) {
    var r=num%8;
    oct=oct+(r*Math.pow(10,c++));
    num =Math.floor(num/ 8);                                   //basically /= 8 without remainder if any.
  }
  console.log(oct);
 }
 
 decimalToOctal(2);
 `.trim();

const DecimalToHex = `
 function intToHex(num){
   switch(num){
         case 10: return "A";
         case 11: return "B";
         case 12: return "C";
         case 13: return "D";
         case 14: return "E";
         case 15: return "F";
       }
     return num;
  }
  
  function decimalToHex(num){
     let hex_out = [];
     while(num > 15) {
       hex_out.push(intToHex(num/16))
   }
   
 return intToHex(num) + hex_out.join("");
 }
 
 console.log(decimalToHex(999098) === "F3EBA");
 console.log(decimalToHex(123) === "7B");
 `.trim();

const stringFun = `
 var a = new Date();                                  //Wed Mar 10 2021 19:18:41 GMT+0530 (India Standard Time)
 var b = "12345";                                                //12345
 var c = 12345;                                                  //12345
 `.trim();

const trim = `
 var str = 'Centralized empowering task-force';
 var str2 = '';
 var str3 = '';
 
 str = str.charAt(3)
 str2 = str.concat(str3)
 str3 = str2.charCodeAt(3)                                                         //116
 str4 = str.indexOf('t')                                                           //-1
 str5 = str2.search('empowering')                                                  //12
 str6 = str2.match('ing')
 str7 = str2.replace('empowering', 'women')                                 //Centralized women task-force
 str8 = str2.substr(2, 7)                                                          //ntraliz
 str9 = str2.substring(2, 7)                                                       //ntral            
 str10 = str2.valueOf()                                                     //Centralized empowering task-force
 str11 = "   empowering"
 str12 = str11.slice(2, 5)                                                         //em
 str13 = str11.toUpperCase()                                                       //EMPOWERING
 
 console.log('toUpperCase', str13)
   `.trim();


const interpolation = `
 let firstName = "John";
 let lastName = "Doe";
 
 let text = 'Welcome '$'{firstName}, '$'{lastName}!';
 console.log(text)
 `.trim();


class Arrays extends Component {
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
              <b>Indexed collections: </b>
              An array is an ordered list of values that refer with a name and an index.
              <br />
              <h3>1.Creating an array</h3>
              <ul>
                <li>let arr = new Array(0, 1, ..., N);</li>
                <li>let arr = Array(0, 1, ..., N);</li>
                <li>let arr = [0, 1, ..., N];</li>
              </ul>
              <br />
              If supply a non-integer value to the array operator, a property will be created in the
              object representing the array, instead of an array element.
              <div style={titles}>
                <PrismCode
                  code={nonInteger}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Array Methods</h3>
              const arr = ["Saab", "Volvo", "BMW", 1, 2, 3, 4, 5, new Date('08 Jan 1997 17:12:00 UTC')];
              <br />
              <br />

              Also create an array, and then provide the elements:
              <br />
              const cars = [];<br />
              cars[0]= "Saab";

              <br />
              <br />
              <b>Using new keyword: </b>
              const arr2 = new Array("Aulto", "Zipsi", "Bokati");
              <br />
              <ul>
                <li><b>Accessing array elements: </b>arr[0]</li>
                <li><b>Changing an array element: </b>arr[0] = "Opel"</li>
                <li><b>arr.length: </b></li>
                <li><b>arr.sort(): </b></li>
                <li><b>arr.push("Lemon"): </b>Adds one or more elements to the end of an array.</li>
                <li><b>arr.pop(): </b>Removes and returns the last element of an array.</li>
                <li><b>shift():</b>It removes and returns the first element of an array.</li>
                <li><b>unshift(): </b>Adds one or more elements in the beginning of the given array.</li>
                <li><b>Array.isArray(arr): </b>Tests if the passed value ia an array.</li>
                <li><b>toString(): </b>arr.toString()</li>
                <ul>
                  <li>It converts the elements of a specified array into string form, without affecting the original array.</li>
                </ul>
                <br />

                <li><b>arr.flat(): </b>Creates a new array carrying sub-array elements concatenated recursively till the specified depth.</li>
                <li><b>arr.fill("Bootstrap"): </b>Fills elements into an array with static values.</li>
                <li><b>Array.from(arr): </b>Creates a new array carrying the exact copy of another array element.</li>
                <li><b>arr.includes("Saab"): </b>Checks whether the given array contains the specified element.</li>
                <li><b>arr.indexOf("Saab"): </b>Searches the specified element in the given array and returns the index of the first match.</li>
                <li><b>arr.join("-"): </b>Joins the elements of an array as a string.</li>
                <li><b>arr.lastIndexOf("BMW"): </b>Searches the specified element in the given array and returns the index</li>
                <li><b>arr.reverse(): </b>Reverses the elements of given array.</li>
                <li><b>arr.slice(1, 2): </b>Returns a new array containing the copy of the part of the given array.</li>
                <li><b>arr.sort(): </b></li>
                <li><b>arr.splice(1, 2): </b>Modify original array.</li>
                <li><b>concat(): </b>Returns a new array object that contains two or more merged arrays.</li>
                forEach(), map(), of(), reduceRight()
              </ul>
              <br />

              <h3>Iterator Array</h3>
              <ul>
                <li><b>filter(): </b>Returns the new array containing the elements that pass the provided function conditions.</li>
                <li><b>find(): </b>Returns the value of the first element in the given array that satisfies the specified condition.</li>
                <li><b>findIndex(): </b>Returns the index value of the first element in the given array that satisfies the specified condition.</li>
                <li><b>reduce(): </b>Executes a provided function for each value from left to right and reduces the array to a single value.</li>
                <li><b>some(): </b>Determines if any element of the array passes the test of the implemented function.</li>
                <li><b>toLocaleString(): </b>Returns a string containing all the elements of a specified array.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={iters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>entries(): </b>It creates an iterator object and a loop that iterates over each key/value pair.
              <br />
              <div style={titles}>
                <PrismCode
                  code={entries}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>values():</b> It creates a new iterator object carrying values for each index in the array.
              <br />
              <br />

              <b>Multi-dimensional arrays: </b>Array can contain another array as an element.
              <br />
              <b>Ex. </b>Creates a two-dimensional array.
              <div style={titles}>
                <PrismCode
                  code={multiArray}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Combine Arrays with the Spread Operator</h3>
              <p>
                Spread operator have ability to combine arrays, or to insert all the elements of one array into another, at any index.
              </p>
              <div style={titles}>
                <PrismCode
                  code={combined}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Copy an Array with the Spread Operator</b>
              <p>
                <ul>
                  <li>While slice() allows us to be selective about what elements of an array to copy</li>
                  <li>Spread operator allows us to easily copy all of an array's elements.</li>
                </ul>
              </p>
              <div style={titles}>
                <PrismCode
                  code={spreadOp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Modify an Array Stored in an Object</b>
              <div style={titles}>
                <PrismCode
                  code={modifyArr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Create a Set</h3>
              const my_set = new Set(["a", "b", "c", "a"])
              <br />
              <br />
              <b>Add items in existing set: </b>my_set.add("ab");
              <br />

              <b>Set Methods: </b>
              <ul>
                <li><b>my_set.values(): </b>returns a new Set containing all the values in a Set.</li>
                <li><b>my_set.add("UO"): </b>Adds a new element to the Set.</li>
                <li><b>delete(): </b>Removes an element from a Set.</li>
                <li><b>has(): </b>Returns true if a value exists in the Set.</li>
                <li><b>values: </b>Returns an iterator with all the values in a Set.</li>
                <li><b>size: </b>Returns the number of elements in a Set.</li>
              </ul>
              <br />

              <h3>4. JsNumbers</h3>
              JavaScript Numbers are Always 64-bit Floating Point.
              <br />
              <p><b>parseFloat():</b> Parses a string and returns a floating point number.</p>
              <p>
                This function determines if the first character in the specified string is a number. If it is, it parses the string until it reaches
                the end of the number, and returns the number as a number, not as a string.
              </p>
              <ul>
                <li>Only the first number in the string is returned!</li>
                <li>Leading and trailing spaces are allowed.</li>
                <li>If the first character cannot be converted to a number, parseFloat() returns NaN.</li>
              </ul>
              <br />
              <br />

              <b>isFinite:</b>
              <ul>
                <li>Determines whether a number is a finite, legal number.</li>
                <li>Returns false if the value is +infinity, -infinity, or NaN, Otherwise it returns true.</li>
              </ul>
              <br />

              <b>isNan: </b>
              <ul>
                <li>Returns true if the argument is not a number otherwise it is false.</li>
              </ul>
              <br />

              <ul>
                <li>This format stores numbers in 64 bits, where the number (the fraction) is stored in bits 0 to 51, the exponent in
                  bits 52 to 62, and the sign in bit 63.</li>
                <li>Extra large or extra small numbers can be written with scientific (exponent) notation.</li>
                <li>NaN is a JavaScript reserved word indicating that a number is not a legal number.
                  Trying to do arithmetic with a non-numeric string will result in NaN.
                  <br />
                  <b>Ex. </b>100 / "Apple";</li>
              </ul>
              <br />

              <ul>
                <li><b>toString(): </b>Returns a number as a string.</li>
                <li><b>toFixed(): </b>Returns a string, with the number written with a specified number of decimals.</li>
                <li><b>toPrecision(): </b>Returns a string, with a number written with a specified length.</li>
                <li><b>parseInt(): </b>Parses a string and returns a whole number.</li>
                <li><b>splice(): </b>Method can be used to add new items to an array.</li>
                <li><b>slice(): </b>Method creates a new array. It does not remove any elements from the source array.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={jsNum}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Sign</b>
              <ul>
                <li><b>Math.abs: </b>Return the absolute value of a number.</li>
                <li><b>ceil():: </b>Rounds a number UPWARDS to the nearest integer, and returns the result.</li>
                <li><b>floor(): </b>Round a number downward to its nearest integer.</li>
                <li><b>round(): </b>Returns the nearest (32-bit single precision) float representation of a number.</li>
                <li><b>max(): </b>Returns the number with the highest value.</li>
                <li><b>min(): </b>Returns the number with the lowest value.</li>
                <br />
                <br />
                The sign() method checks whether a number is negative, positive or zero.
                <li>If the number is positive, this method returns 1.</li>
                <li>If the number is negative, it returns -1.</li>
                <li>If the number is zero, it returns 0.</li>
                <li><b>sqrt(): </b>Return the square root of a number.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={dataTypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Numbers formate</h3>
              <div style={titles}>
                <PrismCode
                  code={decimal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Random Number</h3>
              <div style={titles}>
                <PrismCode
                  code={random}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. DecimalToBinary</h3>
              <div style={titles}>
                <PrismCode
                  code={decimalToBinary}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. DecimalToOctal</h3>
              <div style={titles}>
                <PrismCode
                  code={DecimalToOctal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. DecimalToHex</h3>
              <div style={titles}>
                <PrismCode
                  code={DecimalToHex}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. String</h3>
              <ul>
                <li>String() converts the value of an object to a string.</li>
                <li>String() returns the same value as toString() of the individual objects.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={stringFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>There are 2 ways to create string in JavaScript</b>
              <br />
              1.By string literal<br />
              var str = "Please locate where 'locate' occurs!";
              <br />
              <br />
              2.By string object<br />
              var str2 = new String("string literal");
              <br />
              <br />
              <ul>
                <li><b>charAt:</b> It provides the char value present at the specified index.</li>
                <li><b>charCodeAt():</b> It provides the Unicode value of a character present at the specified index.</li>
                <li><b>concat():</b> It provides a combination of two or more strings.</li>
                <li><b>indexOf():</b> It provides the position of a char value present in the given string.</li>
                <li>
                  <b>lastIndexOf():</b> It provides the position of a char value present in the given string by searching a character from
                  the last position.
                </li>
                str.lastIndexOf("locate", 15)
                <li>
                  <b>search():</b> It searches a specified regular expression in a given string and returns its position if a match
                  occurs.
                </li>
                <br />
                <br />

                <b>indexOf() and search() accept the same arguments, and return the same value. But they has differences as:</b>
                <ul>
                  <li>The search() method cannot take a second start position argument.</li>
                  <li>The indexOf() method cannot take regular expressions.</li>
                </ul>
                <br />

                <li>
                  <b>match():</b> It searches a specified regular expression in a given string and returns that regular expression if
                  a match occurs, as an Array object.
                </li>
                <li>
                  <b>replace():</b> It replaces a given string with the specified replacement.
                </li>
                <li>
                  <b>substr():</b> It is used to fetch the part of the given string on the basis of the specified starting position and
                  length.
                </li>
                <li><b>substring(): </b>
                  <ul>
                    <li>substring() is similar to slice(), but substring() cannot accept negative indexes.</li>
                    <li>It is used to fetch the part of the given string on the basis of the specified index.</li>
                  </ul>
                </li>
                <br />

                <li><b>valueOf():</b> It provides the primitive value of string object.</li>
                <li><b>trim():</b> It trims the white space from the left and right side of the string.</li>
                str.trim()
                <br />
                <br />

                <li><b>str.length: </b></li>
                <li><b>str.includes("Please"): </b></li>
                <li><b>str.startsWith("occurs"): </b></li>
                <li><b>str.endsWith("locate"): </b></li>
                <li><b>str.slice(7, 13): </b></li>
                <li><b>str.toUpperCase(): </b></li>
                <li><b>str.toLowerCase(): </b></li>
                <li><b>Property Access: </b>str[0]</li>
                <li><b>String can be converted to an array with the split() method: </b>str.split(" ")</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={trim}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. String Interpolation</h3>
              <ul>
                <li>It allows injecting variables, function calls, arithmetic expressions directly into a string.</li>
                <li>In JavaScript, the template literals and $ Curly braces expression as placeholders perform the string interpolation.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={interpolation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Fetch javaScript</h3>
              It copies the part of the given array with its own elements and returns the modified array.
              <br />
              <div style={titles}>
                <PrismCode
                  code={copyWithin}
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

export default (withStyles(styles)(Arrays));

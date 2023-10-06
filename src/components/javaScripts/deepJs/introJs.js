import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

import EventLoop from "../../../assets/imgs.svg";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

const redesign = {
  height: 350,
  width: 600,
};

const styles = (theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
});

const undeclaredVar = `
var a
console.log('Undefined variables', a)
console.log('Undeclared variables', b)`.trim();

const varConst = `
var obj = Object.freeze({ name: 'Mukesh' });
obj.name = 'Rakesh';

console.log(obj.name);                                                  
`.trim();

const iifes = `
var x = 23; 
  (function(){   
      var x = 43;   
      (function random(){     
          x++;     
          console.log(x);     
          var x = 21;   
      })(); 
  })();                                                           
`.trim();

const spreadRests = `
function obj(name) {
  this.name = name;
}

obj.prototype.greet = function() {
  console.log('hello, '$'{this.name}');
};

const obj1 = new obj('John');
const obj2 = new obj('Jane');

obj1.greet(); 
obj2.greet();
`.trim();

const spreadRest = `
//Rest
function add(a,b,c,...other){
  console.log(other);
  console.log(other[0]);
  return a+b+c;
}

console.log(add(3,4,5,1,2));


//2
const num = [1,2,3,4,5,6]
function addSpread(num, num2, num3){
  console.log(num, num2, num3);
}

// console.log(addSpread(num[0], num[1], num[2]));
addSpread(...num);
addSpread(num);
`.trim();

const currying = `
//clousers implements in curry
function sum(a){
  return function(b){
    return function(c){
      return a+b+c;
    }
  }
}

let sumcall = sum(2)(3)(4);
console.log(sumcall)


//2
var prism = l => w => h => l * w * h;
console.log(prism(2)(3)(5))
`.trim();

const generator = `
  function* generator_function() {
      yield 1;
      yield 2;
    }
    
   let generator = generator_function();
   
   console.log(generator.next().value);
   console.log(generator.return(22).value);
   console.log(generator.next().value);
   
   generator = generator_function();
   let iterable = generator[Symbol.iterator]();
   
   console.log(iterable.next().value);
   console.log(iterable.next().done);
 `.trim();

const yields = `
function* generator_function_1(){
  yield 2;
  yield 3;
}

function* generator_function_2() {
   yield 1;
   yield* generator_function_1();
   yield* [4, 5];
 }

var generator = generator_function_2();
console.log(generator.next().value);
console.log(generator.next().value);`.trim();

const stricts = `
'use strict';
delete Object.prototype;                                                                    // throws a TypeError.


//2
function sum(a, a, c) {                                                                     // syntax error.
  'use strict';
  return a + a + c;                                                                  // wrong if this code ran.
}
`.trim();

const eventLoop = `
console.log("Start");

// Asynchronous setTimeout function
setTimeout(function() {
  console.log("Timeout callback executed");
}, 1000);

// Synchronous loop
for (let i = 0; i < 5; i++) {
  console.log("Loop iteration:", i);
}

console.log("End");
 `.trim();

const security = `
//async
<script async src="js/script2.js"></script>
<script async src="js/script3.js"></script>


//defer
<script defer src="js/script2.js"></script>
<script defer src="js/script3.js"></script>
`.trim();

const proxies = `
let handler = {
  get: function(target, name) {
    return name in target? target[name] : 42
  }
}

let p = new Proxy({}, handler)
p.a = 1
console.log(p.a, p.b) `.trim();

const features = `import * as Module from './modules/module.js';`.trim();

const exportsing = `export { name, draw, reportArea, reportPerimeter };`.trim();

const loading = `
import('/index.js')
  .then((module) => {
    // Do something with the module.
  });
`.trim();

const debouncing = `
<input typt="text" onkeyup="betterDebouncing()" />


---------------------------------------------js-------------------

let counter = 0
const getData = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json()) 
            .then(responseData => {
                console.log('dddd',responseData,"---",counter++);
            });
}

const debounced = function (fn ,d){
  let timer;
  return function(){
    let context = this,
    args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      getData.apply(context, args)
    }, d)
  }
}

const betterDebouncing = debounced(getData, 300);
`.trim();

const throttle = `
const loggerFunc = () => {
  console.count("Throttled Function");
}

const throttle = (fn, limit) => {
  let flag = true;
  return function(){
    let context = this;
    let args = arguments;
    if(flag){
      fn.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag=true;
      }, limit);
    }
  }
}

const betterLoggerFunction = throttle(loggerFunc, 1000);

window.addEventListener("resize",betterLoggerFunction);

// This is the normal Function without Throttling
const normalFunc = () => {
  console.count("Normal Function");
}

window.addEventListener("resize",normalFunc);
`.trim();

const execution = `
function foo() { }                                                             // function statement.


var foo = function() { }                                                       // function expression.
`.trim();

const code = `
const outerFun = (a) => {
  let b=2;
  const innerFun = () => {
      let sum = a+b;
      console.log('sum is',sum)
    }
  innerFun();
}

outerFun(1);
 `.trim();

const variables = `
//1. Using an Object Literal
Const emp={id:102,name:"Shyam Kumar",salary:40000}


//2. Constructor functions
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const john = new Person('John', 30);


//3. ES6 Classes
class Person {
  constructor(name, age) {
    this.name = name;
  }
}

const john = new Person('John');


//4. Object.create()
const obj = Object.create(emp);
`.trim();

const proCallbacks = `
const mocks=[
  {name:'A', Profession:'SE'},
  {name:'B', Profession:'SE'},
]

function fun(){
  setTimeout(()=>{
    let result='';
    mocks.forEach(data=>(
      result += data.name+","
    ))
    console.log(result)
  },1000)
}

function main(newdata){
  setTimeout(()=>{
    mocks.push(newdata)
  },2000);
}

fun();
main({name:'C', Profession:'Developer'})


//Solve by callback.
function fun(){
  setTimeout(()=>{
    let result='';
    mocks.forEach(data=>(
      result += data.name+","
    ))
    console.log(result)
  },1000)
}

function main(newdata, cb){
  setTimeout(()=>{
    mocks.push(newdata)
    cb();
  },2000);
}

main({name:'C', Profession:'Developer'}, fun)
`.trim();

const promisePro = `
const mocks=[
  {name:'A', Profession:'SE'},
  {name:'B', Profession:'SE'},
]

function fun(){
  setTimeout(()=>{
    let result='';
    mocks.forEach(data=>(
      result += data.name+","
    ))
    console.log(result)
  },1000)
}

function main(newdata){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      mocks.push(newdata)
      let err=false;
      if(!err){
        resolve();
      }else{
        reject('Error ocuur')
      }
    },2000);
  })
  
}

main({name:'C', Profession:'Developer'}).then(fun).catch(err=>console.log(err));
`.trim();

const callbackJs = `
const mocks=[
  {name:'A', Profession:'SE'},
  {name:'B', Profession:'SE'},
]

function fun(){
  setTimeout(()=>{
    let result='';
    mocks.forEach(data=>(
      result += data.name+","
    ))
    console.log(result)
  },1000)
}

function main(newdata){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      mocks.push(newdata)
      let err=false;
      if(!err){
        resolve();
      }else{
        reject('Error ocuur')
      }
    },2000);
  })
  
}

async function demo(){
  await main({name:'C', Profession:'Developer'});
  fun()
}

demo();
`.trim();

const chaineds = `
 //Promises Chaning
 new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
    })
    
.then((result) => {
    alert(result); return result * 3;
    })
.then((result) => {
    alert(result); return result * 4;
    })
.then((result) => {
    alert(result); return result * 6;
});
`.trim();

const thisKey = `
const person = {
  name: 'John',
  greet() {
    console.log(this.name);
  }
};

person.greet(); 
`.trim();

const thisKey2 = `
function greet() {
  console.log(this.name);
}

const person = {
  name: 'John'
};

const boundGreet = greet.bind(person);
boundGreet();`.trim();

const thisKey3 = `
<button id="myButton">Click me</button>

<script>
  const button = document.querySelector('#myButton');
  button.addEventListener('click', function() {
    console.log(this === button); // true
  });
</script>
`.trim();

const bind_2 = `
const obj={
  name:'Krishana',
  address:'Gokul',
}

function show(){
  console.log(this);
}

const newObj=show.bind(obj);
newObj();
`.trim();

const calls = `
//call use to borrow function.
const obj={
  name:'Krishana',
  address:'Gokul',
}

const obj2={
  name:'Ram',
  address:'Gokul',
}

function show(){
  console.log(this.name);
}

show.call(obj);
show.call(obj2);
`.trim();

const applys = `
const obj={
  name:'Krishana',
  address:'Gokul',
}

const obj2={
  name:'Ram',
  address:'Gokul',
}

function show(state,country){
  console.log(this.name,"---",state,'---',country);
}

show.apply(obj, ["Delhi", "India"]);
show.apply(obj2, ["Ranchi", "India"]);
`.trim();

const convertObj = `
let obj = { id: "1", name: "Test User", age: "25", profession: "Developer" };


console.log(Object.keys(obj));                     //Convert the keys to Array using - Object.keys().

console.log(Object.values(obj));                   //Converts the Values to Array using - Object.values().

console.log(Object.entries(obj));                  //Converts both keys and values using - Object.entries().
`.trim();

const convertArr = `
let arr = ["1", "Test User", "25", "Developer"];
let arr1 = [
  ["id", "1"],
  ["name", "Test User"],
  ["age", "25"],
  ["profession", "Developer"],
];

console.log(Object.assign({}, arr));
console.log({ ...arr });
console.log(Object.fromEntries(arr1));`.trim();

const shallow = `

`.trim();

const argumentsk=`
function outer() {
  const innerArrow = () => {
    console.log(arguments);
  };

  innerArrow(1, 2, 3);
}

outer(4, 5, 6);
`.trim();

const firstClass = `
function fun(){
  return 'Argument';
}

function main(cb, name){
  console.log(cb(), name)
}

main(fun, 'Krishans')


//2
function main(){
  return function fun(){
    console.log('Return bt another function.');
  }
}

const obj = main();
obj();


//3
const main = function (){
  console.log('Assigned as a value.');
}

main();
`.trim();

const hoFunction = `
function fun(arr, cal) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(cal(arr[i]));
  }

  return result;
}

const numbers = [1, 2, 3, 4, 5];

const double = fun(numbers, (num) => num * 2);
const square = fun(numbers, (num) => num ** 2);

console.log(double); 
console.log(square); 
`.trim();

class IntroJs extends Component {
  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h4>
              <Sidebar />
            </h4>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <List>
              <h3>1. What are JavaScript Data Types?</h3>
              <ul>
                <li>Default javaScript is Synchronous.</li>
                <li>In JavaScript null is <b>nothing</b>. It is supposed to be
                something that
                <b> doesn't exist</b>. In JavaScript, the data type of null is
                an <b>object</b>.</li>
                <li>JavaScript is a dynamically typed language, means variables can hold values of different data types at 
                  different times during their lifecycle. JavaScript has several built-in data types, which can be categorized 
                  into two main categories:</li>
                  <ul>
                    <li><b>primitive data types</b></li>
                    <li><b>Reference data types</b></li>
                  </ul>
                  <br/>
                <li>Primitive Data Types:</li>
                <ul>
                    <li><b>Number</b></li>
                    <li><b>String</b></li>
                    <li><b>Boolean</b></li>
                    <li><b>Null</b></li>
                    <li><b>Undefined</b></li>
                    <li><b>Symbol </b>const symbol = Symbol("description");</li>
                    <li><b>BigInt </b>const bigIntValue = 1234567890123456789012345678901234567890n;</li>
                  </ul>
                  <br/>
                <li><b>Reference Data Types: </b>These data types are more complex and can hold multiple values. They are stored and 
                  accessed by reference.</li>
                <ul>
                    <li><b>Object</b></li>
                    <li><b>Array</b></li>
                    <li><b>Function</b></li>
                    <li><b>Date</b></li>
                    <li><b>RegExp </b>let pattern = /hello/i; // Matches "hello" case-insensitively</li>
                    <li><b>Map and Set</b></li>
                  </ul>
              </ul>
              <br />

              <h3>What is first class object in javascript</h3>
              <ul>
                <li>Can be passed as an argument.</li>
                <li>Can be return by another function.</li>
                <li>Can be assigned as a value to a variable, object or array.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={firstClass}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>2. What are undeclared and undefined variables?</h3>
              <i>
                <ul>
                  <li>
                    <b>Undeclared variables: </b> Are those that do not exist in
                    a program and are not declared. If the program tries to read
                    the value of an undeclared variable, then a runtime error is
                    encountered.
                  </li>
                  <li>
                    <b>Undefined variables: </b> are those that are declared in
                    the program but have not been given any value. If the
                    program tries to read the value of an undefined variable, an
                    undefined value is returned.
                  </li>
                </ul>
              </i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={undeclaredVar}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. Objects</h3>
              An object is a collection of related data/ functionality
              (properties and methods).
              <br />
              <br />
              <b>JavaScript Objects?</b>
              <br />
              <ul>
                <li>
                  A javaScript object is an entity having state and behavior.
                </li>
                <li>
                  JavaScript is an object-based language. Everything is an
                  object in JavaScript.
                </li>
                <li>JavaScript is template based.</li>
              </ul>
              <br />
              <br />
              <i>There are 4 ways to create objects.</i>
              <div style={titles}>
                <PrismCode
                  code={variables}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>5. How to convert an Object {} into an Array [] </h3>
              <div style={titles}>
                <PrismCode
                  code={convertObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>6. How to convert an Array [] to Object {}</h3>
              <div style={titles}>
                <PrismCode
                  code={convertArr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>7. Difference between local storage, cookies and Session.</h3>
              There are three common ways to store data on the
              client-side: local storage, cookies, and session storage. Each has
              its own advantages and disadvantages, and the choice of which to
              use depends on the specific needs of the application.
              <ul>
                <li>
                  <b>Local Storage: </b>
                  <ul>
                    <li>Local storage is a web storage API in modern web browsers.</li>
                    <li>Data stored in it is not automatically sent to the server with HTTP requests.</li>
                    <li>Local storage is a key-value store that
                  allows data to be stored on the client-side in a persistent
                  manner. The data stored in local storage is accessible even
                  after the browser is closed, and can be accessed by any page
                  in the same domain. Local storage is a good option for storing
                  large amounts of data that need to persist between sessions.</li>
                  </ul>
                </li>
                <br />
                <li>
                  <b>Cookies: </b>
                  <ul>
                    <li>Sent data to the server with every HTTP request to provide information about the client's state and identity. </li>
                    <li>Cookies are small text files that are stored
                  on the client-side by the browser. Cookies can be used to
                  store small amounts of data, such as user preferences or
                  authentication tokens. Cookies are accessible by any page in
                  the same domain and can be set to expire after a certain
                  period of time.</li>
                  </ul>
                  
                </li>
                <br />
                <li>
                  <b>Session Storage: </b>
                  <ul>
                    <li>Sessions store data on the server-side and use a session identifier (usually stored in a cookie) to associate the client's request with the corresponding session data on the server. Unlike cookies and local storage, session data is stored on the server, and only a session identifier is stored on the client-side. </li>
                    <li>Session storage is similar to local
                  storage, but the data stored in session storage is only
                  accessible within the current browser session. Once the
                  browser is closed, the data is deleted. Session storage is a
                  good option for storing data that needs to be accessible
                  across multiple pages within the same session, but does not
                  need to persist between sessions.</li>
                  </ul>
                </li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={shallow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>8. Difference between Object.freeze() vs const</h3>
              <b>const</b> and <b>Object.freeze</b> are two completely different
              things.
              <br />
              <br />
              <i>
                <ul>
                  <li>
                    const applies to bindings <b>variables</b>. It creates an
                    immutable binding.
                  </li>
                  <li>
                    Object.freeze works on values. It makes an object immutable,
                    i.e. cannot change its properties.
                  </li>
                </ul>
              </i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={varConst}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>9. Why do we use arrow function.</h3>
              <p>
                <ul>
                  <li>
                    <b>Implicit returns: </b>If the body of an arrow function
                    consists of a single expression, that expression is
                    automatically returned.{" "}
                  </li>
                  <br />
                  <li>
                    <b>Lexical this binding: </b>Inherit the this value from the enclosing context in which they are defined.
                  </li>
                  <br />
                  <li><b>No binding of arguments: </b> Arrow functions do not have their own arguments object. Instead, they inherit the arguments object from the enclosing scope. This makes it easier to access the arguments passed to the surrounding function without the need for the arguments keyword.</li>
                  <br />
                </ul>
              <div style={titles}>
                <PrismCode
                  code={argumentsk}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              </p>
              <h3>10. Object prototypes</h3>
              <ul>
                <li>
                  Prototypes are the mechanism by which{" "}
                  <b>JavaScript objects inherit features</b> from one another.
                </li>
                <li>
                Every object in JavaScript has a prototype, which is like a blueprint or a template that defines the shared properties and methods for objects of a particular type. When you access a property or method on an object, JavaScript first looks for it in the object itself. If it doesn't find it there, it continues searching for it in the object's prototype, and so on, forming a chain known as the prototype chain.
                </li>
                <li>
                  By definition, null has no prototype, and acts as the final
                  link in this prototype chain.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={spreadRests}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Spread & Rest Operator</h3>
              <ul>
                <li>Rest & Spread both use in object and array.</li>
                <li>
                  <b>Rest: </b>The rest operator is used to put the rest of some
                  specific user-supplied values into a JavaScript array.
                </li>
                <li>
                  <b>Spread: </b>Allows us to quickly copy all or part of an
                  existing array or object into another array or object.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={spreadRest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>12. Hosting</h3>
              Hoisting is JavaScript's default behavior of moving declarations
              to the top.
              <br />
              <ul>
                <li>
                Hosting in JavaScript refers to the behavior of how variable and function declarations are processed by the JavaScript engine. It allows you to access and use variables and functions before they are physically declared in your code.
                </li>
                <br />
                <li>
                In JavaScript, when the JavaScript engine executes your code, it goes through two main phases: the creation phase and the execution phase.
                </li>
                <br />
                <li>During the creation phase, the JavaScript engine sets up the environment for your code execution. One important step in this phase is the process of hoisting. Hoisting moves variable and function declarations to the top of their respective scopes, allowing you to use them before they appear in the code.</li>
              </ul>
              <br />
              Hosting mainly relate to Memory management.
              <br />

              <h3>13. What are closures? Explain with example.</h3>
              <b>scope: </b> Local, Global, Lexical.
              <br />
              A closure is a function that remembers the variables from the scope in which it was created, even after 
              that scope has finished executing.
              <br/>
              <br/>
              In normal programming when we call function after than any
              varriables or parameter declared in that function we can't use
              again. But with help of closers we can use function variables
              after function excuite in lexicalScop.
              <br />
              <ul>
                <li>
                  A closure is the combination of a function bundled together
                  with references to its surrounding state (lexical
                  environment).
                </li>
                <li>
                  Or a closure gives access to an outer function’s scope from an
                  inner function.
                </li>
                <li>
                  In JavaScript, closures are created every time a function is
                  created, at function creation time.
                </li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Closers</b>
              <br />
              Clouser is a function bundled together in a lexical scope.
              <br />
              <ul>
                <li>Uses: Module Design Pattern</li>
                <li>Implementing data privacy and encapsulation in JavaScript.</li>
                <li>Managing asynchronous code, like in callbacks or event handlers, where you need to 
                  retain access to certain variables.</li>
                <li>Memoize</li>
                <li>Iterators</li>
              </ul>
              <br />
              <br />
              <h3>14. Function Express & Function Statement</h3>
              function expressions and function statements are very similar in
              JavaScript, the difference is how the browser loads them into the
              execution context.
              <div style={titles}>
                <PrismCode
                  code={execution}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>
                <b>function statement: </b> loads before any code is executed.
                This behavior of function statements is called hoisting, which
                allows a function to be used before it is defined.
              </p>
              <p>
                <b>function expression: </b>associates a value with a variable,
                just like any other assignment statement. function expressions
                load only when the interpreter reaches the definition of the
                function.
              </p>
              <ul>
                <li>
                  Difference between Function Statement and Function Expression
                  is the "Hosting".
                </li>
              </ul>
              <br />
              <h3>15. What is 'this' keyword in JavaScript?</h3>
              this refers to the current execution context. The value of this
              depends on how a function is called.
              <br />
              <ul>
                <li>
                  <b>Global context: </b>In the global context, this refers to
                  the global object (e.g., window in a web browser).
                </li>
                <br />
                <li>
                  <b>Object context: </b>In the context of an object method,
                  this refers to the object itself
                </li>
                <div style={titles}>
                  <PrismCode
                    code={thisKey}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
                <li>
                  <b>Function context: </b>In the context of a regular function,
                  this refers to the global object by default, but it can be
                  bound to a different value using bind, call, or apply
                </li>
                <div style={titles}>
                  <PrismCode
                    code={thisKey2}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
                <li>
                  <b>Event context: </b> In the context of an event handler
                  function, this refers to the element that triggered the event:
                </li>
                <div style={titles}>
                  <PrismCode
                    code={thisKey3}
                    language="js"
                    plugins={["line-numbers"]}
                  />
                </div>
                <br />
              </ul>
              <br />
              <br />
              <h3>16. Bind()</h3>
              The bind() method is used to create a new function that has a specific this context and, 
              optionally, one or more predefined arguments. The primary problem that bind() solves is 
              related to controlling the value of this within a function.
              <br />
              <div style={titles}>
                <PrismCode
                  code={bind_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>17. call(), apply()</h3>
              <b>Call: </b>Method is a built-in method in JavaScript that is
              used to call a function with a specified this value and arguments
              provided individually.
              <br />
              <br />
              The call() method is used to change the context (this value) of a
              function. When a function is called using call(), the first
              argument passed to the method is used to set the this value for
              the function.
              <br />
              <br />
              call: accept two properties:
              <ul>
                <li>(i) what is context of this.</li>
                <li>(ii) Parameter.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={calls}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Apply: </b>function is a built-in function in JavaScript that
              allows you to call a function with a specified this value and
              arguments provided as an array or an array-like object.
              <br />
              <br />
              The apply() function takes two arguments:
              <ul>
                <li>
                  The value to use as this inside the function being called.
                </li>
                <li>
                  An array or an array-like object containing the arguments to
                  pass to the function.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={applys}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>18. Polyfill</h3>
              A polyfill is a browser fallback, made in JavaScript, that allows
              functionality expect to work in modern browsers also work in older
              browsers.
              <br />
              <ul>
                <li>
                  It “fills in” the gap and adds missing implementations in old
                  browser.
                </li>
              </ul>
              <br />
              <h3>19. What is Functional Programming?</h3>
              functional programming:
              <br />
              <ul>
                <li>Pure functions</li>
                <li>Function composition</li>
                <li>Avoid shared state</li>
                <li>Avoid mutating state</li>
                <li>Avoid side effects</li>
              </ul>
              <br />
              <ul>
                <li>
                  <b>Function composition: </b>is the process of combining two/
                  more functions in order to produce a new function or perform
                  some computation.
                </li>
              </ul>
              <br />
              <br />
              <b>
                A pure function or first class function has following
                properties:
              </b>
              <br />
              <ul>
                <li>
                  The function always returns the same result if the same
                  arguments are passed in. It does not depend on any state, or
                  data, change during a program's execution. It must only depend
                  on its input arguments.
                </li>
                <li>
                  The function does not produce any observable side effects such
                  as network requests, input and output devices, or data
                  mutation.
                </li>
                <li>
                  The same arguments must always lead to the same outcome.
                </li>
                <li>
                  A pure function cannot depend on any variable declared outside
                  its scope.
                </li>
              </ul>
              <br />
              <br />
              <h3>21. Combinators</h3>
              Combinators are similar to pure functions. With one more a
              combinator contains no free variables.
              <br />
              <br />
              A free variable is any variable whose values cannot be accessed
              independently. Every variable in a combinator must be passed
              through parameters.
              <br />
              <h3>21. Callback</h3>
              <b>Callback: </b>A callback is a function that is passed as an argument to another function and is executed at a later time or when a certain event occurs. It allows you to define what should happen once a specific task or operation is completed. 
              <br />
              <br />
              <ul>
                <li>
                  with Callback function javaScript build an asynchronous wold
                  of a synchronous single-threaded language.
                </li>
                <li>
                  Almost anything that has to pull data into your app or push
                  data out will always be asynchronous because it’s not going to
                  be running in the same thread. callbacks do not work with
                  try-catch.
                </li>
                <li>
                  Although, if your callback is synchronous, then you can catch
                  errors using try-catch
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={proCallbacks}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>Promises</h3>
              <ul>
                <li>
                promise is an object that represents the eventual completion (or failure) of an asynchronous operation and allows you to handle the result as either a resolved value or an error. Promises provide a more structured and elegant way to work with asynchronous code compared to callbacks. 
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={promisePro}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>22. Async-Await</h3>
              <ul>
                <li>
                Async/await introduces two new keywords: async and await. The async keyword is used to define an asynchronous function, while the await keyword is used to pause the execution of an async function until a promise is resolved or rejected.
                </li>
                <br/>
                <li>
                  By default any function without <b>return</b> statement return{" "}
                  <b>undefined</b> in javascript.
                </li>
                <li>
                  By writing async function don't need to write return
                  statement.
                </li>
                <li>
                  await make sure to wait till a Promise is settled, be
                  resolved/ rejected.
                </li>
                <li>
                  The way we write then() for handling promise, now in await we
                  can remove than() and replace it with await.
                </li>
              </ul>
              <br />
              <br />
              
              <div style={titles}>
                <PrismCode
                  code={callbackJs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Chaining</b>
              <br />
              A common need is to execute two/ more asynchronous operations back
              to back, where each subsequent operation starts when the previous
              operation succeeds, with the result from the previous step. This
              is promise chain.
              <br />
              <br />
              <b>Chained Callback</b>
              <div style={titles}>
                <PrismCode
                  code={chaineds}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              Always return results, otherwise callbacks won't catch the result
              of a previous promise.
              <br />
              <br />
              <b>
                Unlike old-fashioned passed-in callbacks, a promise comes with
                some guarantees:
              </b>
              <br />
              <ul>
                <li>
                  Callbacks will never be called before the completion of the
                  current run of the JavaScript event loop.
                </li>
                <li>
                  Callbacks added with then(), will be called even after the
                  success/ failure of the asynchronous operation.
                </li>
                <li>
                  Multiple callbacks may be added by calling then() several
                  times. Each callback is executed one after another, in the
                  order in which they were inserted.
                </li>
                <li>
                  One of the great things about using promises is chaining.
                </li>
              </ul>
              <br />
              <b>How are observables different from promises?</b>
              <br />
              The first difference is that an Observable is lazy whereas a
              Promise is eager.
              <br />
              <table>
                <tr>
                  <th>Observables</th>
                  <th>Promises</th>
                </tr>
                <tr>
                  <td>
                    Handle a sequence of asynchronous events over a period of
                    time.
                  </td>
                  <td>Deal with one asynchronous event at a time</td>
                </tr>
                <tr>
                  <td>
                    Lazy. An observable is not called until we subscribe() to
                    the observable
                  </td>
                  <td>Not Lazy, Execute immediately after creation.</td>
                </tr>
                <tr>
                  <td>Can be cancelled by using the unsubscribe() method</td>
                  <td>Cannot be cancelled</td>
                </tr>
                <tr>
                  <td>
                    Observable provides operators like map, forEach, filter,
                    reduce, retry, retryWhen etc.
                  </td>
                </tr>
              </table>
              <br />
              <h3>23. Difference between Map and foreach.</h3>
              <table>
                <tr>
                  <th>Value</th>
                  <th>foreach</th>
                  <th>Map</th>
                </tr>
                <tr>
                  <td>
                    <b>Functionality</b>
                  </td>
                  <td>Performs given operation on each element of the array</td>
                  <td>
                    Performs given "transformation" on "copy" of each element{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Return value</b>
                  </td>
                  <td>undefined</td>
                  <td>
                    new array with tranformed elements leaving back original
                    array unchanged.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Processing</b>
                  </td>
                  <td>
                    Performing non-transformation like processing on each
                    element.
                  </td>
                  <td>
                    Obtaining array containing output of some processing done on
                    each element of the array.
                  </td>
                </tr>
              </table>
              <br />
              <ul>
                <li>
                  map() is chainable. This means we can attach reduce(), sort(),
                  filter() and so on after performing a map() method on an
                  array.
                </li>
                <li>But we can't do with forEach()</li>
              </ul>
              <br />
              <h3>24. Hoc:</h3>
              A higher order function is a function either:
              <br />
              <ul>
                <li>1. Accept a function as an argument.</li>
                <li>2.Return a function.</li>
              </ul>
              <br />
              HOF are:
              <br />
              <ul>
                <li>forEach</li>
                <li>map</li>
                <li>filter</li>
                <li>sort</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={hoFunction}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. Event loop</h3>
              <ul>
                <li>
                  The event loop is a fundamental concept in JavaScript that handles the execution of code and manages asynchronous operations. It ensures that JavaScript remains responsive and non-blocking, allowing for the execution of multiple tasks simultaneously. 
                </li>
                <br />
                <li>
                In JavaScript, code execution occurs in an event loop, which continuously checks for tasks to execute. The event loop has a simple purpose: to handle tasks and events. It follows a specific order of operations to process and execute tasks efficiently.
                </li>
                <br />
                <br />
                <li>
                The event loop starts by checking the call stack, which keeps track of the functions that need to be executed. If the call stack is empty, the event loop moves to the next step.
                </li>
                <br />
                <li>
                The event loop checks the task queue, where asynchronous tasks (such as timer events, network requests, or user interactions) are queued for execution.
                </li>
                <br />
                <li>
                If there are tasks in the task queue, the event loop takes the first task and moves it to the call stack, allowing it to be executed.
                </li>
                <br/>
                <li>The task in the call stack is executed. If the task is synchronous, it runs to completion. If the task is asynchronous, it may initiate a web API call, such as a setTimeout or fetch, and move to the next step.</li>
                <li>While the asynchronous task is being handled by the web API, the event loop continues to check the call stack and task queue. If the call stack is empty and there are pending tasks in the task queue, the event loop moves the next task from the task queue to the call stack for execution.</li><br/>
                <li>Once the web API call (asynchronous task) is completed or when a specified time interval elapses, the task is added to the task queue for execution.</li><br/>
                <li>The event loop repeats this process indefinitely, continuously checking for tasks in the task queue and executing them when the call stack is empty.</li><br/>
                <br/>
                <br/>
                The event loop ensures that JavaScript can handle both synchronous and asynchronous tasks efficiently without blocking the execution of other code. It allows JavaScript to remain responsive by handling tasks in an ordered manner and avoiding the risk of long-running operations freezing the entire program.
              </ul>
              <br />
              EventLoop is an array that acts as a queue (first-in, first-out).
              <div style={titles}>
                <PrismCode
                  code={eventLoop}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>26. Concurrency model and the event loop</h3>
              JavaScript has a concurrency model based on an event loop, which
              is responsible for executing the code, collecting and processing
              events, and executing queued sub-tasks.
              <br />
              <br />
              <img
                src={EventLoop}
                alt=""
                className="responsive"
                style={redesign}
              />
              <br />
              <br />
              <h3>27. Event bubbling and Capturing</h3>
              Event bubbling and capturing are two ways of event propagation in
              the HTML DOM API, when an event occurs in an element inside
              another element, and both elements have registered a handle for
              that event.
              <br />
              <ul>
                <li>
                  <b>bubbling: </b>the event is first captured and handled by
                  the innermost element and then propagated to outer elements.
                </li>
                <br/>
                When an event occurs on an element, such as a click or a keypress, the event is first handled on the element that triggered it. Then, the event is propagated to the parent element, and if there are event handlers attached to that parent element, they are also triggered. This process continues upwards through the DOM hierarchy until reaching the root element, like the document or window.
                <br/>
                <br/>
                <li>
                  <b>capturing: </b>the event is first captured by the outermost
                  element and propagated to the inner elements.
                </li>
                <li>
                  Event bubbling set by default. If we pass true parameter in
                  callback function than it became event capturing
                </li>
              </ul>
              <br />
              <br />
              <h3>28. What is the JavaScript Event Delegation Model?</h3>
              When we are bubbling and capturing, it permit functions to apply a
              single handler to several elements at a specific time then it’s
              called Event Delegation. <br />
              It basically permits you to put event listeners to single parent
              instead of particular nodes. That specific listener analyzes the
              bubbled events to get a match on the child elements.
              <br />
              <h3>29. event.stopPropagation</h3>
              event.stopPropagation and event.preventDefault, seem to be doing
              the same thing.
              <ul>
                <li>
                  <b>stopPropagation: </b>Stops the event from bubbling up the
                  event chain.
                </li>
                <li>
                  <b>preventDefault: </b>Prevents the default action the browser
                  makes on that event.
                </li>
              </ul>
              <br />
              <h3>30. Event Debouncing</h3>
              Debouncing in JavaScript is a practice used to improve browser
              performance. There might be some functionality in a web page which
              requires time-consuming computations. If such a method is invoked
              frequently, it might greatly affect the performance of the
              browser, as JavaScript is a single threaded language. Debouncing
              is a programming practice used to ensure that time-consuming tasks
              do not fire so often, that it stalls the performance of the web
              page. In other words, it limits the rate at which a function gets
              invoked.
              <div style={titles}>
                <PrismCode
                  code={debouncing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>31. Throttling/ Throttle function </h3>
              Throttling is a practice used in websites. Throttling is used to
              call a function after every millisecond or a particular interval
              of time only the first click is executed immediately.
              <div style={titles}>
                <PrismCode
                  code={throttle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>32. IIFE</h3>
              Because our application could include many functions and global
              variables from different source files, it's important to limit the
              number of global variables.
              <br />
              <br />
              <ul>
                <li>IIFE used to solve scoping problem.</li>
                <li>
                  Any variables declared inside the IIFE are not visible to the
                  outside world.
                </li>
                <li>IIFE return a value that can be assigned to a variable.</li>
                <li>
                  Parentheses around the function expression basically force the
                  function to become an expression instead of a statement.
                </li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={iifes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>33. Curry</h3>
              Curring is a process in functional programming in which we can
              transform a function with multiple arguments into a sequence of
              nesting functions. It returns a new function that expects the next
              argument inline.
              <div style={titles}>
                <PrismCode
                  code={currying}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>34. Generator</h3>
              <ul>
                <li>
                  Generators are functions which can be exited and later
                  re-entered. Their context (variable bindings) will be saved
                  across re-entrances.
                </li>
                <li>
                  Generator functions are written using the function* syntax.
                </li>
                <li>
                  When called initially, generator functions do not execute any
                  of their code, instead returning a type of iterator called a
                  Generator.
                </li>
                <li>
                  When a value is consumed by calling the generator's next
                  method, the Generator function executes until it encounters
                  the yield keyword.
                </li>
              </ul>
              <br />
              <b>When should we use generators:</b>
              <br />
              <ul>
                <li>
                  1.one can choose to jump out of a function and let outer code
                  to determine when to jump back into the function.
                </li>
                <li>
                  2.the control of asynchronous call can be done outside of your
                  code The most important feature in generators—we can get the
                  next value in only when we really need it, not all the values
                  at once.
                </li>
              </ul>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={generator}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>35. Yield</b>
              <div style={titles}>
                <PrismCode
                  code={yields}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>36. Strict mode</h3>
              <ul>
                <li>
                  Makes debugging easier. Code errors that have been ignored/
                  failed silently now generate errors.
                </li>
                <li>
                  Prevents accidental globals. Without strict mode, assigning a
                  value to an undeclared variable automatically creates a global
                  variable with that name. In strict mode, attempting to do so
                  throws an error.
                </li>
                <li>
                  Eliminates this coercion. Without strict mode, a reference to
                  a this value of null/ undefined is automatically coerced to
                  the global.
                </li>
                <li>
                  Fixes mistakes that make it difficult for JavaScript engines
                  to perform optimizations.
                </li>
              </ul>
              <br />
              <br />
              <b>Strict mode for scripts</b>
              <div style={titles}>
                <PrismCode
                  code={stricts}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>37. Modules</h3>
              <b>Differences between modules and standard scripts</b>
              <ul>
                <li>
                  If we try to load the HTML file locally, will run into CORS
                  errors due to JavaScript module security requirements.
                </li>
                <li>modules use strict mode automatically.</li>
                <li>
                  Modules are only executed once, even if they have been
                  referenced in multiple "script" tags.
                </li>
              </ul>
              <br />
              <br />
              <b>Creating a module object</b>
              <br />
              To import each module's features inside a module object. The
              following syntax form does that:
              <div style={titles}>
                <PrismCode
                  code={features}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              This grabs all the exports available inside module.js, and makes
              them available as members of an object Module, effectively giving
              it its own namespace.
              <br />
              <br />
              <b>the exports are all</b>
              <div style={titles}>
                <PrismCode
                  code={exportsing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Dynamic module loading</b>
              <br />
              The newest part of the JavaScript modules functionality to be
              available in browsers is dynamic module loading. This allows you
              to dynamically load modules only when they are needed, rather than
              having to load everything.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={loading}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>38. JavaScript static Method:</h3>
              The JavaScript provides static methods that belong to the class
              instead. These methods are called directly on the class itself.
              <br />
              <br />
              <ul>
                <li>static keyword is used to declare a static method.</li>
                <li>A class can contain more than one static method.</li>
                <li>
                  If we declare more than one static method with a similar name,
                  the JavaScript always invokes the last one.
                </li>
                <li>static method can be used to create utility functions.</li>
                <li>
                  We can use this keyword to call a static method within another
                  static method.
                </li>
                <li>
                  We cannot use this keyword directly to call a static method
                  within the non-static method. In such case, we can call the
                  static method either using the class name or as the property
                  of the constructor.
                </li>
              </ul>
              <br />
              <h3>39. Proxies</h3>
              Proxy objects allow you to intercept certain operations and to
              implement custom behaviors.
              <br />
              <div style={titles}>
                <PrismCode
                  code={proxies}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>
                The Proxy object defines a target (an empty object here) and a
                handler object, in which a get trap is implemented. Here, an
                object that is proxied will not return undefined when getting
                undefined properties, but will instead return the number 42.
              </i>
              <br />
              <br />
              <b>
                The following terms are used when talking about the
                functionality of proxies:
              </b>
              <br />
              <ul>
                <li>
                  <b>handler: </b>Placeholder object which contains traps.
                </li>
                <li>
                  <b>traps: </b>Methods that provide property access. (This is
                  analogous to the concept of traps in operating systems.)
                </li>
                <li>
                  <b>target: </b>Object which the proxy virtualizes. It is often
                  used as storage backend for the proxy. Invariants (semantics
                  that remain unchanged) regarding object non-extensibility or
                  non-configurable properties are verified against the target.
                </li>
                <li>
                  <b>invariants: </b>Semantics that remain unchanged when
                  implementing custom operations are called invariants. If we
                  violate the invariants of a handler, a TypeError will be
                  thrown.
                </li>
              </ul>
              <br />
              <h3>40. What is the function of close () in JavaScript?</h3>
              The function of close () is mainly used to close the latest
              window. You have to write window.close() to make sure that this
              command is clearly associated with a window object and not the
              other JavaScript object.
              <br />
              <h3>41. Memory Management</h3>
              <ul>
                <li>
                  JavaScript will automatically allocate memory when values are
                  initially declared.
                </li>
                <li>
                  The purpose of a garbage collector is to monitor memory
                  allocation and determine when a block of allocated memory is
                  no longer needed and reclaim it.{" "}
                </li>
                <li>
                  A JavaScript object has a reference to its prototype (implicit
                  reference) and to its properties values (explicit reference).
                </li>
              </ul>
              <br />
              <br />
              <h3>43. async and defer</h3>
              Two modern features we can use to bypass the problem of the
              blocking script — async and defer.
              <br />
              <br />
              <ul>
                <li>
                  Scripts loaded using the "async" attribute will download the
                  script without blocking rendering the page and will execute it
                  as soon as the script finishes downloading.
                </li>
                <li>
                  No guarantee that scripts will run in any specific order, only
                  that they will not stop the rest of the page from displaying.
                </li>
                <li>
                  It is best to use async when the scripts in the page run
                  independently from each other and depend on no other script on
                  the page.
                </li>
                <li>
                  async should be used when we have a bunch of background
                  scripts to load in, and we just want to get them in place as
                  soon as possible.
                </li>
              </ul>
              <br />
              <br />
              <ul>
                <li>
                  Scripts loaded using the "defer" attribute will run in the
                  order they appear in the page and execute them as soon as the
                  script and content are downloaded.
                </li>
                <li>
                  All the scripts with the defer attribute will load in the
                  order they appear on the page.
                </li>
                <li>
                  They won't run until the page content has all loaded, which is
                  useful if our scripts depend on the DOM being in place.
                </li>
              </ul>
              <br />
              <br />
              <ul>
                <li>
                  44. async and defer both instruct the browser to download the
                  scripts in a separate thread, while the rest of the page is
                  downloading, so the page loading is not blocked by the
                  scripts.
                </li>
                <li>
                  2. If our scripts should be run immediately and they don't
                  have any dependencies, then use async.
                </li>
              </ul>
              <br />
              <br />
              If your scripts need to wait for parsing and depend on other
              scripts and/or the DOM being in place, load them using defer.
              <br />
              <div style={titles}>
                <PrismCode
                  code={security}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(IntroJs);

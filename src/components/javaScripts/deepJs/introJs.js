import React, { Component } from 'react';
import Prism from "prismjs"
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import '../../ReactJs/styles.css'
import Sidebar from '../sidebar';
import PrismCode from '../../ReactJs/prismCode';

import EventLoop from '../../../assets/imgs.svg';

const titles = { backgroundColor: '#F0F8FF', padding: '1px', fontSize: '16px' }

const redesign = {
  height: 350,
  width: 600
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

const dataTypes = `
var x1 = 34.00;                                                                     //34
var x2 = 35;                                                                        //35
let num = 1.0023;                                                                   //1.0023
let str = "He was 40";
                                                                     
  let resultNum = parseInt(num);                                                    //Convert decimal to number.
  let resultNum = parseInt(str);                                                    //NaN
`.trim();


const undeclaredVar = `
var a
console.log('Undefined variables', a)
console.log('Undeclared variables', b)`.trim();


const varConst = `
var obj = Object.freeze({ name: 'Mukesh' });
obj.name = 'Rakesh';

const obj2 = { name: 'Mukesh' }
obj2.name = 'Rakesh'

console.log(obj.name);                                                              //Mukesh
console.log(obj2.name);                                                             //Rakesh
`.trim();

const Temporal = ` 
var foo = 'first';
function main() {
  console.log(foo);                                                                 //undefined
  var foo = 'second';
}


let foo = 'first';
function main() {
  console.log(foo);                                                                 //ReferenceError
  let foo = 'second';
}

main()
`.trim();

const evals = `
function foo(str, a) {
  eval(str);                                                          // cheating!
  console.log(a, b);
}

var b = 2;
foo("var b = 3;", 1);                                                 // 1 3
`.trim()

const forIn = `
const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log('$'{property}: '$'{object[property]});
}`.trim();

const forEach = `
var arr = ["C", "C++", "Python"];
arr.forEach(val => console.log(val))
`.trim()

const continues = `
function continueFun() {
  foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        console.log("continue", i, j);
        continue foo;
      }

      if ((j * i) % 2 == 1) {
        continue;
      }

      if ((i * j) >= 3) {
        console.log("break", i, j);
        break foo;
      }
    }
  }
}

continueFun()
`.trim();

const nonLabeledBlock = `function nonLabeledBlock(){
  bar: {
    console.log('hello');
    break bar;
    console.log('never runs');
}
console.log('welcome');
}`.trim();


const conditions = `
var arr = [];
var result = [];

result = arr > 10 ? 'Good' : 'Average'
console.log('ternary', result)


//2
toCelsius(40)

function toCelsius(f) {
  return console.log((5 / 9) * (f - 32));
}


//3. Template Literals
console.log('string text line 1 
string text line 2');
`.trim();

const jsonsObj = `
var a = prompt('please enter first number');
var b = prompt('please enter second number');
var sum = a + b

document.write("Sum is",sum)`.trim();


const iifes = `
//1
(function IIFE_initGame() {                    //Private variables that no one has access to outside this IIFE.
    var lives;
    var weapons;

  init();

  
  function init() {                            //Private function that no one has access to outside this IIFE.
    lives = 5;
    weapons = 10;
  }
}());



//2 We add two functions on the object that we return from the IIFE.
  var Sequence = (function sequenceIIFE() {
    var current = 0;                                      //Private variable to store current counter value.
    
    return {                                              //Object that's returned from the IIFE.
      getCurrentValue: function() {
      return current;
    },

    getNextValue: function() {
      current = current + 1;
      return current;
    }
  };
}());

console.log(Sequence.getNextValue());                                     // 1
console.log(Sequence.getNextValue());                                     // 2
console.log(Sequence.getCurrentValue());                                  // 2
`.trim();


const currying = `
var prism = l => w => h => l * w * h;
console.log(prism(2)(3)(5))


//2
(function (message) {
  alert(message);
}("Hello World!"));


//3
const sum2 = function(a){
  return function(b){
    if(b){
      return sum2(a+b);
    }
    return a;
  }
}

console.log(sum2(1)(2)(3)(5)());
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
 `.trim()

const iterable = `
let obj = { array: [1, 2, 3, 4, 5],
    nextIndex: 0,
    [Symbol.iterator]:
    
  function(){
  return {
    array: this.array,
    nextIndex: this.nextIndex,
    next: function(){
        return this.nextIndex < this.array.length ?
        {value: this.array[this.nextIndex++], done: false} :
        {done: true};
      }}}
    };
    
 let iterable = obj[Symbol.iterator]()
 console.log(iterable.next().value);
 console.log(iterable.next().value);`.trim()


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
console.log(generator.next().value);`.trim()

const stricts = `
//Throw error
"use strict"
x=3;
console.log(x);


//3
'use strict';
delete Object.prototype;                                                                    // throws a TypeError.


//4
'use strict';
var o = { p: 1, p: 2 };                                                                     // syntax error.


//5
function sum(a, a, c) {                                                                     // syntax error.
  'use strict';
  return a + a + c;                                                                  // wrong if this code ran.
}
`.trim();

const functions = `
function strict() {                                                   // Function-level strict mode syntax.
  'use strict';
  function nested() { return 'And so am I!'; }
  return console.log("Strict mode function!  " + nested());
}

function notStrict() { return console.log("Not strict."); }

strict();
notStrict();`.trim();

const memorizations = `
const memoizedAdd = () => {
  let cache = {};
  return (value) => {
      if (value in cache) {
          console.log('Fetching from cache');
          return cache[value];
      } else {
          console.log('Calculating result');
          let result = value + 10;
          cache[value] = result;
          return result;
      }
  }
}
const main = memoizedAdd();
console.log(main(9));                                                             //output: 19 calculated.
console.log(main(9));                                                             //output: 19 cached.
`.trim();

const management = `
var x = { a: { b: 2 } };

var y = x;                                                          
x = 1;                                      

var z = y.a;                                 
y = 'mozilla';                               
z = null;                                    
`.trim();

const circular = `
function f() {
  var x = {};
  var y = {};
  x.a = y;                                                                              // x references y.
  y.a = x;                                                                              // y references x.

  return 'azerty';
}
f();
`.trim();

const eventLoop = `var eventLoop =[];
 var event;
 while(true){
    if (eventLoop.length > 0) {
      event = eventLoop.shift();
        try {
        event();
        }
      catch (err){
      reportError(err);
      }
    }
  }
 `.trim();

const window = `
  var a = 2;
  
  (function IIFE(def) {
     def(window);
  })(function def(global) {
     var a = 3;
     console.log(a);                                                                              // 3
     console.log(global.a);                                                                       // 2
  });
`.trim();

const stack = `
function foo(b) {
  let a = 10
  return a + b + 11
}

function bar(x) {
  let y = 3
  return foo(x * y)
}

console.log(bar(7))`.trim();

const messages = `
const s = new Date().getSeconds();

setTimeout(function() {
  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500)

while (true) {
  if (new Date().getSeconds() - s >= 2) {
    console.log("Good, looped for 2 seconds")
    break;
  }
}`.trim();

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

const listeners = `

<button id="clickMe">Click me</button>

//1
document.getElementById("clickMe")
.addEventListener("click", () => {
  console.log('button clicked')
});


//2 Couser With Event Listeners
function attachedEventListeners(){
  let count = 0;
document.getElementById("clickMe")
.addEventListener("click", () => {
  console.log('button clicked', count++)
  });
}

attachedEventListeners();`.trim();

const Bubblings = `
<style>
div {
  min-width:100px;
  min-height: 100px;
  padding: 30px;
  border: 1px solid black;
}
</style>
</head>
<body>
<div id="grandParrent">
  <div id="parent">
    <div id="child">
    </div>
  </div>
</div>
<script src="input.js"></script>
</body> 


---------------------------------------------js-------------------

document.querySelector('#grandParrent')
  .addEventListener('click', ()=> {
    console.log('GrandParent Clicked')                                    // Event Bubbling
  }, false);                                                  //If don't pass 3rd argument it default false.
                                                                                
  
  document.querySelector('#parent')
  .addEventListener('click', (e)=> {
    console.log('parent Clicked')
    e.stopPropagation();                                                        //Stop Bubbling/Capturing
  },false);                                                                     // Event Bubbling
  
  document.querySelector('#child')
  .addEventListener('click', ()=> {
    console.log('child Clicked')
  },true);                                                                      // Event Capturing
  `.trim();


const stopPropagation = `
var div = document.querySelector("div");
var section = document.querySelector("section");
var button = document.querySelector("button");

div.addEventListener("click", () => {
	console.log('div')
}, true)

div.addEventListener("click", () => {
	console.log('section')
}, true)

div.addEventListener("click", (event) => {
	event.stopPropagation();
	console.log('button')
}, true)`.trim();


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

const execution = `
function foo() { }                                                             // function statement.


var foo = function() { }                                                       // function expression.
`.trim();

const textContent = `
<body> 
<h3>Differences between innerText & textContent.</h3> 
<p id="demo"> This element has extra	 spacing and contains 
<span>a span element</span>.</p> 

<button onclick="getInnerText()">Get innerText</button> 
<button onclick="getTextContent()">Get textContent</button> 

<p id="demo"></p> 
<script> 
	function getInnerText() { 
	alert(document.getElementById("demo").innerText) 
	} 

	function getTextContent() { 
	alert(document.getElementById("demo").textContent) 
	} 
</script> 
</body> 
`.trim();

const HTMLCollection = `
const fruits = document.getElementsByClassName(‘fruits’);
fruits.item(0).classList.add(‘fruit__01’)`.trim();

const NodeList = `
 const fruits = document.querySelectorAll(‘.fruits’);                           // returns static collection.

 const fruits = document.querySelector(‘.fruits’);                              // returns live collection.
 const childFruit = fruits.childNodes;`.trim();

const traversed = `
Array.proptotype.map.call(p, tag => {
  console.log(tag.innerText)
})`.trim();

const childNodes = `
<script type='text/javascript'>
$(window).load(function(){
    console.log(document.getElementById('dd').children.length);
    console.log(document.getElementById('dd').childNodes.length);
});
</script>
</head>
<body>
  <div id="dd">
    <p>Test paragraph.</p>
    <div>
      <p>Test paragraph 2.</p>
    </div>
    Text.
  </div>
</body>`.trim();

const firstElementChild = `
<ul id="list"><!-- a list item -->
<li>Item1</li>
<li>Item2</li>
</ul>


//js
  var list = document.getElementById("list");
   
  console.log("First child value is",list.firstChild);
   
  console.log("First element child value is",list.firstElementChild);
`.trim();

const dynamically = `
<body>
    <button onclick="create()">Create Heading</button>
    <script>
      function create() {
        var h1 = document.createElement('h1');
        h1.textContent = "New Heading!!!";
        h1.setAttribute('class', 'note');
        document.body.appendChild(h1);
      }
    </script>
  </body>`.trim();

const removeChild = `
//RemoveChild.
let p = document.querySelector( 'p' )
let removed = p.removeChild( p.firstChild )
console.log( removed )                                                      //<i>Hi</i>


//Remove
let p = document.querySelector( 'p' )
let removed = p.childNodes[0].remove()
console.log( removed )                                                      // undefined
`.trim();


class IntroJs extends Component {
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
              <h3>1. What are JavaScript Data Types?</h3>
              <i>In JavaScript null is <b>nothing</b>. It is supposed to be something that
                <b> doesn't exist</b>. In JavaScript, the data type of null is an <b>object</b>.</i>
              <br />
              <ol>
                <li>Number</li>
                <li>String</li>
                <li>Boolean</li>
                <li>Object</li>
                <li>Undefined</li>
                <li>Null</li>
              </ol>
              <br />
              Numbers can be written with, or without <b>decimals</b>.

              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={dataTypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. What are undeclared and undefined variables?</h3>
              <i>
                <ul>
                  <li><b>Undeclared variables: </b> Are those that do not exist in a program and are not declared. If the program
                    tries to read the value of an undeclared variable, then a runtime error is encountered.</li>
                  <li><b>Undefined variables: </b> are those that are declared in the program but have not been given any value.
                    If the program tries to read the value of an undefined variable, an undefined value is returned.</li>
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

              <h3>3.difference between Object.freeze() vs const</h3>
              <b>const</b> and <b>Object.freeze</b> are two completely different things.
              <br />
              <br />
              <i>
                <ul>
                  <li>const applies to bindings <b>variables</b>.
                    It creates an immutable binding.</li>
                  <li>Object.freeze works on values. It makes an object immutable, i.e. cannot change its properties.</li>
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
              <br />
              <b>4. What is the Temporal Dead Zone(TDZ) in ES6.</b>
              <br />
              <p>let and const are hoisted, but there is a period between entering scope and being declared
                where they cannot be accessed. This period is the TDZ.</p>
              <i>
                There is a misconception that says let/ const are not hoisted in JavaScript. According to ES6 specification, The variables are
                created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable’s LexicalBinding
                is evaluated.
              </i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={Temporal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>The variable is in a "temporal dead zone" from the start of the block until the initialization is processed.</i>
              <br />

              <h3>5. What is JSON Web Token?</h3>
              <p>
                Is a open standard(RFC) that securely transmitting information between parties as a JSON object. This information can be
                verifed and trusted because it is a digitally signed. JWTs can be signed using a secret or a public/ private key pair using RSA.
              </p>
              <b>When should you use JSON Web Token? </b>
              <ul>
                <li>Authentication is the most scenario for using JWT. Once the user is logged in, each
                  subsequent resquest will include the JWT.</li>
                <li>Information exchange, JWT is a good way of securely transmitting information between parties.</li>
              </ul>
              <br />

              <b>What is the JSON Web Token structure?</b>
              JSON Web Tokens consist of three parts separated by dots (.), which are:
              <ul>
                <li>Header</li>
                <li>Payload</li>
                <li>Signature</li>
              </ul>
              <br />
              Therefore, a JWT typically looks like.
              <br />
              <b>xxxxx.yyyyy.zzzzz</b>
              <br />

              <h3>6. Eval</h3>
              <div style={titles}>
                <PrismCode
                  code={evals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. For...In</h3>
              <ul>
                <li>A for...in loop will not find any property on the array.</li>
                <li>A for...in loop only iterates over enumerable, non-Symbol properties. Objects created from
                  built–in constructors like Array and Object have inherited non–enumerable properties from
                  Object.prototype and String.prototype, such as String's indexOf() method or Object's toString()
                  method. The loop will iterate over all enumerable properties of the object itself and those the
                  object inherits from its prototype chain.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={forIn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Enumerable</h3>
              An enumerable property in JavaScript means that a property can be viewed if it is iterated using the for…in loop or
              Object.keys() method. All the properties which are created by simple assignment or property initializer are
              enumerable by default.
              <br />

              <h3>9. forEach():</h3>
              <ul>
                <li>The function passed to forEach is executed once for every item in the array, with the array item
                  passed as the argument to the function.
                </li>
                <li><b>Note:</b> Elements of an array that are omitted when the array is defined are not listed when iterating by
                  forEach, but are listed when undefined has been manually assigned to the element.
                </li>
              </ul>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={forEach}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. continue and break</h3>
              <div style={titles}>
                <PrismCode
                  code={continues}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. non-labeled block</h3>
              <div style={titles}>
                <PrismCode
                  code={nonLabeledBlock}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>12. Ternary Conditions</h3>
              Accessing a function without () will return the function object instead of the function result.
              <div style={titles}>
                <PrismCode
                  code={conditions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Prompt</h3>
              <div style={titles}>
                <PrismCode
                  code={jsonsObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>14. IIFE</h3>
              The function on the right-hand side of the assignment operator is often called a “function expression”.
              <ul>
                <li>Any variables declared inside the IIFE are not visible to the outside world.</li>
                <li>
                  When creating a bunch of variables and functions in global scope that no one uses outside your
                  code, just wrap all of that in an IIFE.
                </li>
                <li>IIFE return a value that can be assigned to a variable.</li>
                <li>
                  Parentheses around the function expression basically force the function to become an expression
                  instead of a statement.
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
              <i>
                <ul>
                  <li>Since current variable is private to the IIFE, no one but the functions that have access to it through closure can
                    modify or access the current variable.</li>
                </ul>
              </i>
              <br />

              <h3>15. Curry</h3>
              Curring is a process in functional programming in which we can transform a function with multiple
              arguments into a sequence of nesting functions. It returns a new function that expects the next
              argument inline.
              <div style={titles}>
                <PrismCode
                  code={currying}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. Generator</h3>
              <ul>
                <li>Generators are functions which can be exited and later re-entered. Their context (variable bindings)
                  will be saved across re-entrances.
                </li>
                <li>Generator functions are written using the function* syntax.</li>
                <li>When called initially, generator functions do not execute any of their code, instead returning
                  a type of iterator called a Generator.
                </li>
                <li>When a value is consumed by calling the generator's next method, the Generator function executes
                  until it encounters the yield keyword.
                </li>
              </ul>
              <br />
              <b>When should we use generators:</b>
              <br />
              To put it simple, generator has two features:
              <ul>
                <li>1.one can choose to jump out of a function and let outer code to determine when to jump back into
                  the function.
                </li>
                <li>2.the control of asynchronous call can be done outside of your code
                  The most important feature in generators—we can get the next value in only when we really need
                  it, not all the values at once. And in some situations it can be very convenient.
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

              <b>17. Iterable</b>
              <br />
              Any object that implements the iterable protocol is known as an iterable.
              <div style={titles}>
                <PrismCode
                  code={iterable}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>18. Yield</b>
              <div style={titles}>
                <PrismCode
                  code={yields}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. Strict mode</h3>
              <ul>
                <li>Makes debugging easier. Code errors that have been ignored/ failed
                  silently now generate errors or throw exceptions.</li>
                <li>Prevents accidental globals. Without strict mode, assigning a value to an undeclared variable automatically creates a global
                  variable with that name. In strict mode, attempting to do so throws an error.</li>
                <li>Eliminates this coercion. Without strict mode, a reference to a this value of null/ undefined is automatically coerced to the global.</li>
                <li>Fixes mistakes that make it difficult for JavaScript engines to perform optimizations. strict mode code can
                  sometimes be made to run faster than identical code that's not strict mode.</li>
              </ul>
              <br />

              <b>Converting mistakes into errors</b>
              <ul>
                <li>Strict mode makes it impossible to accidentally create global variables.</li>
                <li>In normal code assigning to NaN does nothing, no receives failure feedback. In strict mode
                  assigning to NaN throws an exception.</li>
                <li>all properties named in an object literal be unique. The normal code may duplicate property
                  names, with the last one determining the property's value. Duplicate property names are a syntax
                  error in strict mode:</li>
                <li>strict mode requires that function parameter names be unique.</li>
                <li>Primitive values. Without strict mode, setting properties is ignored, with strict mode,
                  however, a TypeError is thrown.</li>
              </ul>
              <br />

              <b>Invoking strict mode</b>
              <br />
              Strict mode applies to entire scripts or to individual functions. It doesn't apply to block statements enclosed
              in { } braces.
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

              <b>Strict mode for functions</b>
              <div style={titles}>
                <PrismCode
                  code={functions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Memoization</h3>
              <p>
                Memoization is a programming technique that attempts to increase a function’s performance by caching
                its previously computed results. Because JavaScript objects behave like associative arrays, they are
                ideal candidates to act as caches. Each time a memoized function is called, its parameters are used to
                index the cache. If the data is present, then it can be returned, without executing the entire function.
                However, if the data is not cached, then the function is executed, and the result is added to the cache.
              </p>
              <div style={titles}>
                <PrismCode
                  code={memorizations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. Memory Management</h3>
              <ul>
                <li>JavaScript will automatically allocate memory when values are initially declared.</li>
                <li>The purpose of a garbage collector is to monitor memory allocation and determine when a
                  block of allocated memory is no longer needed and reclaim it. </li>
                <li>A JavaScript object has a reference to its prototype (implicit reference) and to its
                  properties values (explicit reference).</li>
              </ul>
              <h3>Reference-counting garbage collection</h3>
              <ul>
                <li>This algorithm reduces the problem from determining whether or not an object is still needed to determining if an
                  object still has any other objects referencing it. An object is said to be "garbage", if there are
                  zero references pointing to it.</li>
                <li><i>2 objects are created. One is referenced by the other as one of its properties.
                  The other is referenced by virtue of being assigned to the 'x' variable.
                  Obviously, none can be garbage-collected.</i></li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={management}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Limitation: Circular references</h3>
              <div style={titles}>
                <PrismCode
                  code={circular}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>23. Mark-and-sweep algorithm</h3>
              This algorithm reduces the definition of "an object is no longer needed" to "an object is unreachable".
              <br />
              <br />
              The root is the global object. Periodically, the garbage collector will start from these roots, find all objects
              that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the
              garbage collector will thus find all reachable objects and collect all non-reachable objects.
              <br />

              <h3>25.window</h3>
              <div style={titles}>
                <PrismCode
                  code={window}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26.Event loop</h3>
              Browser have a mechanism in	them that handles executing multiple chunks	of program	over
              time, at each moment invoking	the	JS engine, called the "event loop."
              <br />
              <br />
              <b>Scheduled "events"	:</b>
              The	browser	is then	set	up to listen for the response from the network, and	when it	has
              something to give you, it schedules the callback function to be, executed by inserting it into
              the event loop.
              <br />
              <br />
              Now chunk runs right away, as soon as you execute your program. But setTimeout(..) also
              sets up an event to happen later(1000 ms).
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

              <h3>27. Concurrency model and the event loop</h3>
              JavaScript has a concurrency model based on an event loop, which is responsible for executing the code, collecting
              and processing events, and executing queued sub-tasks.
              <br />
              <br />
              <img src={EventLoop} alt="" className="responsive" style={redesign} />
              <br />
              <br />

              <h3>28. Stack</h3>
              Function calls form a stack of frames.
              <div style={titles}>
                <PrismCode
                  code={stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              When calling bar, a first frame is created containing bar's arguments and local variables. When bar calls foo, a
              second frame is created and pushed on top of the first one containing foo's arguments and local variables. When foo
              returns, the top frame element is popped out of the stack (leaving only bar). When bar returns, the
              stack is empty.
              <br />

              <h3>29. Heap</h3>
              Objects are allocated in a heap which is just a name to denote a large (mostly unstructured) region of memory.
              <h3>Queue</h3>
              <ul>
                <li>At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest
                  one. To do so, the message is removed from the queue and its corresponding function is called with the message as an
                  input parameter. As always, calling a function creates a new stack frame for that function's use.</li>
                <li>The processing of functions continues until the stack is once again empty. Then, the event loop will process the next
                  message in the queue (if there is one).</li>
              </ul>
              <br />

              <h3>30. Run-to-completion</h3>
              <ul>
                <li>Each message is processed completely before any other message is processed.</li>
                <li>If a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in
                  another thread.</li>
                <li>A downside of this model is that if a message takes too long to complete, the web application is unable to process
                  user interactions like click/ scroll. The browser mitigates this with the "a script is taking too long to run"
                  dialog. A good practice to follow is to make message processing short and if possible cut down one message into
                  several messages.</li>
              </ul>
              <br />
              <br />

              <b>Adding messages</b>
              In web browsers, messages are added anytime an event occurs and there is an event listener attached to it. If there
              is no listener, the event is lost. So a click on an element with a click event handler will add a message.
              <br />
              <br />
              The function setTimeout is called with 2 arguments. a message to add to the queue, and a time value (defaults 0).
              The time value represents the (minimum) delay after which the message will actually be pushed into the queue. If
              there is no other message in the queue, and the stack is empty, the message is processed right after the delay.
              However, if there are messages, the setTimeout message will have to wait for other messages to be processed. For this
              reason, the second argument indicates a minimum time—not a guaranteed time.

              <div style={titles}>
                <PrismCode
                  code={messages}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>31. Zero delays</h3>
              <ul>
                <li>Zero delay doesn't actually mean the call back will fire-off after zero milliseconds. Calling setTimeout with a delay
                  of 0 milliseconds doesn't execute the callback function after the given interval.</li>
                <li>The execution depends on the number of waiting tasks in the queue.</li>
                <li>Basically, the setTimeout needs to wait for all the code for queued messages to complete even though you specified a
                  particular time limit for your setTimeout.</li>
              </ul>
              <br />

              <h3>32.Browser security</h3>
              Each browser tab has its own separate bucket for running code (called execution environments) - this means that in most cases
              the code in each tab is run completely separately, and the code in one tab cannot directly affect the code in another tab — or on
              another website.
              <br />
              <br />
              <b>Interpreted versus compiled code:</b>
              <br />
              <ul>
                <li>In interpreted languages, the code is run from top to bottom and the result of running the code
                  is immediately returned. You don't have to transform the code into a different form before the
                  browser runs it. The code is received in its programmer-friendly text form and processed directly
                  from that.
                </li>
                <li>Compiled languages on the other hand are transformed (compiled) into another form before they are
                  run by the computer. For example, C/C++ are compiled into machine code that is then run by the
                  computer. The program is executed from a binary format, which was generated from the original
                  program source code.
                </li>
              </ul>
              <br />

              <h3>33. Server-side versus client-side code</h3>
              <ul>
                <li>Client-side code is code that is run on the user's computer — when a web page is viewed, the
                  page's client-side code is downloaded, then run and displayed by the browser.
                </li>
                <li>Server-side code on the other hand is run on the server, then its results are downloaded and
                  displayed in the browser.
                </li>
                <li>A web page with no dynamically updating content is referred to as static — it just shows the
                  same content all the time.
                </li>
              </ul>
              <br />

              <h3>34. async and defer</h3>
              Two modern features we can use to bypass the problem of the blocking script — async and defer.
              <br />
              <br />
              <ul>
                <li>Scripts loaded using the "async" attribute will download the script without blocking rendering the page and will execute it as soon
                  as the script finishes downloading.</li>
                <li>No guarantee that scripts will run in any specific order, only that they will not stop the rest of the page from displaying.</li>
                <li>It is best to use async when the scripts in the page run independently from each other and depend on no other script on the page.</li>
                <li>async should be used when we have a bunch of background scripts to load in, and we just want to get them in place as soon as possible.</li>
              </ul>
              <br />
              <br />

              <ul>
                <li>Scripts loaded using the "defer" attribute will run in the order they appear in the page and execute them as soon as the script
                  and content are downloaded.</li>
                <li>All the scripts with the defer attribute will load in the order they appear on the page.</li>
                <li>They won't run until the page content has all loaded, which is useful if our scripts depend on
                  the DOM being in place.
                </li>
              </ul>
              <br />
              <br />

              <ul>
                <li>1. async and defer both instruct the browser to download the scripts in a separate thread,
                  while the rest of the page is downloading, so the page loading is not blocked by the scripts.
                </li>
                <li>2. If our scripts should be run immediately and they don't have any dependencies, then use async.</li>
              </ul>
              <br />
              <br />

              If your scripts need to wait for parsing and depend on other scripts and/or the DOM being in place, load them using defer.

              <div style={titles}>
                <PrismCode
                  code={security}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>35. Proxies</h3>
              Proxy objects allow you to intercept certain operations and to implement custom behaviors.
              <br />

              <div style={titles}>
                <PrismCode
                  code={proxies}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>The Proxy object defines a target (an empty object here) and a handler object, in which a get
                trap is implemented. Here, an object that is proxied will not return undefined when getting
                undefined properties, but will instead return the number 42.</i>
              <br />
              <br />
              <b>The following terms are used when talking about the functionality of proxies:</b>
              <br />
              <ul>
                <li><b>handler: </b>Placeholder object which contains traps.</li>
                <li><b>traps: </b>Methods that provide property access. (This is analogous to the concept of traps in operating systems.)</li>
                <li><b>target: </b>Object which the proxy virtualizes. It is often used as storage backend for the proxy. Invariants
                  (semantics that remain unchanged) regarding object non-extensibility or non-configurable properties are verified
                  against the target.</li>
                <li><b>invariants: </b>Semantics that remain unchanged when implementing custom operations are called invariants. If we violate the
                  invariants of a handler, a TypeError will be thrown.</li>
              </ul>
              <br />

              <h3>36. Modules</h3>
              <b>Differences between modules and standard scripts</b>
              <ul>
                <li>If we try to load the HTML file locally, will run into CORS errors due to JavaScript module security requirements.</li>
                <li>Also might get different behavior from sections of script defined inside modules as opposed
                  to in standard scripts. This is because modules use strict mode automatically.</li>
                <li>Modules are only executed once, even if they have been referenced in multiple "script" tags.</li>
              </ul>
              <br />
              <br />

              <b>Default exports versus named exports</b>
              <ul>
                <li>Named exports are useful to export several values. During the import, one will be able to
                  use the same name to refer to the corresponding value.</li>
                <li>In default export, there is only a single default export per module. A default
                  export can be a function, a class or an object. This value is to be considered
                  as the “main” exported value.</li>
              </ul>
              <br />
              <br />

              <b>Creating a module object</b>
              <br />
              To import each module's features inside a module object. The following syntax form does that:
              <div style={titles}>
                <PrismCode
                  code={features}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              This grabs all the exports available inside module.js, and makes them available as members of an object Module,
              effectively giving it its own namespace.
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
              The newest part of the JavaScript modules functionality to be available in browsers is dynamic module loading.
              This allows you to dynamically load modules only when they are needed, rather than having to load everything.
              This has some obvious performance advantages.
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

              <h3>37.Event Listeners</h3>
              Real interactivity on a website requires event handlers. These are code structures that listen
              for activity in the browser, and run code in response.
              <div style={titles}>
                <PrismCode
                  code={listeners}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>38.Event bubbling and Capturing</h3>
              Event bubbling and capturing are two ways of event propagation in the HTML DOM API, when an event
              occurs in an element inside another element, and both elements have registered a handle for that
              event.<br />
              <ul>
                <li>
                  <b>bubbling: </b>the event is first captured and handled by the innermost element and then
                  propagated to outer elements.
                </li>
                <li>
                  <b>capturing: </b>the event is first captured by the outermost element and propagated to the inner elements.
                </li>
                <li>
                  Event bubbling set by default. If we pass true parameter in callback function than it became event capturing
                </li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={Bubblings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>39.event.stopPropagation</h3>
              event.stopPropagation and event.preventDefault, seem to be doing the same thing.
              <ul>
                <li><b>stopPropagation: </b>Stops the event from bubbling up the event chain.</li>
                <li><b>preventDefault: </b>Prevents the default action the browser makes on that event.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={stopPropagation}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>40.Event Debouncing</h3>
              <div style={titles}>
                <PrismCode
                  code={debouncing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>41.Function Express & Function Statement</h3>
              function expressions and function statements are very similar in JavaScript, the difference is how the
              browser loads them into the execution context.
              <div style={titles}>
                <PrismCode
                  code={execution}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <p>
                <b>function statement: </b> loads before any code is executed. This behavior of function statements is
                called hoisting, which allows a function to be used before it is defined.
              </p>
              <p>
                <b>function expression: </b>associates a value with a variable, just like any other assignment statement. function
                expressions load only when the interpreter reaches the definition of the function.
              </p>
              <ul>
                <li>Difference between Function Statement and Function Expression is the "Hosting".</li>
                <li>Function Statement also called Function Declaration.</li>
                <li>Annonninous Function Doesnt have their own Identity.</li>
              </ul>
              <br />

              <h3>42.Difference between textContent and innerText.</h3>
              <b>textContent: </b>
              <ul>
                <li>Used to set/ return the text value of the selected node and all its descendants.</li>
                <li>While setting the textContent property, any child nodes are removed. It is replaced by a single Text node containing the specified string.</li>
              </ul>
              <br />
              To set the text of node –<br />
              <b>node.textContent = text</b>
              <br />
              <br />
              To return the text of node –<br />
              <b>node.textContent</b>
              <br />

              <div style={titles}>
                <PrismCode
                  code={textContent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>innerText: </b>
              <ul>
                <li>This property also sets/ returns the text value of the selected node and all its descendants.</li>
                <li>The innerText property returns the text, without spacing and the textContent property returns the text along with spacing.</li>
              </ul>
              <br />
              <br />
              <b>Other differences:</b>
              <br />
              <table>
                <tr>
                  <th>innerText</th>
                  <th>textContent</th>
                </tr>
                <tr>
                  <td>Returns the visible text contained in a node.</td>
                  <td>Returns the full text.</td>
                </tr>
                <tr>
                  <td>Much more performance-heavy, as it requires layout information to return the result.</td>
                  <td>It is not so much performance-heavy, as it doesn’t requires layout information to return the result.</td>
                </tr>
                <tr>
                  <td>Defined only for HTMLElement objects.</td>
                  <td>Defined for all Node objects.</td>
                </tr>
              </table>
              <br />

              <h3>43.What is the difference between HTMLCollection and NodeList</h3>
              The main difference between an HTMLCollection and a NodeList is that one is live and one is static. This means that when an element
              is appended to the DOM, a live node will recognize the new element while a static node will not.
              <br />
              <br />
              <b>HTMLCollection:</b>
              <br />
              The element methods <b>getElementsByClassName()</b> and <b>getElementsByTagName()</b> return a live HTMLCollection. It only includes the matching
              elements (e.g. class name or tag name) and does not include text nodes, it provides only two methods <b>item</b> and <b>namedItem</b>.
              <br />
              <br />
              <b>Ex. </b>All the elements with the class name of fruits is selected. The item() method is then used to access the fruit
              at index 0 and a class name of fruit__01 is added to that element.

              <div style={titles}>
                <PrismCode
                  code={HTMLCollection}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>NodeList: </b>
              <br />
              <ul>
                <li>The element method <b>querySelectorAll()</b> returns a static NodeList. They look like arrays but are not.</li>
                <li>NodeLists have a defined forEach method as well as a few other methods including item, entries, keys, and values.</li>
                <li>NodeLists behave differently depending on how we access them. if we access elements using <b>childNodes</b>, the returned list
                  is live and will update as more elements are added to the node. If it’s accessed using <b>querySelectorAll()</b>, the returned list
                  is static and will not update if more elements are added to the node.</li>
              </ul>

              <br />
              <div style={titles}>
                <PrismCode
                  code={NodeList}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>44.How can an HTMLCollection be traversed?</h3>
              <ul>
                <li>If use .map, .filter, or .forEach on an HTML collection got this friendly error.</li>
                <b>Ex. </b><i>Uncatch TypeError: p.forEach is not a function at 'anonymous':1:3</i>
                <br />
                <br />

                <li>We can interact with an HTML Collection as if it’s an array in many other ways. We can use index numbers to access data. It
                  looks like an array. But it functions a bit differently. NodeList and HTMLCollection used somewhat interchangeably. They’re
                  both DOM lists, but HTMLCollection contains DOM elements that are the same, whereas a nodeList can contain a variety of DOM
                  elements. That’s why <b>querySelectorAll</b> returns a nodeList but <b>getElementsByTagName</b> returns an HTMLCollection. forEach works on a
                  nodeList but not an HTMLCollection.</li>

                <li>Iterate over an HTMLCollection. With for loop/ while loop.</li>
                <li>Our HTMLCollection variable can now be iterated over like an array. If we don’t want to convert our HTMLCollection we can also
                  use .call to use array methods:</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={traversed}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>45.The difference between children and childNodes in javascript</h3>
              <br />
              <b>childNodes:</b> It is a standard property that returns a collection of child elements of the specified element, including HTML nodes, all properties, and text nodes.
              <br />
              <br />
              <b>children:</b> A non-standard property that returns a collection of child elements of the specified element.
              But it only returns HTML nodes, not even text nodes. Although it is not a standard DOM property.
              <div style={titles}>
                <PrismCode
                  code={childNodes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>46.What is the difference between firstChild and firstElementChild?</h3>
              <ul>
                <li><b>firstChild: </b>considers text entered in between html tags as a child element too in addition to html tags.</li>
                <br />
                <li><b>firstElementChild: </b>ignores text and comments between html tags and only considers html elements as a child.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={firstElementChild}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>47.Name the two functions that are used to create an HTML element dynamically.</h3>
              <ul>
                <li><b>document.createElement: </b>is used with an HTML tag to create the element. The textContent is then modified and then the
                  class attribute is modified using setAttribute . This could also be used to add a data attribute.
                  Finally the element is appended to the body using the body element's appendChild method.</li>
                <li><b>createElement() method: </b>Can create and insert HTML elements at runtime.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={dynamically}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>48.What is the difference between remove() and removeChild()</h3>
              <ul>
                <li>The removeChild and remove are methods to work with elements of DOM, these method removes the element from the DOM.</li>
                <li><b>removeChild(): </b>Remove the node, and can save it to use it again.</li>
                <li><b>remove(): </b>Really remove the child.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={removeChild}
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

export default (withStyles(styles)(IntroJs));

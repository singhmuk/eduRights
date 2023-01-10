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

const spreadRest=`
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


//3
var obj={
  name:'Ajay',
  age:"30",
  hobbies:['Songs', 'Footbal', 'Laugh']
}

const nwObj={
  ...obj,
  age: 18 
}

const { name,  hobbies,} = obj;

console.log(hobbies); 
console.log(nwObj);
`.trim();

const currying = `
function sum(a){
  return function(b){
    return function(c){
      return a+b+c;
    }
  }
}

let sumcall = sum(2);
let bcall = sumcall(3);
let ccall = bcall(4)

console.log(ccall)


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


//infinite curring
function add(a){
  return function(b){
    if(b) return add(a+b);
    return a;
  }
}

console.log(add(2)(3)(4)(5)())
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
'use strict';
delete Object.prototype;                                                                    // throws a TypeError.


//2
function sum(a, a, c) {                                                                     // syntax error.
  'use strict';
  return a + a + c;                                                                  // wrong if this code ran.
}
`.trim();



const management = `
var x = { a: { b: 2 } };

var y = x;                                                          
x = 1;                                      

var z = y.a;                                 
y = 'mozilla';                               
z = null;                                    
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
//1. Objects are Variables
var person = "John Doe"; 


//2. Using an Object Literal
Const emp={id:102,name:"Shyam Kumar",salary:40000}

//3
const obj = Object.create(emp);
`.trim();

const constructor = `
class obj{
  constructor(id,name){
    this.id=id,
    this.name=name,
    
    this.display = function(other){
      return console.log(other+"------"+this.name+"pppppp");
      }
    }
  
  show(){
    return console.log(this.id,"----",this.name)
    }
  }

const newObj=new obj(1,'Mukesh');
newObj.show();
newObj.display('890');
`.trim();

const callbackJs = `
function greeting(name){
  console.log('greeting', name);
}

function main(){
  const str = "Welcome";
  console.log(str);
  greeting('name')
}

main();
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
const obj={
  name:'Krishana',
  address:'Gokul',

  show: function(){
      console.log(this.name,'---', this)
  }
}

obj.show();
`.trim();

const thisBind = `
function bike() {
  console.log(this.name);
 }

  var name = "Ninja";
  var obj = { name: "Pulsar" }
  
  bike.call(obj);`.trim();

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
`.trim()

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
//Deep copy array
var arr = ['Mukesh', 'Rakesh', 'Niketh'];
var newArr = arr;
newArr[0] = '100';
console.log(arr, newArr);


//Deep copy object
const obj2 = {size:10, owner:'Sid', isCarNonAc:true };
const newObj2 = obj2;
newObj2.model = "0%";
obj2.isCarNonAc = false;
console.log(newObj2, obj2)


//Shallow Copy array:
var arr = ['Mukesh', 'Rakesh', ['100', 200], {x:100} ];
var arr2 = ['Sid']
var newArr = arr2.concat(arr);
newArr[0] = 'concat'
newArr[4] = 'change'
console.log(newArr, arr)


//Shallow Copy Object:
var obj={
  age:10,
  gender:'male',
  hobbies: ['a', 'b', 'c']
}

var newObj = Object.assign({}, obj);
newObj.age = 100;
newObj.hobbies[0] = 'd';
console.log(newObj, obj)`.trim();


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
                Default javaScript is Synchronous.<br/>
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
              
              <h3>3. Objects</h3>
              An object is a collection of related data/ functionality (properties and methods).
              <br />
              <br />
              <b>JavaScript Objects?</b>
              <br />
              <ul>
                <li>A javaScript object is an entity having state and behavior.
                </li>
                <li>JavaScript is an object-based language. Everything is an object in JavaScript.</li>
                <li>JavaScript is template based not class based. Here, we don't create class to get the
                  object. But, we direct create objects.
                </li>
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

              <b>By using an Object constructor:</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={constructor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. How to convert an Object { } into an Array [] </h3>
              <div style={titles}>
                <PrismCode
                  code={convertObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. How to convert an Array [] to Object { }</h3>
              <div style={titles}>
                <PrismCode
                  code={convertArr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Shallow Copy And Deep Copy</h3>
              <ul>
                <li><b>Shallow copy: </b>Coping one top level element.</li>
                <li><b>Deep copy:</b>Coping nested elements.</li>
                <li>Object and array are assigned by reference. By reference both array value changed</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={shallow}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Difference between Object.freeze() vs const</h3>
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
             <br/>

             <h3>9. Why do we use arrow function.</h3>
              <p>
                Arrow functions take the this from their surroundings (lexical binding).
                <br />
                The syntax allows an implicit return when there is no body block, resulting in shorter and
                simpler code in some cases.
              </p>

             <h3>10. Object prototypes</h3>
              <ul>
                <li>Prototypes are the mechanism by which <b>JavaScript objects inherit features</b> from one another.</li>
                <li>Each object has a private property which holds a link to another object called its prototype. That
                  prototype object has a prototype of its own, and so on until an object is reached with null as its
                  prototype.</li>
                <li>By definition, null has no prototype, and acts as the final link in this prototype chain.</li>
              </ul>
              <br />

             <h3>11. Spread & Rest Operator</h3>
              <ul>
                <li>Rest & Spread both use in object and array.</li>
                <li><b>Rest: </b>The rest operator is used to put the rest of some specific user-supplied values into a 
                JavaScript array.</li>
                <li><b>Spread: </b>Allows us to quickly copy all or part of an existing array or object into another array or object.</li>
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
              Hoisting is JavaScript's default behavior of moving declarations to the top.<br/>
              <br/>
              Variables defined with let and const are hoisted to the top of the block, but not initialized.
              <br/>
              Meaning: The block of code is aware of the variable, but it cannot be used until it has been declared.
              <br/>
              Hosting mainly relate to Memory management.
              <br/>

              <h3>13. What are closures? Explain with example.</h3>
              <b>scope: </b> Local, Global, Lexical.
              <br/>
              In normal programming when we call function after than any varriables or parameter declared in that function 
              we can't use again. But with help of closers we can use function variables after function excuite in lexicalScop.
              <br/>
              <ul>
                <li>A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).</li>
                <li>Or a closure gives access to an outer function’s scope from an inner function.</li>
                <li>In JavaScript, closures are created every time a function is created, at function creation time.</li>
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
              Clouser is a function bundled together in a lexical scope.<br />
              <ul>
                <li>Uses: Module Design Pattern</li>
                <li>Currying</li>
                <li>Functions like once</li>
                <li>Memoize</li>
                <li>Maintaining state in async world</li>
                <li>setTimeouts</li>
                <li>Iterators</li>
              </ul>
              <br />
              <br />

              <h3>What is the role of closures in JavaScript?</h3>
              The script builds a closure in JavaScript at the time of making of a function. It is a local variable that is 
              present in the memory even after the function finishes its execution. <br/>
               Since JavaScript has no modifiers for access, closures permit the programmer to make variables that are not directly 
              accessible.
              <br />

              <h3>14. Function Express & Function Statement</h3>
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
              </ul>
              <br />

              <h3>15. What is 'this' keyword in JavaScript?</h3>
              This keyword used for self-refrencung, Like to point our object.

              <div style={titles}>
                <PrismCode
                  code={thisKey}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>Explicit and Fixed Binding of “this” keyword </b>
              <br />
              If we use call and apply method with calling function, both of those methods take as their first
              parameter as execution context. that is this binding.
              <div style={titles}>
                <PrismCode
                  code={thisBind}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <ul>
                <li><b>Explicit binding: </b>If we invoke the function bike with call() method passing execution context
                  object obj as first argument, then obj gets assigned to this object and it prints “Pulsar” which is
                  nothing but obj.name.</li>
                <li><b>Fixed binding/Hard binding: </b>We can force the this object to be same always no matter from
                  where and how it gets called.</li>
              </ul>
              <br />
              <br />

              <b>In JavaScript, why is the “this” operator inconsistent?</b>
              The value of <b>this</b> changes depending on how the function is called. We say that a function is invoked with 
              some a particular this value — the this value is determined at invocation time, not definition time.
              <br/>
              <br/>
              <ul>
                <li>If the function is called as a “raw” function, this will be the global object or undefined if the function 
                  runs in strict mode.</li>
                <li>If it is called as a method on an object, this will be the calling object.</li>
                <li>If you call a function with call or apply, this is specified as the first argument to call or apply.</li>
                <li>If it is called as an event listener, this will be the element that is the target of the event.</li>
                <li>If it is called as a constructor with new, this will be a newly-created object whose prototype is set to the 
                  prototype property of the constructor function.</li>
                <li>If the function is the result of a bind operation, the function will always and forever have this set to the 
                  first argument of the bind call that produced it. (This is the single exception to the “functions don’t have a 
                  fixed this” rule — functions produced by bind actually do have an immutable this.)</li>
              </ul>
              <br/>

              <h3>16. Bind()</h3>
              Bind function similar to call function, But bind don't use direct function it create a copy of function
              and call that copied function when required.
              <ul>
                <li>Creates a new function, when called.</li>
                <li>Returns a new function, when invoked, has its this sets to a specific value.</li>
                <li>Unlike the call() and apply() methods, the bind() method doesn’t immediately execute the function. It just
                  returns the function.
                </li>
                <li>When a method an object is passed to another function as a callback, the this value is lost.
                  That’s because bindExample() received the function bindExample.details separately from the bindExample object.
                </li>
                <li>The bind() method allows an object to borrow a method from another object without making a copy of that method.</li>
                <li>When we assign method to varryble than lost this binding bind set context of this.</li>
                <li>Bind method exactly same as the call method, Only diffrences instead of caling method, Bind method
                  with the object and return the copy of that method.
                </li>
              </ul>
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
              The call() method calls a function with a given this value and arguments provided individually.
              <br />
              <br />
              The main differences between bind() and call() is that the call() method:<br />
              <ul>
                <li>Accepts additional parameters as well</li>
                <li>The call() method does not make a copy of the function it is being called on.</li>
                <li>call() and apply() serve the exact same purpose. The only difference between how they work is that.</li>
                <ul>
                  <li>call() expects all parameters to be passed in individually.</li>
                  <li>apply() expects an array of all of our parameters.</li>
                </ul>
              </ul>
              <br />
              <br />

              <b>Call: </b>This value depend from where to call it.
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

              <b>Apply</b>
              <br />
              Pass Array as argument instead of parameter.
              <div style={titles}>
                <PrismCode
                  code={applys}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. Polyfill</h3>
              A polyfill is a browser fallback, made in JavaScript, that allows functionality expect to work in modern browsers also work in
              older browsers.
              <br />
              <ul>
                <li>It “fills in” the gap and adds missing implementations in old browser.</li>
              </ul>
              <br />

              <h3>19. What is Functional Programming?</h3>
              functional programming:<br />
              <ul>
                <li>Pure functions</li>
                <li>Function composition</li>
                <li>Avoid shared state</li>
                <li>Avoid mutating state</li>
                <li>Avoid side effects</li>
              </ul>
              <br />

              <ul>
                <li><b>Function composition: </b>is the process of combining two/ more functions in order to produce a new function or perform
                  some computation.</li>
              </ul>
              <br />
              <br />

              <b>A pure function has following properties:</b>
              <br />
              <ul>
                <li>The function always returns the same result if the same arguments are passed
                  in. It does not depend on any state, or data, change during a program's
                  execution. It must only depend on its input arguments.</li>
                <li>The function does not produce any observable side effects such as network
                  requests, input and output devices, or data mutation.</li>
                <li>The same arguments must always lead to the same outcome.</li>
                <li>A pure function cannot depend on any variable declared outside its scope.</li>
              </ul>
              <br />

              <h3>20. First Class Function</h3>
              functions are treated like any other first-class object — they can be stored in variables, passed around, returned
              from other functions, and even hold their own properties.
              <br />
              <br />
              <b>first-class objects can:</b>
              <ul>
                <li>Be stored in a variable.</li>
                <li>Be passed as arguments to functions.</li>
                <li>Be returned by functions.</li>
                <li>Be stored in some data structure and</li>
                <li>Hold their own properties and methods.</li>
              </ul>
              <br />
              <br />

              <b>Uses of a First-Class Function:</b>
              <br />
              First-class functions give us a wide variety of flexible and powerful design patterns. These
              patterns let us write more readable, more dynamic, and more concise code.
              <br />
              <ul>
                <li>Higher-Order Functions</li>
                <li>Partial Function Application</li>
                <li>Asynchronous Functions</li>
              </ul>
              <br />

              <h3>21. Combinators</h3>
              Combinators are similar to pure functions. With one more a combinator contains no free variables.
              <br />
              <br />
              A free variable is any variable whose values cannot be accessed independently. Every
              variable in a combinator must be passed through parameters.
              <br />

              <h3>22. Async-Await</h3>
              <ul>
                  <li>It's an easier way to deal with Promises.</li>
                  <li>Promises is an easier way to deal with CB.</li>
                  <li>To handle an asynchronous process, we return a Promis object from a function.</li>
                  <li>By default any function without <b>return</b> statement return <b>undefined</b> in javascript.</li>
                  <li>By writing async function don't need to write return statement.</li>
                  <li>await make sure to wait till a Promise is settled, be resolved/ rejected.</li>
                  <li>The way we write then() for handling promise, now in await we can remove than() and replace it with await.</li>
              </ul>
              <br />
              <br />
              <b>Callback: </b>A callback function is a function passed into another function as an argument, which is then
                invoked inside the outer function to complete some kind of action.
                <br/>
                <ul>
                <li>with Callback function javaScript build an asynchronous wold of a synchronous single-threaded language.</li>
                <li>Almost anything that has to pull data into your app or push data out will always
                  be asynchronous because it’s not going to be running in the same thread.
                  callbacks do not work with try-catch.</li>
                <li>Although, if your callback is synchronous, then you can catch errors using try-catch</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={callbackJs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br/>

                <b>Promise: </b>
                <ul>
                <li>
                  Promise is an object that represents the completion/ failure of an asynchronous task and its resulting value.
                </li>
                <li>A promise is a returned object which contain callbacks, instead of passing callbacks into a function.</li>
              </ul>
              <br />
              <br />

              <b>Chaining</b><br />
              A common need is to execute two/ more asynchronous operations back to back, where each subsequent operation
              starts when the previous operation succeeds, with the result from the previous step. This is promise chain.
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
              Always return results, otherwise callbacks won't catch the result of a previous promise.
              <br />
              <br />

              <b>Unlike old-fashioned passed-in callbacks, a promise comes with some guarantees:</b>
              <br />
              <ul>
                <li>Callbacks will never be called before the completion of the current run of the JavaScript event loop.</li>
                <li>Callbacks added with then(), will be called even after the success/ failure of the asynchronous operation.</li>
                <li>Multiple callbacks may be added by calling then() several times. Each callback is executed one after another,
                  in the order in which they were inserted.</li>
                <li>One of the great things about using promises is chaining.</li>
              </ul>
              <br />

              <b>How are observables different from promises?</b>
              <br/>
              The first difference is that an Observable is lazy whereas a Promise is eager.
              <br/>
            <table>
              <tr>
                <th>Observables</th>
                <th>Promises</th>
              </tr>
              <tr>
                <td>Handle a sequence of asynchronous events over a period of time.</td>
                <td>Deal with one asynchronous event at a time</td>
              </tr>
              <tr>
                <td>Lazy. An observable is not called until we subscribe() to the observable</td>
                <td>Not Lazy, Execute immediately after creation.</td>
              </tr>
              <tr>
                <td>Can be cancelled by using the unsubscribe() method</td>
                <td>Cannot be cancelled</td>
              </tr>
              <tr>
                <td>Observable provides operators like map, forEach, filter, reduce, retry, retryWhen etc.</td>
              </tr>
            </table>
              <br/>

              <h3>23. Difference between Map and foreach.</h3>
              <table>
                <tr>
                  <th>Value</th>
                  <th>foreach</th>
                  <th>Map</th>
                </tr>
                <tr>
                  <td><b>Functionality</b></td>
                  <td>Performs given operation on each element of the array</td>
                  <td>Performs given "transformation" on "copy" of each element </td>
                </tr>
                <tr>
                  <td><b>Return value</b></td>
                  <td>undefined</td>
                  <td>new array with tranformed elements leaving back original array unchanged.</td>
                </tr>
                <tr>
                  <td><b>Processing</b></td>
                  <td>Performing non-transformation like processing on each element.</td>
                  <td>Obtaining array containing output of some processing done on each element of the array.</td>
                </tr>
              </table>
              <br />

              <ul>
                <li>map() is chainable. This means we can attach reduce(), sort(), filter() and so on
                  after performing a map() method on an array.</li>
                <li>But we can't do with forEach()</li>
              </ul>
              <br />

              <h3>24. Hoc:</h3>
              A higher order function is a function either:<br />
              <ul>
                <li>1. Accept a function as an argument.</li>
                <li>2.Return a function.</li>
              </ul>
              <br />

              HOF are:<br />
              <ul>
                <li>forEach</li>
                <li>map</li>
                <li>filter</li>
                <li>sort</li>
              </ul>
              <br />

              <h3>25. Event loop</h3>
              <ul>
                <li>Browser have a mechanism that handles executing multiple chunks	of program	over
              time, at each moment invoking	the	JS engine, called the "event loop."</li><br/>
                <li>With the help of event loop allows Node.js to perform non-blocking I/O operations.</li><br/>
                <li>Every I/O requires a callback - once they are done they are pushed onto the event loop for execution. When 
                  one of these operations completes, the appropriate callback may be added to the poll queue to eventually be 
                  executed.</li><br/>
                <li>By providing callback function Node prevents blocking code.</li><br/>
                <li><b>Scheduled "events"	:</b>
              The	browser	is	set	up to listen for the response from the network, and	when it	has
              something to give us, it schedules the callback function to be, executed by inserting it into
              the event loop.</li><br/>
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
              JavaScript has a concurrency model based on an event loop, which is responsible for executing the code, collecting
              and processing events, and executing queued sub-tasks.
              <br />
              <br />
              <img src={EventLoop} alt="" className="responsive" style={redesign} />
              <br />
              <br />

              <h3>27. Event bubbling and Capturing</h3>
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

              <h3>28. What is the JavaScript Event Delegation Model?</h3>
              When we are bubbling and 
              capturing, it permit functions to apply a single handler to several elements at a specific time then it’s called 
              Event Delegation. <br/>
              It basically permits you to put event listeners to single parent instead of particular nodes. That 
              specific listener analyzes the bubbled events to get a match on the child elements.
              <br/>

              <h3>29. event.stopPropagation</h3>
              event.stopPropagation and event.preventDefault, seem to be doing the same thing.
              <ul>
                <li><b>stopPropagation: </b>Stops the event from bubbling up the event chain.</li>
                <li><b>preventDefault: </b>Prevents the default action the browser makes on that event.</li>
              </ul>
              <br />

              <h3>30. Event Debouncing</h3>
              Debouncing in JavaScript is a practice used to improve browser performance. There might be some functionality in a 
              web page which requires time-consuming computations. If such a method is invoked frequently, it might greatly 
              affect the performance of the browser, as JavaScript is a single threaded language. Debouncing is a programming 
              practice used to ensure that time-consuming tasks do not fire so often, that it stalls the performance of the web 
              page. In other words, it limits the rate at which a function gets invoked.
              <div style={titles}>
                <PrismCode
                  code={debouncing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>31. Throttling/ Throttle function </h3>
              Throttling is a practice used in websites. Throttling is used to call a function after every millisecond or a 
              particular interval of time only the first click is executed immediately.
              <div style={titles}>
                <PrismCode
                  code={throttle}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>32. IIFE</h3>
              Because our application could include many functions and global variables from different source files, it's important to limit 
              the number of global variables.

              <br/>
              <br/>
              <ul>
                <li>IIFE used to solve scoping problem.</li>
                <li>Any variables declared inside the IIFE are not visible to the outside world.</li>
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

              <h3>33. Curry</h3>
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

              <h3>34. Generator</h3>
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
              <ul>
                <li>1.one can choose to jump out of a function and let outer code to determine when to jump back into
                  the function.
                </li>
                <li>2.the control of asynchronous call can be done outside of your code
                  The most important feature in generators—we can get the next value in only when we really need
                  it, not all the values at once. 
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
                <li>Makes debugging easier. Code errors that have been ignored/ failed silently now generate errors.</li>
                <li>Prevents accidental globals. Without strict mode, assigning a value to an undeclared variable automatically creates a global
                  variable with that name. In strict mode, attempting to do so throws an error.</li>
                <li>Eliminates this coercion. Without strict mode, a reference to a this value of null/ undefined is automatically coerced to the global.</li>
                <li>Fixes mistakes that make it difficult for JavaScript engines to perform optimizations.</li>
              </ul>
              <br />

              <b>Converting mistakes into errors</b>
              <ul>
                <li>In normal code assigning to NaN does nothing, no receives failure feedback. In strict mode
                  assigning to NaN throws an exception.</li>
                <li>all properties named in an object literal be unique. The normal code may duplicate property
                  names, with the last one determining the property's value. Duplicate property names are a syntax
                  error in strict mode:</li>
                <li>strict mode requires that function parameter names be unique.</li>
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

              <h3>37. Modules</h3>
              <b>Differences between modules and standard scripts</b>
              <ul>
                <li>If we try to load the HTML file locally, will run into CORS errors due to JavaScript module security requirements.</li>
                <li>modules use strict mode automatically.</li>
                <li>Modules are only executed once, even if they have been referenced in multiple "script" tags.</li>
              </ul>
              <br />
              <br />

              <b>Default exports versus named exports</b>
              <ul>
                <li>Named exports are useful to export several values.</li>
                <li>In default export, there is only a single default export per module. A default
                  export can be a function, a class or an object.</li>
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
              The JavaScript provides static methods that belong to the class instead. These methods are called directly on the 
              class itself.
              <br />
              <br />
              <ul>
                <li>static keyword is used to declare a static method.</li>
                <li>A class can contain more than one static method.</li>
                <li>If we declare more than one static method with a similar name, the JavaScript always invokes the last one.</li>
                <li>static method can be used to create utility functions.</li>
                <li>We can use this keyword to call a static method within another static method.</li>
                <li>We cannot use this keyword directly to call a static method within the non-static method. In such case, we can call the static
                  method either using the class name or as the property of the constructor.</li>
              </ul>
              <br/>

              <h3>39. Proxies</h3>
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

              <h3>40. What is the function of close () in JavaScript?</h3>
              The function of close () is mainly used to close the latest window. You have to write window.close() to make sure that this 
              command is clearly associated with a window object and not the other JavaScript object.
              <br/>

              <h3>41. Memory Management</h3>
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

              <h3>42. Heap</h3>
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

              <h3>43. async and defer</h3>
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
                <li>44. async and defer both instruct the browser to download the scripts in a separate thread,
                  while the rest of the page is downloading, so the page loading is not blocked by the scripts.
                </li>
                <li>2. If our scripts should be run immediately and they don't have any dependencies, then use async.</li>
              </ul>
              <br />
              <br />
              If your scripts need to wait for parsing and depend on other scripts and/or the DOM being in place, load them using defer.
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
    )
  }
}

export default (withStyles(styles)(IntroJs));

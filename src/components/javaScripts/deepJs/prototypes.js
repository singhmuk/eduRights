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

const paramsd = `
function Person(fname, lname, city, year){
    lname === undefined ? lname = 'Singh' : city = city;
    city === undefined? city = 'Delhi' : city = city;


    this.fname = fname;
    this.lname = lname;
    this.city = city;
    this.year = year
}

var obj = new Person('mukesh',2003);
console.log(obj);`.trim();

const modyPro = `
function Person(first, last, age, gender, interests) {

  this.name = {
    'first': first,
    'last' : last
  };
  this.age = age;
  this.gender = gender;
}

const person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
console.log(person1);`.trim();



const inheritingMethos = `
var obj = {
  num: 2,
  main: function() {
    return this.num + 1;
  }
};

console.log(obj.main()); 

var newObj = Object.create(obj);
newObj.num = 4; 

console.log(newObj.main());`.trim();


const proto = `
let obj = {
  name: "Mukesh",
  city: "Ranchi",
  getInfo: function(){
    console.log(this.name ,"from", this.city)
  }
}

let obj2 = {
  name: "Ritesh"
}

//Never use it
obj2.__proto__=obj;

console.log(obj2.name);
console.log(obj.getInfo());
console.log(obj2.getInfo());`.trim();


const polyfill = `
//1
Function.prototype.mybind = function(){
  console.log('dddddd')
}

function fun(){}


//2
let names = {
  fname: 'Mukesh',
  hometown: 'Ranchi'
}

let getInfo = function(){
  return console.log(this.fname,"---",this.hometown);
}

getInfo();


let getMyInfo = getInfo.bind(names);        //create own polyfill by bind method (Traditional way).
getMyInfo();  



Function.prototype.mybind = function(...args) {                      // User defind way
  let obj = this
  return function() {
    obj.call(args[0]);
  }
}

let getMyInfo2 = getInfo.mybind(names);
getMyInfo();`.trim();


const polyfillAdv = `
let names = {
  fname: 'Mukesh',
  hometown: 'Ranchi'
}

let getInfo = function(state, state2, state3){
  return console.log(this.fname,"---",this.hometown,"State",state, state2, state3);
}


let getMyInfo = getInfo.bind(names, "state");
getMyInfo("state", "state2");  


Function.prototype.mybind = function(...args) {
  let obj = this,
  params = args.slice(1);
  return function(args2) {
    obj.apply(args[0], [...params, ...args2]);
  }
}

let getMyInfo2 = getInfo.mybind(names, "state");
getMyInfo("state", "state2");
`.trim();

const code = `
const pureFun = (num) => Math.pow(num, 1/2);                                   // Pure function.
console.log(pureFun(64));


const inPureFun = (max, min) => {
  return parseInt(Math.random() * (max - min) + min);                          // Impure function.
}  

console.log(inPureFun(10, 2));
`.trim()

const anonymousFun = `
let show = function () {
  console.log('Anonymous function');
};

show();


//Using anonymous functions as arguments of other functions
setTimeout(function () {
  console.log('Execute later after 1 second')
}, 1000);`.trim();

const firstFun = `
function interview(job){
  if(job === 'designer'){
    return function(name){
      console.log('designer', name);
    }
  }
  else if(job === 'teacher'){
    return function(name){
      console.log('teacher,name', name);
    }
  }
  else {
    return function(name){
        console.log('default', name);
      }
    }
  }

  var obj = interview('teacher');
  interview('muke')


//Partial Function Application
  function applicator(fn, val) {
    return function() {
      fn(val);
    };
  }

function speak(string) {
  console.log(string);
}

var sayHello = applicator(speak, "Hello");
sayHello();   `.trim();

const combinators = `
const add = (x, y) => x + y;
const multiple = (x, y) => x + y;
const sum = (...nums) => nums.reduce((x, y) => x + y);
const product = (...nums) => nums.reduce((x, y) => x * y);


//
function myFunc() {
  let name="Radha";
  let bool=true;

  console.log('And', name && bool);
  console.log('Or', name || bool);
}

myFunc();
`.trim();

const unsafe = `const person = {
  name: 'Bobo',
  address: { 
    street: 'Main Street', 
    number: 123
   }
 };
 
 const shallowPersonClone = { ...person };
 shallowPersonClone.address.number = 456;
 console.log({ person, shallowPersonClone });`.trim()

const safe = `const person = {
  name: 'Bobo',
  address: { 
    street: 'Main Street', 
    number: 123
   }
 };
 
 const deepPersonClone = JSON.parse(JSON.stringify(person));
 deepPersonClone.address.number = 456;
 console.log({ person, deepPersonClone });`.trim()

const hoc = `
function hocfun(a,b) {
  let c=a+b;
  console.log(c);
  return function(name) { 
      return [console.log(a), console.log(b), console.log(name)]
  };
}

const myFunc = hocfun(2,5);
myFunc('Krishana');
 `.trim()

const dynamicScope = `
 function foo(){
     console.log(a);
  }
  
  function bar(){
     var a = 3;
     console.log(a);
     foo();
  }
  
  var a = 2;
  bar();`.trim()

const METADATA = `let METADATA = Symbol('metadata');
 class Car {
      constructor(make, model) {
      this.make = make;
      this.model = model;
    }
    
  [METADATA]() {
        return {
        make: this.make,
        model: this.model
      };
    }
    ["add"](a, b) {
    return a + b;
    }
    
    [1 + 2]() {
      return "three";
      }
    }
    
 let MazdaMPV = new Car("Mazda", "MPV");
   MazdaMPV.add(4, 5);
   MazdaMPV[3]();
   console.log(MazdaMPV[METADATA]())
  `.trim()




const statics = `
   //1
   static display() {
     return "static method is invoked"
   }
   
   static display() {
     return "static method is invoked again"
   }
   }
   
   console.log(Test.display());
   
   
   //2
   class Student {
     constructor(name)  {    
       this.name = name; 
        }
     static findName(student)  {
         return student.name;  
     } 
   }
   var s = new Student("Eden"); 
   var name = Student.findName(s);
   console.log(name);`.trim();


const supers = `
   var obj1 = {  
     print(){    
     console.log("Hello");  
   } 
 }
 
 var obj2 = {  
     print(){
     super.print();  
   } 
 }
 
 
 Object.setPrototypeOf(obj2, obj1); 
 obj2.print();`.trim();


const access = `
   class A {
     foo() { return 'foo in A'; }
   }
   
 class B extends A {
     foo() { return 'foo in B'; }
   }
   
 class C {
     foo() { return 'foo in C'; }
   }
   
 class D extends C {
     foo() { return super.foo(); }
   }
   
 
 b = new B;
 console.log(b.foo());
 
 B.prototype.foo = D.prototype.foo
 console.log(b.foo());
 console.log(b instanceof C); // false`.trim();


const password = `
 let userEmail='LOC1234'
 let password='1234LOC1234'
 
 //console.log(userEmail.toLowerCase())
 
 let userCheck = function(myString){
   if((myString.includes(123)) && (myString.length>=7)){
     return true
   }
     return false
 }
 
 let passCheck = function(myPass){
   if((myPass.includes('123')) && (myPass.length>5)){
     return true
   }
 }
 
 console.log(userCheck(userEmail))
 console.log(passCheck(password))
 `.trim();


class Prototypes extends Component {
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
              <h3>1. Object prototypes</h3>
              <ul>
                <li>Prototypes are the mechanism by which <b>JavaScript objects inherit features</b> from one another.</li>
                <li>Each object has a private property which holds a link to another object called its prototype. That
                  prototype object has a prototype of its own, and so on until an object is reached with null as its
                  prototype.</li>
                <li>By definition, null has no prototype, and acts as the final link in this prototype chain.</li>
              </ul>
              <br />
              <br />

              <b>Modifying prototypes</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={modyPro}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li>
                  If type <b>person1</b>. into our JavaScript console, See the browser try to auto-complete this with the member names available on this object.</li>
                <li>Will see the members defined on person1's constructor — Person() — name, age, gender, interests, bio, and greeting. Also see some other members — toString, valueOf, etc — these are defined on person1's prototype object's, which is Object.prototype.</li>
              </ul>
              <br />
              <b>What happens if you call a method on person1, which is actually defined on Object.prototype</b>
              <br />
              person1.valueOf()
              <br />
              <br />
              valueOf() returns the value of the object it is called on.
              <br />
              <ul>
                <li>The browser initially checks to see if the person1 object has a valueOf() method available on it, as defined on its constructor, Person(), and it doesn't.</li>
                <li>So the browser checks to see if the person1's prototype object has a valueOf() method available on it. It doesn't, then the browser checks person1's prototype object's prototype object, and it has. So the method is called.</li>
              </ul>
              <br />
              <br />

              <b>Default Parameters</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={paramsd}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Inheriting Methods</h3>
              <div style={titles}>
                <PrismCode
                  code={inheritingMethos}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Prototype and Protopal Inheritance</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={proto}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Polyfill</h3>
              A polyfill is a browser fallback, made in JavaScript, that allows functionality expect to work in modern browsers also work in
              older browsers.
              <br />
              <ul>
                <li>It “fills in” the gap and adds missing implementations in old browser.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={polyfill}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Polyfill 2</b>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={polyfillAdv}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. What is Functional Programming?</h3>
              Functional programming is the process of building software by composing pure
              functions, avoiding shared state, mutable data, and side-effects. Functional
              programming is declarative rather than imperative, and application state flows
              through pure functions.<br />
              <br />
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

              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <h3>5. First Class Function</h3>
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
              <div style={titles}>
                <PrismCode
                  code={firstFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>JavaScript anonymous functions</b>
              <br />
              <i>
                An anonymous function is a function without a name. An anonymous function is often not accessible
                after its initial creation.
              </i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={anonymousFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>6. Combinators</h3>
              Combinators are similar to pure functions. A combinator has the same requirements as a pure function, plus one more.
              <br />
              <i>A combinator contains no free variables.</i>
              <br />
              <br />
              A free variable is any variable whose values cannot be accessed independently. Every
              variable in a combinator must be passed through parameters.
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={combinators}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>Shared State</b>
              <br />
              Shared state is any variable, object, or memory space that exists in a shared
              scope, or as the property of an object being passed between scopes. A shared
              scope can include global scope or closure scopes. <br />
              <br />
              <b>Unsafe Example</b>
              <div style={titles}>
                <PrismCode
                  code={unsafe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>Safe Example</b>
              <div style={titles}>
                <PrismCode
                  code={safe}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>7. Hoc:</h3>
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
              <div style={titles}>
                <PrismCode
                  code={hoc}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. dynamic_scope:</h3>
              Lexical scope is the set of rules about how the Engine can look-up a variable and where it will
              find it. Dynamic scope can be determined dynamically at runtime, rather than statically at authoretime.

              <div style={titles}>
                <PrismCode
                  code={dynamicScope}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Dynamic Methods:</h3>
              <div style={titles}>
                <PrismCode
                  code={METADATA}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. JavaScript static Method:</h3>
              The JavaScript provides static methods that belong to the class instead of an instance of that class. So, an instance is not required to call the static method. These methods are called directly on the class itself.
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

              <div style={titles}>
                <PrismCode
                  code={statics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>11. Super</h3>
              <div style={titles}>
                <PrismCode
                  code={supers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Superclass Property Access</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={access}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Password Enter</h3>
              <div style={titles}>
                <PrismCode
                  code={password}
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

export default (withStyles(styles)(Prototypes));

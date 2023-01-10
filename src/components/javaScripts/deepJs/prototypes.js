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
              <div style={titles}>
                <PrismCode
                  code={polyfill}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. What is Functional Programming?</h3>
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
              
              <div style={titles}>
                <PrismCode
                  code={safe}
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

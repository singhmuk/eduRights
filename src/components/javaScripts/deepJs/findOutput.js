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

const deletes = `
var output = (function(x) {
 delete x;
 return x;
})(0);

console.log(output);
`.trim()

const objCreate = `
var Employee = {
  company: 'xyz'
}

var emp1 = Object.create(Employee);
console.log(emp1.company);

delete emp1.company
console.log('After', emp1.company);
 `.trim()

const code = `(function(){
  var a = b = 3;
 })();
 
 console.log("a defined? " + (typeof a !== 'undefined'));                                         //False
 console.log("b defined? " + (typeof b !== 'undefined'));                                         //True
 `.trim()

const code_2 = `function foo1(){
  return {
  bar: "hello"
  };
 }
 
 function foo2(){
  return
  {
  bar: "hello"
  };
 }
 
 console.log("foo1 returns:",foo1());
 console.log("foo2 returns:",foo2());`.trim()

const code_4 = `function sum(x, y) {
  if (y !== undefined) {
  return x + y;
  } else {
  return function(y) { return x + y; };
  }
 }
 
 console.log(sum(2,3));
 console.log(sum(2)(3));`.trim()

const code_5 = `var list = readHugeList();
var nextListItem = function() {
 var item = list.pop();
 
 if (item) {
 // process the list item...
 nextListItem();
 }
};`.trim()

const code_6 = `
//1
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}


//2
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
`.trim()

const code_7 = `
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
console.log(fruits)`.trim()

const code_8 = `var a={},
b={key:'b'},
c={key:'c'};
  a[b]=123;
  a[c]=456;
  
console.log(a[b]);`.trim()

const code_9 = `console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));`.trim()

const accidental = `
function foo() {
  let a = b = 0;
  a++;
  return a;
}

foo();
console.log(typeof a);
console.log(typeof b);


let a = b = 0;                               //declares a is local variable and b is global variable.
`.trim();

const arrlength = `
const clothes = ['jacket', 't-shirt'];
clothes.length = 0;

console.log(clothes[0]);                                           //undefined
`.trim();

const eyetest = `
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++); {
  numbers.push(i + 1);
}

console.log(numbers);
`.trim();

const clousers = `
let i;
for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  }
  setTimeout(log, 100);
}`.trim();

const happense = `
console.log(myVar);
console.log(myConst);

var myVar = 'value';
const myConst = 3.14;`.trim();

const code_16 = `
var myObject = {
  foo: "bar",
  func: function () {
    var self = this;
    console.log("outer func" + this.foo);
    console.log("outer func" + self.foo);
    
    (function () {
      console.log("inner func" + this.foo);
      console.log("inner func" + self.foo);
    }());
  }
};
myObject.func();
`.trim();

const CheckArr = `
var v1 = { name: "John", age: 18 };
var v2 = ["red", "green", "blue", "yellow"];

console.log(Array.isArray(v1));                                                                     // false
console.log(Array.isArray(v2));                                                                     // true
`.trim();



const commonEl = `
const arr = [1, 2, 3, 3, 2];
const count = {};

arr.forEach(el => {
  count[el] = count[el] ? (count[el] += 1) : 1
})

console.log(count)`.trim();

const hasOwnProperty = `
function unique(arr) {
  var count = {};
  return arr.filter((item) => {
    return count.hasOwnProperty(item) ? false : (count[item] = true);
  });
}

console.log(unique([2, 3, 4, 3, 2, 5]));`.trim();

const groupEl = `
var people = [
  { sex: "Male", name: "Jeff" },
  { sex: "Female", name: "Megan" },
  { sex: "Male", name: "Taylor" },
  { sex: "Female", name: "Madison" }
];

function groupBy(list, key) {
  return list.reduce((data, val) => {
    (data[val[key]] = data[val[key]] || []).push(val);
    return data;
  }, {});
};

var groupedPeople = groupBy(people, "sex");
console.log(groupedPeople.Male);
console.log(groupedPeople.Female);`.trim();

const duplicateEl = `
var arr = [1, 2, 3];
arr = arr.concat(arr);

console.log(arr)`.trim();



const removeEl = `
var arr = [1, 2, 3, 4, 5, 3]
var value = 2

arr = arr.filter((item) => {
  return item !== value
})

console.log(arr)`.trim();

const deletePro = `
var obj = {
  name: "Mukesh",
  Address: "India",
  pincode: 201306
};

delete obj.name;

console.log(obj);`.trim();

const specificEl = `
var arr = [1, 2, 3, 4, 5];

arr.splice(2, 0, 7);
console.log(arr.join());`.trim();

const Checking = `
const car = {
  color: 'blue'
}

obj = car.hasOwnProperty('color')
console.log(obj)`.trim();

const findOutput = `
console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log(1 + -"1" + "2");
console.log(+"1" + "1" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);`.trim();

const findOutput2 = `
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
`.trim();

const findOutput3 = `
var x = 21;
var girl = function () {
  console.log(x);
  var x = 20;
};
girl();
`.trim();

const findOutput4 = `
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);


The second returns false because of how the engine works regarding operator associativity for < and >. It compares 
left to right, so 3 > 2 > 1 JavaScript translates to true > 1. true has value 1, so it then compares 1 > 1, which 
is false.
`.trim();

const findOutput5 = `
var a = [1, 2, 3];
a[10] = 99;
console.log(a[6]);
`.trim();

const findOutput6 = `
console.log(typeof typeof 1);                                                     //string
console.log(typeof NaN);                                                          //number
`.trim();

const operator = `
console.log("~", ~3,~2+ "<>", 1<2>3 ,"==!", 3==!2 ,"!==", 3!==2)      //!==

console.log([] == [])                                                 //false
`.trim();

const logged = `
var a = ['dog', 'cat', 'hen'];
a[100] = 'fox';
console.log(a.length);                                            //101
`.trim();

const addOp = `
console.log(0 && hi)                                              //0
`.trim();

const vals = `
const x = 6 % 2;
const y = x ? 'One' : 'Two';
console.log(y)                                                    //Two
`.trim();

const running = `
function logThis() {
  console.log(this);                                              //window
}
logThis();
`.trim();

const thiscode = `
const foo = [1, 2, 3];
const [n] = foo;
console.log(n);                                                 //1s
`.trim();

const doesCode = `
const arr1 = [2, 4, 6];
const arr2 = [3, 5, 7];

console.log([...arr1, ...arr2]);                               //[2, 4, 6, 3, 5, 7]
`.trim();

const snippet = `
var a = Math.max() < Math.min();
var b = Math.max() > Math.min();
console.log(a)                                                  //true
console.log(b)                                                  //false

console.log(NaN === NaN)                                        //false
console.log(typeof(NaN))                                        //number
console.log(parseInt("123Hello"))                               //123
console.log(parseInt("Hello123"))                               //NaN
`.trim();

const outputs = `
const fun = ({ a, b, c }) => {
  console.log(a, b, c);
 };
 fun(0, 1, 2);                                        //undefined undefined undefined


 //
x = 3;
console.log(x);
var x;


//since the initialization of "x" is not hoisted.
var x;
console.log(x);                                         //undefined
x = 23;
`.trim();

const inside = `
var x = 0;
var y = 23;
        
if(x) { console.log(x) }   // The code inside this block will not run since the value of x is 0(Falsy)  
if(y) { console.log(y) }    // The code inside this block will run since the value of y is 23 (Truthy)
`.trim();

const argu = `
function add(...args){
  console.log(args)
}
add(12)

//2
console.log(typeof typeof 12)
console.log(typeof NaN)
`.trim();

const diffop = `
let arr=[{id:1, name:'Krishana'},{id:2, name:'Ram'}]
    function add(obj,index){
        obj[index].name = obj[index].name
        console.log('obj[index] ', obj[index].name)
        console.log('obj', obj)
    }
add(arr, 1)
console.log('arr', arr)
`.trim();

const actually = `
function fun({a,b,c}){
  console.log(a,b,c)
}
fun(1,2,3)
`.trim();

const frozen = `
let person = {
  name: "Leonardo",
  profession: {
      name: "developer"
  }
};
Object.freeze(person); // make object immutable
person.profession.name = "doctor";
console.log(person);


//With deep freeze
function deepFreeze(object) {
  let propNames = Object.getOwnPropertyNames(object);
  for (let name of propNames) {
      let value = object[name];
      object[name] = value && typeof value === "object" ?
          deepFreeze(value) : value;
  }
  return Object.freeze(object);
}
let person = {
  name: "Leonardo",
  profession: {
      name: "developer"
  }
};
deepFreeze(person);
person.profession.name = "doctor";
`.trim();

const multilines = `
const string = “line1” +
“line2” +
“line3”;

//
const string = “line1 \
line2 \
line3”;
`.trim();

const following = `
const courses = ["JavaScript","Java","C","C++","Python"];
delete courses[2];

console.log(courses);
console.log(courses.length);
`.trim();

const operators = `
function test1(name) {
  var a = name;
  function test2() {
    console.log(this.a);
  }
  test2();
}
test1("John");
`.trim();

const entire = `
console.log(1); 
Promise.resolve().then( 
  console.log(2) 
); 
setTimeout(function () {
 console.log(3) 
}, 10); 
Promise.resolve().then( 
  console.log(4) 
); 
Promise.resolve().then( 
 setTimeout(function () {
    console.log(5) 
  }, 10) 
); 
console.log(6);                                         // 1,6,2,4,5,3
`.trim();

// const diffop = ``.trim();


class FindOutput extends Component {
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
              <b>1.</b>
              <div style={titles}>
                <PrismCode
                  code={deletes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>Above code will output 0 as output. delete operator is used to delete a property from an object. Here x is
                not an object it's local variable. delete operator doesn't affect local variable.</i>
              <br />
              <br />
              <br />

              <b>2.</b>
              <div style={titles}>
                <PrismCode
                  code={objCreate}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li><i>Above code will output xyz as output. Here emp1 object got company as prototype property. delete operator
                  doesn't delete prototype property.</i></li>
                <li><i>emp1 object doesn't have company as its own property.</i></li>
                <br />
                <li><b>console.log(emp1.hasOwnProperty('company')); //false</b></li>
              </ul>
              <br />
              <br />

              <b>3.</b>
              <div style={titles}>
                <PrismCode
                  code={code}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li><i>Since both a and b are defined within the enclosing scope of the function, and since the line they are
                  on begins with the var keyword,</i></li>
                <li><i>But in fact, var a = b = 3;</i></li>
              </ul>
              <br />
              <br />

              <b>4. Consider the two functions below. Will they both return the same thing? Why or why not?</b>
              <div style={titles}>
                <PrismCode
                  code={code_2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <i>As a result, when the line containing the return statement (with
                nothing else on the line) is encountered in foo2(), a semicolon is automatically inserted immediately after
                the return statement.
              </i>
              <br />
              <br />
              <br />

              <b>5. Write a sum method which will work properly when invoked using either syntax below.</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={code_4}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>6. The following recursive code will cause a stack overflow if the array list is too large. How can you fix
                this and still retain the recursive pattern?
              </b>
              <div style={titles}>
                <PrismCode
                  code={code_5}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>The stack overflow is eliminated because the event loop handles the recursion, not the call stack.
                When nextListItem runs, if item is not null, the timeout function (nextListItem) is pushed to the event
                queue and the function exits, thereby leaving the call stack clear. When the event queue runs its timed-out
                event, the next item is processed and a timer is set to again invoke nextListItem. Accordingly, the method
                is processed from start to finish without a direct recursive call, so the call stack remains clear, regardless of
                the number of iterations.</i>
              <br />
              <br />
              <h3>7.</h3>
              <div style={titles}>
                <PrismCode
                  code={code_6}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>Each function executed within the loop will be executed after the entire loop has completed and
                so reference the last value stored in i.<br />
                Closures can be used to prevent this problem by creating a unique scope for each iteration, storing each
                unique value of the variable within its scope, as follows:</i>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={code_8}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>JavaScript will implicitly stringify the parameter value. In this case, since b and c are both objects, they
                will both be converted to "[object object]". As a result, a[b] and a[c] are both equivalent to a["[object
                object]"] and can be used interchangeably. Therefore, referencing a[c] is same as
                referencing a[b].</i>
              <br />
              <br />

              <div style={titles}>
                <PrismCode
                  code={code_9}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8.</h3>
              <div style={titles}>
                <PrismCode
                  code={code_7}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <i>a closure is a function, along with all variables or functions that were in-scope at the time that the closure
                was created. In JavaScript, a closure is implemented as an “inner function”; An important feature of
                closures is that an inner function still has access to the outer function’s variables.
              </i>
              <br />
              <br />

              <h3>9. Accidental global variable</h3>
              <div style={titles}>
                <PrismCode
                  code={accidental}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <ul>
                <li><i>No variable b is declared neither in the foo() scope/ global scope. So JavaScript interprets b = 0 expression as
                  <b>window.b = 0</b>.</i></li>
                <li><i>So, b is a global variable created accidentally.</i></li>
              </ul>

              <h3>10. Array length property</h3>
              Reducing the value of the length property has the side-effect of deleting own array elements whose
              array index is between the old and new length values.
              <div style={titles}>
                <PrismCode
                  code={arrlength}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <ul><li>undefined, because clothes array has been emptied.</li></ul>

              <h3>11. What is the content of numbers array</h3>
              <i>
                for() iterates 4 times over the null statement, ignoring the block that actually pushes items to array.
              </i>
              <div style={titles}>
                <PrismCode
                  code={eyetest}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Clousers</h3>
              <div style={titles}>
                <PrismCode
                  code={clousers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. What happens if you access myVar and myConst before declaration</h3>
              const variables are in a temporal dead zone until the declaration line const myConst = 3.14.
              <div style={titles}>
                <PrismCode
                  code={happense}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14.</h3>
              <ul>
                <li>In the outer function, both this and self refer to myObject and therefore both can properly reference
                  and access foo.</li>
                <li>In the inner function, this no longer refers to myObject. As a result, this.foo is undefined in
                  the inner function, whereas the reference to the local variable self remains in scope and is accessible
                  there.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={code_16}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. How to check if an object is an array or not</h3>
              <ul>
                <li>isArray() method is used to check if an object is an array.</li>
                <li>Array.isArray() method returns true if an object is an array, otherwise returns false.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={CheckArr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>16. Occurence elements in the array</h3>
              <div style={titles}>
                <PrismCode
                  code={commonEl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17. Find unque element in array (hasOwnProperty)</h3>
              <p>
                The hasOwnProperty() is used to check whether the object has the specified property as its
                own property. It returns a boolean value indicating whether the object has the given
                property as its own property.
              </p>
              <div style={titles}>
                <PrismCode
                  code={hasOwnProperty}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. Group Elements</h3>
              <div style={titles}>
                <PrismCode
                  code={groupEl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. Make duplicate elements in an array</h3>
              <div style={titles}>
                <PrismCode
                  code={duplicateEl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Remove a specific item from an array</h3>
              <div style={titles}>
                <PrismCode
                  code={removeEl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. Delete a property from an object</h3>
              <div style={titles}>
                <PrismCode
                  code={deletePro}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>22. Insert an element at specific place in Array</h3>
              <div style={titles}>
                <PrismCode
                  code={specificEl}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>23. Checking if a key exists in a JavaScript object</h3>
              <div style={titles}>
                <PrismCode
                  code={Checking}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24.</h3>
              <div style={titles}>
                <PrismCode
                  code={findOutput}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25.</h3>
              <div style={titles}>
                <PrismCode
                  code={findOutput2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>26.</h3>
              <ul>
                <li>It’s because JavaScript initialization is not hoisted.</li>
                <li>Why doesn’t it show the global value of 21? The reason is that when the function is executed, it
                  checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={findOutput3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>27.</h3>
              <div style={titles}>
                <PrismCode
                  code={findOutput4}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>28.</h3>
              <div style={titles}>
                <PrismCode
                  code={findOutput5}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>29.</h3>
              typeof 1 will return "number" and typeof "number" will return string.
              <div style={titles}>
                <PrismCode
                  code={findOutput6}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>30. Which operator returns true if the two compared values are not equal?</h3>
              <div style={titles}>
                <PrismCode
                  code={operator}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>31. How is a forEach statement different from a for statement?</h3>
              A for statement is generic, but a forEach statement can be used only with an array.
              <br/>

              <h3>32. How does a function create a closure?</h3>
              It returns a reference to a variable in its parent scope.
              <br/>

              <h3>33. Which Object method returns an iterable that can be used to iterate over the properties of an object?</h3>
              Object.keys()
              <br/>

              <h3>34. What will be logged to the console?</h3>
              <div style={titles}>
                <PrismCode
                  code={logged}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>35. Add operator.</h3>
              <div style={titles}>
                <PrismCode
                  code={addOp}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>36. Which variable is an implicit parameter for every function in JavaScript?</h3>
              Arguments
              <br/>

              <h3>37. What will the value of y be in this code:</h3>
              <div style={titles}>
                <PrismCode
                  code={vals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>38. Which keyword is used to create an error?</h3>
              throw
              <br/>

              <h3>39. What is the result in the console of running this code?</h3>
              <div style={titles}>
                <PrismCode
                  code={running}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>40. What will this code log to the console?</h3>
              <div style={titles}>
                <PrismCode
                  code={thiscode}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>41. What does this code do?</h3>
              <div style={titles}>
                <PrismCode
                  code={doesCode}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>42. Upon encountering empty statements, what does the Javascript Interpreter do?</h3>
                Ignores the statements.
              <br/>

              <h3>43. What will be the output of the following code snippet?</h3>
              <div style={titles}>
                <PrismCode
                  code={snippet}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>44. </h3>
              <div style={titles}>
                <PrismCode
                  code={outputs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>45. </h3>
              <div style={titles}>
                <PrismCode
                  code={inside}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>

              <h3>46. </h3>
              <div style={titles}>
                <PrismCode
                  code={argu}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>47. </h3>
              <div style={titles}>
                <PrismCode
                  code={diffop}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>48. Is JavaScript a pass-by-reference or pass-by-value language?</h3>
              It’s always pass by value, but for objects the value of the variable is a reference. Because of this, when you pass 
              an object and change its members, those changes persist outside of the function. This makes it look like pass by 
              reference. But if you actually change the value of the object variable you will see that the change does not 
              persist, proving it’s really pass by value.
              <br/>

              <h3>49. </h3>
              <div style={titles}>
                <PrismCode
                  code={actually}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>50. How to “deep-freeze” object in JavaScript?</h3>
              If you want make sure the object is deep frozen you have to create a recursive function to freeze each property 
              which is of type object.
              <div style={titles}>
                <PrismCode
                  code={frozen}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>51.  Is it possible to write a multi-line string in JavaScript?</h3>
              <ul>
                <li>Using backticks</li>
                <li>Using + operator</li>
                <li>Using \ (backslash)</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={multilines}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>52. </h3>
              <div style={titles}>
                <PrismCode
                  code={following}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>The delete operator does not really affect the entire length of the array as the operates removes only the value 
                which is there at the position. </i>
                <br/>

              <h3>53. </h3>
              <div style={titles}>
                <PrismCode
                  code={operators}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>54. </h3>
              <div style={titles}>
                <PrismCode
                  code={entire}
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

export default (withStyles(styles)(FindOutput));

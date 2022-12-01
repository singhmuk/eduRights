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

const typescriptypes = `
TypeScript Types => Static, Generics, Decorators
Static => Built-in, User-Defined
Built-in Type => Number, String, Boolean, Void, Null
User-Defined Type => Array, Touple, Enum, Class, Interface, Functions
`.trim();

const anotations = `
function typeAnotation(a:number, str:string, isActive:boolean){
  return console.log(a, str, isActive);
}

typeAnotation(1, 'Mukesh', true)
`.trim();

const annotations = `
const drawPoint = (point: {x:number, y:number})=>{
  return console.log(point.x, point.y)
}

drawPoint({x:1, y:2});


// Better way is use interface as
 interface Poiny{
   x:number,
   y:number
 }
`.trim();

const types = `
//1
function add(n1:number,n2:number){
  console.log(typeof n1)
  return console.log(n1+n2);
}

const number1=5;
const number2=10.3;
add(number1,number2);


//2
function add(n1:number,n2:number){
  if(typeof n1 !=='number' || typeof n2 !=='number'){
    throw new Error('Incorrect input')
  }
  return console.log(n1+n2);
}

const number='5';
const number2=10.3;
add(number,number2);


//3
function add(n1:number,n2:number, showResult:boolean,phrase:string){
  if(showResult){
    console.log(phrase,n1+n2)
  }
  else{
    return n1+n2;
  }
}

const number1=5;
const number2=10.3;
const printResult=true;
const resultPhrase='Result is:'

add(number1,number2,printResult,resultPhrase);
`.trim();

const objects = `
// const person: {
//   name:string;
//   id:number;
// }={
  
  const person= {
  name:'Rakesh',
  id:1
}

console.log(person.name)
`.trim();

const arrays = `
const person= {
  name:'Rakesh',
  id:1,
  hobbies:['Sports','Cooking']
}

let favaateActivites:any[];
favaateActivites=['Sports',1]

for(const hobby of person.hobbies){
  console.log(hobby)
}
`.trim();

const anyis = `
let useInput: unknown; 
let userName: string;

useInput=5;
useInput='Mukesh'
if(typeof useInput === 'string'){
  userName= useInput
}


//2
function generateError(message:string, code:number):never {
  throw{message:message, errorCode:code};
}

const result = generateError('An Error Occured',500);
console.log(result)
`.trim();

const tuple = `
const person:{
  name:string;
  id:number;
  hobbies:string[];
  role:[number,string]                                                              // this mark tuple types
}= {
name:'Rakesh',
id:1,
hobbies:['Sports','Cooking'],
role:[2,'Author']
}

person.role.push('admin')
person.role[0]=10;

for(const hobby of person.hobbies){
console.log(hobby)
}
`.trim();

const enumsing = `
enum Color {Red, Green, Blue};
let c: Color;
ColorColor = Color.Green; 
`.trim();

const enums = `
// const ADMIN=0;
// const READ_ONLY=1;
// const AUTHOR=2;

enum Role {ADMIN,READ_ONLY,AUTHOR}
enum Role {ADMIN=5,READ_ONLY,AUTHOR}

const person= {
  name:'Rakesh',
  id:1,
  hobbies:['Sports','Cooking'],
  role:Role.AUTHOR
}

let favaateActivites:any[];
favaateActivites=['Sports']

for(const hobby of person.hobbies){
  console.log(hobby)
}

if(person.role===Role.AUTHOR){
  console.log('Is read only')
}
`.trim();

const functionTypes = `
function add(n1:number, n2:number){
  return console.log(n1+n2);
}

let combineValues:Function;
combineValues=add;
combineValues(1,3)


//2
function add(n1:number, n2:number){
  return n1+n2;
}

let combineValues:(a:number, b:number)=>number;
combineValues=add;
console.log(combineValues(1,3))


//3
function addAndHandle(n1:number, n2:number, cb:(num:number)=>void){
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10,20,(result)=>{
  console.log(result)
})
`.trim();

const anonymous = `
const names = ["Alice", "Bob", "Eve"];

names.forEach((s) => {
  console.log(s.toUpperCase());
});`.trim();

const unions = `
function union(n1:number | string | boolean, n2:number|string){
  const result = n1;
  return  console.log(result);
}

const combine=union(10,30)
combine;


//2
const popStack = (stack: string[]) => {
  if (stack.length) {
    return stack[stack.length-1];                                                 // return type is any
  } else {
    return null;                                                                  // return type is null
  }
};
let toys: string[] = ['Doll', 'Ball', 'Marbles'];
let emptyBin: string[] = [];
let item: string | null = popStack(toys);                                         // item has union type
console.log(item);                                                                // Prints "Marbles"
item = popStack(emptyBin);
console.log(item);                                                                // Prints null


//3
const removeDashes = (id: string | number) => {
  if (typeof id === 'string') {
    id = id.split('-').join('');
    return parseInt(id);
  } else {
    return id;
  }
} 
                                                    
let ids: (number | string)[] = ['93-235-66', '89-528-92'];                        // This is a union of array types
let newIds: (number | string)[] = [];
for (let i=0; i < ids.length; i++) {
  newIds[i] = removeDashes(ids[i]);                                               // Convert string id to number id
}
console.log(newIds); 


//4
// This is a union of string literal types
type RPS = 'rock' | 'paper' | 'scissors' ;
const play = (choice: RPS): void => {
  console.log('You: ', choice);
  let result: string = '';
  switch (choice) {
    case 'rock':
      result = 'paper';
      break;
    case 'paper':
      result = 'scissors';
      break;
    case 'scissors':
      result = 'rock';
      break;
  }
  console.log('Me: ', result);
}
const number = Math.floor(Math.random()*3);
let choices: [RPS, RPS, RPS] = ['rock', 'paper', 'scissors'];
play(choices[number]);  
`.trim();

const voids = `
function add(n1:number, n2:number){
  const result = n1;
  return result;
}

function printResult(num:number):void {
  console.log('Result', num)
}

console.log(printResult(add(10,30)))                                                    //get undefined
`.trim();

const clicks = `
const button = document.querySelector('button');

if(button){
  button.addEventListener('click', ()=>{
    console.log('Clicked')
  })
}


//2
const button = document.querySelector('button');

function clickHandler(message: string){
  console.log('Clicked', message)
}

if(button){
  button.addEventListener('click',clickHandler.bind(null, "You welcome"))
}
`.trim();

const omitted = `
function greet(name:string, greeting:string='Ritesh'):string{
  return greeting
}

console.log(greet('Rakesh'))
`.trim();

const generics = `
function show<T>(args:T):T{
  return args;
}

var output=show<string>("String")
var output2=show<number>(1)

console.log(output);
console.log(output2);
`.trim();

const funs = `
//Tuple:
let empTuple = ["JavaTpoint", 101, "Abhishek"];
function display(tuple_values:any[]) {
   for(let i = 0;i<empTuple.length;i++) {
      console.log(empTuple[i]);
   }
}

display(empTuple);


//Union:
function display(value: (number | string)) {
    if(typeof(value) === "number")
        console.log(value);
    else if(typeof(value) === "string")
        console.log(value);
}

display(123);
display("ABC");`.trim();

const parameters = `
function greet(name:string, greeting?:string){
  return console.log(name, greeting)
}

greet('Rakesh')


//2
function printName(obj: {first: string; last?: string}) {
  if (obj.last !== undefined) {
    console.log(obj.last.toUpperCase());
  }

  console.log(obj.last?.toUpperCase());
}

printName({ first: "Bob" });
printName({first: "Alice", last: "Alisson"})
`.trim();

const resting = `

function greet(name:string, ...greeting:string[]){
  return console.log(name, greeting)
}

greet('Rakesh','Mukesh','John','Ritesh','Nitesh','God')
`.trim();


class Datatypests extends Component {
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
              <h3>1. What is TypeScript?</h3>
              <ul>
                <li>TypeScript is superset of js.</li>
                <br />
                <li>
                  It's an open-source pure object-oriented programing language(means support such as classes, interface, inheritance, generics, etc).
                  it is a strongly typed suerset of js which compiles to plain js. It contains all of elements of js. It's a language designed for large-scale
                  js application development, which can be executed on any browser, any Host. TypeScript is the ES6 version of js
                  with some additionam features.
                </li>
                <br />
                <b>Why use TypeScript.</b>
                <br />
                <li>TypeScript supports Static typing, Strongly type, Modules, Optional Parameters, etc.</li>
                <li>It supports OOPS programing features such as classes, inheritance, etc.</li>
                <li>It fast, simple.</li>
                <li>It provides the error-checking feature at compilation time. It will compiles the code, and if any error
                  found, then it highlighten the mistakes before the script is run.</li>
                <br />
                <b>Advantages of TypeScript over js</b>
                <br />
                <li>TypeScript always highlights errors at compilation time, whereas js points out at the runtime.</li>
                <li>It has a namespace concept by defining a module.</li>
                <br />
                <p>
                  Small set of primitive types available in JavaScript: <br />
                  <b>boolean, bigint, null, number, string, symbol, and undefined,</b> which can use in an interface.
                  <br />
                  <br />
                  TypeScript extends this list with a few more, such as :
                  <ul>
                    <li><b>any: </b>allow anything.</li>
                    <li><b>unknown: </b>ensure someone using this type declares what the type is.</li>
                    <li><b>never: </b>it’s not possible that this type could happen.</li>
                  </ul>
                </p>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={typescriptypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <div style={titles}>
                <PrismCode
                  code={types}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. TypeScript Annotation</h3>
              <li>type annotation means declared data types during varriable initializtion.</li>
              <li>Js is not a typed language. It means we can't specify the type of a variable.
                However, TypeScript is a typed language, where we can specify the type of the variables, function Parameters and object properties.
              </li>
              <div style={titles}>
                <PrismCode
                  code={anotations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Inline annotation</b>
              <div style={titles}>
                <PrismCode
                  code={annotations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Object</h3>
              <div style={titles}>
                <PrismCode
                  code={objects}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Arrays</h3>
              <div style={titles}>
                <PrismCode
                  code={arrays}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. Any</h3>
              <ul>
                <li>unknown is less similar to any.</li>
                <li>never type return anything.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={anyis}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Tuple</h3>
              <ul><li>Fixed length array and fixed data type</li></ul>
              <div style={titles}>
                <PrismCode
                  code={tuple}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Enum</h3>
              Enums allows for describing a value which could be one of a set of possible named constants.

              <div style={titles}>
                <PrismCode
                  code={enumsing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={enums}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Function Type</h3>
              <div style={titles}>
                <PrismCode
                  code={functionTypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Anonymous Functions</h3>
              <div style={titles}>
                <PrismCode
                  code={anonymous}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. Composing Types:</h3>
              With TypeScript, can create complex types by combining simple ones. There are two popular ways to do so:
              <ul>
                <li><b>Unions: </b>Can declare that a type could be one of many types.</li>
                <li>Generics</li>
              </ul>
              <br />
              <b>1. Union</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={unions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>2. Generic</b>
              <br />
              <ul>
                <li>
                  Generics provide variables to types. <b>Ex.</b> An array without generics could contain anything. An array
                  with generics can describe the values that the array contains.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={generics}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>Tuple And Union</b>
              <div style={titles}>
                <PrismCode
                  code={funs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Void</h3>
              <ul>
                <li>Void means, function doesn't return anything. It's used where no data type is accessible.</li>
                <li>A variable of type void is not useful because we can only assign undefined or null to them.</li>
                <li>An undefined data type denotes uninitialized variable, whereas null represents a variable whose value is undefined.</li>
                <br />
                <b>Any Type</b>
                <li>
                  It's the 'super type' of all data type in TypeScript. It's used to represents any js value. It allows us to opt-in and opt-out of
                  type-checking during compilation. If a variable cannot be represented in any of the basic data types, then it can be declared using
                  "Any" data type. Any type is useful when we do not know about the type of value(which might come from an API), and we want to skip the
                  type-checking on compile time.
                </li>
                <br />
              </ul>
              <div style={titles}>
                <PrismCode
                  code={voids}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Click</h3>
              <div style={titles}>
                <PrismCode
                  code={clicks}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Default Parameters</h3>
              <ul>
                <li>
                  TypeScript provides the Option to add default values to Parameters. So, if the user does not provide a value to an argument, TypeScript
                  will initialize the Parameter with the default value. Default Parameters have the same behaviour as Optional Parameters. If a value is not passed for the default Parameters in a function call, the default Parameter must follow the required Parameters in
                  the function signature. Hence, default Parameters can be omitted while calling a function. However, if a function signature has a default Parameter before a required Parameter, the function can still be called, provided the default Parameter is
                  passed a value of undefined.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={omitted}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. Optional Parameter</h3>
              <ul>
                <li>The parameters that may or may not receive a value can be appended with a '?' to mark then as optional.</li>
                <li>All optional parameters must follow required parameters and should be at the end.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={parameters}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>15. Rest Parameter</h3>
              <div style={titles}>
                <PrismCode
                  code={resting}
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

export default (withStyles(styles)(Datatypests));

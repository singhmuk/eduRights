import React, { Component } from "react";
import Prism from "prismjs";
import { Grid, Paper, withStyles, List } from "@material-ui/core";

import "../../ReactJs/styles.css";
import Sidebar from "../sidebar";
import PrismCode from "../../ReactJs/prismCode";

const titles = { backgroundColor: "#F0F8FF", padding: "1px", fontSize: "16px" };

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

const dataType = `
enum Color { Red, Green, Blue };

const newColor = Color.Green;
console.log(newColor)
`.trim();

const chainingnull = `
const myObj = {
  prop1: {
    prop2: 'Hello'
  }
}

console.log(myObj?.prop1?.prop2); // Output: "Hello"
console.log(myObj?.prop3?.prop4); // Output: undefined
`.trim();

const chainingnull2 = `
const myValue = null ?? 'Default value';

console.log(myValue); // Output: "Default value"
`.trim();

const types = `
function add(n1:number, n2:number){
    const sum=n1+n2;
    if(typeof n1 !== 'number' && typeof n2 !=='number'){
        return new Error('Incorrect Input');
    }

    return console.log(sum);
}

add(2,3);
`.trim();

const arraytypes = `
const myArr: number[] = [12, 90, 71];
const myArr: Array<number> = [12, 90, 71];
const myArr: Array<any> = [12, 'thirteen', false];


`.trim();

const tupplestypes = `
let arr: [number, string];
arr = [121, 'bacon'];
arr = [121, 'Dave', 'Steve'];            //wrong


//2
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

const enumtypes = `
enum Direction { Up = 1,  Down,  Left,  Right }  
console.log(Direction);  
`.trim();

const enumtypes2 = `
enum AppStatus {  ACTIVE = 'ACT', INACTIVE = 'INACT', ONHOLD = 'HLD', ONSTOP = 'STOP' }  

function checkStatus(status: AppStatus): void {  
  console.log(status);  
}  

checkStatus(AppStatus.ONSTOP);  
`.trim();

const enumtypes3 = `
enum AppStatus { ACTIVE = 'Yes', INACTIVE = 1, ONHOLD = 2, ONSTOP = 'STOP' }  
console.log(AppStatus.ACTIVE);  
console.log(AppStatus.ONHOLD);  
`.trim();

const alias = `
type num = number;
type str = string;
type Car = { year: num, type: str };

const num: num = 2001
const str: str = "Toyota"

const car: Car = {
  year: num,
  type: str
};

console.log(car);
`.trim();

const anyis = `
let user: unknown; 
let userName: string;

user=5;
user='Mukesh'
if(typeof user === 'string'){
  userName = user
}
`.trim();

const castings = `
//Casting with as
let x: unknown = 'hello';
console.log((x as string).length);


//Casting with <>
let x: unknown = 'hello';
console.log((<string>x).length);
`.trim();

const utilitytypes = `
//Partial
interface Point {
  num: number;
}
            
let pointPart: Partial<Point> = {}; 
pointPart.num = 10;

console.log(pointPart);


//Required
interface Point {
  num: number;
  num2?: number;
  model: string;
}
            
let pointPart: Required<Point> = {
  num: 1,
  num2: 10,
  model: 'Focus'
}; 

console.log(pointPart);


//Record
let pointPart: Record<string, number> = {     //Record<string, number> is equivalent to { [key: string]: number }
  'num': 1,
  'num2': 10,
}; 

console.log(pointPart);


//Omit
interface Point {
  num: number;
  model: string;
  location?: string;
}
            
let pointPart: Omit<Point, 'num' | 'location'> = {
  model: 'Focus'
}; 

console.log(pointPart);


//Pick
interface Point {
  num: number;
  model: string;
  location?: string;
}
            
let pointPart: Pick<Point, 'model'> = {
  model: 'Focus'
}; 

console.log(pointPart);


//Exclude
type Primitive = string | number | boolean;

const value: Exclude<Primitive, string> = true;
console.log(typeof value);


//ReturnType
type PointGenerator = () => { x: number; y: number; };
const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20
};


//Parameters
type PointPrinter = (p: { x: number; y: number; }) => void;
const point: Parameters<PointPrinter>[0] = {
  x: 10,
  y: 20
};
`.trim();

const unions = `
function union(n1:number | string | boolean, n2:number|string){
  const result = n1;
  return  console.log(result);
}

const combine=union(10,30)
combine;
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

const assertion = `
1.Using Angular Bracket <>
let empCode: any = 111;
let employeeCode = <number> empCode;
console.log(typeof(employeeCode));

2.Using as keyword
let empCode: any = 111;
let employeeCode = empCode as number;
console.log(typeof(employeeCode));
`.trim();

const modifier = `
//Public
class Student {  
    public studCode: number;  
    studName: string;  
}  
  
let stud = new Student();  
stud.studCode = 101;  
stud.studName = "Joe Root";  
  
console.log(stud.studCode+ " "+stud.studName);  


//Private
class Student {  
public studCode: number;  
private studName: string;  

constructor(code: number, name: string){  
this.studCode = code;  
this.studName = name;  
}  

public display() {  
return ('My unique code: '$'{this.studCode}, my name: '$'{this.studName}.');  
    }  
}  
  
let student: Student = new Student(1, "JoeRoot");  
console.log(student.display());  


//Protected
class Student {  
    public studCode: number;  
    protected studName: string;  
    constructor(code: number, name: string){  
        this.studCode = code;  
        this.studName = name;  
        }  
}  
class Person extends Student {  
    private department: string;  
  
    constructor(code: number, name: string, department: string) {  
        super(code, name);  
        this.department = department;  
    }  
    public getElevatorPitch() {  
        return ('My unique code: '$'{this.studCode}, my name: '$'{this.studName} 
        and I am in '$'{this.department} Branch.');
    }
}
let joeRoot: Person = new Person(1, "JoeRoot", "CS");
console.log(joeRoot.getElevatorPitch());`.trim();

class Datatypests extends Component {
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
              <h3>1. What is TypeScript?</h3>
              <ul>
                <li>TypeScript is a programming language that builds on top of JavaScript, which is widely used for web development. It adds additional features to JavaScript to help developers catch errors and write more maintainable code.</li><br/>
                <li>TypeScript is superset of js.</li><br/>
                <li>
                TypeScript provides a way to add "types" to your JavaScript code. Types are like labels that describe the kind of data a variable or function expects or returns. 
                </li>
                <br />
                <li>
                  The main difference between TypeScript and JavaScript is that
                  TypeScript adds type annotations, which allow developers to
                  catch errors at compile-time instead of at runtime.{" "}
                </li>

                <p>
                  TypeScript extends this list with a few more, such as :
                  <ul>
                    <li>
                      <b>any: </b>allow anything.
                    </li>
                    <li>
                      <b>unknown: </b>ensure someone using this type declares
                      what the type is.
                    </li>
                    <li>
                      <b>never: </b>it’s not possible that this type could
                      happen.
                    </li>
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
              <br />
              <h3>
                What is a class in TypeScript, and how is it different from a
                class in JavaScript?
              </h3>
              In TypeScript, a class is a blueprint for creating objects that
              encapsulates data and behavior. It is similar to a class in
              JavaScript, but with some additional features such as access
              modifiers, abstract classes, interfaces, and static properties and
              methods.
              <br />
              <br />
              <h3>2. Static Types</h3>
              static types mean "at compile time".
              <br />
              Static types can be further divided into two sub-categories:
              <br />
              <b>1. Built-in or Primitive Type: </b>
              Number, String, Boolean, Void, Null.
              <br />
              <br />
              <b>2. User-Defined DataType: </b>
              Array, Touple, Enum, Functions, Class, Interface.
              <ul>
                <li>
                  <b>Touple: </b>Tuple is a data type which includes two sets of
                  values of different data types.
                </li>
                <li>
                  <b>Interface: </b>It cannot be instantiated but can be
                  referenced by the class which implements it.
                </li>
                <li>
                  <b>Enums: </b>Define a set of named constant. TypeScript
                  provides both string-based and numeric-based enums. By
                  default, enums begin numbering their elements starting from 0,
                  but we can also change this by manually setting the value to
                  one of its elements.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={dataType}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>1. Type assertion</h3>
              Type assertion is a technique that informs the compiler about the
              type of a variable.
              <br />
              <b>TypeScript provides two ways to do Type Assertion.</b>
              <div style={titles}>
                <PrismCode
                  code={assertion}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>2. Access Modifier</h3>
              <ul>
                <li>
                  <b>Public: </b>We can access this data member anywhere without
                  any restriction.
                </li>
                <li>
                  <b>Private: </b>It ensures that the class members are visible
                  only to that class in which it is containing.
                </li>
                <li>
                  <b>Protected: </b>A Protected access modifier can be accessed
                  only within the class and its subclass. We cannot access it
                  from the outside of a class in which it is containing.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={modifier}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>
                How do you handle null and undefined values in TypeScript?
              </h3>
              To handle null and undefined values in TypeScript, you can use
              optional chaining and nullish coalescing operators.
              <br />
              <br />
              Optional chaining is a way to safely access properties or methods
              of an object without throwing an error if the object is null or
              undefined. It is denoted by the question mark symbol "?."
              <div style={titles}>
                <PrismCode
                  code={chainingnull}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              Nullish coalescing is an operator that returns the value on its
              left-hand side if it is not null or undefined; otherwise, it
              returns the value on its right-hand side. It is denoted by two
              question marks "??".
              <div style={titles}>
                <PrismCode
                  code={chainingnull2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <h3>Number</h3>
              <div style={titles}>
                <PrismCode
                  code={types}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Array</h3>
              <div style={titles}>
                <PrismCode
                  code={arraytypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Tuples</h3>
              <ul>
                <li>
                  Arrays with a fixed datatype and fixed number of elements.
                </li>
                <li>
                  It is possible to reassign the value of the indices but not
                  the amount of elements in the tuple.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={tupplestypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>Enum</h3>
              Enums represents a group of constants (unchangeable variables).
              <br />
              <b>There are three types of enums: </b>
              <ul>
                <li>Numeric enum</li>
                <li>String enum</li>
                <li>Heterogeneous enum</li>
              </ul>
              <br />
              <ul>
                <li>It makes it easy to change values in the future.</li>
                <li>
                  It reduces errors which are caused by transporting or
                  mistyping a number.
                </li>
                <li>
                  It exists only during compilation time, so it does not
                  allocate memory.
                </li>
                <li>
                  It saves runtime and compile-time with inline code in
                  JavaScript.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={enumtypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              Here, we initialize Up with 1, and all of the following members
              are auto-incremented from that point.
              <br />
              <br />
              <b>String Enums: </b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={enumtypes2}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>Heterogeneous Enums: </b>
              <div style={titles}>
                <PrismCode
                  code={enumtypes3}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>3. TypeScript Annotation</h3>
              <li>
                type annotation means declared data types during varriable
                initializtion.
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
              <h3>4. Type Alias</h3>
              Type Aliases allow defining types with a custom name.
              <div style={titles}>
                <PrismCode
                  code={alias}
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
              <h3>6. Casting</h3>
              Casting is the process of overriding a type.
              <div style={titles}>
                <PrismCode
                  code={castings}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>7. Utility Types</h3>
              TypeScript comes with a large number of types that help with some
              common type manipulation.
              <ul>
                <li>
                  <b>Partial: </b>changes all the properties in an object to be
                  optional.
                </li>
                <li>
                  <b>Required: </b>changes all the properties in an object to be
                  required.
                </li>
                <li>
                  <b>Record: </b>is a shortcut to defining an object type with a
                  specific key type and value type.
                </li>
                <li>
                  <b>Omit: </b>removes keys from an object type.
                </li>
                <li>
                  <b>Pick: </b>removes all but the specified keys from an object
                  type.
                </li>
                <li>
                  <b>Exclude: </b>removes types from a union.
                </li>
                <li>
                  <b>ReturnType: </b>extracts the return type of a function
                  type.
                </li>
                <li>
                  <b>Parameters: </b>extracts the parameter types of a function
                  type as an array.
                </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={utilitytypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>keyof</h3>
              keyof is used to extract the key type from an object type.
              <ul>
                <li>
                  When used on an object type with explicit keys, keyof creates
                  a union type with those keys.
                </li>
                <li>
                  keyof can also be used with index signatures to extract the
                  index type.
                </li>
              </ul>
              <br />
              <h3>10. Composing Types:</h3>
              With TypeScript, can create complex types by combining simple
              ones. There are two popular ways to do so:
              <ul>
                <li>
                  <b>Unions: </b>Can declare that a type could be one of many
                  types.
                </li>
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
                  Generics in TypeScript are a way to create flexible and
                  reusable code that can work with different types of data. With
                  generics, we can define a type or interface that works with
                  different types of data, without having to specify the exact
                  type until the code is actually used.
                </li>
                <br />
                <br />
                To use generics, we define a type or interface with a
                placeholder type parameter that can be replaced with a specific
                type when the code is used.
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
                <li>
                  Void means, function doesn't return anything. It's used where
                  no data type is accessible.
                </li>
                <li>
                  A variable of type void is not useful because we can only
                  assign undefined or null to them.
                </li>
                <li>
                  An undefined data type denotes uninitialized variable, whereas
                  null represents a variable whose value is undefined.
                </li>
                <br />
                <b>Any Type</b>
                <li>
                  It's the 'super type' of all data type in TypeScript. It's
                  used to represents any js value. It allows us to opt-in and
                  opt-out of type-checking during compilation. If a variable
                  cannot be represented in any of the basic data types, then it
                  can be declared using "Any" data type. Any type is useful when
                  we do not know about the type of value(which might come from
                  an API), and we want to skip the type-checking on compile
                  time.
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
            </List>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Datatypests);

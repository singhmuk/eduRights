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


const assertion = `
1.Using Angular Bracket <>
let empCode: any = 111;
let employeeCode = <number> empCode;
console.log(typeof(employeeCode));

2.Using as keyword
let empCode: any = 111;
let employeeCode = empCode as number;
console.log(typeof(employeeCode));


//2
let arr:string[] = new Array("JavaTpoint", "2300", "Java", "Abhishek");
function display(arr_values:string[]) {
   for(let i = 0;i<arr_values.length;i++) {
      console.log(arr[i]);
   }
}

display(arr); `.trim();


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

const accessor = `
//getter
class MyDrawing {
    length: number = 20;
    breadth: number = 15;

    get rectangle() {
        return this.length * this.breadth;
    }
}
console.log(new MyDrawing().rectangle);


//setter
let passcode = "secret passcode";

class Student {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Unauthorized update of student detail!");
        }
    }
}

let stud = new Student();
stud.fullName = "Virat Kohli";
if (stud.fullName) {
    console.log(stud.fullName);
}`.trim();

const decoratorstypes = `
function logger(constructor: Function){
  console.log('Loggin')
}

@logger
class Person{
  name="Krishana";
  constructor(){
    console.log('Calling Decorator')
  }
}

const obj = new Person();
obj; 
`.trim();

const prodecoratrs = `

`.trim();

const sortArr = `
class App{
  arr:any;
  i:number;
  j:number;
  temp:any;

  sortValue(){
      for(this.i=0;this.i<this.arr.length;this.i++){
          for(this.j=this.i;this.j<this.arr.length;this.j++){
              if(this.arr[this.i]>this.arr[this.j]){
                  this.temp=this.arr[this.i];
                  this.arr[this.i]=this.arr[this.j];
                  this.arr[this.j]=this.temp;
              }
          }
      }
      console.log(this.arr)
  }
}


const obj=new App();
obj.arr=[5,3,1,9,0];
obj.sortValue();
`.trim();

const missingVal = `
class App{
  i:number;
  arr:any=[0,1,3];
  result:number=0;
  exactSum:number;
  missingNum:number;

  getSum(){
      this.exactSum = this.arr.reduce((a,b)=>a+b);
      
      for(this.i=0; this.i<=this.arr.length; this.i++){
          this.result += this.i;
      }

      this.missingNum = this.result - this.exactSum;
      console.log(this.missingNum);
  }
}

const obj=new App();
obj.getSum();
`.trim();

const palindroms = `
class App{
  str:string='madam';
  str2:string='';
  i=0;

  getSum(){
      for(this.i=this.str.length-1; this.i>=0; this.i--){
          this.str2 += this.str[this.i];
      }

      if(this.str !== this.str2){
          console.log('Not Palindrom', this.str2);
      } else{
          console.log('Palindrom', this.str2);
      }
      
  }
}

const obj=new App();
obj.getSum();
`.trim();

const duplicates = `
class App{
  i=0;
  j=0;
  array = [1,2,3,4,3,0,9,0,1];
  result:any=[];
  count:number;

  getSum(){
      for(this.i=0; this.i<=this.array.length; this.i++){
          this.count=0;
          for(this.j=0; this.j<=this.result.length; this.j++){
              if(this.array[this.i]==this.result[this.j]){
                  this.count +=1;
              }
          }

          if(this.count==0){
              this.result.push(this.array[this.i]);
          }
      }
      console.log(this.result);
  }
}

const obj=new App();
obj.getSum();
`.trim();


class TypeScript4 extends Component {
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
              <h3>1. Type assertion</h3>
              Type assertion is a technique that informs the compiler about the type of a variable. 
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
                <li><b>Public: </b>We can access this data member anywhere without any restriction.</li>
                <li><b>Private: </b>It ensures that the class members are visible only to that class in which it is containing.</li>
                <li><b>Protected: </b>A Protected access modifier can be accessed only within the class and its subclass. We cannot access it
                  from the outside of a class in which it is containing.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={modifier}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. TypeScript Accessor</h3>
              <div style={titles}>
                <PrismCode
                  code={accessor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Decorator</h3>
              Decorators extends the functionality of classes & methods.
              <br/>
              <br/>
              <b>There are five ways to use decorators </b>
              <ul>
                <li>class declaration</li>
                <li>property</li>
                <li>method</li>
                <li>parameter</li>
                <li>accessor</li>
              </ul>
              <br/>
              <b/>
              <b>Class Decorator: </b>
              A class decorator makes it possible to intercept the constructor of class. They are called when the class is 
              declared, not when a new instance is instantiated.
              <br/>
              When a class is decorated decendents will not inherit the 
              decorators. Let’s freeze the class to prevent inheritence completely.
              <div style={titles}>
                <PrismCode
                  code={decoratorstypes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. SortArr</h3>
              <div style={titles}>
                <PrismCode
                  code={sortArr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. MissingVal</h3>
              <div style={titles}>
                <PrismCode
                  code={missingVal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Palindroms</h3>
              <div style={titles}>
                <PrismCode
                  code={palindroms}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Remove Duplicates</h3>
              <div style={titles}>
                <PrismCode
                  code={duplicates}
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

export default (withStyles(styles)(TypeScript4));

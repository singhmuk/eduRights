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

const thisKey = `function bike() {
    console.log(this.name);
}

var name = "Ninja";
var obj1 = { name: "Pulsar", bike: bike };

bike();
obj1.bike();
`.trim();

const thisBind = `
function bike() {
  console.log(this.name);
 }

  var name = "Ninja";
  var obj = { name: "Pulsar" }
  
  bike.call(obj);`.trim();

const bind_2 = `
 //Bind in constructor
class Student {
  constructor(fname, lname){
    this.fname = fname;
    this.lname = lname;
		
    this.sayName = this.sayName.bind(this)
  }

  sayName(){
    console.log(this.firstName)
  }
}

var muk = new Student('Muk', "Sin");
var greetStu = muk.sayName;
greetStu();



//2
var names = {
    fname:'Ritesh',
    lname:"Singh"
  }

  let fullName = function(hometown, state){
  return console.log(this.fname,"---",this.lname,"---",hometown,"---",state)
}


var names2 = {
    fname:'Nitesh',
    lname:'Singh'
  }

  let printName = fullName.bind(names2, "Ranchi", "Jharkhand");
  console.log(printName);
  printName(); `.trim()

const default_this = `
var obj = { 
  name : "ABC", 
  printFunc: function(){ 
    return this.name;
    } 
  } 
       
var objs = obj.printFunc();

export { objs }`.trim()

const not_call = `
  var obj = { 
  name : "ABC", 
  printFunc: function(){ 
     document.write(this.name);} 
     } 
       
    var printFunc2= obj.printFunc; 
    printFunc2();`.trim()

const this_bind = `
  var obj = { 
  name : "ABC", 
  printFunc: function(){ 
     document.write(this.name);} 
     } 
       
    var printFunc2= obj.printFunc.bind(obj); 
    printFunc2();`.trim()


const calls = `
    //1
    function foo(arg1, arg2){
      console.log(this.name)
      console.log(arg1)
      console.log(arg2)
    }
    
    foo.call({name:'Nitesh'}, "ReactJs", "AngularJs");
    
    
    //In call method after assign to varriable than this value lost its binding.
    
    var student = {
      name:"Js",
      jsMethod: function(){
        console.log(this.name)
      }
    }
    
    var greetStu = student.jsMethod;
    greetStu();	
    
    
    //But with bind method we can use this value.
    //In BInd we only set context of this.
    
    //2
    var student = {
      name:"Js",
      jsMethod: function(){
        console.log(this.name)
      }
    }
    
    var greetStu = student.jsMethod.bind({ name:'Hi' });
    greetStu();	
    
    
    //3
    var names = {
      fname:'Ritesh',
      lname:"Singh"
    }
    
    let fullName = function(hometown, state){
      return console.log(this.fname,"---",this.lname,"---",hometown,"---",state)
    }
    
    fullName.apply(names, ["Ranchi", "Jharkhand"]);
    
    
    var names2 = {
      fname:'Nitesh',
      lname:'Singh'
    }
    
    fullName.apply(names2, ["Ranchi"]);
    `.trim();

const applys = `
function foo(arg1, arg2){
  console.log(this.name)
  console.log(arg1)
  console.log(arg2)
}

foo.apply({name:'Nitesh'}, ["ReactJs", "AngularJs"]);

`.trim();


const borrowing = `
var names = {
    fname:'Ritesh',
    lname:"Singh",
    fullName:function(){
      return console.log(this.fname,"---",this.lname)
    }
  }

var names2 = {
    fname:'Nitesh',
    lname:'Singh'
  }

//function borrowing
names.fullName.call(names2);


//2
var names = {
    fname:'Ritesh',
    lname:"Singh"
  }

let fullName = function(hometown, state){
  return console.log(this.fname,"---",this.lname,"---",hometown,"---",state)
}

fullName.call(names, "Ranchi", "Jharkhand");


var names2 = {
    fname:'Nitesh',
    lname:'Singh'
  }

fullName.call(names2, "Ranchi");
`.trim();


class Methods extends Component {
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
              <h3>1.What is 'this' keyword in JavaScript?</h3>
              <ul>
                <li>this keyword refers to an object, that object which is executing the current bit of javascript code.</li>
                <li>To understand this keyword, only we need to know how, when and from where the function is called,
                  does not matter how and where function is declared/ defined.
                </li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={thisKey}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>The job of bike() function is printing the this.name .
                In case of obj1().bike(), “Pulsar” gets printed and the reason behind this is
                function bike() gets called with the execution context
                as obj1 so this.name became obj1.name.</i>
              <br />
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

              <h3>2.bind()</h3>
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
              <br />

              <b>program to print the name which is called by this keyword.</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={default_this}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>this keyword bind the name variable to the function. It is known as default binding.</i>
              <br />
              <br />

              <b>No output is produced</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={not_call}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Here we made a new variable function printFunc2 which refers to the function
                printFunc() of object geeks. Here the binding of this is lost, so no output is
                produced.</i>
              <br />
              <br />
              To make sure that any binding of this is not to be lost, we are using Bind() method.
              By using bind() method we can set the context of this to a particular object. So we can use
              other variables also to call binded function.
              <div style={titles}>
                <PrismCode
                  code={this_bind}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>The bind() method creates a new function where this keyword refers to the parameter
                in the parenthesis in the above case obj. This way the bind() method enables calling a
                function with a specified this value.</i>
              <br />

              <h3>3. call(), apply()</h3>
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

              <h3>4. Borrowing</h3>
              <div style={titles}>
                <PrismCode
                  code={borrowing}
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

export default (withStyles(styles)(Methods));

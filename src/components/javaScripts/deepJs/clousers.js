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

const lexicalScop = `
function init() {
  var name = 'Mozilla'; 
  function displayName() { 
    alert(name); 
  }
  displayName();
}
init();`.trim();

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

const closers = `
function z(){
  var b =900;
  function x(){
    var a = 7; 
    function y(){
      console.log(a, b);
    }
    y();
  }
  x();
}
z();`.trim();

const scopeChain = `
//anonymous functions
var e = 10;       // global scope
function sum(a){
  return function(b){
    return function(c){
            // outer functions scope
      return function(d){
            // local scope
        return a + b + c + d + e;
      }
    }
  }
}

console.log(sum(1)(2)(3)(4))


//2
var e = 10;
function sum(a){
  return function sum2(b){
    return function sum3(c){
      return function sum4(d){
        return a + b + c + d + e;
      }
    }
  }
}

var s = sum(1);
var s1 = s(2);
var s2 = s1(3);
var s3 = s2(4);
console.log(s3)

`.trim();


const closersSet = `
function x(){
  for(var i=0; i<=5; i++){
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
`.trim();

const consoles = `
console.error('This is an error');
console.warn('This is warning');
console.dir(document);
console.table([{name:'Mukesh', eamail:'mukesh@gmail.com', age:27}]);
console.clear();`.trim();

const groups = `
console.group('start group');
console.log('one');
console.log('two');
console.log('three');
console.groupEnd('end group');
    
    
//Time
console.time('start time');
  for(let i=0; i<=10; i++){
    console.log(i);
  }
console.timeEnd('end loop');`.trim();

const applications = `
localStorage.setItem("name","Ritesh");
console.log(localStorage.getItem("name"));
localStorage.clear("name");

sessionStorage.setItem("name","Mukesh"); 
console.log(localStorage.getItem("name"));
console.clear("name");

document.cookie = "username=nitesh";
document.cookie;


//
var a = new Date();
a = new Date(a.getTime()+ 1*60*60*1*1);
document.cookie = 'name=mukesh; expires' +a.toGMTString()+';';
`.trim();

const dateObj = `
//1
function dateObj(){
  let time;
  time = new Date().toLocaleString();
  
  return time;
}


//2
5 numbers specify year, month, day, hour, and minute.
2 numbers specify year and month.

function dateObj() {
  let a,b, c
  a = Date()
  b = Date(2018, 11, 24, 10, 33, 30);
  c = Date(2018, 11);
  
  return [a,"---",b,"---",c];
}`.trim();

const current_time_data = `
var checkoutDate = new Date();
console.log(checkoutDate);

checkoutDate.setDate(checkoutDate.getDate() + 1);
console.log(checkoutDate);`.trim();


const Time_Zone = `
function formatDate(dayOfWeek, day, month, year) {
    var daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      return daysOfWeek[dayOfWeek] + " " + months [month] + " " + day + " " + year;
   }
   
  var birthday = new Date(Date.UTC(2000,0,1));
  console.log("Foo was born on: " + formatDate(
               birthday.getUTCDay(), birthday.getUTCDate(),
                birthday.getUTCMonth(), birthday.getUTCFullYear()));
 `.trim();

class Clousers extends Component {
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
              <h3>1. What are closures? Explain with example.</h3>
              <ul>
                <li>A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).</li>
                <li>Or a closure gives access to an outer function’s scope from an inner function.</li>
                <li>In JavaScript, closures are created every time a function is created, at function creation time.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={lexicalScop}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <i>Note that the displayName() function has no local variables of its own. However, since inner functions have
                access to the variables of outer functions, displayName() can access the variable name declared in the parent
                function, init().</i>
              <br />
              <ul>
                <li>
                  Closures are important because they control what is and isn’t in scope in a particular function, along with
                  which variables are shared between sibling functions in the same containing scope.
                </li>
                <br />
                <li>
                  To use a closure, define a function inside another function and expose it. To expose a function, return it
                  or pass it to another function. The inner function will have access to the variables in the outer function
                  scope, even after the outer function has returned.
                </li>
              </ul>
              <br />
              A function can also access variables defined outside the function, like this.

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

              <div style={titles}>
                <PrismCode
                  code={closers}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              This is closure in action that is inner function can have access to the outer function variables as well as
              all the global variables.
              <br />

              <h3>2. Closure Scope Chain</h3>
              Every closure has three scopes:
              <ul>
                <li>Local Scope (Own scope)</li>
                <li>Outer Functions Scope</li>
                <li>Global Scope</li>
              </ul>
              <br />
              In the case where the outer function is itself a nested function, access to the outer function's scope includes the
              enclosing scope of the outer function—effectively creating a chain of function scopes.
              <br />
              <div style={titles}>
                <PrismCode
                  code={scopeChain}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>there's a series of nested functions, all of which have access to the outer functions' scope. In this context, we
                can say that closures have access to all outer function scopes.</i>
              <br />
              <br />

              <b>Closers + setTimeout</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={closersSet}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Console</h3>
              <div style={titles}>
                <PrismCode
                  code={consoles}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Group And Time</h3>
              <div style={titles}>
                <PrismCode
                  code={groups}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5. LocalStorage</h3>
              <div style={titles}>
                <PrismCode
                  code={applications}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Date Object</h3>
              <div style={titles}>
                <PrismCode
                  code={dateObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Current_time_data:</h3>
              <div style={titles}>
                <PrismCode
                  code={current_time_data}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <h3>8. Time Zone</h3>
              <div style={titles}>
                <PrismCode
                  code={Time_Zone}
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

export default (withStyles(styles)(Clousers));

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


const variables = `var person = "John Doe"; `.trim();

const object = `Const emp={id:102,name:"Shyam Kumar",salary:40000} `.trim();

const Keywords = `
function Person(first, last, age, interests) {
  this.name = {
    'first': first,
    'last': last
  };
  this.age = age;
  this.interests = interests;

  this.bio = function () {
    console.log(this.name.first + ' ' + this.name.last + ' is ' + this.age + 'old. likes ' + this.interests[0]);
  };

  this.greeting = function () {
    console.log('Hi! Im ' + this.name.first + '.');
  };
};


const person1 = new Person('Bob', 'Smith', 32, ['music', 'skiing']);
console.log(person1);
`.trim();

const extract = `
let name = 'Anna';
let age = 10;
let ageField = "age";

let obj = {
	"name":"Muk",
	[ageField]: 20,
	"greet me"(){
		console.log(this.name, "---",this.age);
	}
};

console.log(obj["age"]);
console.log(obj[ageField]); 

obj["greet me"]();`.trim();

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


const destructure = `
const hero = {
  name: 'Batman',
  realName: 'Bruce Wayne'
};

const { name, realName } = hero;
console.log(name, realName)

`.trim();

const coercion = `
  const adder =true+5
   console.log(adder)
     !adder; // false
     !!adder;
   console.log(Boolean(adder))
   console.log(typeof(adder))`.trim();


const parse = `
   const book = {
     title: 'Ego is the Enemy',
     author: 'Ryan Holiday'
   }
   
   const bookJSON = JSON.stringify(book)
   const bookObject = JSON.parse(bookJSON)
   console.log(bookObject.title)`.trim();



const stringify = `
JSON.stringify(undefined);                                                                      //undefined 
JSON.stringify(function(){});                                                                   //undefined
JSON.stringify([1,undefined,function(){},4]);                                                   //[1,null,null,4]
JSON.stringify({a:2, b:function(){}});                                                          //{"a":2}
   
   
//3
var a={
   val:[1,2,3],
   toJSON: function(){
       return this.val.slice(1);	
       } 
     };

var b={				
   val:[1,2,3],
     toJSON: function(){                                                         // probably incorrect!
       return [this.val.slice(1).join()];
     }
 };

 console.log(JSON.stringify(a));                                                                 //[2,3]
 console.log(JSON.stringify(b));                                                                 //["2,3"]
   
   
//Json Parse And Json Stringify
var text = '{"employees":[' +
 '{"firstName":"John","lastName":"Doe" },' +
 '{"firstName":"Anna","lastName":"Smith" },' +
 '{"firstName":"Peter","lastName":"Jones" }]}';

const obj = JSON.parse(text);
console.log(obj);


var obj2 = { name: "John", age: 30, city: "New York" };
console.log(JSON.stringify(obj2));
`.trim();

const callbackJs = `
function greeting(name) {
  alert('Hello ' + name);
}

function main(callback) {
  var name = prompt('Please enter your name.');
  callback(name);
}

main(greeting);


//2
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

const callbackFun = `
//1
const throwError = () => {
  throw "Who made this function?"
 }
 
 const someAsyncListener = (callback, ) => {
  setTimeout(callback)
 }
 
 // THIS DOES NOT CATCH!
 try {
  someAsyncListener(throwError)
}
catch (error) {
 console.log(error)
}
console.log("I'm alive!");


//2
const someSyncListener = (callback, ) => {
  callback()
 }
 
 try {
  someSyncListener(throwError)
 }
 catch (error) {
  console.log(error)
 }
 console .log("I'm alive!")`.trim();


const usserDefined = `
 const add = (a, b, callback) => {
   setTimeout(() => {
     callback(a + b)
   }, 2000)
  }
  
  add(1, 4, (sum) => {
     console.log(sum)
 })
 `.trim();

const callbackHell = `
const checkAuth = cb => {
  setTimeout(() => {
    cb({ isAuth: true })
  }, 2000)
}
const getUser = (authInfo, cb) => {
  if (!authInfo.isAuth) {
    cb(null)
    return
  }
  setTimeout(() => {
    cb({ name: 'Max' })
  }, 2000)
}
checkAuth(authInfo => {
  getUser(authInfo, user => {
    console.log(user.name)
  })
})
`.trim();

const neverCallingCallback = `
const p1 = Promise.reject('Rejected');

const p2 = Promise.resolve('Resolve')

const p3 = new Promise((resolve, reject) => {
      setTimeout(resolve,1000, 'Winnig')
})


Promise.race([p2, p1, p3])
       .then((res) => {
         console.log('Winnig', res)
       })
       .catch((err) => {
         console.log(err)
       })
       
       
//2
function timeoutPromise(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Timeout");
    }, delay);
  });
}

Promise.race([
  timeoutPromise(3000)
])
  .then(() => {},
    function (err) {})
`.trim()


const callbackSynchronous = `
var X;
function Test(A, B, Callback) {
   X = (A + B * A * B);
   Callback(X);
}

Test(99999,999999,function(Data) {
   alert(Data);
});

alert("This is not printed first, as it would be in Async.");
`.trim();

const callbackPromises = `
const getUser = cb => {
  setTimeout(() => {
    cb({ name: 'Max' })
  }, 2000)
}

getUser(user => {
  console.log(user.name) 
})`.trim();

const chaineds = `
 function one() {
    console.log('one');
    setTimeout(() => {
      console.log('two');
        }, 1000);
      setTimeout(() => {
        console.log("three");
      });
   }
 one();
 
 
 //2 Promises Chaning
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

//asyncify
function asyncify(fn) {
  var orig_fn = fn,
      intv = setTimeout(function() {
          intv = null;
          if (fn) fn();
      }, 0);

  fn = null;

  return function() {
      if (intv) {
          fn = orig_fn.bind.apply(
              orig_fn, [this].concat([].slice.cell(arguments))
          );
      } else {
          orig_fn.apply(this, arguments);
      }
  }
}`.trim();



const chainig = `
new Promise((resolve, reject) => {
  console.log('Initial');

  resolve();
})

.then(() => {
  throw new Error('Something failed');

  console.log('Do this');
})
.catch(() => {
  console.error('Do that');
})

.then(() => {
  console.log('Do this, no matter what happened before');
});`.trim();

const possible = `
window.addEventListener("unhandledrejection", event => {
  event.preventDefault();
}, false);`.trim();

const composition = `
//Promise.all
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});



//Promise.race
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);                                                     // Both resolve, but promise2 is faster
});
`.trim();

const timing = `
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1);`.trim();

const queues = `
const promise = new Promise(function(resolve, reject) {
  console.log("Promise callback");
  resolve();
}).then(function(result) {
  console.log("Promise callback (.then)");
});

setTimeout(function() {
  console.log("event-loop cycle: Promise (fulfilled)", promise)
}, 0);

console.log("Promise (pending)", promise);
`.trim();


class JsObject extends Component {
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
              <h3>1. Objects</h3>
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
              <br />

              <b>1.Objects are Variables</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={variables}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>2.Using an Object Literal</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={object}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />


              <b>3. Constructors and object instances with new keyword</b>
              <ul>
                <li>Constructor functions used to define and initialize objects and their features.</li>
                <li>constructors provide the means to create as many objects as need in an effective way,
                  attaching data and functions to them as required.
                </li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={Keywords}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>4.By using an Object constructor:</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={constructor}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Extract Object Value</h3>
              <div style={titles}>
                <PrismCode
                  code={extract}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3. Object Destructuring</h3>
              <div style={titles}>
                <PrismCode
                  code={destructure}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4. Array_like_Objects</h3>
              Diﬀerence between Arrays and Array-like Objects is that Array-like objects inherit from Object.prototype
              instead of Array.prototype. This means that Array-like Objects can't access common Array
              prototype methods like forEach(), push(), map(), filter(), and slice().
              <br />

              <h3>5. Coercion</h3>
              <i>The first ! coerce the value to a boolean and inverse it. In this case, !value will return false. So to
                reverse it back to true, we put another ! on it. Hence the double use !!.
              </i>
              <div style={titles}>
                <PrismCode
                  code={coercion}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. JSON</h3>
              Converting a string to a native object is called deserialization, while converting a native object to a string
              so it can be transmitted across the network is called serialization.
              <br />
              <br />
              <ul>
                <li>JSON is purely a string with a specified data format — it contains only properties, no methods.</li>
                <li>JSON requires double quotes to be used around strings and property names. Single quotes are not valid.</li>
                <li>Lightweight data-interchange format</li>
                <li>Based on a subset of javascript</li>
                <li>Often used with AJAX</li>
                <li>Data Types = Number, String, Boolean, Array, Object, Null</li>
              </ul>
              <br />
              <br />

              <b>Storing Data with JSON</b>
              <br />
              <div style={titles}>
                <PrismCode
                  code={parse}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Json Parse And Json Stringify</b>
              <ul>
                <li><b>JSON.parse(): </b>to convert the string into a JavaScript object.</li>
                <li><b>JSON.stringify(): </b>to convert JavaScript object into a string.</li>
              </ul>

              <div style={titles}>
                <PrismCode
                  code={stringify}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7. Callback Function</h3>
              <i>
                A callback function is a function passed into another function as an argument, which is then
                invoked inside the outer function to complete some kind of action.
              </i>
              <div style={titles}>
                <PrismCode
                  code={callbackJs}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <ul>
                <li>with Callback function javaScript bild an asynchronous wold of a synchronous single-threaded language.</li>
                <li>Almost anything that has to pull data into your app or push data out will always
                  be asynchronous because it’s not going to be running in the same thread.
                  callbacks do not work with try-catch.</li>
                <li>Although, if your callback is synchronous, then you can catch errors using try-catch</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={callbackFun}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Usser Defined</b>
              <div style={titles}>
                <PrismCode
                  code={usserDefined}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Callback Hell</b>
              When working with a lot of dependent asynchronous operations, you quickly end up in callback hell.
              <div style={titles}>
                <PrismCode
                  code={callbackHell}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Never Calling Callback</b>
              <div style={titles}>
                <PrismCode
                  code={neverCallingCallback}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Callback Synchronous</b>
              <br />
              <br />
              synchronously callback usally return values and asynchronous callback don't.
              <br />
              Simply adding a callback to a function does not make it non-blocking/ asynchronous.
              Asynchronous capability is actually provided by the environment.
              <div style={titles}>
                <PrismCode
                  code={callbackSynchronous}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. Promises</h3>
              <ul>
                <li>
                  Promise is an object that represents the completion/ failure of an asynchronous task and its resulting value.
                </li>
                <li>A promise is a returned object which contain callbacks, instead of passing callbacks into a function.</li>
              </ul>
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
              <br />

              <b>Callback Promises</b>
              <div style={titles}>
                <PrismCode
                  code={callbackPromises}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. Chaining</h3>
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

              <b>Chaining after a catch</b>
              <br />
              It's possible to chain after a failure, i.e. a catch, which is useful to accomplish new actions even after an
              action failed in the chain.
              <br />
              <div style={titles}>
                <PrismCode
                  code={chainig}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Promise rejection events</b>
              <br />
              Whenever a promise is rejected, one of two events is sent to the global scope (window or web worker).
              <br />
              <br />
              <b>1. rejectionhandled:</b>
              <br />
              Sent when a promise is rejected, after that rejection has been handled by the executor's reject function.
              <br />
              <br />
              <b>2. unhandledrejection:</b>
              <br />
              Sent when a promise is rejected but there is no rejection handler available.
              <br />
              <br />
              In both cases, the event (PromiseRejectionEvent) has as members a promise property indicating the promise that
              was rejected, and a reason property that provides the reason given for the promise to be rejected.
              <br />
              <br />
              These make it possible to offer fallback error handling for promises, as well as to help debug issues with your
              promise management. These handlers are global per context, so all errors will go to the same event handlers,
              regardless of source.
              <div style={titles}>
                <PrismCode
                  code={possible}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              By calling the event's preventDefault() method, you tell the JavaScript runtime not to do its default action when
              rejected promises go unhandled.
              <br />

              <h3>10. Composition</h3>
              <ul>
                <li>Promise.resolve() and Promise.reject() are shortcuts to manually create an already resolved or rejected promise respectively.</li>
                <li>Promise.all() and Promise.race() are two composition tools for running asynchronous operations in parallel.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={composition}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Timing</h3>
              To avoid surprises, functions passed to then() will never be called synchronously, even with an already-resolved promise.
              <br />
              Instead of running immediately, the passed-in function is put on a microtask queue, which means it runs later
              when the queue is emptied at the end of the current run of the JavaScript event loop.
              <div style={titles}>
                <PrismCode
                  code={timing}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Task queues vs microtasks</h3>
              <ul>
                <li>Promise callbacks are handled as a <b>Microtask</b>.</li>
                <li>setTimeout() callbacks are handled as <b>Task queues</b>.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={queues}
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

export default (withStyles(styles)(JsObject));

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
`.trim();



const callbackFun = `
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
              <h3>1. Extract Object Value</h3>
              <div style={titles}>
                <PrismCode
                  code={extract}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>2. Array_like_Objects</h3>
              Diﬀerence between Arrays and Array-like Objects is that Array-like objects inherit from Object.prototype
              instead of Array.prototype. This means that Array-like Objects can't access common Array
              prototype methods like forEach(), push(), map(), filter(), and slice().
              <br />

              <h3>3. Coercion</h3>
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

              <h3>4. JSON</h3>
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

              <h3>5. Callback Function with try/catch</h3>
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

              <h3>6. Promises</h3>
              <b>Callback Promises</b>
              <div style={titles}>
                <PrismCode
                  code={callbackPromises}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
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

              <h3>7. Composition</h3>
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

              <h3>8. Timing</h3>
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

              <h3>9. Task queues vs microtasks</h3>
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

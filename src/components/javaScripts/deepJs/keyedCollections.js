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

const code = ``.trim();

const WeakMaps = `
const privates = new WeakMap();

function Public() {
  const me = {
    // Private data goes here
  };
  privates.set(this, me);
}

Public.prototype.method = function () {
  const me = privates.get(this);
  // Do stuff with private data in me...
};

module.exports = Public;`.trim();

const sets = `
let mySet = new Set();
mySet.add(1);
mySet.add('some text');
mySet.add('foo');

mySet.has(1);                                                                               // true
mySet.delete('foo');
mySet.size;                                                                                 // 2

for (let item of mySet) 
console.log(item);`.trim();

const setsAdv = `
Set.prototype.subSet = function(otherSet) { 
  if(this.size > otherSet.size) 
      return false; 
  else { 
      for(var elem of this) { 
          if(!otherSet.has(elem)) 
              return false; 
      } 
      return true; 
  } 
} 

var setA = new Set([10, 20, 30]); 
var setB = new Set([50, 60, 10, 20, 30, 40]); 
var setC = new Set([10, 30, 40, 50]); 

console.log(setA.subSet(setB)); 
console.log(setA.subSet(setC)); 
console.log(setC.subSet(setB));`.trim();

const converting = `
Array.from(mySet);
[...mySet2];

mySet2 = new Set([1, 2, 3, 4]);`.trim();

const attToSets = `
let myArray = [11,22,34,65,34,65,34];
let mySet = new Set(myArray);
  mySet.add('100');
  mySet.add({a: 1, b: 2});
  mySet.delete(22);

mySet.forEach(function(val){
  console.log(val);
});`.trim();

const SetsToArr = `
let myArray = ['value1', 'value2', 'value3']

let mySet = new Set(myArray)
mySet.has('value1')     

console.log([...mySet]) `.trim();

const weakMap = `
const requests2 = new WeakSet();
class Request2 {
    constructor() {
        requests.set(this, {
            created: new Date()
        });
    }
    
    makeRequest() {
        if (requestIsTooOld(this)) {
            throw new Error("Try again?");
        }    // Do work...  
    }
}`.trim();

const Stack = `
  function postFixEvaluation(exp) {
  var stack = new Stack();
    for (var i = 0; i < exp.length; i++) {
      var c = exp[i];
      if (!isNaN(c))
        stack.push(c - '0');
        else {
          var val1 = stack.pop();
          var val2 = stack.pop();
      if (val1 == "Underflow" || val2 == "Underflow")
        return "Can't perform postfix evaluation";
        
    switch (c) {
        case '+':
          stack.push(val2 + val1);
        break;
        case '-':
          stack.push(val2 - val1);
        break;
        case '/':
          stack.push(val2 / val1);
        break;
        case '*':
          stack.push(val2 * val1);
        break;
      }
    }
  }
  return stack.pop();
}

console.log(postFixEvaluation("235*+8-"));

console.log(postFixEvaluation("23*+"));                       // returns postfix evaluation can't be performed.
`.trim();

const arrayToClone = `
arrayToClone = [1, 2, 3, 4, 5];
 clone1 = Array.from(arrayToClone); 
 clone2 = Array.of(...arrayToClone); 
 clone3 = [...arrayToClone] 
  
   console.log(arrayToClone)


  var array1 = [1, 2]; 
  var array2 = [3, 4, 5]; 
  var array3 = [...array1, ...array2]                                             // Concatenating Arrays.

  console.log(array3)

  
//Multiple Arrays
   var array1 = ["a", "b"],
       array2 = ["c", "d"],    
       array3 = ["e", "f"],    
       array4 = ["g", "h"];

       var arrConc = [...array1, ...array2, ...array3, ...array4]

        console.log(arrConc)


//Without Copying the First Array
	var longArray = [1, 2, 3, 4, 5, 6, 7, 8],    
		shortArray = [9, 10]; 

		longArray.push(...shortArray)
		console.log(longArray)

shortArray.forEach(function (elem) {
    longArray.push(elem); 
});


var columns = ["Date", "Number", "Size", "Location", "Age"]; 
var rows = ["2001", "5", "Big", "Sydney", "25"]; 
var result =  rows.reduce(function(result, field, index) {
  result[columns[index]] = field;
    return result; 
}, {})
console.log(result);

var a=[1, 2, 3, 4, 5].filter(value => value > 2);
console.log(a)


//filter
function startsWithLetterA(str) { 
   if(str && str[0].toLowerCase() == 'a') {
           return true   
            }  
              return false;
               }
var str = 'Since Boolean is a native javascript afunction/constructor that takes';
var strArray = str.split(" ");
var wordsStartsWithA = strArray.filter(startsWithLetterA); 

console.log(wordsStartsWithA)
`.trim();

const circular = `
class CircularBuffer {
  constructor(size) {
    this.memory = new Array(size);
    this.head = 0;
    this.tail = 0;
    this.isFull = false;
  }
  
  read() {
    if (this.tail === this.head && !this.isFull) {
      console.log('Nothing to read.');
    } else {
      this.tail = this.next(this.tail);
      this.isFull = false;
      return this.memory[this.tail];
    }
  }
  
  write(value) {
    if (this.isFull) {
      console.error('Buffer full');
      return;
    } else {
      this.head = this.next(this.head);
      this.memory[this.head] = value;
      if (this.head === this.tail) {
        this.isFull = true;
      }
    }
  }
  
  next(n) {
    var nxt = n + 1;
    if (nxt === this.memory.length) {
      return 0;
    } else {
      return nxt;
    }
  }
}

var buffer = new CircularBuffer(10);

document.addEventListener('keydown', event => {
  buffer.write(event.key);
});

var readKeys = () => {
  console.log(buffer.read());
  setTimeout(readKeys, 500);
}

readKeys();
`.trim();

const changing = `
function reverse(head) {
  let node = head,
      previous,
      tmp;

  while (node) {
    tmp = node.next;                                            // save next before we overwrite node.next!
    node.next = previous;                                       // reverse pointer
    previous = node;                                            // step forward in the list.
    node = tmp;
  }

  return previous;
}`.trim();

class KeyedCollections extends Component {
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
              <h3>1.Object and Map compared</h3>
              <ul>
                <li>Objects have been used to map strings to values. Objects allow you to set keys to values, retrieve those values,
                  delete keys, and detect whether something is stored at a key. Map objects, however, have a few more advantages
                  that make them better maps.</li>
                <br />
                <li>The keys of an Object are Strings or Symbols, where they can be of any value for a Map.</li>
                <br />
                <li>You can get the size of a Map easily, while you have to manually keep track of size for an Object.</li>
              </ul>
              <br />
              <br />

              <b>whether to use a Map or an Object:</b>
              <br />
              <ul>
                <li>Use maps over objects when keys are unknown until run time, and when all keys are the same
                  type and all values are the same type.</li>
                <li>Use maps if there is a need to store primitive values as keys because object treats each
                  key as a string whether it's a number value, boolean value or any other primitive value.</li>
                <li>Use objects when there is logic that operates on individual elements.</li>
              </ul>

              <br />
              <h3>2.WeakMap object</h3>
              The WeakMap object is a collection of key/value pairs in which the keys are objects only and the
              values can be arbitrary values. The object references in the keys are held weakly, means
              they are a target of garbage collection (GC) if there is no other reference to the object anymore.
              The WeakMap API is the same as the Map API.
              <br />
              <br />
              <ul>
                <li>One difference to Map objects is that WeakMap keys are not enumerable (i.e., there is no method giving you a list
                  of the keys).</li>
                <li>One use case of WeakMap objects is to store private data for an object, or to hide implementation details. </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={WeakMaps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>3.Sets</h3>
              Set objects are collections of values. You can iterate its elements in insertion order. A value in a Set may only
              occur once, it is unique in the Set's collection.
              <br />
              <br />
              <b>Sets Methods:</b>
              <ul>
                <li>add(1)</li>
                <li>has(1)</li>
                <li>delete(5)</li>
                <li>size</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={sets}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <div style={titles}>
                <PrismCode
                  code={setsAdv}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>4.Converting between Array and Set</h3>
              You can create an Array from a Set using Array.from or the spread operator. Also, the Set constructor accepts an
              Array to convert in the other direction.

              <div style={titles}>
                <PrismCode
                  code={converting}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>1. Array To Set</b>
              <div style={titles}>
                <PrismCode
                  code={attToSets}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <b>2. Set To Array</b>
              <div style={titles}>
                <PrismCode
                  code={SetsToArr}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>5.WeakMap</h3>
              Ability to have weak references used in the form of a WeakSet and WeakMap.
              <br />
              <div style={titles}>
                <PrismCode
                  code={weakMap}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6.Array and Set compared</h3>
              Traditionally, a set of elements has been stored in arrays in JavaScript in a lot of situations.
              <br />
              The new Set object, however, has some advantages:
              <br />
              <br />
              <ul>
                <li>Deleting Array elements by value (arr.splice(arr.indexOf(val), 1)) is very slow.</li>
                <li>Set objects let you delete elements by their value. With an array, you would have to splice
                  based on an element's index.</li>
                <li>The value NaN cannot be found with indexOf in an array.</li>
              </ul>
              <br />
              <h3>WeakSet object</h3>
              WeakSet objects are collections of objects. An object in the WeakSet may only occur once. It is unique in the
              WeakSet's collection, and objects are not enumerable.
              <ul>
                <li>Sets, WeakSets are collections of objects only, and not of arbitrary values of any type.</li>
                <li>The WeakSet is weak: References to objects in the collection are held weakly. If there is no
                  other reference to an object stored in the WeakSet, they can be garbage collected.</li>
              </ul>

              <b>Stack</b>
              <div style={titles}>
                <PrismCode
                  code={Stack}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />

              <b>Shallow cloning an array</b>
              <br />
              Sometimes, you need to work with an array while ensuring you don't modify the original. Instead of a clone method,
              arrays have a slice method that lets you perform a shallow copy of any part of an array. This only
              clones the ﬁrst level. This works well with primitive types, like numbers and strings, but not objects.
              <br />
              <br />
              <ul>
                <li>If the second array is too long (more than 100,000), we get a stack overﬂow error (because of how apply
                  works). To be safe, we can iterate instead.</li>
                <li>When we have two separate array and we want to make key value pair from that two array, we can use array's reduce
                  function like below.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={arrayToClone}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>7.Implement a circular buffer using an array.</h3>
              <div style={titles}>
                <PrismCode
                  code={circular}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8.How do you reverse a linked list?.</h3>
              We iterate through the list once, changing the next pointer of each node to the previous node. The order of operations is important: we copy node.next into tmp before setting node.next to previous. Otherwise when we “step forward” at the end of the list we’d actually step back to the previous node.
              <br />
              <br />
              <b>O(n) time & O(1) space</b>
              <div style={titles}>
                <PrismCode
                  code={changing}
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

export default (withStyles(styles)(KeyedCollections));

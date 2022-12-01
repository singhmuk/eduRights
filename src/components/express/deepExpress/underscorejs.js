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

const modelOps = `
var list = '';
var list2 = [[1, 3, 2, 5], [4, 6, 1, 2]]
var list3 = [{ name: 'Sam', age: 10 }, { name: 'Joe', age: 12 }]
var people = ["Tom", "Dick", "Harry"]
var numbers = [1, 2, 3, 4, 5, 6]
var obj = { one: 1, two: 2, three: 3 }
var flattenList = [1, [2], [4], 5, [[6]]]


_.each(people, function (name, _key) {
  console.log(name)
})


//2
_.each(obj, function (value, key) {
  list += key + ':' + value + ' '
  console.log(list);
}
);


//3
console.log(_.map(numbers, function (x) { return x * x }));
console.log(_.reduce(numbers, function (memo, num) { return memo + num }, 0));
console.log(_.find(numbers, function (num) { return num % 2 == 0 }));
console.log(_.filter(numbers, function (num) { return !(num % 2 == 0) }));
console.log( _.reject(numbers, function (num) { return (num % 2 == 0) });
console.log(_.some(numbers, function (num) { return (num % 2 == 0) }));
console.log(_.every(numbers, function (num) { return (num % 2 == 0) }));
`.trim();

const modelInheritance = `
console.log(_.contains(numbers, 2));
console.log(_.invoke(list2, 'join'););
console.log(_.pluck(list3, 'name'));
console.log(_.min(numbers))
console.log(_.sortBy(list3, 'name'));
console.log(_.groupBy(people, 'length'));
console.log(_.shuffle(numbers))
console.log(_.toArray(numbers).slice(1, 3))
console.log(_.size(numbers))
console.log(_.compact([0, 1, false, 2, '', 3, null, NaN, undefined]))
`.trim();

const modelVals = `
console.log(_.first(numbers, 3))
console.log(_.last(numbers, 3))
console.log(_.rest(numbers, 1))
console.log(_.indexOf(numbers, 4, true))
console.log(_.flatten(flattenList, true))
console.log(_.without(numbers, 5, 6))                                           //remove 5 and 6
console.log(_.union(list2, numbers, list3))
console.log(_.intersection(numbers, numbers))
console.log(_.difference(list2, numbers, list3))
console.log(_.uniq(list2, true))
console.log(_.zip(list2, numbers, list3))
console.log(_.range(0, 20, 5))
`.trim();

const modelCols = `
var updateMessage = function (message) {
    return this.name + ' : ' + message;
  }
  
  updateMessage = _.bind(updateMessage, { name: 'BinderObject' }, "Welcome");
  console.log(updateMessage());
  
  
//2
var fibonacci = _.memoize(function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
  });
  
  var fibonacci1 = function (n) {
    return n < 2 ? n : fibonacci1(n - 1) + fibonacci1(n - 2);
  };
  
  var startTimestamp = new Date().getTime();
  var endTimestamp = new Date().getTime();
  console.log(fibonacci(1000) + " in " + ((endTimestamp - startTimestamp)) + ' ms');
  

//3
// var startTimestamp = new Date().getTime();

var add = function (a, b) {
  console.log(a + b);
  var endTimestamp = new Date().getTime();
  console.log(((endTimestamp - startTimestamp)) + ' ms');
};
_.delay(add, 1000, 5, 10);


//4
var create = function () { console.log('Object Created.') };
var init = _.once(create);

init();
init();
init();


//5
var greeting = function (name) { return "hello: " + name + "!"; };

greeting = _.wrap(greeting, function (func) {
  return "Welcome and, " + func("Sam") + ", Bye!";
});
console.log(greeting());


//6
var greeting = function (name) { return "Hi " + name + "!" };
var toUpperCase = function (value) { return value.toUpperCase() };

var welcome = _.compose(greeting, toUpperCase);
console.log(welcome('Sam'));
`.trim();

const custmEvent = `
console.log(_.keys({ name: 'Sam', age: 30 }));
console.log(_.values({ name: 'Sam', age: 30 }));


//3 
var student = {
  name: 'Sam',
  age: 10,
  print: function () {
    console.log(name + ", " + age);
  }
}

console.log(_.functions(student));


//Updating Objects
onsole.log(_.extend(student, obj, age));
console.log(_.pick(obj, 'name', 'age'));
console.log(_.defaults(obj, { class: 10 }));
console.log(_.clone(obj));
console.log(_.has(obj, 'age'));



//2
_.chain(numbers)
  .filter(function (num) { return num % 2 == 0; })
  .tap(console.log)
  .map(function (num) { return num * num })
  .value();
`.trim();

const dataChange = `
var obj = { name: 'Sam', age: 30, id: 1 };
var student = { name: 'Sam', age: 10, class: { name: '10th', section: 'B' } }
var student1 = { name: 'Sam', age: 10, class: { name: '10th', section: 'B' } }
var numbers = [1, 2, 3, 4, 5, 6]


console.log(_.isEqual(student, student1));
console.log(_.isEmpty([]));
console.log(_.isArray([1, 2, 3]));
console.log(_.isObject(obj));
console.log(_.isFunction(console.log('This is a Functions')));
console.log(_.isString('1'));
console.log(_.isNumber(1));
console.log(_.isFinite(-Infinity));
console.log(_.isBoolean(0));
console.log(_.isDate(new Date()));
console.log(_.isRegExp(/Sam/));
console.log(_.isNaN(NaN));
console.log(_.isNull(null));
`.trim();

const eventHandler = `
var obj = { name: 'Sam', age: 30, id: 1 };
var numbers = [1, 2, 3, 4, 5, 6]


console.log(obj === _.identity(obj));
_.times(3, function (index) { console.log(index) });
console.log(_.isArguments([1]));
console.log(_.uniqueId("text"));

//2
console.log(_.escape('Joe, Rob & Larry'));
console.log(_.escape('3 > 2'));

//3
var student = { name: 'Sam', class: function () { return "5th"; } };
console.log(_.result(student, 'name'));

//4
var template = _.template("Hello: <%= name %>");
console.log(template({ name: 'Sam' }));
`.trim();

const chaining = `
var students = [{ name: 'Sam', age: 10 }, { name: 'Joe', age: 8 }, { name: 'Rob', age: 12 }]


var eldest = _.chain(students)
  .sortBy(function (student) { return student.age; })
  .map(function (student) { return "Name: " + student.name + ", age: " + student.age; })
  .last()
  .value();

console.log(eldest);


//2
console.log(_.chain([1, 4, 3]).sort().value());
`.trim();



class UnderscorJs extends Component {
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
              <h3>Methods</h3>
              <div style={titles}>
                <PrismCode
                  code={modelOps}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Processing Collections</h3>
              <ul>
                <li><b>contains(): </b>Returns true if a value is present in a given list.</li>
                <li><b>pluck(): </b>Extract a list of property values from a list of objects.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={modelInheritance}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Iterating Array</h3>
              <ul>
                <li><b>initial(): </b>Returns the elements of given array excluding last element.</li>
                <li><b>flatten(): </b>flattens a nested array where nesting can be upto any length. If shallow is passed as true then array
                  will be flatten upto first level only.</li>
                <li><b>without(): </b>Returns a array after removing the values from given array.</li>
                <li><b>intersection(): </b>Return an array of common values from each array.</li>
                <li><b>zip(): </b>Merges arrays with the values at corresponding indexes.</li>
                <li><b>chunk(): </b>Gives multiple array from an array using length parameter. Generated arrays can of maximum size of given length.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={modelVals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Functions</h3>
              <ul>
                <li><b>bind(): </b>Helps to replace the occurence of this in a function with reference of passed object. </li>
                <li><b>memoize(): </b>speeds up the slow computation. It remembers the a given function by caching its output. hashFunction
                  if passed is used to compute the hash value to store the result based on arguments passed to original function.</li>
                <li><b>delay(): </b>invokes a given function after waiting for given wait time.</li>
                <li><b>once(): </b>Return a copy of passed function and ensure that result function is called only once no matter how many
                  times it is called.</li>
                <li><b>wrapper(): </b>Executes before and after function execution.</li>
                <li><b>compose(): </b>create a chained method where each function's return valus is used by other function.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={modelCols}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Mapping Objects</h3>
              <ul>
                <li><b>keys(): </b>Return all the names of object's properties.</li>
                <li><b>values(): </b>Return all the values of object's properties. </li>
                <li><b>extend(): </b>Shallow copies the properties of sources passed to destination object.</li>
                <li><b>pick(): </b>Return a copy of object by copies the specified keys to be copied.</li>
                <li><b>defaults(): </b>fills the default values in undefined properties of object passed using first value present in
                  defaults objects and returns the result.</li>
                <li><b>clone(): </b>creates a shallow copy of object passed and returns the same. Nested objects are copied as reference.</li>
                <li><b>tap(): </b>apply a interceptor to object and then return the object.</li>
                <li><b>has(): </b>checks if key is present in object.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={custmEvent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Comparing Objects</h3>
              <ul>
                <li><b>isEqual(): </b>Do a deep compare of object with other.</li>
                <li><b>isEmpty(): </b>Checks if object is empty, string is of length or array is empty.</li>
                <li><b>isObject(): </b>Checks if argument is an object or not. Object and arrays are objects.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={dataChange}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Utilities</h3>
              <ul>
                <li><b>identity(): </b>It's a default iteratee. It returns the same value which is passed as argument.</li>
                <li><b>times(): </b>Calls the iteratee function n number of times. It passes an index to iteratee function as well.</li>
                <li><b>isArguments(): </b>Checks if object is an Argument object.</li>
                <li><b>uniqueId(): </b>If prefix is passed then prefix is appended to that id.</li>
                <li><b>escape(): </b>Make a string html safe by replacing Html special characters with their counterparts.</li>
                <li><b>result(): </b>Gives value of a property of an object. In case property is a function then result of the function is returned.</li>
                <li><b>template(): </b>Complies javascript code into functions which can be used to render html.</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={eventHandler}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>Chaining</h3>
              <ul>
                <li><b>chain(): </b>Returns a wrapped object and when methods are invoked on this object, each method return the wrapped object until value method is called.</li>
                <li><b>value(): </b>Returns the value of a wrapped object. </li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={chaining}
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

export default (withStyles(styles)(UnderscorJs));

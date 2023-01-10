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

const change = `
document.title="My New Title";`.trim();

const thisKey = ``.trim();

const evals = `
function foo(str, a) {
  eval(str);                                                          // cheating!
  console.log(a, b);
}

var b = 2;
foo("var b = 3;", 1);                                                 // 1 3
`.trim()

const forIn = `
const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log('$'{property}: '$'{object[property]});
}`.trim();

const forEach = `
var arr = ["C", "C++", "Python"];
arr.forEach(val => console.log(val))
`.trim()

const continues = `
function continueFun() {
  foo: for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (i == j) {
        console.log("continue", i, j);
        continue foo;
      }

      if ((j * i) % 2 == 1) {
        continue;
      }

      if ((i * j) >= 3) {
        console.log("break", i, j);
        break foo;
      }
    }
  }
}

continueFun()
`.trim();

const nonLabeledBlock = `function nonLabeledBlock(){
  bar: {
    console.log('hello');
    break bar;
    console.log('never runs');
}
console.log('welcome');
}`.trim();


const conditions = `
var arr = [];
var result = [];

result = arr > 10 ? 'Good' : 'Average'
console.log('ternary', result)


//2
toCelsius(40)

function toCelsius(f) {
  return console.log((5 / 9) * (f - 32));
}


//3. Template Literals
console.log('string text line 1 
string text line 2');
`.trim();

const jsonsObj = `
var a = prompt('please enter first number');
var b = prompt('please enter second number');
var sum = a + b

document.write("Sum is",sum)`.trim();

const circular = `
function f() {
  var x = {};
  var y = {};
  x.a = y;                                                                              // x references y.
  y.a = x;                                                                              // y references x.

  return 'azerty';
}
f();
`.trim();

const textContent = `
<body> 
<h3>Differences between innerText & textContent.</h3> 
<p id="demo"> This element has extra	 spacing and contains 
<span>a span element</span>.</p> 

<button onclick="getInnerText()">Get innerText</button> 
<button onclick="getTextContent()">Get textContent</button> 

<p id="demo"></p> 
<script> 
	function getInnerText() { 
	alert(document.getElementById("demo").innerText) 
	} 

	function getTextContent() { 
	alert(document.getElementById("demo").textContent) 
	} 
</script> 
</body> 
`.trim();

const HTMLCollection = `
const fruits = document.getElementsByClassName(‘fruits’);
fruits.item(0).classList.add(‘fruit__01’)`.trim();

const NodeList = `
 const fruits = document.querySelectorAll(‘.fruits’);                           // returns static collection.

 const fruits = document.querySelector(‘.fruits’);                              // returns live collection.
 const childFruit = fruits.childNodes;`.trim();

 const traversed = `
Array.proptotype.map.call(p, tag => {
  console.log(tag.innerText)
})`.trim();

const childNodes = `
<script type='text/javascript'>
$(window).load(function(){
    console.log(document.getElementById('dd').children.length);
    console.log(document.getElementById('dd').childNodes.length);
});
</script>
</head>
<body>
  <div id="dd">
    <p>Test paragraph.</p>
    <div>
      <p>Test paragraph 2.</p>
    </div>
    Text.
  </div>
</body>`.trim();

const firstElementChild = `
<ul id="list"><!-- a list item -->
<li>Item1</li>
<li>Item2</li>
</ul>


//js
  var list = document.getElementById("list");
   
  console.log("First child value is",list.firstChild);
   
  console.log("First element child value is",list.firstElementChild);
`.trim();

const dynamically = `
<body>
    <button onclick="create()">Create Heading</button>
    <script>
      function create() {
        var h1 = document.createElement('h1');
        h1.textContent = "New Heading!!!";
        h1.setAttribute('class', 'note');
        document.body.appendChild(h1);
      }
    </script>
  </body>`.trim();

const removeChild = `
//RemoveChild.
let p = document.querySelector( 'p' )
let removed = p.removeChild( p.firstChild )
console.log( removed )                                                      //<i>Hi</i>


//Remove
let p = document.querySelector( 'p' )
let removed = p.childNodes[0].remove()
console.log( removed )                                                      // undefined
`.trim();

const Temporal = ` 
var foo = 'first';
function main() {
  console.log(foo);                                                                 //undefined
  var foo = 'second';
}


let foo = 'first';
function main() {
  console.log(foo);                                                                 //ReferenceError
  let foo = 'second';
}

main()
`.trim();

const memorizations = `
const add = (n) => (n + 10);
add(9);

const memoizedAdd = () => {
  let cache = {};
  return (n) => {
    if (n in cache) {
      console.log('Fetching from cache');
      return cache[n];
    }
    else {
      console.log('Calculating result');
      let result = n + 10;
      cache[n] = result;
      return result;
    }
  }
}

const newAdd = memoizedAdd();
console.time();
console.log(newAdd(9));
console.log(newAdd(9)); 
console.timeEnd();
`.trim();

const window = `
  var a = 2;
  
  (function IIFE(def) {
     def(window);
  })(function def(global) {
     var a = 3;
     console.log(a);                                                                              // 3
     console.log(global.a);                                                                       // 2
  });
`.trim();

const listeners = `

<button id="clickMe">Click me</button>

//1
document.getElementById("clickMe")
.addEventListener("click", () => {
  console.log('button clicked')
});


//2 Couser With Event Listeners
function attachedEventListeners(){
  let count = 0;
document.getElementById("clickMe")
.addEventListener("click", () => {
  console.log('button clicked', count++)
  });
}

attachedEventListeners();`.trim();


class McqJs extends Component {
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
              <h3>1. What do you mean by JavaScript BOM?</h3>
              BOM refers to “Browser Object Modal” that permits JavaScript to “talk” to the browser, modern browsers, no standards 
              apply same BOMS – screen, history, window, location, timing, navigator, and cookies.
              <br/>

              <h3>2. In what way we can change the title of the page in JavaScript?</h3>
              <div style={titles}>
                <PrismCode
                  code={change}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>3. Explain JavaScript Cookies.</h3>
              Cookies are the tiny test files that are properly stored in a computer, and they get build when the user goes to the 
              websites to store some information that they require. <b>Ex. </b> User name details and information about the 
              shopping cart from earlier visits.
              <br/>

              <h3>4. Explain the role of deferred scripts in JavaScripts.</h3>
              The HTML code’s parsing while the page is loading is stopped by default until the script has not paused executing. 
              If your server is a little slow or the script is specifically heavy, then your webpage will be delayed. While you 
              are using Deferred, scripts delays the execution for sometime of the script till the time the HTML parser is 
              running. This lessens the loading time of web pages and get showed up faster.
              <div style={titles}>
                <PrismCode
                  code={thisKey}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br/>

              <h3>5. Eval</h3>
              <div style={titles}>
                <PrismCode
                  code={evals}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>6. Enumerable</h3>
              An enumerable property in JavaScript means that a property can be viewed if it is iterated using the for…in loop or
              Object.keys() method. All the properties which are created by simple assignment or property initializer are
              enumerable by default.
              <br />

              <h3>7. For...In</h3>
              <ul>
                <li>A for...in loop will not find any property on the array.</li>
                <li>A for...in loop only iterates over enumerable, non-Symbol properties. Objects created from
                  built–in constructors like Array and Object have inherited non–enumerable properties from
                  Object.prototype and String.prototype, such as String's indexOf() method or Object's toString()
                  method. The loop will iterate over all enumerable properties of the object itself and those the
                  object inherits from its prototype chain.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={forIn}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>8. forEach():</h3>
              <ul>
                <li>The function passed to forEach is executed once for every item in the array, with the array item
                  passed as the argument to the function.
                </li>
                <li><b>Note:</b> Elements of an array that are omitted when the array is defined are not listed when iterating by
                  forEach, but are listed when undefined has been manually assigned to the element.
                </li>
              </ul>
              <br />
              <br />
              <div style={titles}>
                <PrismCode
                  code={forEach}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>9. continue and break</h3>
              <div style={titles}>
                <PrismCode
                  code={continues}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>10. non-labeled block</h3>
              <div style={titles}>
                <PrismCode
                  code={nonLabeledBlock}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>11. Ternary Conditions</h3>
              Accessing a function without () will return the function object instead of the function result.
              <div style={titles}>
                <PrismCode
                  code={conditions}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>12. Prompt</h3>
              <div style={titles}>
                <PrismCode
                  code={jsonsObj}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>13. Limitation: Circular references</h3>
              <div style={titles}>
                <PrismCode
                  code={circular}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>14. Mark-and-sweep algorithm</h3>
              This algorithm reduces the definition of "an object is no longer needed" to "an object is unreachable".
              <br />
              <br />
              The root is the global object. Periodically, the garbage collector will start from these roots, find all objects
              that are referenced from these roots, then all objects referenced from these, etc. Starting from the roots, the
              garbage collector will thus find all reachable objects and collect all non-reachable objects.
              <br />

              <h3>15. Difference between textContent and innerText.</h3>
              <b>textContent: </b>
              <ul>
                <li>Used to set/ return the text value of the selected node and all its descendants.</li>
                <li>While setting the textContent property, any child nodes are removed. It is replaced by a single Text node containing the specified string.</li>
              </ul>
              <br />
              To set the text of node –<br />
              <b>node.textContent = text</b>
              <br />
              <br />
              To return the text of node –<br />
              <b>node.textContent</b>
              <br />

              <div style={titles}>
                <PrismCode
                  code={textContent}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>innerText: </b>
              <ul>
                <li>This property also sets/ returns the text value of the selected node and all its descendants.</li>
                <li>The innerText property returns the text, without spacing and the textContent property returns the text along with spacing.</li>
              </ul>
              <br />
              <br />
              <b>Other differences:</b>
              <br />
              <table>
                <tr>
                  <th>innerText</th>
                  <th>textContent</th>
                </tr>
                <tr>
                  <td>Returns the visible text contained in a node.</td>
                  <td>Returns the full text.</td>
                </tr>
                <tr>
                  <td>Much more performance-heavy, as it requires layout information to return the result.</td>
                  <td>It is not so much performance-heavy, as it doesn’t requires layout information to return the result.</td>
                </tr>
                <tr>
                  <td>Defined only for HTMLElement objects.</td>
                  <td>Defined for all Node objects.</td>
                </tr>
              </table>
              <br />

              <h3>16. What is the difference between HTMLCollection and NodeList</h3>
              The main difference between an HTMLCollection and a NodeList is that one is live and one is static. This means that when an element
              is appended to the DOM, a live node will recognize the new element while a static node will not.
              <br />
              <br />
              <b>HTMLCollection:</b>
              <br />
              The element methods <b>getElementsByClassName()</b> and <b>getElementsByTagName()</b> return a live HTMLCollection. It only includes the matching
              elements (e.g. class name or tag name) and does not include text nodes, it provides only two methods <b>item</b> and <b>namedItem</b>.
              <br />
              <br />
              <b>Ex. </b>All the elements with the class name of fruits is selected. The item() method is then used to access the fruit
              at index 0 and a class name of fruit__01 is added to that element.

              <div style={titles}>
                <PrismCode
                  code={HTMLCollection}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <br />
              <b>NodeList: </b>
              <br />
              <ul>
                <li>The element method <b>querySelectorAll()</b> returns a static NodeList. They look like arrays but are not.</li>
                <li>NodeLists have a defined forEach method as well as a few other methods including item, entries, keys, and values.</li>
                <li>NodeLists behave differently depending on how we access them. if we access elements using <b>childNodes</b>, the returned list
                  is live and will update as more elements are added to the node. If it’s accessed using <b>querySelectorAll()</b>, the returned list
                  is static and will not update if more elements are added to the node.</li>
              </ul>

              <br />
              <div style={titles}>
                <PrismCode
                  code={NodeList}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>17. How can an HTMLCollection be traversed?</h3>
              <ul>
                <li>If use .map, .filter, or .forEach on an HTML collection got this friendly error.</li>
                <b>Ex. </b><i>Uncatch TypeError: p.forEach is not a function at 'anonymous':1:3</i>
                <br />
                <br />

                <li>We can interact with an HTML Collection as if it’s an array in many other ways. We can use index numbers to access data. It
                  looks like an array. But it functions a bit differently. NodeList and HTMLCollection used somewhat interchangeably. They’re
                  both DOM lists, but HTMLCollection contains DOM elements that are the same, whereas a nodeList can contain a variety of DOM
                  elements. That’s why <b>querySelectorAll</b> returns a nodeList but <b>getElementsByTagName</b> returns an HTMLCollection. forEach works on a
                  nodeList but not an HTMLCollection.</li>

                <li>Iterate over an HTMLCollection. With for loop/ while loop.</li>
                <li>Our HTMLCollection variable can now be iterated over like an array. If we don’t want to convert our HTMLCollection we can also
                  use .call to use array methods:</li>
              </ul>
              <div style={titles}>
                <PrismCode
                  code={traversed}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>18. The difference between children and childNodes in javascript</h3>
              <br />
              <b>childNodes:</b> It is a standard property that returns a collection of child elements of the specified element, including HTML nodes, all properties, and text nodes.
              <br />
              <br />
              <b>children:</b> A non-standard property that returns a collection of child elements of the specified element.
              But it only returns HTML nodes, not even text nodes. Although it is not a standard DOM property.
              <div style={titles}>
                <PrismCode
                  code={childNodes}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>19. What is the difference between firstChild and firstElementChild?</h3>
              <ul>
                <li><b>firstChild: </b>considers text entered in between html tags as a child element too in addition to html tags.</li>
                <br />
                <li><b>firstElementChild: </b>ignores text and comments between html tags and only considers html elements as a child.</li>
              </ul>
              <br />

              <div style={titles}>
                <PrismCode
                  code={firstElementChild}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>20. Name the two functions that are used to create an HTML element dynamically.</h3>
              <ul>
                <li><b>document.createElement: </b>is used with an HTML tag to create the element. The textContent is then modified and then the
                  class attribute is modified using setAttribute . This could also be used to add a data attribute.
                  Finally the element is appended to the body using the body element's appendChild method.</li>
                <li><b>createElement() method: </b>Can create and insert HTML elements at runtime.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={dynamically}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>21. What is the difference between remove() and removeChild()</h3>
              <ul>
                <li>The removeChild and remove are methods to work with elements of DOM, these method removes the element from the DOM.</li>
                <li><b>removeChild(): </b>Remove the node, and can save it to use it again.</li>
                <li><b>remove(): </b>Really remove the child.</li>
              </ul>
              <br />
              <div style={titles}>
                <PrismCode
                  code={removeChild}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <b>22. What is the Temporal Dead Zone(TDZ) in ES6.</b>
              <br />
              <p>let and const are hoisted, but there is a period between entering scope and being declared
                where they cannot be accessed. This period is the TDZ.</p>
              <i>
                There is a misconception that says let/ const are not hoisted in JavaScript. According to ES6 specification, The variables are
                created when their containing Lexical Environment is instantiated but may not be accessed in any way until the variable’s LexicalBinding
                is evaluated.
              </i>
              <br />
              <div style={titles}>
                <PrismCode
                  code={Temporal}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
              <i>The variable is in a "temporal dead zone" from the start of the block until the initialization is processed.</i>
              <br />

              <h3>23. Memoization</h3>
              <p>
                Memoization is an optimizations technique that can be used to reduce time-consuming calculations by serving 
                previous i/p to something called cache and returning the result from it.
              </p>
              <div style={titles}>
                <PrismCode
                  code={memorizations}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>24. window</h3>
              <div style={titles}>
                <PrismCode
                  code={window}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />

              <h3>25. Browser security</h3>
              Each browser tab has its own separate bucket for running code (called execution environments) - this means that in most cases
              the code in each tab is run completely separately, and the code in one tab cannot directly affect the code in another tab — or on
              another website.
              <br />

              <h3>26. Server-side versus client-side code</h3>
              <ul>
                <li>Client-side code is code that is run on the user's computer — when a web page is viewed, the
                  page's client-side code is downloaded, then run and displayed by the browser.
                </li>
                <li>Server-side code on the other hand is run on the server, then its results are downloaded and
                  displayed in the browser.
                </li>
                <li>A web page with no dynamically updating content is referred to as static — it just shows the
                  same content all the time.
                </li>
              </ul>
              <br />

              <h3>27. What is JSON Web Token?</h3>
              <p>
                Is a open standard(RFC) that securely transmitting information between parties as a JSON object. This information can be
                verifed and trusted because it is a digitally signed. JWTs can be signed using a secret or a public/ private key pair using RSA.
              </p>
              <b>When should you use JSON Web Token? </b>
              <ul>
                <li>Authentication is the most scenario for using JWT. Once the user is logged in, each
                  subsequent resquest will include the JWT.</li>
                <li>Information exchange, JWT is a good way of securely transmitting information between parties.</li>
              </ul>
              <br />

              <b>28. What is the JSON Web Token structure?</b>
              JSON Web Tokens consist of three parts separated by dots (.), which are:
              <ul>
                <li>Header</li>
                <li>Payload</li>
                <li>Signature</li>
              </ul>
              <br />
              Therefore, a JWT typically looks like.
              <br />
              <b>xxxxx.yyyyy.zzzzz</b>
              <br/>

              <h3>29. Event Listeners</h3>
              Real interactivity on a website requires event handlers.
              <div style={titles}>
                <PrismCode
                  code={listeners}
                  language="js"
                  plugins={["line-numbers"]}
                />
              </div>
              <br />
            </List>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default (withStyles(styles)(McqJs));
